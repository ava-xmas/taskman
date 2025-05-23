from django.contrib import admin
from django.urls import path, include
from home.views import * 


urlpatterns = [
    path('token/', JWTTokenObtainPairView.as_view()),
    path('register/', RegisterAPIView.as_view()),
    path('users/', UserSearchView.as_view()),
]
