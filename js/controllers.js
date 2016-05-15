// speech recognition
var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
    recognizing = true;
    updateInfo(RECORDING_INFO);
};

recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
        updateInfo(ERROR_NO_SPEECH_INFO);
    }
    if (event.error == 'audio-capture') {
        updateInfo(ERROR_NO_MIC_INFO);
        ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
            updateInfo(ERROR_BLOCKED_INFO);
        } else {
            updateInfo(ERROR_BLOCKED_INFO);
        }
        ignore_onend = true;
    }
};

function evaluate() {
    if (finalTranscript.toLowerCase() == target.toLowerCase()) {
        alert('Correct!');
    } else {
        alert('Incorrect!\nWe heard "' + finalTranscript + '"');
    }
}
recognition.onend = function() {
    console.log('this thing')
    recognizing = false;
    if (ignore_onend) {
        return;
    }
    if (!finalTranscript) {
        console.log('in here!')
        updateInfo(INITIAL_INFO);
        finalTranscript = finalResults[0][0].transcript;
        console.log(finalTranscript);
        pushTranscript(finalTranscript);
        evaluate();
        return;
    }
};

recognition.onresult = function(event) {
    console.log('Got a result!')
    var transcript = []
    for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal && !(i in finalResults)) {
            finalResults[i] = event.results[i];
        }
    }
}


// UX handling
function clickHandler(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    finalTranscript = '';
    recognition.lang = lang;
    recognition.start();
    ignore_onend = false;
    // start_timestamp = event.timeStamp;
}


// Info messages
INITIAL_INFO = 'Press \'record\' to begin';
RECORDING_INFO = 'Recording...';
FINAL_INFO = 'Recording complete';
ERROR_NO_SPEECH_INFO = 'ERROR: No speech was detected';
ERROR_NO_MIC_INFO = 'ERROR: NO microphone detected';
ERROR_BLOCKED_INFO = 'ERROR: Microphone was blocked';

function pushTranscript(content) {
    $('#content').html(formatContent(content));
}

function updateInfo(info) {
    $('#info h2').html(info)
}

function formatContent(content) {
    // return '<p>' + content.split('\n').join('</p><p>') + '</p>'
    return content;
}

$(function() {
    $('#target').html(formatContent(target));
    updateInfo(INITIAL_INFO);

    $('#toggleMic').on('click', clickHandler)
})