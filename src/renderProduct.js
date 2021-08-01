const renderProduct = (product) => {
  return `
    <div class="product">
      <h1>${product.title}</h1>
      <h3>Precio: ${product.price}</h3>
      <img src="${product.thumbnail}" />
    </div>
    `;
};

module.exports = renderProduct;
