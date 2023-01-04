document.addEventListener('DOMContentLoaded', function() {
    var speed = 1.0;
    var speed_select_button = document.getElementById('speed-select-submit');
    var speed_select_input = document.getElementById('speed-select-input');
    var current_speed = document.getElementById('current-speed');

    speed_select_button.addEventListener('click', function() {
        //Read, clean and convert speed text input
        text_input = speed_select_input.value;
        extracted_speed = parseFloat(text_input).toFixed(2);
        //Invalid input
        if (isNaN(extracted_speed)===true) {
            alert('Please input a decimal between 0-16');
            speed_select_input.value = '1.00';
        }
        //Input out of range
        else if (extracted_speed<0.00 || extracted_speed>16.00) {
            alert('Please input a decimal between 0-16');
            speed_select_input.value = '1.00';
        }
        //Proper input
        else {
            speed = extracted_speed;
            current_speed.innerHTML = `<p>Current Speed: <b>${speed}</b></p>`;
        }
    }, false);

}, false);