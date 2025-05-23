from django.urls import path
from ..views import *

urlpatterns = [
    path('', TaskListCreateAPIView.as_view()), # for listing and creating tasks
    path('<int:pk>/', TaskDetailView.as_view()), # for updating, deleting tasks
    path('filters/', TaskFilterAPIView.as_view()), # for sending filtered tasks
    path('colab/<int:task_id>/<str:friend_id>/', ColabCreateAPIView.as_view()), #for adding collaborators
    path('colab/get/<int:task_id>/', ColabGetDetailView.as_view())
]