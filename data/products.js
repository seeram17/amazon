
import {formatCurrency} from "../scripts/utils/money.js"

export function getProduct(productId){

  let product = null ; 

      products.forEach((item)=>{
          if(item.id===productId) product = item ;
      });

    return product ; 
}

class Product{
  id ; 
  image ; 
  name;
  rating;
  priceCents ;

  constructor(productDetails){
    this.id  = productDetails.id ; 
    this.image = productDetails.image ; 
    this.name = productDetails.name ; 
    this.rating = productDetails.rating ; 
    this.priceCents = productDetails.priceCents ;  
  }

  getImageUrl(){ return `images/ratings/rating-${this.rating.stars * 10}.png`}

  getPrice(){ return formatCurrency(this.priceCents)}

  extraInfoHTML(){ return ``}

}

class Clothing extends Product{

  sizeChartLink ; 

  constructor(productDetails){
    super(productDetails) ;
    this.sizeChartLink='../images/clothing-size-chart.png'; 
  }

extraInfoHTML() {
  return `
    <a
      href="${this.sizeChartLink}"
      target="_blank"
      style="
        color: #007185;
        text-decoration: none;
        font-size: 14px;
        font-family: Arial, sans-serif;
        cursor: pointer;
        display: inline-block;
        margin-top: 6px;
      "
      onmouseover="this.style.textDecoration='underline'; this.style.color='#C7511F';"
      onmouseout="this.style.textDecoration='none'; this.style.color='#007185';"
    >
      Size chart
    </a>
  `;
}

}


export let products = [] ; 

export function loadProducts(renderProductsPage){
    const xhr = new XMLHttpRequest() ; 

    xhr.addEventListener('load',()=>{
        products = JSON.parse(xhr.response).map((productDetails)=>{

            if(productDetails.type ==='clothing') return new Clothing(productDetails);
            return new Product(productDetails) ; 

      });

      renderProductsPage() ; 

    });

    xhr.open('GET','https://supersimplebackend.dev/products');
    xhr.send() ;
}

