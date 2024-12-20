from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenBlacklistView

from auth_api.serializers import LogInSerializer, UserSerializer
from auth_api.serializers import UserDataSerializer


class UserDataView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def get(self, request):
        """# Get user data

        > Only authenticated users

        """
        user = request.user

        return Response(UserDataSerializer(user).data, status=status.HTTP_200_OK)

class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class LogInView(TokenBlacklistView):
    serializer_class = LogInSerializer
