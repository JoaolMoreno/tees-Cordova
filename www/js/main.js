function mainScreen() {
    fetch('templates/main.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;

            const username = localStorage.getItem('username') || 'Convidado';

            db.getProducts().then(products => {
                const productList = document.getElementById('productList');
                products.forEach(product => {
                    let productItem = document.createElement('ons-list-item');
                    productItem.className = 'product-item';
                    productItem.setAttribute('tappable', '');
                    productItem.innerHTML = `
                        <div class="left">
                            <img src="${product.image}" alt="${product.name}" style="width: 50px;">
                        </div>
                        <div class="center">
                            <span class="list-item__title">${product.name}</span>
                            <span class="list-item__subtitle">R$${product.price.toFixed(2)}</span>
                        </div>
                        <div class="right">
                            <ons-button onclick="viewProduct(${product.id})">Detalhes</ons-button>
                        </div>
                    `;
                    productList.appendChild(productItem);
                });
            });
        });
}

function logout() {
    ons.notification.confirm('Deseja sair?').then(function(response) {
        if (response === 1) {
            localStorage.removeItem('username');
            location.hash = '#/';
            router();
        }
    });
}


function viewProduct(id) {
    location.hash = `#/product?id=${id}&from=main`;
}
