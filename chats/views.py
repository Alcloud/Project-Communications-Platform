from .models import Chat, ChatMessage, ChatNotification, UserMessageDeleted
from django.contrib.auth.models import User
from .serializers import ChatSerializer, ChatMessageSerializer
from rest_framework import viewsets
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status

class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer

    def get_queryset(self):
        queryset = Chat.objects.filter(users=self.request.user).order_by('-created_at')
        return queryset

    # def perform_create(self, serializer):
        # print('=====================================================')
        # print(self.request.data)
        # if serializer.validated_data['private']:
            # user = 
            # serializer.save(title=self.request.user)
        # serializer.save(creator=self.request.user)

    def create(self, request):
        if self.request.data['private'] and len(self.request.data['users'])!=1:
            return Response(['In private chat only 1 user allowed'], status=status.HTTP_400_BAD_REQUEST)
        elif not self.request.data['private'] and len(self.request.data['users'])<1:
            return Response(['Group chat should contain atleast one user'], status=status.HTTP_400_BAD_REQUEST)
        elif not self.request.data['private'] and len(self.request.data['title'])<1:
            return Response(['Title cannot be empty'], status=status.HTTP_400_BAD_REQUEST)
        
        project_id = self.request.data['project_id']

        if self.request.data['private']:
            chat = Chat.objects.filter(project_id=project_id, creator=self.request.user, 
                    users__id=self.request.data['users'][0],
                    private=True)
            if len(chat)>0:
                return Response(ChatSerializer(chat[0]).data)

        title = ''
        if 'title' in self.request.data:
            title = self.request.data['title']
        if self.request.data['private']:
            user = User.objects.get(pk=self.request.data['users'][0])
            title = user.first_name+" "+user.last_name
        chat = Chat.objects.create(project_id=project_id, title=title, private=self.request.data['private'], creator=self.request.user)
        chat.users.add(self.request.user, *User.objects.filter(id__in=self.request.data['users']))
        return Response(ChatSerializer(chat).data)

    def list(self, request, project_id):
        chats = Chat.objects.filter(users=self.request.user, project_id=project_id).order_by('-last_update')
        return Response(ChatSerializer(chats, many=True).data)


    # @action(detail=True, methods=['get'])
    # def new_messages(self, request, last_id):



    # def retrieve(self, request, pk=None):
    #     pass

    # def update(self, request, pk=None):
    #     pass

    # def partial_update(self, request, pk=None):
    #     pass

    # def destroy(self, request, pk=None):
    #     pass


class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        queryset = ChatMessage.objects.filter(chat__id=chat_id).order_by('created_at')
        return queryset

    def perform_create(self, serializer):
        chat_id = self.kwargs['chat_id']
        serializer.save(chat=Chat.objects.get(pk=chat_id), sender=self.request.user)

    def list(self, request, chat_id):
        last_id = request.GET.get("last_id", '0')
        deleted = [d.message_id for d in UserMessageDeleted.objects.filter(sender=self.request.user)]
        print(deleted)
        messages = ChatMessage.objects.filter(chat__id=chat_id).exclude(id__in=deleted).order_by('created_at')
        if(last_id):
            messages = messages.filter(pk__gt=last_id)
        return Response(ChatMessageSerializer(messages, many=True).data)

    def destroy(self, request, pk):
        print(pk)
        UserMessageDeleted.objects.create(sender=self.request.user, message_id=pk)
        return Response(status=status.HTTP_200_OK)
