
let shoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById('label');
let shopItems = document.getElementById('shopping-cart');
console.log(label)
let generateItems = () => {
    if (basket.length !== 0) {
       return shoppingCart.innerHTML = basket.map((x) => {
            let { id, items } = x;
            let search = shopData.find((y) => y.id == id) || [];
            let {img,price,name} =search;
            return `
            <div class="cart-data">
                <img width="100" src="${img}">
                <div class="cart-text">
                    <div class="title-price-x">
                        <h3>${name}</h3>
                        <h3 class="price">$${price}</h3>
                        <i onclick="removeItems(${id})" class="fa-solid fa-xmark"></i>
                    </div>
                     <div class="button-quat">
                        <i onclick="decrement(${search.id})" class="fa-solid fa-minus"></i>
                        <div id="${search.id}" class="quantity">${items === undefined ? 0: items}</div>
                        <i onclick="increment(${search.id})" class="fa-solid fa-plus"></i>
                    </div>
                    <h3>Total:$${items * price }</h3>
                </div>
            </div>
            `
        }).join("");
    }
    else {
        shoppingCart.style.display= "none";
        label.innerHTML = `
        <h2>Card is Empty</h2>
        <a href="index.html"><button class="cart-btn">Back to Home</button></a>
        `
    }
}
generateItems();

let increment = (id) => {
    let search = basket.find((x) => x.id == id);
    if (search === undefined) {
        basket.push({
            id: id,
            items: 1,
        })
    } else {
        search.items += 1;
    }
    updateItems(id);
}
let decrement = (id) => {
    let search = basket.find((x) => x.id == id);
    if (search === undefined) { return }
    else if (search.items === 0) { return }
    else {
        search.items -= 1;
    }
    updateItems(id);
}

let updateItems = (id) => {
    let search = basket.find((x) => x.id == id);
    document.getElementById(id).innerText = search.items;
    calculation();
    generateItems();
    basket = basket.filter((x) => x.items !== 0);
    localStorage.setItem('data', JSON.stringify(basket));

}

let calculation = () => {
    let countItems = document.querySelector('.cart-count')
    countItems.innerHTML = basket.map((x) => x.items).reduce((x, y) => x + y, 0);
}
calculation();

let removeItems=(id)=>{
    let remove = basket.find((x)=> x.id == id) || [];
    remove.items =0;
    updateItems(id);
    generateItems();
}

let removeAll=()=>{
    basket =[];
    localStorage.setItem('data',JSON.stringify(basket));
    calculation();
    generateItems();
}

let totalAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x)=> {
            let {items , id} = x;
            let search  = shopData.find((y)=> y.id == id) || [];
            return items * search.price;
        }).reduce((x,y)=> x+y,0);

        label.innerHTML = `
        <h2>Total Amount : $${amount}</h2>
        <a href="#" ><button class="checkout">Checkout</button> </a>
        <a href="#" ><button onclick="removeAll()" class="removeAll">Clear Cart</button> </a>`
    }
    else return
}
totalAmount();