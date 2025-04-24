from django.contrib import admin
from django.urls import path, include
from home import views as home_views

urlpatterns = [
    path('register/', home_views.RegisterAPIView.as_view()),
    path('login/', home_views.LoginAPIView.as_view()),
]