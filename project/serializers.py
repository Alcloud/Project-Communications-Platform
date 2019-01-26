from rest_framework import serializers
from .models import Project, Relation
from users.serializers import UserInfoSerializer


class RelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relation 
        fields = ('__all__')


class ProjectSerializer(serializers.ModelSerializer):
    users = UserInfoSerializer(many=True, read_only=True)

    class Meta:
        model = Project 
        fields = ('__all__')
