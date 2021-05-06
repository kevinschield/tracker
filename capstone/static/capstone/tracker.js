var circlex = 50;
var circley = 350;
document.addEventListener('DOMContentLoaded', function(){
  if (window.innerWidth > 700){
    document.getElementById("gameboard").style.display = "initial";
    document.getElementById("smallboard").style.display = "none";
  }
  if (window.innerWidth < 700){
    document.getElementById("gameboard").style.display = "none";
    document.getElementById("smallboard").style.display = "initial";
  }
  window.addEventListener('resize', function(){
    if (window.innerWidth > 700){
      document.getElementById("gameboard").style.display = "initial";
      document.getElementById("smallboard").style.display = "none";
    }
    if (window.innerWidth < 700){
      document.getElementById("gameboard").style.display = "none";
      document.getElementById("smallboard").style.display = "initial";

    }
  })

          var units = document.getElementById("unitnum").value;
          var completed = document.getElementById("completednum").value;
          var checkunits = parseInt(units);
          var checkcompleted = parseInt(completed);
          document.getElementById("completednum").innerHTML = completed;
          console.log(checkunits);
          console.log(checkcompleted);


          if (checkcompleted >= (checkunits)){
            document.getElementById("victory").style.visibility = "visible";
            if (document.getElementById("updatebutton")){
            document.getElementById("updatebutton").disabled = "true";
            }
            if (document.getElementById("viccheck").value == "yes"){
              document.getElementById("victorybutton").disabled = "true";
            }
          }

          var i;
          var j = 0;
          var row = 0;

          for (i=0; i < units; i++) {
// create horizontal svg
              if (circlex > (window.innerWidth + 10000)){
                circlex = 50;
                row = row + 50;
              }
              var newcircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
              if (units < 50){
              newcircle.setAttribute("cx", circlex * (5 / units));
              }
              else {
                newcircle.setAttribute("cx", circlex * (5 / 50));
              }
              newcircle.setAttribute("cy", row + 50);
              if (units < 50){
              newcircle.setAttribute("r", 40 * (5 / units));
              }
              else {
                newcircle.setAttribute("r", 40 * (5 / 50));
              }
              newcircle.setAttribute("stroke", "black");
              newcircle.setAttribute("stroke-width", 3);
              if (i < completed) {
                newcircle.setAttribute("fill", "red");
              }
              else {
                newcircle.setAttribute("fill", "green");
              }
              newcircle.setAttribute("id", i);

              var gameboard = document.getElementById("gameboard");
              gameboard.appendChild(newcircle);
              circlex = circlex + 150;

              //create vertical svg
              var vertcircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
              vertcircle.setAttribute("cx", 50);

              if (units < 50){
                vertcircle.setAttribute("cy", circley * (5 / units));
              }
              else {
                vertcircle.setAttribute("cy", circley * (5 / 50));
              }
              if (units < 50){
              vertcircle.setAttribute("r", 40 * (5 / units));
              }
              else {
                vertcircle.setAttribute("r", 40 * (5 / 50));
              }
              vertcircle.setAttribute("stroke", "black");
              vertcircle.setAttribute("stroke-width", 3);
              if (i < completed) {
                vertcircle.setAttribute("fill", "red");
              }
              else {
                vertcircle.setAttribute("fill", "green");
              }
              vertcircle.setAttribute("id", i + "s");

              var smallboard = document.getElementById("smallboard");
              smallboard.appendChild(vertcircle);
              circley = circley + 150;
          }
          // add start and finish text
          var smallboard = document.getElementById("smallboard");
          var finishs = document.createElementNS("http://www.w3.org/2000/svg","text");
            if (units < 50){
            finishs.setAttribute("y", (circley * (5 / units)) + 50);
            }
            else {
              finishs.setAttribute("y", (circley * (5 / 50)) + 50);
            }
            finishs.setAttribute("x", 25);
            finishs.setAttribute("fill", "black");
            finishs.setAttribute("id", "finishs");

            smallboard.appendChild(finishs);
            document.getElementById("finishs").innerHTML = "Finish";
            document.getElementById("finishs").style.font = "36px sans-serif";
            var starts = document.createElementNS("http://www.w3.org/2000/svg","text");
              starts.setAttribute("x", 25);
              starts.setAttribute("y", 25);
              starts.setAttribute("fill", "black");
              starts.setAttribute("id", "starts");

              smallboard.appendChild(starts);
              document.getElementById("starts").innerHTML = "Start";
              document.getElementById("starts").style.font = "36px sans-serif";


              var gameboard = document.getElementById("gameboard");

              var finish = document.createElementNS("http://www.w3.org/2000/svg","text");
                if (units < 50){
                finish.setAttribute("x", (circlex * (5 / units)) - 50);
                }
                else {
                  finish.setAttribute("x", (circlex * (5 / 50)) - 50);
                }
                finish.setAttribute("y", 125  + row);
                finish.setAttribute("fill", "black");
                finish.setAttribute("id", "finish");

                gameboard.appendChild(finish);
                document.getElementById("finish").innerHTML = "Finish";
                document.getElementById("finish").style.font = "36px sans-serif";
                var start = document.createElementNS("http://www.w3.org/2000/svg","text");
                  start.setAttribute("x", 1);
                  start.setAttribute("y", 25);
                  start.setAttribute("fill", "black");
                  start.setAttribute("id", "start");

                  gameboard.appendChild(start);
                  document.getElementById("start").innerHTML = "Start";
                  document.getElementById("start").style.font = "36px sans-serif";

    document.addEventListener('click', event => {
        const element = event.target;
        if (element.id === 'updatebutton') {

          var update = document.getElementById("updatenum").value
          var completed = document.getElementById("completednum").value;
          var units = document.getElementById("unitnum").value;
          var i;
          save();
          for (i=0; i < update; i++) {

            var smallboard = document.getElementById("smallboard");
            var anifill = document.createElementNS("http://www.w3.org/2000/svg","animate");
              anifill.setAttribute("attributeName", "fill");
              //start.setAttribute("by", "red");
              anifill.setAttribute("from", "green");
              anifill.setAttribute("to", "red");
              anifill.setAttribute("dur", "1s");
              anifill.setAttribute("class", "anifill");
              anifill.setAttribute("fill", "freeze");
              //anifill.setAttribute("begin", i + "s");
              var progress = parseInt(completed) + i;
              anifill.setAttribute("href", "#" + progress + "s");
              smallboard.appendChild(anifill);

              var gameboard = document.getElementById("gameboard");
              var lanifill = document.createElementNS("http://www.w3.org/2000/svg","animate");
                lanifill.setAttribute("attributeName", "fill");
                //start.setAttribute("by", "red");
                lanifill.setAttribute("from", "green");
                lanifill.setAttribute("to", "red");
                lanifill.setAttribute("dur", "1s");
                lanifill.setAttribute("class", "lanifill");
                lanifill.setAttribute("fill", "freeze");
                //lanifill.setAttribute("begin", "+10s");
                var lprogress = parseInt(completed) + i;
                lanifill.setAttribute("href", "#" + lprogress);
                gameboard.appendChild(lanifill);
              }

              if (progress >= (units - 1)){
                document.getElementById("victory").style.visibility = "visible";
                document.getElementById("updatebutton").disabled = "true";

              }

              var anicirc = document.getElementsByClassName("anifill");
              var lanicirc = document.getElementsByClassName("lanifill");
              var j;
              for (j=0; j < anicirc.length; j++) {
                setInterval(anicirc[j].beginElement(), 1000);
                lanicirc[j].beginElement();
              }
          }

        if (element.id === 'msgbutton') {
          message();
        }
      })
})

function save() {
  const pid = document.getElementById('projectID').value;
  var updateunits = document.getElementById('updatenum').value;
  var completed = document.getElementById('completednum').value;
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  var newcompleted = parseInt(updateunits) + parseInt(completed);
  console.log(newcompleted);
  const request = new Request(
    'update',
    {headers: {'X-CSRFToken': csrftoken}}
);


  fetch(request, {
    method: 'PUT',
    mode: 'same-origin',
    body: JSON.stringify({
    completed: newcompleted,
    project_id: pid
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data["newcompleted"]);
    document.getElementById('completednum').value = data["newcompleted"];
    document.getElementById('completednum').innerHTML = data["newcompleted"];
    document.getElementById('completednum').style.display = "none";
    var newinput = document.createElement("input");
    newinput.innerHTML = data["newcompleted"];
    newinput.value = data["newcompleted"];
    var oldcomplete = document.getElementById('completednum');
    oldcomplete.remove();
    newinput.id = "completednum";
    newinput.type = "hidden";
    newinput.class = "form-control-plaintext";
    //units = document.getElementById('updatenum').value;
    var units = document.getElementById('unitnum').value;
    document.getElementById('updaterow').appendChild(newinput);
    document.getElementById("stats").innerHTML = newcompleted + " out of " + units + " completed";
  })
  console.log(newcompleted);

};

function message(){
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const post = document.getElementById('msg').value;
  const pid = document.getElementById('projectID').value;

  var norow = document.getElementById('norow');
  if (norow !== null){
    norow.remove();
  }
  const request = new Request(
    'message',
    {headers: {'X-CSRFToken': csrftoken}}
);


  fetch(request, {
    method: 'POST',
    mode: 'same-origin',
    body: JSON.stringify({
    message: post,
    project: pid
    })
  })
  .then(response => response.json())
  .then(data => {

console.log(data["newtext"]);
console.log(data["newsender"]);
console.log(data["newtime"]);

  var newrow = document.createElement('tr');
  var newth = document.createElement('th');
  var newtdname = document.createElement('td');
  var newtdtime = document.createElement('td');

  newth.innerHTML = data["newtext"];
  newtdname.innerHTML = data["newsender"];
  newtdtime.innerHTML = data["newtime"];
  rowcount = document.getElementById('msgtable').childElementCount;
  newrow.id = rowcount + 1 + "row";

  document.getElementById('msgtable').appendChild(newrow);
  newrow.appendChild(newth);
  newrow.appendChild(newtdname);
  newrow.appendChild(newtdtime);
  document.getElementById('msg').value = "";
})
};
