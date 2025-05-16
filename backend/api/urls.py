
from django.urls import path, include

urlpatterns = [
    path('tasks/', include('tasks.urls')),
    # path('api/', include('core.api.urls')), # if the path starts with api/ then check for matching urls from core/api/urls.py
]
