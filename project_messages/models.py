from django.db import models
from project.models import Project
from django.contrib.auth.models import User


class ProjectMessage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE) # perfectlly the message shuoldn't be deleted, if user is removed...
    # username = models.CharField(max_length=30) # if user is deleted, the message should exist with the name of original user...
    # but it is for real project :)
    text = models.TextField() # for big text
    created_at = models.DateTimeField(auto_now_add=True) # to show messages's date
    updated_at = models.DateTimeField(null=True, blank=True) # and if the message waw edited

    def __str__(self):
        return self.text


class ProjectMessageComment(models.Model):
    message = models.ForeignKey(ProjectMessage, related_name='comments', on_delete=models.CASCADE) # add virtual 'comments' field for ProjectMessageSerializer
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
