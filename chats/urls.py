from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/chats', views.ChatViewSet, 'chats')
router.register(r'api/projects/(?P<project_id>\d+)/chats', views.ChatViewSet, 'projects-chats')
router.register(r'api/messages', views.ChatMessageViewSet, 'delete-at-messages-last')
# router.register(r'api/chats/(?P<chat_id>\d+)/last_messages/(?P<last_id>\d+)', views.ChatMessageViewSet, 'chat-messages-last')
router.register(r'api/chats/(?P<chat_id>\d+)/messages', views.ChatMessageViewSet, 'chat-messages')

urlpatterns = router.urls
