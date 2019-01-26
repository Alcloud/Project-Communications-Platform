from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/projects', views.ProjectViewSet, 'project')

urlpatterns = router.urls