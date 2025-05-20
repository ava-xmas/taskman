from django.db import models
from django.contrib.auth.models import User

class Friendship(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('blocked', 'Blocked'),
    )

    # the user who sent the request
    sender = models.ForeignKey(User, related_name='sent_requests', on_delete=models.CASCADE)
    
    # the user who received the request
    receiver = models.ForeignKey(User, related_name='received_requests', on_delete=models.CASCADE)
    
    # the status of the friendship request
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    # add timestamps for when the request was made
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username} -> {self.receiver.username} ({self.status})'
