import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt

from .models import User, Project, Messages, Likes

# Create your views here.

def index(request):
    return render(request, "capstone/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "capstone/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "capstone/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "capstone/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "capstone/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "capstone/register.html")

def myprojects(request):
    projects = Project.objects.filter(owner=request.user)
    if request.method == "POST":
        data = json.loads(request.body)
        project_id = data["project_id"]
        project = Project.objects.get(id=project_id)
        project.delete()
        deleted = "yes"
        return JsonResponse({'deleted': deleted}, status=200)

    return render(request, "capstone/myprojects.html", {"projects": projects})

def newprojects(request):
    return render(request, "capstone/newprojects.html")

def tracker(request):
    if request.method == "POST":
        owner = request.user
        projname = request.POST["newProjectName"]
        person = request.POST["newProjectPerson"]
        units = request.POST["newProjectUnits"]
        unitlabel = request.POST["newProjecUnitLabel"]
        theme = request.POST["bgroundcolor"]
        newproj = Project(owner=owner, projname=projname, person=person, units=units, unitlabel=unitlabel, theme=theme)
        newproj.save()
        project_id = newproj.id
        return render(request, "capstone/tracker.html", {
            "projname": projname,
            "person": person,
            "units": units,
            "unitlabel": unitlabel,
            "completed": "0",
            "theme": theme,
            "project_id":  project_id,
            "owner": owner
        })
    if request.method == "PUT":
        data = json.loads(request.body)
        project_id = data["project_id"]
        project = Project.objects.get(id=project_id)
        updated = int(data["completed"])
        project.completed = updated
        project.save()
        newcompleted = project.completed
        return JsonResponse({'newcompleted': newcompleted}, status=200)
    else:
        return render(request, "capstone/tracker.html")

def projectpage(request, project_id):
    project = Project.objects.get(id=project_id)
    messages = Messages.objects.filter(project=project)
    if not messages:
        messages = "No messages"
    projname = project.projname
    person = project.person
    units = project.units
    unitlabel = project.unitlabel
    completed = project.completed
    theme = project.theme
    project_id = project.id
    owner = project.owner
    victory = project.victory
    return render(request, "capstone/tracker.html", {
        "projname": projname,
        "person": person,
        "units": units,
        "unitlabel": unitlabel,
        "completed": completed,
        "theme": theme,
        "project_id": project_id,
        "messages": messages,
        "owner": owner,
        "victory": victory
    })

def message(request):
    if request.method == "POST":
        sender = request.user
        data = json.loads(request.body)
        message = data["message"]
        pid = data["project"]
        project = Project.objects.get(id=pid)

        newmessage = Messages(sender=sender, message=message, project=project)
        newmessage.save()
        newtext = newmessage.message
        newsender = newmessage.sender.username
        newtime = newmessage.time
        newtime = newtime.strftime("%b %d - %I:%M %p")

        return JsonResponse({'newsender': newsender, "newtext": newtext, "newtime": newtime}, status=200)
    else:
        return render(request, "capstone/tracker.html")

def scoreboard(request):
    if request.method == "POST":
        project_id = request.POST["project_id"]
        project = Project.objects.get(id=project_id)
        project.victory = "yes"
        project.save()
        updatedprojects = Project.objects.filter(victory="yes")
        return render(request, "capstone/scoreboard.html", {"projects": updatedprojects})
    else:
        projects = Project.objects.filter(victory="yes")
        likelist = {}
        catalog = []
        for project in projects:
            count = Likes.objects.filter(project=project).count()
            pid = project.id
            likelist[pid] = {"count": count}
            catalog.append(count)
        return render(request, "capstone/scoreboard.html", {"projects": projects, "likelist": likelist, "catalog": catalog})

def likes(request):
    if request.method == "PUT":
        liker = request.user
        data = json.loads(request.body)
        project_id = data["project_id"]
        project = Project.objects.get(id=project_id)
        newlike = Likes(liker=liker, project=project)
        newlike.save()
        likecount = Likes.objects.filter(project=project).count()

        return JsonResponse({"likes": likecount})
    else:
        projects = Project.objects.filter(victory="yes")
        likelist = {}
        catalog = []
        for project in projects:
            count = Likes.objects.filter(project=project).count()
            pid = project.id
            likelist[pid] = count
            catalog.append(count)
        likes = Likes.objects.all()
        disablelist = []
        for like in likes:
            if like.liker == request.user:
                disablelist.append(like.project.id)
        return JsonResponse({"likelist": likelist, "disablelist": disablelist})

def edit(request):
    if request.method == "POST":
        project_id = request.POST["project_id"]
        project = Project.objects.get(id=project_id)
        return render(request, "capstone/edit.html", {"project": project})

    return render(request, "capstone/index.html")

def allprojects(request):
    projects = Project.objects.all()
    return render(request, "capstone/allprojects.html", {"projects": projects})

def updateproject(request):
    if request.method == "POST":
        owner = request.user
        project_id = request.POST["project_id"]
        projname = request.POST["newProjectName"]
        person = request.POST["newProjectPerson"]
        units = request.POST["newProjectUnits"]
        unitlabel = request.POST["newProjecUnitLabel"]
        theme = request.POST["bgroundcolor"]

        updatedproject = Project.objects.get(id=project_id)

        updatedproject.projname = projname
        updatedproject.person = person
        updatedproject.units = units
        updatedproject.unitlabel = unitlabel
        updatedproject.theme = theme

        updatedproject.save()
        completed = updatedproject.completed
        projects = Project.objects.filter(owner=request.user)

        return render(request, "capstone/myprojects.html", {"projects": projects})

    return render(request, "capstone/myprojects.html")
