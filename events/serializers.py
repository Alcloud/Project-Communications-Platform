from rest_framework import serializers
from .models import Event
from users.serializers import UserInfoSerializer
# from project.models import Project

class EventSerializer(serializers.ModelSerializer):
    # project = serializers.PrimaryKeyRelatedField(required=True)
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = Event
        #fields = ('project', 'user', 'title', 'created_at')
        fields = ('__all__')