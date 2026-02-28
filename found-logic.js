let fStep = 1;
let fData = {};

function fNext(step) {
    document.getElementById(`fstep${fStep}`).classList.remove('active');
    document.getElementById(`fstep${step}`).classList.add('active');
    fStep = step;
}

function fSave(key, val, next) {
    fData[key] = val;
    fNext(next);
}

function fPreview() {
    fData.name = document.getElementById('fItemName').value;
    fData.desc = document.getElementById('fdesc1').value;
    fData.loc = document.getElementById('fLoc').value;
    fData.time = document.getElementById('fTime').value;

    localStorage.setItem('tempFound', JSON.stringify(fData));
    window.location.href = "home.html?foundPreview=active";
}