from django.urls import path
from .views import SendFriendRequestAPIView, AcceptFriendRequestAPIView, RejectFriendRequestAPIView, PendingFriendRequestsAPIView

urlpatterns = [
    path('send/<int:receiver_user_id>/', SendFriendRequestAPIView.as_view(), name='send_friend_request'),
    path('accept/<int:friendship_id>/', AcceptFriendRequestAPIView.as_view(), name='accept-friend-request'),
    path('reject/<int:friendship_id>/', RejectFriendRequestAPIView.as_view(), name='reject-friend-request'),
    path('show_pending/', PendingFriendRequestsAPIView.as_view(), name='show-pending-requests'),
]
