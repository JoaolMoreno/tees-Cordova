function mainScreen() {
    fetch('templates/main.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            db.getProducts().then(products => {
                const productList = document.getElementById('productList');
                products.forEach(product => {
                    let productItem = document.createElement('ons-list-item');
                    productItem.setAttribute('tappable', '');
                    productItem.innerHTML = `
                        <div class="left">
                            <img src="${product.image}" alt="${product.name}" style="width: 50px;">
                        </div>
                        <div class="center">
                            <span class="list-item__title">${product.name}</span>
                            <span class="list-item__subtitle">$${product.price.toFixed(2)}</span>
                        </div>
                        <div class="right">
                            <ons-button onclick="viewProduct(${product.id})">Details</ons-button>
                        </div>
                    `;
                    productList.appendChild(productItem);
                });
            });
        });
}

function viewProduct(id) {
    location.hash = '#/product?id=' + id;
}
