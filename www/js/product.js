function productScreen() {
    fetch('templates/product.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            const params = new URLSearchParams(location.hash.split('?')[1]);
            const productId = parseInt(params.get('id'));

            db.getProduct(productId).then(product => {
                const productDetails = document.getElementById('productDetails');
                productDetails.innerHTML = `
                    <ons-card>
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <ons-button onclick="addToCart(${product.id})">Add to Cart</ons-button>
                    </ons-card>
                `;
            });
        });
}

function addToCart(productId) {
    db.getCartItems().then(items => {
        let item = items.find(i => i.productId === productId);
        if (item) {
            item.quantity += 1;
        } else {
            item = { productId: productId, quantity: 1 };
        }
        db.updateCartItem(item).then(() => {
            alert('Product added to cart!');
        });
    });
}
