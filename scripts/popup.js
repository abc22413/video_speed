document.addEventListener('DOMContentLoaded', function() {
    //Global variables
    var speed = 1.00;
    var current_speed = document.getElementById('current-speed');
    //Text input
    var speed_select_button = document.getElementById('speed-select-submit');
    var speed_select_input = document.getElementById('speed-select-input');
    //Presets
    var preset_speeds = [0.50, 1.00, 1.50, 2.00, 3.00, 5.00, 7.00, 16.00];

    //Generate button presets
    innerhtml_inject = "";
    for (let i=0; i<4; i++) {

    }

    //Utility function: Update all displays on speed change
    function update_displays() {
        current_speed.innerHTML = `<p>Current Speed: <b>${speed}x</b></p>`;
    }

    //Enter on text input triggers text input submit
    speed_select_input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          speed_select_button.click();
        }
    })

    //Text Input
    speed_select_button.addEventListener('click', function() {
        //Read, clean and convert speed text input
        text_input = speed_select_input.value;
        speed_select_input.value = '';
        extracted_speed = parseFloat(text_input).toFixed(2);
        //If blank, count as mispress
        if (text_input===''){}
        else{
        //Invalid input
        if (isNaN(extracted_speed)===true) {
            alert('Please input a decimal between 0-16');
        }
        //Input out of range
        else if (extracted_speed<0.00 || extracted_speed>16.00) {
            alert('Please input a decimal between 0-16');
        }
        //Proper input
        else {
            //Internal housekeeping
            speed = extracted_speed;
            update_displays();
            //Post message to alter video speed: popup->background->content

        }
        }
    }, false)

}, false)