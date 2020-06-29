function validation() {
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("password-confirm").value;
    var message = document.getElementById("password-match-message");
    if (password == passwordConfirm) {
        message.innerHTML = "Passwords match";
        message.style.color = "green";
        document.getElementById("create-account").disabled = false;
    } else {
        message.innerHTML = "Passwords do not match";
        message.style.color = "red";
        document.getElementById("create-account").disabled = true;
    }
    
}