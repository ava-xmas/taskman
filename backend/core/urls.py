from django.contrib import admin
from django.urls import path, include
from tasks import views as task_view
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tasks/', include('tasks.api.urls')),
    path('api/home/', include('home.api.urls')),
    # path('api/', include('core.api.urls')), # if the path starts with api/ then check for matching urls from core/api/urls.py
]