function toggleView(pageId) {
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('forgot-page').style.display = 'none';
    document.getElementById(pageId).style.display = 'block';
}

function processSignUp() {
    const data = {
        name: document.getElementById('reg-name').value,
        sid: document.getElementById('reg-sid').value,
        phone: document.getElementById('reg-phone').value,
        email: document.getElementById('reg-email').value,
        pass: document.getElementById('reg-pass').value
    };

    if(!data.name || !data.pass || !data.sid) {
        return alert("Whoops! Please fill out all fields! ✨");
    }

    localStorage.setItem('currentUser', JSON.stringify(data));
    alert("Yay! Account created. Now please log in! 🚀");
    toggleView('login-page');
}

function processLogin() {
    const nameIn = document.getElementById('login-name').value;
    const passIn = document.getElementById('login-pass').value;
    const saved = JSON.parse(localStorage.getItem('currentUser'));

    if (saved && nameIn === saved.name && passIn === saved.pass) {
        alert("Success! Entering the Lost & Found hub... 🌈");
        window.location.href = "home.html"; 
    } else {
        alert("Oh no! Name or Password doesn't match. Try again! 🧐");
    }
}

function processReset() {
    const verify = document.getElementById('reset-verify').value;
    const newPass = document.getElementById('new-password').value;
    let saved = JSON.parse(localStorage.getItem('currentUser'));

    if (saved && (verify === saved.email || verify === saved.phone)) {
        saved.pass = newPass;
        localStorage.setItem('currentUser', JSON.stringify(saved));
        alert("Password updated! Magic! ✨ Now log in.");
        toggleView('login-page');
    } else {
        alert("Sorry! We couldn't find that Email or Phone Number. 🔍");
    }
}