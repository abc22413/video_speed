//Handle messaging with popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request) {
        if (request.purpose === "coelenterazine_change_video_speed") {
            try {
                new_speed = request.new_speed;

                //Panopto window
                if (document.getElementById('panoptoLogoTemplate') !== null) {
                    document.getElementById('playButton').click();
                    document.getElementsByTagName('video')[0].playbackRate = new_speed;
                    document.getElementsByTagName('video')[1].playbackRate = new_speed;
                    document.getElementById('playButton').click();
                    sendResponse({"success": true});
                }

                //HTML5 video
                else if (document.querySelector('video') !== null || document.getElementById('instructure_ajax_error_box') !== null) {
                    document.querySelector('video').playbackRate = new_speed;
                    sendResponse({"success": true});
                    return;
                }
            }
            catch (err) {
                console.log(err);
                sendResponse({"success": true});
            }
        }
    }
})