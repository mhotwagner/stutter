var db = new Firebase("https://stutter-dev.firebaseio.com/");


function Answer(user, questionText, isCorrect) {
    this.id = null;
    this.userId = user.id;
    this.questionText = questionText;
    this.isCorrect = isCorrect;
    this.fields = ['questionText', 'isCorrect'];
};

Answer.prototype = {
    table: function() {
        return db.child('users/' + this.userId + '/answers');
    },
    save: function () {
        dbSave(this);
    }

};

function User(email, testGroup) {
    this.id = null;
    this.email = email;
    this.testGroup = testGroup;
    this.answers = [];
    this.fields = ['email', 'testGroup'];
}
User.prototype = {
    table: function() {
        return db.child('users');
    },
    save: function() {
        dbSave(this);
    },
    attachAnswer: function(questionText, isCorrect) {
        answer = new Answer(this, questionText, isCorrect);
        answer.save();
        this.answers.push(answer);
    }
};

function Response(user) {
    this.id = null;
    this.user = user;
    this.answers = [];


}
Response.prototype = {
    table: 'response'
};


function dbSave(obj) {
    if (obj.id == null) {
        dbPush(obj);
    } else {
        dbUpdate(obj);
    }
}

function dbPush(obj) {
    console.log('Saving!')
    var data = {};
    for (var key in obj.fields) {
        data[obj.fields[key]] = obj[obj.fields[key]];
    }
    console.log(data);
    obj.id = obj.table().push(data).key();
}
function dbUpdate(obj) {
    console.log('Udating!');
    var dbKey = this.id;
    var data = {};
    data[dbKey] = {};
    for (var key in obj.fields) {
        data[dbKey][obj.fields[key]] = obj[obj.fields[key]];
    }
    this.table().update(data);
}

function isInArray(needle, haystack) {
    return haystack.indexOf(needle) != -1;
}
