const express = require('express');
const app = express();
app.use(express.json()); //middleware
const PORT = 3000;
//productos
const products = [
    { id: 1, name: "jabon", price: 2000 },
    { id: 2, name: "toalla", price: 3000 },
    { id: 3, name: "esponja", price: 4000 }
];

//get para todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

//get para producto en especifico
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id); // Convertir a número
  const product = products.find(product => product.id === id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({message: "El producto no fue encontrado"});
  }
});

//post para nuevo producto
app.post('/products', (req, res) => {
  const newProduct = req.body;

  //validacion para que todos los campos esten completos
  if (!newProduct.id || !newProduct.name || !newProduct.price) {
    return res.status(400).json({message: "Se necesitan llenar todos los campos"});
  }

//validacion de que el id no se repita
  const existingProduct = products.find(product => product.id === newProduct.id);
  if (existingProduct) {
    return res.status(400).json({message: "No se puede usar un ID que ya existe"});
  }

//agregar producto nuevo
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});