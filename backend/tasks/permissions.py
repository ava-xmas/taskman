from rest_framework import permissions

class IsOwner(permissions.BasePermission):

    # custon perms to only allow owners of a task to view or edit it
    
    def has_object_permission(self, request, view, obj):
        # request : the current http request
        # view : the view thats calling this permission
        # obj : the actual object being accessed
        return obj.owner == request.user
    # returns true if the person trying to change this task is the owner of the task
