document.addEventListener('DOMContentLoaded', function(){
  updatelikes();
  document.addEventListener('click', event => {
      const element = event.target;
      if (element.id === 'likesbtn') {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        //const pid = document.getElementById('projectID').value;
        const pid = element.value;
        const request = new Request(
          'likes',
          {headers: {'X-CSRFToken': csrftoken}}
      );

        fetch(request, {
          method: 'PUT',
          mode: 'same-origin',
          body: JSON.stringify({
          project_id: pid
          })
        })
        .then(response => response.json())
        .then(data => {

          document.getElementById(pid).innerHTML = data["likes"];
      })
      element.disabled = true;
    }

    })
});

function updatelikes(){
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  //const pid = document.getElementById('projectID').value;
  const request = new Request(
    'likes',
    {headers: {'X-CSRFToken': csrftoken}}
);

  fetch(request, {
    method: 'GET',
    mode: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data["disablelist"]);
      var disablelist = data["disablelist"];
      var likebuttons = document.getElementsByClassName('badge badge-light');
        var i = 0;
        var j = 0;
        for (i=0; i < likebuttons.length; i++){
          var pid = likebuttons[i].id;
          console.log(pid);
          var likes = data.likelist.pid;
          likes = data.likelist[pid];
          likebuttons[i].innerHTML = likes;
          var intpid = parseInt(pid);
          if (disablelist.includes(intpid)){
            likebuttons[i].parentElement.disabled = true;

          }
        }
    })

    }
