# files
from .api.serializers import *
from home.models import *
# django
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render
#
import logging
# rest framework
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

logger = logging.getLogger(__name__)

# provides login functionality via JWT, its built on top of rest_framework_simplejwt
class JWTTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

# handles user registration
class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

#
class UserSearchView(generics.ListAPIView):
    serializer_class = UserSummarySerializer
    permission_classes = [IsAuthenticated]  # Optional, depending on your app
    queryset = User.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['username']