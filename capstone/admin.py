from django.contrib import admin
from .models import Project, Messages, Likes
# Register your models here.
admin.site.register(Project)
admin.site.register(Messages)
admin.site.register(Likes)
