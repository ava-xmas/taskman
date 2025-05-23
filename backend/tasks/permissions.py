from rest_framework import permissions
from friends.models import *
from django.db.models import Q

class IsOwner(permissions.BasePermission):

    # custon perms to only allow owners of a task to view or edit it
    
    def has_object_permission(self, request, view, obj):
        # request : the current http request
        # view : the view thats calling this permission
        # obj : the actual object being accessed
        return obj.owner == request.user
    # returns true if the person trying to change this task is the owner of the task


class IsFriend(permissions.BasePermission):
    """
    Allows access only if the user is friends (accepted) with the task owner.
    """

    def has_object_permission(self, request, view, friend):
        # obj is expected to be a Task
        user = request.user
        owner = User.objects.get(username=friend)

        # Check if there's an accepted friendship in either direction
        return Friendship.objects.filter(
            status='accepted'
        ).filter(
            (Q(sender=user) & Q(receiver=owner)) |
            (Q(sender=owner) & Q(receiver=user))
        ).exists()