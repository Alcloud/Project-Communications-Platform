from django.db import models
from django.contrib.auth.models import User
from project.models import Project

class Chat(models.Model):
    title = models.CharField(max_length=30)
    private = models.BooleanField(default=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    users = models.ManyToManyField(User, related_name='ChatUserRelation')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    last_message = models.ForeignKey('ChatMessage', null=True, on_delete=models.DO_NOTHING,
                                     blank=True, editable=False, related_name='+')
    last_update = models.DateTimeField(auto_now=True)

    # def get_title(self):
        # return users.first().full_name if private else title 

    def __str__(self):
        return self.title

# class ChatUserRelation(models.Model):
#     USER_ROLES = (
#         (0, 'Owner'),
#         (1, 'Participant'),
#     )
#     chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     role = models.IntegerField(choices=USER_ROLES)
#     created_at = models.DateField(auto_now_add=True)

class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(ChatMessage, self).save(*args, **kwargs)
        self.chat.last_message = self
        self.chat.save()

    def __str__(self):
        return self.chat.title + ': ' + self.chat.creator.username + ' -> ' + self.text


class UserMessageDeleted(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.ForeignKey(ChatMessage, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

class ChatNotification(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    reciver = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
