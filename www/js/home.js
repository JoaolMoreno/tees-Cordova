// home.js

// Evento para carregar a lista de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarListaProdutos();
});

// Função para atualizar a lista de produtos
function atualizarListaProdutos() {
    const transaction = db.transaction(['produtos'], 'readonly');
    const store = transaction.objectStore('produtos');
    const request = store.getAll();

    request.onsuccess = function(event) {
        const produtos = event.target.result;
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = ''; // Limpa a lista

        produtos.forEach(produto => {
            const li = document.createElement('li');
            const infoProduto = document.createElement('div');
            infoProduto.innerHTML = `<strong>${produto.nome}</strong><br>Preço: R$ ${produto.preco.toFixed(2)}`;
            const botaoAdicionar = document.createElement('button');
            botaoAdicionar.textContent = 'Adicionar ao Carrinho';
            botaoAdicionar.onclick = function() {
                adicionarAoCarrinho(produto.id);
            };

            li.appendChild(infoProduto);
            li.appendChild(botaoAdicionar);
            listaProdutos.appendChild(li);
        });
    };
}

// Evento para abrir o modal do carrinho
document.getElementById('btt-ver-carrinho').addEventListener('click', function() {
    atualizarCarrinho();
    document.getElementById('modal-carrinho').style.display = 'block';
});

// Evento para fechar o modal do carrinho
document.getElementById('fechar-carrinho').addEventListener('click', function() {
    document.getElementById('modal-carrinho').style.display = 'none';
});

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const transaction = db.transaction(['carrinho', 'produtos'], 'readonly');
    const carrinhoStore = transaction.objectStore('carrinho');
    const produtosStore = transaction.objectStore('produtos');
    const request = carrinhoStore.getAll();

    request.onsuccess = function(event) {
        const itensCarrinho = event.target.result;
        const listaCarrinho = document.getElementById('lista-carrinho');
        listaCarrinho.innerHTML = ''; // Limpa a lista
        let total = 0;

        if (itensCarrinho.length === 0) {
            listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
        } else {
            itensCarrinho.forEach(item => {
                const produtoRequest = produtosStore.get(item.produtoId);

                produtoRequest.onsuccess = function(event) {
                    const produto = event.target.result;
                    const li = document.createElement('li');
                    li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
                    listaCarrinho.appendChild(li);
                    total += produto.preco;
                    document.getElementById('total-carrinho').textContent = `Total: R$ ${total.toFixed(2)}`;
                };
            });
        }
    };
}

// Evento para finalizar a compra
document.getElementById('finalizar-compra').addEventListener('click', function() {
    const transaction = db.transaction(['carrinho'], 'readwrite');
    const carrinhoStore = transaction.objectStore('carrinho');
    const clearRequest = carrinhoStore.clear();

    clearRequest.onsuccess = function() {
        document.getElementById('modal-carrinho').style.display = 'none';
        alert('Compra finalizada com sucesso!');
    };
});

// Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal-carrinho');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
