# rest framwork
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.serializers import *
# django
from django.shortcuts import render
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.db.models import Q
# files
from .models import *
from friends.models import *
from .serializers import *
from .permissions import IsOwner, IsFriend
from .services import get_overdue_tasks, get_due_today, get_due_later, get_due_this_week

import logging
logger = logging.getLogger(__name__)

#creating tasks
class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    # authenticated users can only see their own tasks
    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        return qs.filter(owner=user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#deleting and editing tasks
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user)
    
# sending filtered tasks to frontend
class TaskFilterAPIView(APIView):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        user = self.request.user
        due_today = get_due_today(user)
        overdue = get_overdue_tasks(user)
        due_this_week = get_due_this_week(user)
        due_later = get_due_later(user)

        due_today_serialized = TaskSerializer(due_today, many=True)
        overdue_serialized = TaskSerializer(overdue, many=True)        
        due_this_week_serialized = TaskSerializer(due_this_week, many=True)
        due_later_serialized = TaskSerializer(due_later, many=True)

        return Response({
            'Overdue': overdue_serialized.data,
            'Due Today': due_today_serialized.data,
            'Due This Week': due_this_week_serialized.data,
            'Due Later': due_later_serialized.data,
        })

#adding collaborators
class ColabCreateAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def post(self, request, task_id, friend_id):
        task = get_object_or_404(Task, pk=task_id)
        user_to_add = get_object_or_404(User, username=friend_id) 
        logger.info(task, user_to_add) 

        owner = self.request.user     
        user = user_to_add 

        if task.owner != self.request.user:
            raise PermissionDenied("Only the owner can add collaborators.")
        
        isFriend =  Friendship.objects.filter(status='accepted').filter(
            (Q(sender=user) & Q(receiver=owner)) |
            (Q(sender=owner) & Q(receiver=user))).exists()
        
        if not isFriend:
            raise PermissionDenied("Only the friends of owner can be added.")
        
        # Create or get the collaborator record
        collaboration, created = Colab.objects.get_or_create(
            owner = owner,
            task=task,
            friend=user_to_add
        )
        
        if not created:
            return Response({"detail": "User is already a collaborator."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Collaborator added successfully."}, status=status.HTTP_201_CREATED)
    

#show collaborators when user is owner
class ColabGetDetailView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ColabSerializer

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        task = get_object_or_404(Task, pk=task_id)
        user = self.request.user
        return Colab.objects.filter(owner=user, task=task)
