const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    _readFile() {
        if (!fs.existsSync(this.filePath)) return [];
        const data = fs.readFileSync(this.filePath);
        return JSON.parse(data);
    }

    _writeFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    createCart() {
        const carts = this._readFile();
        const newCart = { id: (carts.length + 1).toString(), products: [] };
        carts.push(newCart);
        this._writeFile(carts);
        return newCart;
    }

    getCartById(id) {
        const carts = this._readFile();
        return carts.find(cart => cart.id === id);
    }

    addProductToCart(cid, pid) {
        const carts = this._readFile();
        const cart = carts.find(cart => cart.id === cid);
        if (!cart) return null;

        const product = cart.products.find(p => p.product === pid);
        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        this._writeFile(carts);
        return cart;
    }
}

module.exports = CartManager;