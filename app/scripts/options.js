'use strict';

//Error function
function Response(res, successMsg) {

    var message = "";

    //Session is invalid!
    if (res == 401) message = "Your Extension code is invalid, please visit the 'My Account' Page on linkDrops";else if (res < 200 || res > 299) message = "Error " + res + "! Could not connect to linkDrops";else {
        //Set the message to be displayed
        message = successMsg;

        //Get the email value
        var email = document.getElementById('email').value;
    }

    // Update status to let user know options were saved.
    // Timeout the div after it is displayed
    var status = document.getElementById('status');
    status.textContent = message;
    setTimeout(function () {
        status.textContent = '';
    }, 3000);

    //set the disabled to the save button
    var save = document.getElementById('saveButton').disabled = false;
};

// Saves options to chrome.storage
function loginExtension() {

    //First set the disabled to the save button
    var save = document.getElementById('saveButton').disabled = true;

    //Get the email value
    var email = document.getElementById('email').value;

    //Get the password value
    var password = document.getElementById('password').value;

    //Callback, create the payload
    var payload = {
        "username": email,
        "password": password
    };

    // construct an HTTP request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://srv.kondeo.com:3000/users/login", true);

    //Set the post type
    xhttp.setRequestHeader('Content-Type', 'application/json');

    //Check for responses
    xhttp.onreadystatechange = function () {

        //Send the status to the response function
        Response(xhttp.status, "Logged In! You can now use the extension!");

        if (xhttp.readyState == 4 && (xhttp.status > 199 || xhttp.status < 300)) {

            //Get the json resonse
            var data = JSON.parse(xhttp.responseText);

            //Save their info
            chrome.storage.sync.set({
                extensionCode: data.token,
                email: email
            });
        }
    };

    //Send the json
    xhttp.send(JSON.stringify(payload));
}

// Restores the chrome extension code
// stored in chrome.storage.
function restore_options() {

    //First set the onclick listener to the save button
    var save = document.getElementById('saveButton');

    // onClick's logic below:
    save.addEventListener('click', loginExtension);

    // Use default value of nothing
    chrome.storage.sync.get({
        email: ''
    }, function (items) {

        //In this call back, set the code to the retrieved value
        document.getElementById('email').value = items.email;
    });
}

//Restore the options on page load
document.addEventListener('DOMContentLoaded', restore_options);
//# sourceMappingURL=options.js.map
