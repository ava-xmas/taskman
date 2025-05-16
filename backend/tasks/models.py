from django.db import models
from datetime import datetime

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=200)
    date_created = datetime.now()
