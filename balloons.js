function getRandomInt(min, max) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xFFFFFFFF + 1);
    return Math.floor(randomNumber * range) + min;
  }

document.addEventListener("DOMContentLoaded", function() {
    // randomizer for attention grabber
    const list = ["animate__bounce", "animate__flash", "animate__pulse", "animate__rubberBand", "animate__shakeX", "animate__shakeY"]
    const randomNumber = getRandomInt(0, list.length - 1);
    const h1 = document.getElementById("payAttention");
    h1.classList.add(list[randomNumber]);

    const elem = document.getElementById('dob');
    const datepicker = new Datepicker(elem, {
        // options
        autohide: true,
        format: 'MM-dd'
      }); 
    
    // uncheck all boxes by default (Firefox)
    document.querySelectorAll('.form-check-input').forEach(c => c.checked = false);

    // event listener for check all
    document.getElementById("all").addEventListener("click", function(){
        document.querySelectorAll('.form-check-input').forEach(c => {
            c.checked = true;
            const elem = document.getElementById(c.id + 'Img');
            elem.style.visibility = "visible";
            elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
            elem.classList.add("animate__animated", "animate__bounceInDown");
        });
    });

    // event listener for uncheck all
    document.getElementById("none").addEventListener("click", function(){
        document.querySelectorAll('.form-check-input').forEach(c => {
            c.checked = false;
            const elem = document.getElementById(c.id + 'Img');
            elem.style.visibility = "visible";
            elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
            elem.classList.add("animate__animated", "animate__bounceOutUp");
        });
    });

    // event listener for check/uncheck
    document.getElementById('checkbox-card').addEventListener('change', function(e){
        if (e.target.classList.contains('form-check-input')) {
            document.getElementById(e.target.id + 'Img').style.visibility = e.target.checked ? "visible" : "hidden";
            const elem = document.getElementById(e.target.id + 'Img');
            elem.style.visibility = "visible";
            elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
            e.target.checked ?
                elem.classList.add("animate__animated", "animate__bounceInDown") :
                elem.classList.add("animate__animated", "animate__bounceOutUp");
        }
    });

    // hovering over checkboxes
    document.getElementById("checkbox-card").addEventListener("mouseover", function(e){
        if (e.target.classList.contains('form-check-label')) {
            h1.style.color = e.target.dataset["color"];
        }
    });

    // mouse out of checkboxes
    document.getElementById("checkbox-card").addEventListener("mouseout", function(e){
        if (e.target.classList.contains('form-check-label')) {
            h1.style.color = "#708090";
        }
    });

    // toast for none checked
    document.getElementById("submit").addEventListener("click", function() {
        const boxes = document.querySelectorAll('.form-check-input');
        let n = 0;
        for (i = 0; i < boxes.length; i++){
            n += boxes[i].checked ? 1 : 0;
        }
        if (n === 0) {
            bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
        }
    });
    
});

 