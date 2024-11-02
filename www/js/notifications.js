document.addEventListener('deviceready', function() {
    cordova.plugins.notification.local.requestPermission(function(granted) {
        console.log('Permissão para notificações:', granted);
    });
}, false);

function notifyItemAdded(productName) {
    cordova.plugins.notification.local.schedule({
        title: 'Item Adicionado ao Carrinho',
        text: `${productName} foi adicionado ao seu carrinho.`,
        foreground: true
    });
}
