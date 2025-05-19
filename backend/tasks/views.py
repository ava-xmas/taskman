# rest framwork
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from rest_framework import generics, permissions
# django
from django.shortcuts import render
from django.contrib.auth.models import User
# files
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsOwner
from .services import get_overdue_tasks, get_due_today, get_due_later, get_due_this_week

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
