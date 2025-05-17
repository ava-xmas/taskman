from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    created_at = datetime.now()
    deadline_date = models.DateField(null=True)
    deadline_time = models.TimeField(null=True)

    def __str__(self):
        return self.title
