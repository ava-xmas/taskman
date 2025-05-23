from django.db import models
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    deadline_date = models.DateField()
    deadline_time = models.TimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE) 

    def __str__(self):
        return self.title

class Colab(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='colab')
