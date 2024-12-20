import base64
import json

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

UserModel = get_user_model()


class TestSignUp(APITestCase):
    def setUp(self):
        self.url = reverse("sign-up")

    def test_auth_correct_data(self):
        data = {
            "username": "username",
            "first_name": "first_name",
            "last_name": "last_name",
            "password1": "paSSw0rd!",
            "password2": "paSSw0rd!",
        }

        response = self.client.post(self.url, data=data)
        user = UserModel.objects.first()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(UserModel.objects.count(), 1)

        self.assertEqual(user.username, "username")
        self.assertEqual(user.first_name, "first_name")
        self.assertEqual(user.last_name, "last_name")


class TestLogIn(APITestCase):
    def setUp(self):
        self.url = reverse("sign-in")
        self.user = get_user_model().objects.create_user(
            username="username", first_name="first_name", last_name="last_name", password="pasSw0rd!"
        )

    def test_login(self):
        data = {"username": "username", "password": "pasSw0rd!"}

        response = self.client.post(self.url, data=data)

        access = response.data["access"]
        header, payload, signature = access.split(".")
        decoded_payload = base64.b64decode(f"{payload}==")
        payload_data = json.loads(decoded_payload)

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(payload_data["username"], self.user.username)
        self.assertEqual(payload_data["first_name"], self.user.first_name)
        self.assertEqual(payload_data["last_name"], self.user.last_name)
        self.assertEqual(payload_data["user_id"], self.user.pk)
