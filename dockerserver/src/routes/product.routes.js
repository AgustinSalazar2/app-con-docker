const express = require('express');
const router = express.Router();
const productModel = require('../models/product.controllers');

// Obtener todos los productos
router.get('/product', async (req, res) => {
  try {
    const productos = await productModel.getAllProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Insertar un nuevo producto
router.post('/product', async (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
  } else {
    try {
      const resultado = await productModel.insertarProducto(nombre, precio);
      res.json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

// Eliminar un producto por su ID
router.delete('/product/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await productModel.eliminarProducto(id);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar un producto por su ID
router.put('/product/:id_prod', async (req, res) => {
  const id = req.params.id_prod;
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
    // console.log(nombre, precio)

  } else if (!id) {
    console.log("No hay id")
    // console.log(id)
    res.status(400).json({ error: 'Se requiere el ID del producto' });

  } else {
    try {
      const resultado = await productModel.actualizarProducto(id, nombre, precio);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
      console.error(error);
    }
  }
});

module.exports = router;
