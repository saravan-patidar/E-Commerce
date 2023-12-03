const ul = document.querySelector('ul');
const shop = document.getElementById("shop");
const blog = document.getElementById("blog");
const review = document.getElementById("review");
const contact = document.getElementById("contact");
const a = document.querySelectorAll("a");


// display mobile device icon navbar
document.querySelector('.icon').addEventListener('click', () => {
    ul.classList.toggle('showdata');

    if (ul.className === "showdata") {
        document.querySelector("#bar").className = "fa-solid fa-xmark";
    }
    else {
        document.querySelector("#bar").className = "fa-solid fa-bars";
    }
})

a.forEach((value) => {
    value.addEventListener('click', (e) => {
        switch (value.id) {
            case 'shop': {
                navBtnColorChange(shop, blog, review, contact);
                break;
            }
            case 'blog':
                navBtnColorChange(blog, shop, review, contact);
                break;
            case 'review':
                navBtnColorChange(review, shop, blog, contact);
                break;
            case 'contact':
                navBtnColorChange(contact, shop, blog, review);
                break;
        }
    })
})
function navBtnColorChange(a, b, c, d) {
    a.style.color = "#00aeff";
    b.style.color = "white";
    c.style.color = "white";
    d.style.color = "white";
}


// cart-system 

// console.log(shopData);
let gerateCard = () => {
    let cards = document.querySelector('.cards');
    cards.innerHTML = shopData.map((x) => {
        let { id, name, price, desc, img } = x;
        return ` <div id="product-${id}" class="card">
                <img src="${img}" alt="">
                <div class="desc">
                    <h4>${name}</h4>
                    <p>${desc}</p>
                    <h4>$${price}</h4>
                </div>
            </div>`
    }).join("");

}

gerateCard();

// img-items
let card = document.querySelectorAll('.card');
let container = document.querySelector(".container");
let itemImg = document.querySelector("#itemImg");
let buyPage = document.querySelector(".buy-page");
let cross = document.querySelector(".cross");
const submit = document.getElementById("submit");


card.forEach((curvalue) => {
    curvalue.addEventListener('click', (e) => {
        let id = curvalue.id.slice(8);

        document.querySelector('.item-page').style.display = "flex";
        let itemPage = document.querySelector('.item-page');
        let search = shopData.find((x) => x.id == id);
        let dataFind = basket.find((y)=> y.id == search.id) || {item:0};
        itemPage.innerHTML = `
        <img src=${search.img} id="itemImg">
        <div class="item-text">
            <h2>${search.name}</h2>
            <h2>$${search.price}</h2>
            <p>${search.desc}</p>
            <div class="button-quat">
            <i onclick="decrement(${search.id})" class="fa-solid fa-minus"></i>
            <div id="${search.id}" class="quantity">${ dataFind.items === undefined ? 0: dataFind.items}</div>
            <i onclick="increment(${search.id})" class="fa-solid fa-plus"></i>
            </div>
            <h2 class="offer">Available Offers:</h2>
            <p>All product to this discount of 50% in our website.</p>
            <p>Apply credit-card of HDFC Bank is Available of 20% instant discount.</p>
            <p>Use a coupon code 'hfg74dh' of this extra benfit uisng credit-card.</p>
            <p>Most of the valuable cost effective cost benifit.</p>
            <button class="btn3"><a href="#Shop" onclick="backHome()">Back</a></button>

        </div>`
        document.getElementById('ul').style.visibility = "hidden";
        container.style.display = "none";

        document.getElementById('buyItem').addEventListener('click', () => {
            buyPage.style.display = "block";
        })
        cross.addEventListener('click', () => {
            buyPage.style.display = "none";
        })
        submit.addEventListener('click', () => {
            if (buyPage.children[1].children[1].value === "" || buyPage.children[1].children[3].value === "" || buyPage.children[1].children[5].value === "") {
                alert("Please Enter Detail");
            } else {
                alert("Hurryy!!!!! details Recorded", "color:'red'");
            }
        })

    })

});
let backHome = () => {
    document.querySelector('.item-page').style.display = "none";
    container.style.display = "block";

}

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

    basket = basket.filter((x) => x.items !== 0);
    localStorage.setItem('data', JSON.stringify(basket));

}

let calculation = ()=>{
    let countItems = document.querySelector('.cart-count')
    countItems.innerHTML =basket.map((x) => x.items).reduce((x,y)=> x+y,0);
}
calculation();

