var db = new Firebase("https://stutter.firebaseio.com/");


function Answer(user, index, questionText, isCorrect) {
    this.id = null;
    this.userId = user.id;
    this.index = index;
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

function User(email, testGroup, id) {
    this.id = id == undefined ? null : id;
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
    attachAnswer: function(index, questionText, isCorrect) {
        answer = new Answer(this, index, questionText, isCorrect);
        answer.save();
        this.answers.push(answer);
    }
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
