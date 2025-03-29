const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const productManager = new ProductManager('./products.json');
const cartManager = new CartManager('./carts.json');


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