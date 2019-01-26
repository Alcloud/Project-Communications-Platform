from django.test import TestCase
from project.models import Project
from project.models import Relation
from project.models import InviteList
from django.contrib.auth.models import User

# Unittest for Project
# ToDo: multi classes


class ProjectTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username='prj-testuser', password='12345')
        Project.objects.create(title="TestProject 1", description="Description Project 1")

    def test_project_init(self):
        """Project create correctly"""
        prj1 = Project.objects.create(title="TestTitle 1", description="Description Project 1")
        prj2 = Project.objects.create(title="TestTitle 2", description="Description Project 2")
        self.assertIsNotNone(prj1)
        self.assertEqual(prj1.__str__(), "TestTitle 1")
        prj1.save()

    def test_project_add_user(self):
        user = User.objects.get(username='prj-testuser')
        prj1 = Project.objects.get(id=1)
        rl = Relation.objects.create(project=prj1, user=user, role=1)
        self.assertIsNotNone(rl)
        self.assertNotEqual(rl.role, 0)
        self.assertEqual(rl.role, 1)
        self.assertEqual(rl.__str__(), "TestProject 1 -> prj-testuser (1)")

    def test_invitelist(self):
        prj1 = Project.objects.get(id=1)
        email = "test@domain.de"
        il = InviteList.objects.create(project=prj1, invite_email=email)
        self.assertIsNotNone(il)
        self.assertEqual(il.__str__(), 'InviteList 1')

