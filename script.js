const ul = document.querySelector('ul');
const shop = document.getElementById("shop");
const blog = document.getElementById("blog");
const review = document.getElementById("review");
const contact = document.getElementById("contact");
const a = document.querySelectorAll("a");


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


// img-items
let card = document.querySelectorAll('.card');
let container = document.querySelector(".container");
let itemImg = document.querySelector("#itemImg");
let buyPage = document.querySelector(".buy-page");
let cross = document.querySelector(".cross");
const submit =document.getElementById("submit");

console.log(buyPage.children[1].children)

card.forEach((curvalue)=>{
    curvalue.addEventListener('click',()=>{
        document.querySelector('.item-page').style.display= "flex";
        container.style.display= "none";

        itemImg.src = curvalue.firstElementChild.src;

        document.getElementById('buyItem').addEventListener('click',()=>{
            buyPage.style.display = "block";
        })
        cross.addEventListener('click',()=>{
            buyPage.style.display = "none";
        })
        submit.addEventListener('click',()=>{
            if (buyPage.children[1].children[1].value === "" || buyPage.children[1].children[3].value === "" || buyPage.children[1].children[5].value === ""){
                alert("Please Enter Detail");
            }else{
                alert("Hurryy!!!!! details Recorded","color:'red'");
            }
        })

    })
    
})