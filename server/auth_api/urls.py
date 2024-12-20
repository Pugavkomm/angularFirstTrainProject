from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from auth_api import views

urlpatterns = [
    path("user/", views.UserDataView.as_view(), name="user-data"),
    path("sign-up/", views.SignUpView.as_view(), name="sign-up"),
    path("sign-in/", views.LogInView.as_view(), name="sign-in"),
    # path("token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]
