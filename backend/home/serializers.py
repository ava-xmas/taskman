from django.contrib.auth.models import User
from rest_framework import serializers

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']