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
    }, function (items) {

        //In this call back, set the code to the retrieved value
        code = items.extensionCode;

        //if we have a code show the stuff
        if (code.length > 0) {
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
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
        //Callback, create the payload
        var payload = {
            "extensionCode": code,
            "url": tab[0].url
        };

        // construct an HTTP request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://srv.kondeo.com:3000/dumps", true);

        xhttp.send(payload, function () {
            // Update status to let user know options were saved.
            //Timeout the div after it is displayed
            var status = document.getElementById('status');
            status.textContent = 'Dropped!';
            setTimeout(function () {
                status.textContent = '';
            }, 2000);
        });
    },
    //Error Checking
    function (err) {

        //Redirect to the error function
        Error(err);
    });
}

//Save all of the tabs
function saveAllTabs() {

    //Get the current tab url
    chrome.tabs.query({ currentWindow: true }, function (tabs) {

        console.log(tabs);
        //Loop through every tab

        var _loop = function (tab) {
            //Callback, create the payload
            var payload = {
                "extensionCode": code,
                "url": tab.url
            };

            // construct an HTTP request
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://srv.kondeo.com:3000/dumps", true);

            xhttp.send(payload, function () {
                //Dropped all tabs should be displayed once
                if (tab.index = tabs[tabs.length - 1].index) {
                    // Update status to let user know options were saved.
                    // Timeout the div after it is displayed
                    var status = document.getElementById('status');
                    status.textContent = 'Dropped All Tabs!';
                    setTimeout(function () {
                        status.textContent = '';
                    }, 2000);
                }
            });
        };

        for (var tab in tabs) {
            _loop(tab);
        }
    },
    //Error Checking
    function (err) {
        //Redirect to the error function
        Error(err);
    });
}

//Error function
function Error(err) {

    var message = "";

    //Session is invalid!
    if (err.status == 401) message = "Your Extension code is invalid, please visit the 'My Account' Page on linkDrops";else message = "Error! Could not connect to linkDrops";

    // Update status to let user know options were saved.
    // Timeout the div after it is displayed
    var status = document.getElementById('status');
    status.textContent = 'Dropped All Tabs!';
    setTimeout(function () {
        status.textContent = '';
    }, 3000);
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
//# sourceMappingURL=popup.js.map
