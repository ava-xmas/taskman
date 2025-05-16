from django.urls import path
from ..views import TaskAPIView

urlpatterns = [
    path('/', TaskAPIView.as_view()),
]