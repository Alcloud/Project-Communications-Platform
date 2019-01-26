from rest_framework import viewsets

from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .models import Project, Relation, InviteList
from .serializers import ProjectSerializer, RelationSerializer

class RelationViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Relation.objects.all()
        return queryset
    serializer_class = RelationSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        current_user = self.request.user
        projects = Project.objects.filter(users__in=[current_user])
        # print("return only visible projects for current user", projects)
        return projects
    
    def create(self, request, *args, **kwargs):
        serializer = ProjectSerializer(data=request.data)

        if serializer.is_valid():
            title = self.request.data['title']
            description = self.request.data['description']

            project = Project.objects.create(title=title, description=description)
            project.save()
            Relation.objects.create(project=project, user=self.request.user, role=0)

            return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def invite_user_to_project(self, request, pk=None):
        """
        add or invites a user by email to for the given 'project_id'

        requires 'email' POST Parameters

        :param request: HttpRequest
        :param pk: pk of the project
        :return: Response
        """
        project = get_object_or_404(Project, pk=pk)
        email = request.data.get('email')
        if email:
            is_valid = validate_email(email)
            if not is_valid:
                return Response(["ERROR: %s ist not valid" % email], status=status.HTTP_400_BAD_REQUEST)
            # check if user is already registered
            if is_user_registered(email):
                # add user to project
                user = get_user_by_email(email)
                add_user_to_project(project, user, 1)
                return Response(["User: %s added to project: %s with role: %s" % (user.username, project.title, 1)], status=status.HTTP_201_CREATED)
            else:
                # invite user by email
                try:
                    # TODO: replace hardcoded url
                    send_mail("Invitation", "You're invited to: %s\n on ws18sdf-a.f4.htw-berlin.de" % project.title, "noreply@project-a.htw.de", [email])
                except ConnectionRefusedError as err:
                    print("Mail could not be send, you might be on localhost!", err)
                save_invite(project, email)
                return Response(["User: %s invited to project: %s with role: %s" % (email, project.title, 1)], status=status.HTTP_200_OK)

        return Response(["ERROR: no 'email' parameter given"], status=status.HTTP_400_BAD_REQUEST)


def get_user_by_email(email):
    return User.objects.get(email=email)


def is_user_registered(email):
    try:
        get_user_by_email(email)
        return True
    except User.DoesNotExist:
        return False


def validate_email(email):
    from django.core.validators import validate_email
    from django.core.exceptions import ValidationError
    try:
        validate_email(email)
        return len(email) <= 60
    except ValidationError:
        return False


def add_user_to_project(project, user, role):
    Relation.objects.create(project=project, user=user, role=role)


def save_invite(project, email):
    InviteList.objects.create(project=project, invite_email=email)
