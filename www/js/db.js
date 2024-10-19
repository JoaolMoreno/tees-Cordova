// db.js

// Variável global para o banco de dados
let db = null;

// Função para inicializar IndexedDB
function initDB() {
    const request = indexedDB.open('mercadoDB', 1);

    request.onerror = function(event) {
        console.log('Erro ao abrir o banco de dados: ', event);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log('Banco de dados aberto com sucesso!');
        verificarProdutosPadrao();
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        if (!db.objectStoreNames.contains('produtos')) {
            const produtosStore = db.createObjectStore('produtos', { keyPath: 'id', autoIncrement: true });
            produtosStore.createIndex('nome', 'nome', { unique: false });
        }

        if (!db.objectStoreNames.contains('carrinho')) {
            const carrinhoStore = db.createObjectStore('carrinho', { keyPath: 'id', autoIncrement: true });
            carrinhoStore.createIndex('produtoId', 'produtoId', { unique: false });
        }

        console.log('Estrutura do banco de dados criada.');
    };
}

// Função para verificar e inserir produtos padrão
function verificarProdutosPadrao() {
    const transaction = db.transaction(['produtos'], 'readonly');
    const store = transaction.objectStore('produtos');
    const countRequest = store.count();

    countRequest.onsuccess = function() {
        if (countRequest.result === 0) {
            // Nenhum produto encontrado, inserir produtos padrão
            inserirProdutosPadrao();
        } else {
            atualizarListaProdutos();
        }
    };
}

// Função para inserir produtos padrão
function inserirProdutosPadrao() {
    const produtosPadrao = [
        { nome: 'Arroz 5kg', preco: 20.00 },
        { nome: 'Feijão 1kg', preco: 7.50 },
        { nome: 'Macarrão 500g', preco: 4.00 },
        { nome: 'Açúcar 1kg', preco: 3.50 },
        { nome: 'Óleo de Soja 900ml', preco: 6.00 },
        // Adicione mais produtos se desejar
    ];

    const transaction = db.transaction(['produtos'], 'readwrite');
    const store = transaction.objectStore('produtos');

    produtosPadrao.forEach(produto => {
        store.add(produto);
    });

    transaction.oncomplete = function() {
        console.log('Produtos padrão inseridos com sucesso.');
        atualizarListaProdutos();
    };

    transaction.onerror = function(event) {
        console.log('Erro ao inserir produtos padrão: ', event);
    };
}

// Função para adicionar produto ao banco de dados
function adicionarProduto(produto) {
    const transaction = db.transaction(['produtos'], 'readwrite');
    const store = transaction.objectStore('produtos');
    store.add(produto);

    transaction.oncomplete = function() {
        console.log('Produto adicionado com sucesso.');
        atualizarListaProdutos();
    };

    transaction.onerror = function(event) {
        console.log('Erro ao adicionar produto: ', event);
    };
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(produtoId) {
    const transaction = db.transaction(['carrinho'], 'readwrite');
    const store = transaction.objectStore('carrinho');
    store.add({ produtoId: produtoId });

    transaction.oncomplete = function() {
        console.log('Produto adicionado ao carrinho.');
        atualizarCarrinho();
    };

    transaction.onerror = function(event) {
        console.log('Erro ao adicionar produto ao carrinho: ', event);
    };
}

// Função para atualizar lista de produtos
function atualizarListaProdutos() {
    const transaction = db.transaction(['produtos'], 'readonly');
    const store = transaction.objectStore('produtos');
    const request = store.getAll();

    request.onsuccess = function(event) {
        const produtos = event.target.result;
        const listaProdutos = document.getElementById('lista-produtos');
        if (listaProdutos) {
            listaProdutos.innerHTML = '';

            produtos.forEach(produto => {
                const card = document.createElement("div");
                card.className = "produto-card";

                const titulo = document.createElement("h2");
                titulo.textContent = produto.nome;

                const preco = document.createElement("p");
                preco.textContent = "Preço: R$ " + produto.preco.toFixed(2);

                const button = document.createElement("button");
                button.textContent = "Adicionar ao Carrinho";
                button.onclick = function() {
                    adicionarAoCarrinho(produto.id);
                };

                card.appendChild(titulo);
                card.appendChild(preco);
                card.appendChild(button);

                listaProdutos.appendChild(card);
            });
        }
    };
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const transaction = db.transaction(['carrinho', 'produtos'], 'readonly');
    const carrinhoStore = transaction.objectStore('carrinho');
    const produtosStore = transaction.objectStore('produtos');
    const request = carrinhoStore.getAll();

    request.onsuccess = function(event) {
        const itensCarrinho = event.target.result;
        const listaCarrinho = document.getElementById('lista-carrinho');
        const totalCarrinho = document.getElementById('total-carrinho');

        if (listaCarrinho && totalCarrinho) {
            listaCarrinho.innerHTML = '';
            let total = 0;

            if (itensCarrinho.length === 0) {
                listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
                totalCarrinho.textContent = 'Total: R$ 0,00';
            } else {
                let itensProcessados = 0;
                itensCarrinho.forEach(item => {
                    const produtoRequest = produtosStore.get(item.produtoId);

                    produtoRequest.onsuccess = function(event) {
                        const produto = event.target.result;
                        const listItem = document.createElement("li");
                        listItem.textContent = produto.nome + " - R$ " + produto.preco.toFixed(2);
                        listaCarrinho.appendChild(listItem);
                        total += produto.preco;
                        itensProcessados++;

                        if (itensProcessados === itensCarrinho.length) {
                            totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2);
                        }
                    };
                });
            }
        }
    };
}

// Função para finalizar a compra
function finalizarCompra() {
    const transaction = db.transaction(['carrinho'], 'readwrite');
    const carrinhoStore = transaction.objectStore('carrinho');
    const clearRequest = carrinhoStore.clear();

    clearRequest.onsuccess = function() {
        alert('Compra finalizada com sucesso!');
        loadPage('home');
    };

    clearRequest.onerror = function(event) {
        console.log('Erro ao finalizar a compra: ', event);
    };
}
