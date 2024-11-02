const routes = {
    '/': loginScreen,
    '/main': mainScreen,
    '/cart': cartScreen,
    '/product': productScreen
};

function router() {
    let url = location.hash.slice(1) || '/';
    let route = routes[url.split('?')[0]];

    if (route) {
        route();
    } else {
        // 404 or redirect to login
        loginScreen();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    db.open().then(() => {
        router();
    });
});
