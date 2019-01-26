from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/project_messages/(?P<project_id>\d+)', views.ProjectMessageViewSet, 'project-messages')
router.register(r'api/project_messages_comments', views.ProjectMessageCommentViewSet, 'project-messages-comments')

urlpatterns = router.urls
