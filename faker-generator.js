const faker = require("faker");
const fs = require("fs");

const products = new Array(1000).fill(null);

for (let i = 0; i < products.length - 1; i++) {
  const productName = faker.commerce.productName();
  const color = faker.commerce.color();
  const city = faker.address.city();
  products[i] = {
    id: i + 1,
    productName,
    color,
    city,
    value: productName.toLowerCase().replace(/\s/g, "_"),
  };
}

const json = JSON.stringify(products);

fs.writeFileSync("./src/products.json", json);
