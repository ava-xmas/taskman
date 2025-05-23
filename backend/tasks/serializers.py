from rest_framework import serializers
from .models import *

class TaskSerializer(serializers.ModelSerializer):
    # Meta is like info or metadata, in this case we're specifying the model to be used
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'created_at',
            'deadline_date',
            'deadline_time'
        ]
        extra_kwargs = {
            'title': {'required': True},
        }

class ColabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colab
        fields = ['owner', 'task', 'friend']