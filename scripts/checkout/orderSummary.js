import {cart,removeFromCart,updateCartQuantity,updateQuantity,updateDeliveryDate} from "../../data/cart.js" ;
import {products,getProduct} from "../../data/products.js" ;
import {formatCurrency} from "../utils.js" ;
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {deliveryOptions,getDeliveryOption} from "../../data/delivery-options.js";
import {renderPaymentSummary} from "./paymentSummary.js"
import {renderCheckoutHeader} from "./checkoutHeader.js"


export function renderOrderSummary(){

  renderCheckoutHeader() ; 

  let checkoutItemsHTML = "" ;

  cart.forEach((cartitem)=>{

      let product = getProduct(cartitem.productId);

      const deliveryOptionId = cartitem.deliveryOptionId ;

      let deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs()  ;

      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

      const dateString = deliveryDate.format('dddd, MMM, D');

      checkoutItemsHTML += `
                <div class="cart-item-container cart-item-container-${product.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
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
                  ${deliveryOptionsHTML(product,cartitem)}
                </div>
              </div>
            </div>`;


  });


  function deliveryOptionsHTML(product,cartitem){
    
    let deliveryHtml = `` ; 

    deliveryOptions.forEach((deliveryOption)=>{

      const today = dayjs()  ;

      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

      const dateString = deliveryDate.format('dddd, MMM, D');

      const priceString = (deliveryOption.priceCents ===0)?'FREE':`${formatCurrency(deliveryOption.priceCents)}` ;

      const ischecked = deliveryOption.id === cartitem.deliveryOptionId ; 


      deliveryHtml+=`<div class="delivery-option js-delivery-option" data-product-id = "${product.id}" data-delivery-date-option="${deliveryOption.id}">
                    <input type="radio" ${ischecked?'checked':''}
                      class="delivery-option-input"
                      name="delivery-option-${product.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>`

    });

    return deliveryHtml ;
  }

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
      renderOrderSummary() ;
      renderPaymentSummary() ;
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

          renderOrderSummary() ; 

          updateCartQuantity() ;

          renderPaymentSummary() ;
          
      });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{

      const productId = element.getAttribute('data-product-id');
      const deliveryOptionId = element.getAttribute('data-delivery-date-option');

      updateDeliveryDate(productId,deliveryOptionId);

      renderOrderSummary() ;
      renderPaymentSummary() ;

    });
  });

}
