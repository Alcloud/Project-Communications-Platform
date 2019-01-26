from rest_framework import serializers
from .models import ProjectMessage, ProjectMessageComment
from users.serializers import UserInfoSerializer


class ProjectMessageCommentSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)

    class Meta:
        model = ProjectMessageComment
        fields = ('__all__')


class ProjectMessageSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    comments = ProjectMessageCommentSerializer(read_only=True, many=True)

    class Meta:
        model = ProjectMessage
        fields = ('id', 'project', 'user', 'text', 'created_at', 'updated_at', 'comments')


