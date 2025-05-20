from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Friendship, User

class SendFriendRequestAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, receiver_user_id):
        receiver = get_object_or_404(User, id=receiver_user_id)

        # prevent sending a request to yourself
        if receiver == request.user:
            return Response({"detail": "You cannot send a friend request to yourself."}, status=status.HTTP_400_BAD_REQUEST)

        # check if there's already a pending or accepted friendship
        existing_request = Friendship.objects.filter(
            (Q(sender=request.user) & Q(receiver = receiver) | 
             Q(sender=receiver) & Q(receiver = request.user)),
        ).first()

        if existing_request:
            return Response({"detail": "Friend request already sent."}, status=status.HTTP_400_BAD_REQUEST)

        # create the friendship request
        Friendship.objects.create(sender=request.user, receiver=receiver, status='pending')

        return Response({"detail": "Friend request sent."}, status=status.HTTP_201_CREATED)

class AcceptFriendRequestAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, friendship_id):
        # get the friendship record by id
        friendship = get_object_or_404(Friendship, id=friendship_id)

        # check if logged in user is the receiver of the friend req
        if friendship.receiver != request.user:
            return Response({'detail': "You cannot accept this request"}, status=status.HTTP_400_BAD_REQUEST)
        
        # check if the request is already accepted or rejected
        if friendship.status != "pending":
            return Response({'detail': "This request has already been responded to"}, status = status.HTTP_400_BAD_REQUEST)
        
        # change the friendship status to accepted
        friendship.status = "accepted"
        friendship.save()

        return Response({'detail': "Friend request accepted."}, status=status.HTTP_200_OK)
    
class RejectFriendRequestAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, friendship_id):
        # get the friendship record by id
        friendship = get_object_or_404(Friendship, id=friendship_id)

        # check if logged in user is the receiver of the friend req
        if friendship.receiver != request.user:
            return Response({'detail': "You cannot reject this request"}, status=status.HTTP_400_BAD_REQUEST)
        
        # check if the request is already accepted or rejected
        if friendship.status != "pending":
            return Response({'detail': "This request has already been responded to"}, status = status.HTTP_400_BAD_REQUEST)
        
        # change the friendship status to accepted
        friendship.status = "rejected"
        friendship.save()

        return Response({'detail': "Friend request rejected."}, status=status.HTTP_200_OK)
    
class PendingFriendRequestsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # fetch pending friend requests where the logged-in user is the receiver
        pending_requests = Friendship.objects.filter(receiver=request.user, status='pending')

        # serialize the data
        data = [
            {
                'id': req.id,
                'sender': req.sender.username,
                'receiver': req.receiver.username,
                'status': req.status,
                'created_at': req.created_at,
            }
            for req in pending_requests
        ]

        return Response(data)