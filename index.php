<!DOCTYPE html>
<meta charset="utf-8">
<title>Web Speech API Demo</title>
<style>

</style>

<div id="container">
  
  <div id="info">
    <h2></h2>
  </div>

  <textarea id="target" width="20" height="3" disabled>
  </textarea>


  <textarea id="result" data-recording="false" width="20" height="5" disabled>
    
  </textarea>

  <button id="toggleMic" data-recording="true">
    Begin Recording
  </button>
</div>

<script src="js/external/jquery.min.js"></script>
<script>
  // Setup
  var lang = 'es-GT';

  // activity
  var finalResults = {};
  var finalTranscript = '';
  var target = 'Me llamo juanita';
  var results;
</script>
<script src="js/controllers.js"></script>