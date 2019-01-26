from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    users = models.ManyToManyField(User, through='Relation')

    def __str__(self):
        return self.title


class Relation(models.Model):
    USER_ROLES = (
        (0, 'Owner'),
        (1, 'Participant'),
        (2, 'Guest')
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.IntegerField(choices=USER_ROLES)

    def __str__(self):
        return self.project.title + " -> " + self.user.username + " (" + str(self.role) + ")"


class InviteList(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    invite_date = models.DateField(auto_now_add=True)
    invite_email = models.TextField() 

    def __str__(self):
        return 'InviteList %s' % (self.id)
