import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/delivery-options.js";

export function renderPaymentSummary() {

  let itemsCost = 0;
  let shippingCost = 0;

  cart.forEach((cartitem) => {

    const product = getProduct(cartitem.productId);

    itemsCost += product.priceCents * cartitem.quantity;

    const deliveryOption = getDeliveryOption(cartitem.deliveryOptionId);

    shippingCost += deliveryOption.priceCents;

  });

  const totalBeforeTax = itemsCost+shippingCost ; 

  const tax = totalBeforeTax * 0.1 ; 

  const totalCost = totalBeforeTax + tax ; 

  const paymentHtml = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">${formatCurrency(itemsCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>` ;

    document.querySelector('.payment-summary').innerHTML = paymentHtml ; 

}