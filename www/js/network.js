document.addEventListener('deviceready', function() {
    function updateNetworkStatus() {
        var networkState = navigator.connection.type;
        if (networkState === 'none') {
            ons.notification.alert('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
        }
    }

    document.addEventListener('offline', updateNetworkStatus, false);
    document.addEventListener('online', updateNetworkStatus, false);

    // Verifica o status inicial
    updateNetworkStatus();
}, false);
