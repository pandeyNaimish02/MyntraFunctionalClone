let bagItemObjects;
onload();

function onload(){
  loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function loadBagItemObjects(){
console.log(bagItems);
bagItemObjects=bagItems.map(itemId=>{
  for(let i=0;i<items.length;i++){
    if(itemId==items[i].id){
      return items[i];
    }
  }
});
console.log(bagItemObjects);
}
function displayBagItems(){
    let containerElement=document.querySelector('.bag-items-container');
    //containerElement.innerHTML=;
    let innerHTML='';
    bagItemObjects.forEach(bagItems=> {
      innerHTML+=generateItemHtml(bagItems);
      
    });
    containerElement.innerHTML=innerHTML;
}
function displayBagSummary(){
  let totalItem=bagItemObjects.length;
  let totalMRP=0;
  let totalDiscount=0;
  

  bagItemObjects.forEach(bagItems=>{
    totalMRP+=bagItems.original_price;
    totalDiscount+=bagItems.original_price-bagItems.current_price;
  })
  let finalPayment=totalMRP-totalDiscount+99;

  let bagSummaryElement=document.querySelector('.bag-summary');
  bagSummaryElement.innerHTML= `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹${finalPayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;

}
function removeFromBag(itemID){
  bagItems=bagItems.filter(bagItemId=>bagItemId!=itemID);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}
function generateItemHtml(item){
return ` <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}/span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
              <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
            </div>

            
          </div>
          `
}
