const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const ProductManager = require('./class/productManager');
const CartManager = require('./class/cartManager');

const productManager = new ProductManager('./data/products.json');
const cartManager = new CartManager('./data/carts.json');

// Product Endpoints
app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        product ? res.json(product) : res.status(404).send('No existe el producto');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/products/:pid', async (req, res) => {
    try {
        const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
        updatedProduct ? res.json(updatedProduct) : res.status(404).send('No existe el producto');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    try {
        const result = await productManager.deleteProduct(req.params.pid);
        result ? res.status(204).send() : res.status(404).send('No existe el producto');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cart Endpoints
app.post('/api/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        cart ? res.json(cart) : res.status(404).send('No existe el carrito');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartManager.addProductToCart(cid, pid);
        result ? res.json(result) : res.status(404).send('El carrito o el producto no existe');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const ProductManager = require('./class/productManager');
const CartManager = require('./class/cartManager');

const productManager = new ProductManager('./data/products.json');
const cartManager = new CartManager('./data/carts.json');


// Product Endpoints
app.get('/api/products', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});

app.get('/api/products/:pid', (req, res) => {
    const product = productManager.getProductById(req.params.pid);
    product ? res.json(product) : res.status(404).send('No existe el producto');
});

app.post('/api/products', (req, res) => {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(req.params.pid, req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).send('No existe el producto');
});

app.delete('/api/products/:pid', (req, res) => {
    const result = productManager.deleteProduct(req.params.pid);
    result ? res.status(204).send() : res.status(404).send('No existe el producto');
});


// Cart Endpoints
app.post('/api/carts', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

app.get('/api/carts/:cid', (req, res) => {
    const cart = cartManager.getCartById(req.params.cid);
    cart ? res.json(cart) : res.status(404).send('No existe el carrito');
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const result = cartManager.addProductToCart(cid, pid);
    result ? res.json(result) : res.status(404).send('El carrito o el producto no existe');
});
*/