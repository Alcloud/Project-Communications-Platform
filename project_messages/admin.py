from django.contrib import admin
from .models import ProjectMessage, ProjectMessageComment

admin.site.register(ProjectMessage)
admin.site.register(ProjectMessageComment)
