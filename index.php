<!DOCTYPE html>
<meta charset="utf-8" xmlns="http://www.w3.org/1999/html">
<title>Pronunciation Survey</title>
<style>
  .gone {
    display: none;
  }
</style>
<script src="js/external/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
<?php
  if (array_key_exists('questionIndex',$_POST )) {
    $questionIndex = intval($_POST['questionIndex']) + 1;
  } else {
    $questionIndex = 0;
  }
  $questionsList = [
    'Cómo te llamas?',
    'Mi amiga se llama Rosita.',
    'El hombre es mi amigo.',
    'El hombre no está aquí.',
    'De dónde estás?',
    'Dódnde está la mujer?',
    'Yo tengo veintiocho años hoy.',
    'Hoy es el veintiocho de Mayo.',
    'Quién es el presidente?',
    'De quién es el libro?',
  ];
  $questionCount = count($questionsList);
?>

<?php if (!array_key_exists('userId', $_POST)): ?>

  <div id="container" class="container">

    <form id="emailForm" method="POST" action="<?=$_SERVER['PHP_SELF'];?>">

      <div id="info">
        <h1>Welcome!</h1>
        <p>Thank you for participating in this study. You'll be asked to read ten sample sentences in Spanish as part of a simple pronunciation exercise.  Enter your email address below to get started</p>
      </div>

      <label for="email">Email Address</label>
      <input type="text" name="email" id="email" />
      <input type="hidden" name="userId" id="userId" />
      <input type="hidden" name="testGroup" id="testGroup" />


      <input type="submit" id="submit" class="btn btn-sm btn-success" value="Get started!" />
    </form>
  </div>
  <script>
    testGroup = Math.random() * 2 < 1 ? 'control' : 'test';
    $('#testGroup').val(testGroup);
    $('#emailForm').submit(function (e) {
      email = $('#email').val();
      user = new User(email, testGroup);
      user.save();
      console.log(user);
      console.log(user.id);
      $('#userId').val(user.id);
//      return true;
    });
  </script>
<?php elseif ($questionIndex == $questionCount):?>
    <div id="container" class="container">
        <h1>Survey complete!</h1>
        <p>Thank you very much for your participation!</p>
    </div>

<?php else: ?>
  <?php
    $userId = $_POST['userId'];
    $email = $_POST['email'];
    $testGroup = $_POST['testGroup'];

    if ($testGroup == 'control') {
      $feedbackClass = 'gone';
    } else {
      $feedbackClass = '';
    }
  ?>

  <div id="container" class="container">

    <div id="info">
      <h2></h2>
      <p>Press record and speak the question below</p>
    </div>
    <div class="well">
      <p id="target">
      </p>
    </div>
    
    <p id="message"></p>

    <div class="well <?=$feedbackClass;?>">
      <p id="feedback">
        <i class="small">No audio received yet...</i>
      </p>
    </div>

    <form method="POST" action="<?=$_SERVER['PHP_SELF'];?>">
      <input type="hidden" name="userId" id="userId" value="<?=$userId;?>"/>
      <input type="hidden" name="email" id="email" value="<?=$email;?>"/>
      <input type="hidden" name="testGroup" id="testGroup" value="<?=$testGroup;?>"/>
      <input type="hidden" name="questionIndex" id="questionIndex" value="<?=$questionIndex;?>"/>

      <button id="toggleMic" data-recording="true" class="btn btn-sm btn-primary">
        Begin Recording
      </button>
      <br/>
      <br/>
      <input type="submit" value="Next Question" id="next" disabled class="btn btn-sm btn-default"/>
    </form>
  </div>
<?php endif; ?>

<script src="js/models.js"></script>
<script>
  // Setup
  var lang = 'es-GT';
  var userId = $('#userId').val();
  var email = $('#email').val();
  var testGroup = $('#testGroup').val();
  var questionIndex = $('#questionIndex').val();
  var isCorrect = null;

  user = new User(email, testGroup, userId);

  function handleQuestionComplete() {
    user.attachAnswer(questionIndex, target, isCorrect);
    $('#toggleMic').addClass('btn-primary').removeClass('btn-default');
    $('#toggleMic').attr('disabled','disabled');
    $('#next').removeAttr('disabled');
    $('#next').removeClass('btn-default').addClass('btn-success');
  }

  // activity
  var finalResults = {};
  var finalTranscript = '';
  var target = "<?=$questionsList[$questionIndex];?>";
  var results;
</script>
<script src="js/controllers.js"></script>
