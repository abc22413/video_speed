document.addEventListener('DOMContentLoaded', function() {
    //Presets
    var preset_speeds = [0.50, 1.00, 1.50, 2.00, 3.00, 4.00, 5.00, 16.00];
    //Global variables
    //Retrieve speed
    var speed = 1.00;
    chrome.storage.local.get("speed", function (result) {
        if (chrome.runtime.lastError || result.speed === undefined) {
            //Defualt behavior in failure is to change speed to 1.00
            speed_change(1.00);
        }
        else {
            //Successfully retrieved speed
            speed_change(result.speed);
        }
    })
    //Retrieve background_color
    var background_color = '#87CEEB';
    chrome.storage.local.get('background_color', function (result) {
        if (chrome.runtime.lastError || result.background_color === undefined) {
            //Default behavior in failure is to change background_color to sky blue
            background_color_change('#87CEEB');
        }
        else {
            //Successfully retrieved color
            background_color_change(result.background_color);
        }
    })
    //Display of current speed
    var current_speed = document.getElementById('current-speed');
    //Text input
    var speed_select_button = document.getElementById('speed-select-submit');
    var speed_select_input = document.getElementById('speed-select-input');
    //Slider input
    var speed_select_slider = document.getElementById('speed-select-slider');
    var speed_slider_label = document.getElementById('speed-slider-label');
    //Color input
    var background_color_input = document.getElementById('color-selector');

    //Utility function: Change displays
    function update_display(new_speed) {
        current_speed.innerHTML = `<p>Current Speed: <b>${parseFloat(speed).toFixed(2)}x</b></p>`;
        speed_slider_label.innerHTML = `${parseFloat(speed).toFixed(2)}x`;
        speed_select_slider.value = speed;
    }

    //Utility function: Execute speed change --> Update popup
    function speed_change(new_speed) {
        try {
            //Message content.js to execute speed change
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {"purpose":"coelenterazine_change_video_speed", "new_speed": new_speed}, function(response) {
                    if (response) {
                        if (response.success === true) {
                            speed = new_speed;
                            update_display(new_speed);

                            //Save speed for persistence
                            chrome.storage.local.set({"speed":speed}, function () {
                                if (chrome.runtime.lastError) {
                                }
                                else {
                                }
                            })

                        }
                        else {
                            //alert('Speed change failed');
                        }
                    }
                    else if (chrome.runtime.lastError) {

                    }
                    else {
                        
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    //Utility function: Execute color change
    function background_color_change(new_color) {
        background_color = new_color;
        document.getElementById('body').style.backgroundColor = new_color;
        background_color_input.value = background_color;
        //Save color for persistence
        chrome.storage.local.set({'background_color':background_color}, function () {
            if (chrome.runtime.lastError) {
            }
            else {
            }
        })
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
            //alert('Please input a decimal between 0-16');
        }
        //Input out of range
        else if (extracted_speed<0.00 || extracted_speed>16.00) {
            //alert('Please input a decimal between 0-16');
        }
        //Proper input
        else {
            speed_change(extracted_speed);
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
        speed_change(parseFloat(speed_select_slider.value).toFixed(2));
    }, false);

    //Color input update on selection
    background_color_input.addEventListener('input', function() {
        background_color_change(background_color_input.value);
    }, false);

}, false)