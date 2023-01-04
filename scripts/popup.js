document.addEventListener('DOMContentLoaded', function() {
    //Presets
    var preset_speeds = [0.50, 1.00, 1.50, 2.00, 3.00, 5.00, 7.00, 16.00];
    //Global variables
    var speed = 1.00;
    var current_speed = document.getElementById('current-speed');
    //Text input
    var speed_select_button = document.getElementById('speed-select-submit');
    var speed_select_input = document.getElementById('speed-select-input');
    //Slider input
    var speed_select_slider = document.getElementById('speed-select-slider');
    var speed_slider_label = document.getElementById('speed-slider-label');

    //Utility function: Update speed --> Change Display and Execute speed change
    function speed_change(new_speed, by_slider=false) {
        try {
            //Execute speed change


            //Change speed global variable
            speed = parseFloat(new_speed).toFixed(2)
            //Change Displays
            current_speed.innerHTML = `<p>Current Speed: <b>${parseFloat(speed).toFixed(2)}x</b></p>`;
            speed_slider_label.innerHTML = `${parseFloat(speed).toFixed(2)}x`;
            if (by_slider === false) {
                speed_select_slider.value = speed;
            }
        }
        catch {
            alert("Speed change was unsuccessful");
        }
    }

    //Enter on text input triggers text input submit
    speed_select_input.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          speed_select_button.click();
        }
    }, false);
    //Text Input
    speed_select_button.addEventListener('click', function() {
        //Read, clean and convert speed text input
        text_input = speed_select_input.value
        extracted_speed = parseFloat(text_input).toFixed(2);
        speed_select_input.value = '';
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
            speed_change(extracted_speed);
            //Post message to alter video speed: popup->background->content

        }
        }
    }, false);

    //Generate button presets
    var innerhtml_inject_1 = "";
    var innerhtml_inject_2 = "";
    for (let i=0; i<Math.ceil(preset_speeds.length/2); i++) {
        innerhtml_inject_1 += `<button id='preset-btn-${i}' class='preset-btn'>${preset_speeds[i].toFixed(1)}x</button>`;
    }
    for (let i=Math.ceil(preset_speeds.length/2); i<preset_speeds.length; i++) {
        let rounding_precision = 1
        //Accomodate 10+
        if (preset_speeds[i] > 10) {
            rounding_precision = 0
        }
        innerhtml_inject_2 += `<button id='preset-btn-${i}' class='preset-btn'>${preset_speeds[i].toFixed(rounding_precision)}x</button>`;
    }
    document.getElementById('preset-1').innerHTML = innerhtml_inject_1;
    document.getElementById('preset-2').innerHTML = innerhtml_inject_2;
    //Change speed on button preset clicked
    for (let i=0;i<preset_speeds.length;i++) {
        document.getElementById(`preset-btn-${i}`).addEventListener('click', function(){speed_change(preset_speeds[i]);});
    }

    //Slider update display on movement
    speed_select_slider.addEventListener('input', function() {
        speed_change(speed_select_slider.value, true);
    }, false);

}, false)