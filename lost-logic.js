let step = 1;
let data = {};

function nextL(s) {
    document.getElementById(`lcard${step}`).classList.remove('active');
    document.getElementById(`lcard${s}`).classList.add('active');
    step = s;
}

function saveL(key, val, next) {
    data[key] = val;
    nextL(next);
}

function finishL() {
    data.name = document.getElementById('lName').value;
    data.desc = document.getElementById('lDesc').value;
    data.loc = document.getElementById('lLoc').value;
    data.time = document.getElementById('lTime').value;

    localStorage.setItem('tempPost', JSON.stringify(data));
    window.location.href = "home.html?preview=active"; //
}