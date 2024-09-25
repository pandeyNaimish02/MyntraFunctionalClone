bagItems=[];
onload();
function onload(){
    let bagItemStr=localStorage.getItem('bagItems');
    bagItems=bagItemStr?JSON.parse(bagItemStr):[];
    displayItemOnHomePage();
    displayBagIcon();
}

function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();
}
function displayBagIcon(){
    let bagElementCountElement=document.querySelector('.bag-item-count');
    if(bagItems.length>0){
    bagElementCountElement.style.visibility='visible';
    bagElementCountElement.innerText=bagItems.length;
    
    }
    else{
        bagElementCountElement.style.visibility='hidden';
    }
}
function displayItemOnHomePage(){
    let itemsContainerElement=document.querySelector('.items-container');
    if(!itemsContainerElement){
        return;
    }
let innerHTML='';
items.forEach(item=>{
    innerHTML+=` <div class="item-container">
                   <img class="image-items" src="${item.image}" alt="image">
                   <div class="rating">
                       ${item.rating.stars}⭐|${item.rating.count}
                   </div>
                   <div class="company">${item.company}</div>
                   <div class="item-name">${item.item_name}</div>
                   <div class="price">
                       <span class="current-price">Rs ${item.current_price}</span>
                       <span class="original-price">Rs ${item.original_price}</span>
                       <span class="discount">(${item.discount_percentage}% OFF)</span>
                       
                   </div>
                   <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
               </div>`
   });
   itemsContainerElement.innerHTML=innerHTML;
   
}
