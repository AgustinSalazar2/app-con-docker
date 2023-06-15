// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch('http://localhost:4000/productos/product');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const agregarProducto = async () => {
    try {
      await fetch('http://localhost:4000/productos/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio }),
      });
      obtenerProductos();
      setNombre('');
      setPrecio('');
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://localhost:4000/productos/product/${id}`, {
        method: 'DELETE',
      });
      obtenerProductos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <div className="input-container">
        <input className='input-prod' type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
        <input className='input-prod' type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
        <button className='boton-prod' onClick={agregarProducto}> Agregar </button>
      </div>

      <h2>Listado de Productos</h2>
      <div className="cards-container">
        {productos.map((producto) => (
          <div className="card" key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <div className="button-container">
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {showUpdateForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Actualizar Producto</h2>
            <input type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
            <input type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
            <button onClick={() => setShowUpdateForm(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;
