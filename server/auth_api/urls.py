from django.urls import path

from auth_api import views

urlpatterns = [
    path("sign-up/", views.SignUpView.as_view(), name="sign-up"),
    path("sign-in/", views.LogInView.as_view(), name="sign-in"),
]
