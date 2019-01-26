from django.test import TestCase
from django.contrib.auth.models import User
from project.models import Project
from project_messages.models import ProjectMessage


class ProjectMessageTestCase(TestCase):

    def setUp(self):
        prj1 = Project.objects.create(title="TestTitle 1", description="Description Project 1")
        prj1.save()
        u = User.objects.create_user(username='prj-testuser', password='12345')
        u.save()

    def test_project_message_init(self):
        prj = Project.objects.get(id = 1)
        u = User.objects.get(username='prj-testuser')
        pm = ProjectMessage.objects.create(project = prj, user = u,
                            text = "Test Project Message")
        self.assertIsNotNone(pm)
        self.assertEqual(pm.__str__(),"Test Project Message")
        self.assertIsNotNone(pm.created_at)
        pm.save();
        self.assertIsNotNone(pm.created_at)
