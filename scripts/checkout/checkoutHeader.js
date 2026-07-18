import {cart} from "../../data/cart.js"

export function renderCheckoutHeader(){
    document.querySelector(".return-to-home-link").innerText = `${cart.length} items` ;
}