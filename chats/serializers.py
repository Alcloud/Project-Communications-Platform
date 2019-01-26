from rest_framework import serializers
from .models import Chat, ChatMessage, ChatNotification, UserMessageDeleted
from users.serializers import UserInfoSerializer




class ChatMessageSerializer(serializers.ModelSerializer):
    sender = UserInfoSerializer(read_only=True)
    # chat = ChatSerializer()
    class Meta:
        model = ChatMessage
        fields = ('id', 'chat_id', 'sender', 'text', 'created_at')
        # fields = ('__all__')

class ChatSerializer(serializers.ModelSerializer):
    users = UserInfoSerializer(many=True, read_only=True)
    last_message = ChatMessageSerializer(read_only=True)
    creator = UserInfoSerializer(read_only=True)
    
    # messages = ChatMessageSerializer(many=True)
    class Meta:
        model = Chat
        fields = ('id', 'title', 'creator', 'private', 'users', 'created_at', 'project_id', 'last_message', 'last_update')
        # fields = ('__all__')