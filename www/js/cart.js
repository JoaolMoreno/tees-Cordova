function cartScreen() {
    fetch('templates/cart.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            const username = localStorage.getItem('username');

            db.getCartItems(username).then(items => {
                const cartItemsDiv = document.getElementById('cartItems');

                if (items.length === 0) {
                    cartItemsDiv.innerHTML = '<ons-list-item>Seu carrinho está vazio.</ons-list-item>';
                    return;
                }

                items.forEach(item => {
                    db.getProduct(item.productId).then(product => {
                        let itemDiv = document.createElement('ons-list-item');
                        itemDiv.className = 'cart-item';
                        itemDiv.innerHTML = `
                            <div class="center">
                                <span class="list-item__title">${product.name}</span>
                                <span class="list-item__subtitle">Qtd: ${item.quantity} | Total: $${(product.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div class="right">
                                <ons-button onclick="updateCartItem(${product.id}, ${item.quantity - 1})">-</ons-button>
                                <ons-button onclick="updateCartItem(${product.id}, ${item.quantity + 1})">+</ons-button>
                                <ons-button onclick="removeCartItem(${product.id})">Remover</ons-button>
                                <ons-button onclick="viewProductFromCart(${product.id})">Detalhes</ons-button>
                            </div>
                        `;
                        cartItemsDiv.appendChild(itemDiv);
                    });
                });
            });
        });
}

function updateCartItem(productId, quantity) {
    const username = localStorage.getItem('username');

    if (quantity <= 0) {
        removeCartItem(productId);
        return;
    }

    db.updateCartItem({ username: username, productId: productId, quantity: quantity }).then(() => {
        cartScreen();
    });
}

function removeCartItem(productId) {
    const username = localStorage.getItem('username');

    db.removeCartItem(username, productId).then(() => {
        cartScreen();
    });
}

function viewProductFromCart(id) {
    location.hash = `#/product?id=${id}&from=cart`;
}
