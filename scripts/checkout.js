import {cart,removeFromCart,updateCartQuantity,updateQuantity} from "../data/cart.js" ;
import {products} from "../data/products.js" ;
import {formatCurrency} from "./utils.js" ;


document.querySelector(".return-to-home-link").innerText = `${cart.length} items` ;

let checkoutItemsHTML = "" ;

cart.forEach((cartitem)=>{

    let product = null ; 

    products.forEach((item)=>{
        if(item.id===cartitem.productId) product = item ;
    });

    checkoutItemsHTML += `
              <div class="cart-item-container cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity js-product-quantity${product.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                    Update
                  </span>

                  <input class="quantity-input" data-product-id="${product.id}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${product.id}"> Save </span>

                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;


});

document.querySelector(".js-order-summary").innerHTML = checkoutItemsHTML ;

document.querySelectorAll(".js-update-link").forEach((link)=>{
    link.addEventListener("click",(event)=>{

      const productId =  link.getAttribute("data-product-id") ;

      const container = document.querySelector(`.js-product-quantity${productId}`) ;

      container.classList.add("is-editing-quantity") ;

    });
});

function saveButton(productId) {

    const container = document.querySelector(`.js-product-quantity${productId}`);

    const newQuantity = Number(container.querySelector(".quantity-input").value);

    if (isNaN(newQuantity) || newQuantity < 0 || newQuantity >= 1000) {
          alert("Please enter a valid quantity between 0 and 999");
          return;
      }

    updateQuantity(productId, newQuantity);

    container.querySelector(".quantity-label").innerText = newQuantity;

    updateCartQuantity();


    container.classList.remove("is-editing-quantity");
}

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    
  const productId = link.getAttribute("data-product-id");
    saveButton(productId  ) ;
  });
});

document.querySelectorAll(".quantity-input").forEach((link) => {

  link.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const productId = link.getAttribute("data-product-id");
      saveButton(productId); ;
    }
});

});



document.querySelectorAll(".js-delete-link").forEach((link)=>{
    link.addEventListener("click",(event)=>{

        const productId =  link.getAttribute("data-product-id") ;

        removeFromCart(productId) ;

        updateCartQuantity() ;
        
    });
});


