'use strict';

// Saves options to chrome.storage
function saveCode() {
    //Get the code value
    var code = document.getElementById('code').value;
    //Set the code in the options
    chrome.storage.sync.set({
      extensionCode: code
    }, function() {

      // Update status to let user know options were saved.
      //Timeout the div after it is displayed
      var status = document.getElementById('status');
      status.textContent = 'Code saved!';
      setTimeout(function() {
        status.textContent = '';
    }, 2000);
    });
}

// Restores the chrome extension code
// stored in chrome.storage.
function restore_options() {
  //First set the onclick listener to the save button
  var save = document.getElementById('saveButton');

  // onClick's logic below:
  save.addEventListener('click', saveCode);

  // Use default value of nothing
  chrome.storage.sync.get({
    extensionCode: ''
  }, function(items) {
      //In this call back, set the code to the retrieved value
    document.getElementById('code').value = items.extensionCode;
  });
}

//Restore the options on page load
document.addEventListener('DOMContentLoaded', restore_options);
