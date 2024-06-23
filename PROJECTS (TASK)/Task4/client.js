document.getElementById('registrationForm').onsubmit = function (event) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var btn = document.getElementById('btn');


    function redalert() {

        btn.style.backgroundColor = 'red';
        return;
    }

    if (email === '') {
        alert('Please enter your email.');
        event.preventDefault();
        return;
    }

    if (!password.match(/[a-zA-Z]/) || !password.match(/[0-9]/)) {
        btn.style.backgroundColor = 'red';
        setTimeout(function () {
            btn.style.backgroundColor = "#0056b3";
        }, 3000);
        event.preventDefault();
        alert('Password must contain both letters and numbers.');


    }

};
