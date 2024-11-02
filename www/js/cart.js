function cartScreen() {
    fetch('templates/cart.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            db.getCartItems().then(items => {
                const cartItemsDiv = document.getElementById('cartItems');

                if (items.length === 0) {
                    cartItemsDiv.innerHTML = '<ons-list-item>Your cart is empty.</ons-list-item>';
                    return;
                }

                items.forEach(item => {
                    db.getProduct(item.productId).then(product => {
                        let itemDiv = document.createElement('ons-list-item');
                        itemDiv.innerHTML = `
                            <div class="center">
                                <span class="list-item__title">${product.name}</span>
                                <span class="list-item__subtitle">Qty: ${item.quantity} | Total: $${(product.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div class="right">
                                <ons-button onclick="updateCartItem(${product.id}, ${item.quantity - 1})">-</ons-button>
                                <ons-button onclick="updateCartItem(${product.id}, ${item.quantity + 1})">+</ons-button>
                                <ons-button onclick="removeCartItem(${product.id})">Remove</ons-button>
                            </div>
                        `;
                        cartItemsDiv.appendChild(itemDiv);
                    });
                });
            });
        });
}

function updateCartItem(productId, quantity) {
    if (quantity <= 0) {
        removeCartItem(productId);
        return;
    }

    db.updateCartItem({ productId: productId, quantity: quantity }).then(() => {
        cartScreen();
    });
}

function removeCartItem(productId) {
    db.removeCartItem(productId).then(() => {
        cartScreen();
    });
}
