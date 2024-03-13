import express from 'express';
import ProductManager from './products03';

const app = express();
const PORT = 8080; 

const manager = new ProductManager(`products.json`); 


app.get('/products', async (request, response) => {
    let products = await manager.getProducts();
    const {limit} = request.query;

    if(limit){
        products = products.slice(0, limit);
    }

    response.send(products);
});

app.get('/products/:productId', async (request, response) => {
    const productId = request.params.productId;

    let product = await manager.getProductById(productId);

    product ? response.send(product) : console.error('Producto no encontrado');

})


app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})  