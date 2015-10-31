'use strict';

//Declare the code variable
var code;

// Restores the chrome extension code
// stored in chrome.storage.
//Also bind our clicks and things
function init() {

  // Use default value of nothing
  chrome.storage.sync.get({
    extensionCode: ''
  }, function(items) {

    //In this call back, set the code to the retrieved value
    code =  items.extensionCode;

    //if we have a code show the stuff
    if(code.length > 0)
    {
        document.getElementById("sorry").className = "hide";

        //bind our button clicks
        document.getElementById('saveTab').addEventListener('click', saveTab);
        document.getElementById('saveAllTabs').addEventListener('click', saveAllTabs);
    }
    //if not, tell them to
    else document.getElementById("buttons").className = "hide";

  });

}

//Save the current tab
function saveTab() {

    //Get the current tab url
    chrome.tabs.getCurrent(function (tab) {
        //Callback, create the payload
        


        xhttp.open("GET", "ajax_info.txt", true);
        xhttp.send();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
