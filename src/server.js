const express = require("express");
const Contenedor = require("./contendedor");
const renderProduct = require("./renderProduct");

const app = express();

const products = new Contenedor("./src/productos.txt");

const styles = `
    <style>
      .container {display: flex; flex-wrap: wrap; justify-content: space-evenly;}
      .product {border: 1px solid #000; border-radius: 10px; text-align: center; width: 400px}
      img {max-width: 400px}
      img {max-height: 400px}
    </style>
`;

app.get("/", (req, res) => {
  res.send(
    "Bienvenido! Ingrese a la ruta /productos para ver los productos disponibles o a /productoRandom para ver un producto aleatorio"
  );
});

app.get("/productos", async (req, res) => {
  let renderedProducts = "";
  const currentProducts = await products.getAll();
  console.log(currentProducts);
  currentProducts.forEach((product) => {
    renderedProducts += renderProduct(product);
  });
  res.send(`
  ${styles}
  <div class="container">
    ${renderedProducts}
  </div>  
  `);
});

app.get("/productoRandom", async (req, res) => {
  const currentProducts = await products.getAll();
  const randomProduct =
    currentProducts[Math.floor(Math.random() * currentProducts.length)];
  const renderedProduct = renderProduct(randomProduct);
  res.send(`
  ${styles}
  <div class="container">
    ${renderedProduct}
  </div>  
  `);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
