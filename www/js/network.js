document.addEventListener('deviceready', function() {
    function updateNetworkStatus() {
        if (navigator.connection.type === Connection.NONE) {
            ons.notification.alert('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
        } else {
            // Opcional: Notificar que a conexão foi restabelecida
        }
    }

    document.addEventListener('offline', updateNetworkStatus, false);
    document.addEventListener('online', updateNetworkStatus, false);

    // Verifica o status inicial
    updateNetworkStatus();
}, false);
