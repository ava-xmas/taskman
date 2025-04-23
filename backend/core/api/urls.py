from rest_framework.routers import DefaultRouter

from django.urls import path, include

router = DefaultRouter()

# posts


urlpatterns = [
    path('', include(router.urls)), 
]
