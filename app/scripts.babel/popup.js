'use strict';

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

  //if we have a code show the stuff

  //if not, tell them to 
}

//Restore the options on page load
document.addEventListener('DOMContentLoaded', restore_options);
