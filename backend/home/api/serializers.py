from rest_framework import serializers
from ..models import User
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
       
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user

   
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()