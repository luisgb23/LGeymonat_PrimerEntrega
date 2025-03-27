const express = require('express');
const ProductManager = require('./productManager');
const CartManager = require('./cartManager');

const app = express();
const PORT = 8080;
const productManager = new ProductManager('./products.json');
const cartManager = new CartManager('./carts.json');

app.use(express.json());

// Product Routes
const productRouter = express.Router();
productRouter.get('/', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});

productRouter.get('/:pid', (req, res) => {
    const product = productManager.getProductById(req.params.pid);
    product ? res.json(product) : res.status(404).send('Product not found');
});

productRouter.post('/', (req, res) => {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

productRouter.put('/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(req.params.pid, req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).send('Product not found');
});

productRouter.delete('/:pid', (req, res) => {
    const result = productManager.deleteProduct(req.params.pid);
    result ? res.status(204).send() : res.status(404).send('Product not found');
});

app.use('/api/products', productRouter);

// Cart Routes
const cartRouter = express.Router();
cartRouter.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

cartRouter.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(req.params.cid);
    cart ? res.json(cart) : res.status(404).send('Cart not found');
});

cartRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const result = cartManager.addProductToCart(cid, pid);
    result ? res.json(result) : res.status(404).send('Cart or Product not found');
});

app.use('/api/carts', cartRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
