from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/users', views.UserViewSet, 'users')

urlpatterns = router.urls

urlpatterns.append(
	url(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
)
