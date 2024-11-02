function loginScreen() {
    fetch('templates/login.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            document.getElementById('loginBtn').addEventListener('click', () => {
                const username = document.getElementById('username').value.trim();
                if (username) {
                    db.addUser({ username: username }).then(() => {
                        localStorage.setItem('username', username);
                        location.hash = '#/main';
                    });
                } else {
                    alert('Please enter a username.');
                }
            });
        });
}
