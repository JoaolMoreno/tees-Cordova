class Database {
    constructor() {
        this.dbName = 'MarketAppDB';
        this.dbVersion = 1;
        this.db = null;
    }

    open() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (e) => {
                let db = e.target.result;
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'username' });
                }
                if (!db.objectStoreNames.contains('products')) {
                    db.createObjectStore('products', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('cart')) {
                    db.createObjectStore('cart', { keyPath: 'productId' });
                }
            };

            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };

            request.onerror = (e) => {
                reject(e);
            };
        });
    }

    addUser(user) {
        return this._put('users', user);
    }

    getUser(username) {
        return this._get('users', username);
    }

    addProducts(products) {
        return this._bulkPut('products', products);
    }

    getProducts() {
        return this._getAll('products');
    }

    getProduct(id) {
        return this._get('products', id);
    }

    addToCart(item) {
        return this._put('cart', item);
    }

    getCartItems() {
        return this._getAll('cart');
    }

    updateCartItem(item) {
        return this._put('cart', item);
    }

    removeCartItem(productId) {
        return this._delete('cart', productId);
    }

    // Helper methods
    _put(storeName, data) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([storeName], 'readwrite');
            let store = transaction.objectStore(storeName);
            let request = store.put(data);

            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e);
        });
    }

    _bulkPut(storeName, dataArray) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([storeName], 'readwrite');
            let store = transaction.objectStore(storeName);

            dataArray.forEach(data => {
                store.put(data);
            });

            transaction.oncomplete = () => resolve();
            transaction.onerror = (e) => reject(e);
        });
    }

    _get(storeName, key) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([storeName]);
            let store = transaction.objectStore(storeName);
            let request = store.get(key);

            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e);
        });
    }

    _getAll(storeName) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([storeName]);
            let store = transaction.objectStore(storeName);
            let request = store.getAll();

            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e);
        });
    }

    _delete(storeName, key) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([storeName], 'readwrite');
            let store = transaction.objectStore(storeName);
            let request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e);
        });
    }
}

const db = new Database();
