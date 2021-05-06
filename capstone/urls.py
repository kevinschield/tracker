from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("myprojects", views.myprojects, name="myprojects"),
    path("newprojects", views.newprojects, name="newprojects"),
    path("tracker", views.tracker, name="tracker"),
    path("tracker/<int:project_id>", views.projectpage, name="projectpage"),
    path("tracker/update", views.tracker, name="tracker"),
    path("tracker/message", views.message, name="message"),
    path("scoreboard", views.scoreboard, name="scoreboard"),
    path("scoreboard/likes", views.likes, name="likes"),
    path("likes", views.likes, name="likes"),
    path("edit", views.edit, name="edit"),
    path("allprojects", views.allprojects, name="allprojects"),
    path("updateproject", views.updateproject, name="updateproject")
]
