from django.shortcuts import render
from .models import Event
from .serializers import EventSerializer
from rest_framework import viewsets

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        queryset = Event.objects.filter(project__id=project_id)
        #queryset = Event.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    #def create(self, request):
     #   serializer = ProjectSerializer(data=request.data)