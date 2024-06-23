document.getElementById('registrationForm').onsubmit = function (event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var sem = document.getElementById('semid').value;
    var duration = document.getElementById('durationid').value;


    if (name === '') {
        alert('Please enter your name.');
        event.preventDefault();
    }

    if (email === '') {
        alert('Please enter your email.');
        event.preventDefault();
    }

    if (sem === '') {
        alert('Please enter your semester.');
        event.preventDefault();
    }

    if (duration === '') {
        alert('Please enter your duration.');
        event.preventDefault();
    }


    if(sem > 7){
        alert('Semester should be less than 8');
        event.preventDefault();
    }

    if (duration > 6){
        alert('We dont provide internships longer than 6 Months');
        event.preventDefault();
    }
}




