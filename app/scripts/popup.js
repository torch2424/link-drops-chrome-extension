'use strict';

//Declare the code variable
var code;

// Restores the chrome extension code
// stored in chrome.storage.
function restore_options() {

  // Use default value of nothing
  chrome.storage.sync.get({
    extensionCode: ''
  }, function (items) {

    //In this call back, set the code to the retrieved value
    code = items.extensionCode;

    //if we have a code show the stuff
    if (code.length > 0) document.getElementById("sorry").className = "hide";
    //if not, tell them to
    else document.getElementById("buttons").className = "hide";
  });
}

//Restore the options on page load
document.addEventListener('DOMContentLoaded', restore_options);
//# sourceMappingURL=popup.js.map
