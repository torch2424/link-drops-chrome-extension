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

//Error function
function Response(res, successMsg) {

   var message = "";

   //Session is invalid!
   if (res == 401) message = "Your Extension code is invalid, please visit the 'My Account' Page on linkDrops";
   else if(res != 200) message = "Error! Could not connect to linkDrops";
   else message = successMsg;

   // Update status to let user know options were saved.
   // Timeout the div after it is displayed
   var status = document.getElementById('status');
   status.textContent = message;
   setTimeout(function() {
     status.textContent = '';
 }, 3000);
};

//Save the current tab
function saveTab() {

    //Get the current tab url
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function (tab) {
        //Callback, create the payload
        let payload = {
            "token": code,
            "content": tab[0].url
        };

        // construct an HTTP request
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://srv.kondeo.com:3000/dumps", true);

        //Check for responses
        xhttp.onreadystatechange = function() {
            //Send the status to the response function
            Response(xhttp.status, "Dropped!");
        }

        //Send the json
        xhttp.send(payload);
    });
}

//Save all of the tabs
function saveAllTabs() {

    //Get the current tab url
    chrome.tabs.query(
        {currentWindow: true},
    function (tabs) {
        
        //Loop through every tab
        for(let tab in tabs)
        {
            //Callback, create the payload
            let payload = {
                "token": code,
                "content": tab.url
            };

            // construct an HTTP request
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://srv.kondeo.com:3000/dumps", true);

            //check for responses
            xhttp.onreadystatechange = function() {
                //Send the status to the response function
                Response(xhttp.status, "Dropped!");
            }

            //Send the Json!
            xhttp.send(payload);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
