document.addEventListener('DOMContentLoaded', function(){

  document.addEventListener('click', event => {
      const element = event.target;
      if (element.id === 'delete') {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        //const pid = document.getElementById('projectID').value;
        const pid = element.value;
        const request = new Request(
          'myprojects',
          {headers: {'X-CSRFToken': csrftoken}}
      );

        fetch(request, {
          method: 'POST',
          mode: 'same-origin',
          body: JSON.stringify({
          project_id: pid
          })
        })
        .then(response => {
          console.log(response.status)
          if (response.status == 200){

            //element.parentElement.style.display = "none";
            element.parentElement.style.animationPlayState = "running";
            var cardbody = element.parentElement;
            cardbody.parentElement.style.animationPlayState = "running";

            //element.parentElement.addEventList;
            //element.parentElement.style.visibility = "hidden";
            //element.parentElement.style.display = "none";
          }
        });
        //.then(data => {
        //  console.log(data.status);
      //    if (data.status == 200){

      //      element.parentElement.style.display = "none";
      //    }
        //})
      }
    })
});
