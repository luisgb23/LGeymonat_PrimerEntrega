const fs = require('fs').promises;

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async readFile() {
        try {
            await fs.access(this.filePath);
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') return [];
            throw new Error('Error leyendo el archivo: ' + error.message);
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error('Error escribiendo el archivo: ' + error.message);
        }
    }

    async createCart() {
        try {
            const carts = await this.readFile();
            const newCart = { id: (carts.length + 1).toString(), products: [] };
            carts.push(newCart);
            await this.writeFile(carts);
            return newCart;
        } catch (error) {
            throw new Error('Error creando el carrito: ' + error.message);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.readFile();
            return carts.find(cart => cart.id === id) || null;
        } catch (error) {
            throw new Error('Error obteniendo el carrito: ' + error.message);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const carts = await this.readFile();
            const cart = carts.find(cart => cart.id === cid);
            if (!cart) return null;

            const product = cart.products.find(p => p.product === pid);
            if (product) {
                product.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            await this.writeFile(carts);
            return cart;
        } catch (error) {
            throw new Error('Error agregando producto al carrito: ' + error.message);
        }
    }
}

module.exports = CartManager;