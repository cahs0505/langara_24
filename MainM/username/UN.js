function submitUsername() {
    const username = document.getElementById("username").value;
    if (username) {
        
        window.location.href = "../WelcomePage/welcome.html";
    } else {
        alert("Please enter a username.");
    }
}
