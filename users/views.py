from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.core.files.storage import FileSystemStorage

from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail

from users.serializers import UserRegistrationSerializer, UserInfoSerializer

from .models import ProfilePic

user_model = get_user_model()



class UserViewSet(viewsets.ModelViewSet):
    model = user_model
    queryset = model.objects.all()
    serializer_class = UserInfoSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        elif self.action == 'login':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        logout(request)

        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data
            user = user_model.objects.create(
                username=validated_data['username'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
            user.set_password(validated_data['password'])
            user.save()
            print('--------------------- User created')

            # send confirmation mail
            try:
                # TODO: replace hardcoded url
                send_mail("Registration successful", "You have successfully registered at ws18sdf-a.f4.htw-berlin.de", "noreply@project-a.htw.de", [validated_data['email']])
            except ConnectionRefusedError as err:
                print("Mail could not be send, you might be on localhost!", err)

            login(request, user)
            return Response(UserInfoSerializer(user).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        logout(request)

        username = request.data['username']
        password = request.data['password']

        user = authenticate(username=username, password=password)
        if user and user.is_active:
            login(request, user)
            return Response(UserInfoSerializer(user).data, status=status.HTTP_202_ACCEPTED)

        return Response({'error': 'username or password are incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def upload_profile_pic(self, request):
        file = request.FILES['file']
        fs = FileSystemStorage()
        fs.save(file.name, file)

        old_picture = ProfilePic.objects.filter(user=self.request.user).first()
        if not old_picture:
            ProfilePic.objects.create(picture_url=file.name, user=self.request.user)
        else:
            old_picture.picture_url = file.name
            old_picture.save()

        # return Response({'status': 'file %s saved' % file.name}, status=status.HTTP_200_OK)
        return Response(UserInfoSerializer(request.user).data, status=status.HTTP_202_ACCEPTED)

    # implementation password reset via rest-api from this source: https://pypi.org/project/django-rest-passwordreset/
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
        """
        Handles password reset tokens
        When a token is created, an e-mail needs to be sent to the user
        :param sender:
        :param reset_password_token:
        :param args:
        :param kwargs:
        :return:
        """
        ##url options for develop and production and one to test
        #url = "{}?token={}".format('http://localhost:8000/#/password-set-new', reset_password_token.key)
        username = reset_password_token.user.username
        url = "{}?token={}".format('https://ws18sdf-a.f4.htw-berlin.de/#/password-set-new', reset_password_token.key)
        #'reset_password_url': "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
        try:
            # TODO: replace hardcoded url
            send_mail("%s, you have requested a new password." % username, "Reset your Password via this URL:\n %s\n" % url , "noreply@ws18sdf-a.f4.htw-berlin.de", [reset_password_token.user.email])
        except ConnectionRefusedError as err:
            print("Mail could not be send, you might be on localhost!", err)
            print("Reset your Password via this URL: %s" % url)
        #return Response({'error': 'test error'}, status=status.HTTP_400_BAD_REQUEST)
