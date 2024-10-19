// index.js

// Configuração de Rotas
const routes = {
    home: 'html/home.html',
    detalhes: 'html/detalhes.html',
    carrinho: 'html/carrinho.html',
};

// Função para carregar páginas dinamicamente
function loadPage(page) {
    const content = document.getElementById('content');
    fetch(routes[page])
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;

            if (page === 'home') {
                atualizarListaProdutos();

                // Evento para o botão "Ver Carrinho"
                const bttVerCarrinho = document.getElementById('btt-ver-carrinho');
                if (bttVerCarrinho) {
                    bttVerCarrinho.addEventListener('click', function() {
                        loadPage('carrinho');
                    });
                }
            } else if (page === 'carrinho') {
                atualizarCarrinho();

                // Evento para o botão "Finalizar Compra"
                const finalizarCompraBtn = document.getElementById('finalizar-compra');
                if (finalizarCompraBtn) {
                    finalizarCompraBtn.addEventListener('click', function() {
                        finalizarCompra();
                    });
                }
            }
        })
        .catch(err => console.warn('Erro ao carregar página: ', err));
}

// Função para inicializar a aplicação
function initializeApp() {
    // Inicializar o IndexedDB ao carregar a aplicação
    initDB();

    // Carregar a página inicial (redireciona para 'home')
    loadPage('home');

    // Gerenciador de eventos para mudanças no hash da URL (rotas)
    window.addEventListener('hashchange', () => {
        const page = location.hash.slice(1) || 'home';
        loadPage(page);
    });
}

// Verifica se o Cordova está disponível
if (window.cordova) {
    document.addEventListener('deviceready', function () {
        initializeApp();
    }, false);
} else {
    // Se Cordova não estiver disponível, inicia após o carregamento do DOM
    document.addEventListener('DOMContentLoaded', function () {
        initializeApp();
    });
}
