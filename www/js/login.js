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

                        // Adiciona uma vibração suave após o login
                        navigator.vibrate(100); // Vibra por 100ms

                        location.hash = '#/main';
                    });
                } else {
                    ons.notification.alert('Por favor, insira um nome de usuário.');
                }
            });
        });
}
