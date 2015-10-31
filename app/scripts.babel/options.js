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
      }, 750);
    });
}

// Restores the chrome extension code
// stored in chrome.storage.
function restore_options() {

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
