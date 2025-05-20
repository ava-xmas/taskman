from django.db import models
from django.contrib.auth.models import User

# this references the default user model of django
class User(User):
    def __str__(self):
        return self.username        
    
