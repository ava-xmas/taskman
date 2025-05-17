from django.urls import path
from ..views import *

urlpatterns = [
    path('', TaskCreateAPIView.as_view()),
]