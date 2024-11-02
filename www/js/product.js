function productScreen() {
    fetch('templates/product.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            const params = new URLSearchParams(location.hash.split('?')[1]);
            const productId = parseInt(params.get('id'));
            const from = params.get('from') || 'main';

            const username = localStorage.getItem('username');

            db.getProduct(productId).then(product => {
                // Verificar se o produto está no carrinho
                db.getCartItems(username).then(items => {
                    let cartItem = items.find(i => i.productId === productId);
                    let quantity = 1;
                    let buttonText = 'Adicionar ao Carrinho';
                    let showRemoveButton = false;

                    if (cartItem) {
                        quantity = cartItem.quantity;
                        buttonText = 'Modificar';
                        showRemoveButton = true;
                    }

                    const productDetails = document.getElementById('productDetails');
                    productDetails.innerHTML = `
                        <ons-card>
                            <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>Preço: $${product.price.toFixed(2)}</p>
                            <p class="quantity-selector">
                                Quantidade:
                                <ons-button id="decreaseQty">-</ons-button>
                                <span id="quantity">${quantity}</span>
                                <ons-button id="increaseQty">+</ons-button>
                            </p>
                            <div class="button-group">
                                <ons-button id="addToCartBtn">${buttonText}</ons-button>
                                ${showRemoveButton ? '<ons-button id="removeFromCartBtn" modifier="outline">Remover do Carrinho</ons-button>' : ''}
                            </div>
                        </ons-card>
                    `;

                    const quantityDisplay = document.getElementById('quantity');

                    document.getElementById('increaseQty').addEventListener('click', () => {
                        quantity += 1;
                        quantityDisplay.textContent = quantity;
                    });

                    document.getElementById('decreaseQty').addEventListener('click', () => {
                        if (quantity > 1) {
                            quantity -= 1;
                            quantityDisplay.textContent = quantity;
                        }
                    });

                    document.getElementById('addToCartBtn').addEventListener('click', () => {
                        addToCart(product.id, quantity);
                    });

                    if (showRemoveButton) {
                        document.getElementById('removeFromCartBtn').addEventListener('click', () => {
                            removeFromCart(product.id);
                        });
                    }

                    const backButton = document.querySelector('ons-back-button');
                    backButton.onclick = function() {
                        navigateBack();
                    };
                });
            });
        });
}

function addToCart(productId, quantity) {
    const username = localStorage.getItem('username');

    db.updateCartItem({ username: username, productId: productId, quantity: quantity }).then(() => {
        ons.notification.toast('Carrinho atualizado!', { timeout: 2000 });
        // Redirecionar para a tela anterior
        navigateBack();
    });
}


function removeFromCart(productId) {
    const username = localStorage.getItem('username');

    db.removeCartItem(username, productId).then(() => {
        ons.notification.toast('Produto removido do carrinho!', { timeout: 2000 });
        // Redirecionar para a tela anterior
        navigateBack();
    });
}

function navigateBack() {
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const from = params.get('from') || 'main';

    if (from === 'main') {
        location.hash = '#/main';
    } else if (from === 'cart') {
        location.hash = '#/cart';
    } else {
        location.hash = '#/main'; // Padrão
    }
}
