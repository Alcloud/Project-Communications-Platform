import django.contrib.auth.password_validation as validators
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.core import exceptions
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import ProfilePic
from django.conf import settings

UserModel = get_user_model()


class UserInfoSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField()

    def get_profile_pic(self, user):
        picture = ProfilePic.objects.filter(user=user).first()
        if picture:
            return settings.MEDIA_URL + picture.picture_url
        else:
            return "null"

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'id', 'profile_pic')

class UserRegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=UserModel.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=UserModel.objects.all())]
    )
    password = serializers.CharField(write_only=True)

    first_name = serializers.CharField(max_length=20, required=True)
    last_name = serializers.CharField(max_length=20, required=True)
    id = serializers.CharField(max_length=20, read_only=True)

    def validate(self, data):
        password = data.get('password')
        errors = dict()
        try:
            validators.validate_password(password=password)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(UserRegistrationSerializer, self).validate(data)

    # def create(self, validated_data):

    #     user = UserModel.objects.create(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         first_name=validated_data['first_name'],
    #         last_name=validated_data['last_name']
    #     )
    #     user.set_password(validated_data['password'])
    #     user.save()

    #     return user

    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password',  'first_name', 'last_name', 'id')
