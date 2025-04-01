const fs = require('fs').promises;

class ProductManager {
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

    async getAllProducts() {
        try {
            return await this.readFile();
        } catch (error) {
            throw new Error('Error obteniendo los productos: ' + error.message);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.readFile();
            return products.find(product => product.id === id) || null;
        } catch (error) {
            throw new Error('Error obteniendo el producto: ' + error.message);
        }
    }

    async addProduct(productData) {
        try {
            const products = await this.readFile();
            const newProduct = { id: (products.length + 1).toString(), ...productData };
            products.push(newProduct);
            await this.writeFile(products);
            return newProduct;
        } catch (error) {
            throw new Error('Error agregando el producto: ' + error.message);
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const products = await this.readFile();
            const index = products.findIndex(product => product.id === id);
            if (index === -1) return null;
            products[index] = { ...products[index], ...updatedData, id };
            await this.writeFile(products);
            return products[index];
        } catch (error) {
            throw new Error('Error actualizando el producto: ' + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.readFile();
            const newProducts = products.filter(product => product.id !== id);
            if (products.length === newProducts.length) return false;
            await this.writeFile(newProducts);
            return true;
        } catch (error) {
            throw new Error('Error eliminando el producto: ' + error.message);
        }
    }
}

module.exports = ProductManager;
