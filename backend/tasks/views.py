from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from rest_framework import generics, permissions
from .permissions import IsOwner

# Create your views here.
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
    
    # not needed post request because ListCreateAPIView alredy handles it for us
    #def post(self, request):
    #    serializer = TaskSerializer(data = request.data)
    #    if serializer.is_valid():
    #        serializer.save()
    #        return Response(serializer.data, status=status.HTTP_200_OK)
    #    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


