const express = require('express');
const app = express();
const { Router } = require('express');
const PORT = 8080;

let productos = [];

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

let routerProductos = new Router();

routerProductos.get('/', (req, res) => {
    res.json(productos);
});

routerProductos.get('/:id', (req, res) => {
    let {id} = req.params;
    let producto = productos.find(producto => producto.id === Number(id));
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

routerProductos.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body;
    let producto = {
        id: productos.length + 1,
        title,
        price,
        thumbnail
    };
    productos.push(producto);
    res.json(producto);
});

routerProductos.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const producto = productos.find(producto => producto.id === Number(id));
    if (producto) {
        if (title) {
        producto.title = title;
        }
        if (price) {    
        producto.price = price;
        }
        if (thumbnail) {
        producto.thumbnail = thumbnail;
        }
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

routerProductos.delete('/:id', (req, res) => {
    const {id} = req.params;
    const producto = productos.findIndex(producto => producto.id === Number(id));
    if (producto) {
        productos.splice(producto, 1);
        res.json(productos);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
        
app.use("/api/productos", routerProductos);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});