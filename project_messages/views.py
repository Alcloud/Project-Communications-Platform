from .models import ProjectMessage, ProjectMessageComment
from .serializers import ProjectMessageSerializer, ProjectMessageCommentSerializer
from rest_framework import viewsets


class ProjectMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectMessageSerializer

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        queryset = ProjectMessage.objects.filter(project__id=project_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectMessageCommentViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectMessageCommentSerializer
    queryset = ProjectMessageComment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
