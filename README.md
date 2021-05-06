Welcome to the Family Project tracker
This web application is designed to help families track whatever activity they
like to do. For example, maybe a child is learning to read and the family wants
to keep track of how many books they read each week.

Justifications:
I believe this project satisfies the distinctiveness and complexity requirements
mainly, because it involved complex SVG calculations to dynamically create
SVG circles and adjust their length and size depending on the number of Units
entered into by the user. It also utilizes more animation than prior projects
including animating the SVG pieces and animating the delete project function. It
dynamically checks what new circles have been added and adds animations to those
circles.

File Contents:

In the templates folder, there are the following files:

In the templates folder:

index.html - This file creates a landing page for users to login or create a new account.

register.html - Users can register with a username, password, and email address.

login.html - Users can login with a username and password.

newprojects.html - Users can fill out a form and create a new project here
  including selecting a background color and validating that the units are numbers.
  Users can create their own custom units and labels to count by.

myprojects.html - Users can open any of their past projects, edit past projects,
  and delete past projects.

edit.html - Users can edit any of the details of a prior project they created.

tracker.html - This page generates an SVG animation of a series of circles that
start out green and then animate to red based on how many completed units the
user enters. When a user hits the update button with new units completed, the
corresponding number of circles will change to red. When the same number of
completed units equals or is greater than the number of total units, then a
message saying "Congratulations" will appear at the top of the screen with an
option to post this accomplishment to the Scoreboard. Tracker.html also contains
a message board where users can post messages of encouragement to the person
trying to complete their goal.

scoreboard.html - This file creates a page listing all the completed projects
  that users wanted to post to the scoreboard. Each project has a link so users
  can see details
  of the project or add a message to the project.

In the static folder:
index.js - This is a placeholder for any future JavaScript code.

myproject.js - This file handles the click event of the delete button on a
  project card in the my project template. When 'delete' is pressed, this code
  sends a request to the myprojects view that deletes the record and then
  switches the animation status of the card from "paused" to "running".

scoreboard.js - This file handles clicking a "like" button for a project on
  the scoreboard. A 'put' request is sent updating the "likes" model. It then
  disables the like button. The file also updates all of the like buttons
  when the page loads by getting the latest number of likes from the likes model
  and then checks if the current user has ever liked that project and if so,
  that projects like button is disabled for that user so multiple likes can not
  be made.

tracker.js - This file checks the size of the window when opening the page and
  when resizing the page and hides the horizontal or vertical SVG canvas
  depending on the size of screen. Next, a check is made to see if the completed
  numbers is greater than or equal to the total unit numbers. If so, the project
  is completed and the words "Congratualations" are unhidden at the top of the
  page with a "post" button.
  Next, the file loops through the number of unit circles and creates an
  SVG circle calculating the size of the circle based on the total number of
  circles. The file then loops through the number of completed circles and
  changes their color to red. A start position and finish position is
  calculated and SVG text reading "start" and "finish" is created and placed
  at those positions. Next, SVG animation is added to each of the circles. An
  event handler is created for clicking on the update button which then
  causes the animation to happen changing the new circles to red. Then, a check
  is made to see if the project is completed and if so, it unhides the
  "Congratulations" text.
  Next, the file handles any messages by referencing the message function when
  the message button is clicked. It sends a post request to the message view
  and updates the message model with the new message. It then adds a new row to
  the message table with the new message.

stylemyprojects.css - This sets the background and text colors for the
  myprojects.html file and it also creates the animation for deleting a project.

stylenewprojects.css - This file styles the background color and text color for
  body of newprojects.html.

stylescoreboard.css - This file styles the background color and text as well as
  the like button spacing and the spacing of each project listed in the file.

styletracker.css - This file styles the "Congratulations" message so that it is
  hidden until a project is complete.

Capstone main folder:

views.py - This file contains all of the views for the project. For this project
  the views are mainly used to receive requests from the templates and
  JavaScript files and then send requests to the models to either get updated
  query information, save new information, edit existing records, or delete
  prior records.

models.py - This file contains the database models consisting of a User,
  Project, Messages, and Likes model.

The remaining files are various administrative files used for adjusting various
settings to the Django project.
