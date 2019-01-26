from django.test import TestCase
from django.contrib.auth.models import User


# Unittests for User

class UserTestCase(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='testuser', password='12345')
#	def test_user_create(self):
#		self.user = User.objects.create_user(username='testuser', password='12345')
#		self.assertIsNotNone(self.user)
#		self.user.save()

	def test_user_is_not_none(self):
		self.assertIsNotNone(self.user)

	def test_user_get(self):
		u = User.objects.get(username='testuser')
		self.assertIsNotNone(u)

	def test_user_last_name(self):
		self.user.last_name = 'LastName'
		self.assertEqual(self.user.last_name, 'LastName')
		# i think that the lastname dont be an int, but it ist no problem  
		#with self.assertRaises(TypeError):
		#	self.user.last_name = 123
	
	def test_user_login(self):
		login = self.client.login(username='testuser', password='12345')
		self.assertIsNotNone(login)
		self.assertTrue(login)
	
	def test_user_set_password(self):
		u = User.objects.get(username='testuser')
		self.assertIsNotNone(u)
		u.set_password('new password')
		u.save()

		login = self.client.login(username='testuser', password='12345')
		self.assertFalse(login)

		login = self.client.login(username='testuser', password='new password')
		self.assertTrue(login)

#from django.contrib.auth.models import AnonymousUser, User
from django.test import Client, TestCase
#from users.views import UserViewSet


class UserViewTestCase(TestCase):

	def setUp(self):
		# Every test needs access to the request factory.
		#self.factory = RequestFactory()
		self.user = User.objects.create_user(username='testuser-api',
											 email='user@testdomain.de',
											 password='top_secret')
		self.user.save()

	def test_user_login(self):
		c = Client()
		response = c.post('/api/users/login/', {'username': 'testuser-api', 'password': 'top_secret'})
		self.assertEqual(response.status_code, 202, "HTTP-Status 202 Accepted")
		self.assertIsNotNone(response.client.cookies['csrftoken'].value)
		self.assertIsNotNone(response.client.cookies['sessionid'].value)


	def test_user_login_fail(self):
		c = Client()
		response = c.post('/api/users/login/', {'username': 'testuser-api', 'password': 'top_secret_wrong'})
		self.assertEqual(response.status_code, 400, "HTTP-Status 400 Bad Request")

		with self.assertRaises(KeyError) as raises:
			self.assertIsNotNone(response.client.cookies['csrftoken'].value)
		with self.assertRaises(KeyError) as raises:
			self.assertIsNotNone(response.client.cookies['sessionid'].value)

