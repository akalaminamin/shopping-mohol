const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  document.getElementById("all-products").textContent = "";
  document.getElementById("product-details").textContent = "";
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    const {image, title, category, id, price} = product;
    const {rate, count} = product.rating;
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div class="text-center">
        <img class="product-image py-4" src=${image}></img>
      </div>
      <h4>${title.slice(0, 20)}</h4>
      <p><span class="span">Category:</span> ${category}</p>
      <p><span class="span">Total Rating:</span> ${count}</p>
      <p><span class="span">Average Rating:</span> ${rate}</p>
      <p><span class="span">Price:</span> $ ${price}</h2>
      <div class="d-flex justify-content-between my-4"> 
        <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-outline-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger" onclick="showDetails(${id})">Details</button>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// show single product details 
const showDetails = (id) =>{
  document.getElementById("product-details").textContent = "";
  const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProductDetails(data));
} 

// display single product in UI
const showProductDetails = (data) =>{
  const {image, title, category, id, price} = data;
  const {rate, count} = data.rating;
  window.scroll(0, 40)
  const productDetails = document.getElementById("product-details");
  productDetails.innerHTML = `
  <div class="card mb-5 mx-auto py-4 singleCard" style="max-width: 650px;">
    <div class="row g-0  py-4 px-4">
      <div class="col-md-5">
        <img class="product-image img-fluid" src=${image}></img>
      </div>
      <div class="col-md-7">
          <h4>${title}</h4>
          <p><span class="span">Category:</span> ${category}</p>
          <p><span class="span">Total Rating:</span> ${count}</p>
          <p><span class="span">Average Rating:</span> ${rate}</p>
          <p><span class="span">Price:</span> $ ${price}</h2>
        <div class="d-flex justify-content-between my-4"> 
          <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-outline-success">add to cart</button>
        </div>
      </div>
    </div>
  </div>
  `
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // update tax and charge 
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  // update total price
  updateTotal();
};

// get all input value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
