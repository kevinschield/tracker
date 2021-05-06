from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    projname = models.CharField(max_length=64)
    person = models.CharField(max_length=64)
    units = models.IntegerField()
    unitlabel = models.CharField(max_length=64)
    completed = models.IntegerField(default=0)
    theme = models.CharField(max_length=65)
    victory = models.CharField(max_length=10, default='no' )

class Messages(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    message = models.CharField(max_length=140)
    time = models.DateTimeField(auto_now=True)

class Likes(models.Model):
    liker = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
