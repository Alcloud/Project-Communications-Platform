from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/events/(?P<project_id>\d+)', views.EventViewSet, 'events')

urlpatterns = router.urls
