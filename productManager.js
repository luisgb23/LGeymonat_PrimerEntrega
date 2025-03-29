const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    readFile() {
        if (!fs.existsSync(this.filePath)) return [];
        const data = fs.readFileSync(this.filePath);
        return JSON.parse(data);
    }

    writeFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    getAllProducts() {
        return this.readFile();
    }

    getProductById(id) {
        const products = this.readFile();
        return products.find(product => product.id === id);
    }

    addProduct(productData) {
        const products = this.readFile();
        const newProduct = { id: (products.length + 1).toString(), ...productData };
        products.push(newProduct);
        this.writeFile(products);
        return newProduct;
    }

    updateProduct(id, updatedData) {
        const products = this.readFile();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedData, id }; 
        this.writeFile(products);
        return products[index];
    }

    deleteProduct(id) {
        const products = this.readFile();
        const newProducts = products.filter(product => product.id !== id);
        if (products.length === newProducts.length) return false;
        this.writeFile(newProducts);
        return true;
    }
}

module.exports = ProductManager;