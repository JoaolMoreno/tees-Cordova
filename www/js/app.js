// This file initializes the app and sets up any necessary data.

db.open().then(() => {
    // Preload products if not already in DB
    db.getProducts().then(products => {
        if (products.length === 0) {
            const initialProducts = [
                { id: 1, name: 'Apple', price: 1.00, description: 'Fresh red apples', image: 'img/apple.jpg' },
                { id: 2, name: 'Bread', price: 2.50, description: 'Whole grain bread', image: 'img/bread.jpg' },
                // Add more products as needed
            ];
            db.addProducts(initialProducts);
        }
    });
});
