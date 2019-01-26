from django.db import models
from django.contrib.auth.models import User


class ProfilePic(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	picture_url = models.TextField()

	def __str__(self):
		return self.picture_url
