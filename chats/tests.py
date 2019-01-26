from django.test import TestCase
from chats.models import Chat
from chats.models import ChatMessage
from chats.models import ChatNotification
from django.contrib.auth.models import User
from project.models import Project

# Create your tests here.
# ToDo: multi classes


class ChatTestCase(TestCase):

    def ifinlist(element, list):
        return True if element in list else False

    def setUp(self):
        self.create_users()
        self.create_prj()
        self.create_chat()

        # self.u1 = User.objects.create_user(username='testuser1', password='12345')
        # self.u1.save()
        # self.u2 = User.objects.create_user(username='testuser2', password='12345')
        # self.u2.save()
        # self.prj1 = Project.objects.create(title="TestTitle 1", description="Description Project 1")
        # self.prj1.save()

    def private_vars(self):
        # ToDo: remove create_* from testcases and replace with this
        self.u1 = User.objects.get(username='testuser1')
        self.u2 = User.objects.get(username='testuser2')

        self.chat = Chat.objects.all()[0]

    def create_users(self):
        self.u1 = User.objects.create_user(username='testuser1', password='12345')
        self.u1.save()
        self.u2 = User.objects.create_user(username='testuser2', password='12345')
        self.u2.save()

    def create_prj(self):
        self.prj1 = Project.objects.create(title="TestTitle 1", description="Description Project 1")
        self.prj1.save()

    def create_chat(self):
        self.chat = Chat.objects.create(title="TestChat", private=True,
                                        creator=self.u1, project=self.prj1)
        self.chat.save()

    def test_chat_init(self):
        self.create_chat()
        self.assertIsNotNone(self.chat)
        self.assertIsNotNone(self.chat.created_at)
        self.assertEqual(self.chat.__str__(), "TestChat")
        self.assertEqual(self.chat.creator, self.u1)
        self.assertEqual(self.chat.project, self.prj1)

    def test_chat_filter_by_creator(self):
        self.create_chat()
        chat1 = Chat.objects.filter(creator=self.u1)
        self.assertIsNotNone(chat1)
        self.assertGreater(chat1.count(), 1)

    def test_chat_add_user(self):
        self.create_chat()
        self.chat.users.add(self.u2)
        self.assertIn(self.u2, self.chat.users.all())
        self.chat.save()

    def test_chat_add_users(self):
        self.test_chat_add_user()
        self.u3 = User.objects.create_user(username='testuser3', password='12345')
        self.u3.save()
        self.chat.users.add(self.u3)
        self.assertIn(self.u2, self.chat.users.all())
        self.assertIn(self.u3, self.chat.users.all())
        self.chat.save()

    def test_chat_message_init(self):
        self.private_vars()
        cm = ChatMessage(chat=self.chat,sender=self.u1,	
                         text="TestMessage")
        self.assertIsNotNone(cm)
        self.assertEqual(cm.text, "TestMessage")
        self.assertIsNone(cm.created_at)
        cm.save()
        self.assertIsNotNone(cm.created_at)

# ToDo: ChatModel erklären lassen!!
# * wie soll das Löschen funktionieren?
