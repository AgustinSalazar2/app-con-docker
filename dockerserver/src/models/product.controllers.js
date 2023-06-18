const pool = require('./dbconecction');

async function getAllProductos() {
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    const rows = await dbConnection.query('SELECT * FROM productos');
    return rows;
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection) dbConnection.end();
  }
}

async function insertarProducto(nombre, precio) {
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL
      )
    `);
    await dbConnection.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio]);
    return { mensaje: 'Producto insertado correctamente' };
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection) dbConnection.end();
  }
}

async function eliminarProducto(id) {
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    await dbConnection.query('DELETE FROM productos WHERE id = ?', [id]);
    return { mensaje: 'Producto eliminado correctamente' };
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection) dbConnection.end();
  }
}

async function actualizarProducto(id, nombre, precio) {
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    await dbConnection.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id]);
    return { mensaje: 'Producto actualizado correctamente' };
  } catch (error) {
    throw error;
  } finally {
    if (dbConnection) dbConnection.end();
  }
}

module.exports = {
  getAllProductos,
  insertarProducto,
  eliminarProducto,
  actualizarProducto,
};
