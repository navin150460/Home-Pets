
import {save_data,load_data,hide,show} from '../module/module.js';

//------------------------ const variables------------------------------------
const new_product = document.querySelector(".new_product");
const old_product = document.querySelector(".old_product");
const no_card =document.querySelector("#nocard");
const detail_news = document.querySelector("#dialog_product");
const btn_add_cart = document.querySelector("#btn_add_cart");
const dialog_cart = document.querySelector(".cart_show");
const container_customer = document.querySelector("#container");
const contain_table = document.querySelector("#cart_dialog");
//--------------------- global variables --------------------------------------
let dt_name = document.querySelector("#detail_name");
let cost = document.querySelector("#detail_cost");
let description = document.querySelector("#detail_description");
let img = document.querySelector("#detail_img");
let cart_index = 0;
let index_buy_now = 0;
let data_buy_now =[]
let data_cart = [];
let cart_lists = [];

let cname = document.querySelector("#cname");
let ccnum = document.querySelector("#ccnum");
let expmonth = document.querySelector("#expmonth");
let cvv = document.querySelector("#cvv");
let expyear = document.querySelector("#expyear");

// let it_first = true;
let cart_icon = document.querySelector('#cart');
cart_icon.addEventListener("click",check_cart)

let bntBack1 = document.querySelector('.back1');
bntBack1.addEventListener('click', goBack);

let bntBack2 = document.querySelector('.back2');
bntBack2.addEventListener('click', goBack);

btn_add_cart.addEventListener("click",cart)

document.querySelector(".user_input").addEventListener("keyup", search);

document.querySelector(".payment_btn").addEventListener("click",payment);

let total_container = document.querySelector(".container_total");


let old_data = [
    {
        name:"bird",
        description:"red bird",
        cost:"200",
        currency: "$",
        img:"../../images/bird.webp",
        
    },
    {
        name:"cat",
        description:"yellow cat",
        cost:"200",
        currency: "$",
        img:"../../images/cat.jpg",
    },
    {
        name:"fish",
        description:"three color fish",
        cost:"200",
        currency:"$",
        img:"../../images/fish.jpeg"
    },
    {
        name:"pig",
        description:"cute pig",
        cost:"200",
        currency: "$",
        img:"../../images/pig.jfif"
    },
    {
        name:"Tiger",
        description:"cbit tiger",
        cost:"200",
        currency: "$",
        img:"../../images/tiger.jfif"
    },
    {
        name:"snake",
        description:"cute snake",
        cost:"200",
        currency: "$",
        img:"../../images/snake.jpg"
    },
];


// //----------------- load data --------------------------------------------------
let animal_data = JSON.parse(localStorage.getItem("animal_data"));
if (animal_data==null){
    no_card.textContent = "Don't have data storage yet. Please go to seller page and make some change or add card !"
    no_card.style.display = "block";
    new_product.style.display = "none";
    old_product.style.display = "none";
    
}
else{
    new_product.style.display = "";
    old_product.style.display = "";
    no_card.style.display  = "none";

}
// ---------------------------------------- function detail ------------------------------------
function detail(data,index){
    cart_index = index;
    data_cart = data;
    dt_name.textContent = data[index].name;
    cost.textContent = data[index].cost + data[index].currency;
    description.textContent = data[index].description;
    img.src = data[index].img;  
    show( detail_news);

}

//------------------------ function cart ----------------------------------------------------

function cart(){
    
    let itfind = true
    for (let i in cart_lists){
        if (cart_lists[i].name === data_cart[cart_index].name ){
            itfind = false
        }
        
    }
    if(itfind){
        cart_lists.push(data_cart[cart_index])
        save_data("cart_lists ",cart_lists)
        load_data("cart_lists ",cart_lists )
        hide(detail_news)
        
    }
    else{
        alert("This animal is already add!")
    }
   
    

}




//---------check cart befor show --------------------------------------------------------
function check_cart(){
    if (cart_lists.length>0){
        show_cart_data()
    }
}
// ------------------------- back button ---------------------------------------------------------------
function goBack(){
    hide(detail_news)
    hide(dialog_cart)
    show(container_customer)
    
}


//-------------------------------- show product on buyer page function ---------------------------------------------
function show_data(data,id,parent,page){
    document.querySelector(id).remove();
    let card_new_product = document.createElement("div");
    card_new_product.id = id;
    card_new_product.className = "all_card"
    parent.appendChild(card_new_product);
    for(let i=0 ;i< data.length ;i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.index = i;
       
        data_buy_now = data;
        card_new_product.appendChild(card);

        let img = document.createElement("img");
        img.id = "animal";
        img.addEventListener("click",function(event){
            let index = event.target.parentElement.dataset.index;
            detail(data,index)
           
        });
         
        img.src = data[i].img;
        card.appendChild(img);
        

        let retail_news = document.createElement("div");
        retail_news.className = "retail_news";
        card.appendChild(retail_news);

        let news = document.createElement("div");
        news.className = "news";
        retail_news.appendChild(news)

        let name = document.createElement("p");
        name.textContent = data[i].name;
        name.className = "name_animal";
        name.style.fontWeight = "bold";
        news.appendChild(name);

        let cost = document.createElement("p");
        cost.textContent = data[i].cost + data[i].currency;
        news.appendChild(cost);

        let span = document.createElement("span");
        news.appendChild(span);

        for(let i=0 ; i<5 ;i++) {
            let star = document.createElement("img");
            star.className = "stars";
            star.src = "../../images/goal star.png";
            span.appendChild(star)
        }

        let buy = document.createElement("button");
        buy.className = "button buy_btn";
        
        buy.textContent = "buy now";
        buy.addEventListener("click",function(){
            index_buy_now = i;
           buy_now()
        })
        retail_news.appendChild(buy);

    }
}


// -------------------------------- search card --------------------------------------------------------------------
function search(event) {
    let list_animals = document.querySelectorAll('.card');
    let user_input = document.querySelector(".user_input").value.toUpperCase();
    let array=[]
    list_animals.forEach(Element=>{
        let name_card = Element.firstElementChild.nextElementSibling.firstElementChild.firstChild.textContent;
        if (name_card.toUpperCase().indexOf(user_input)>-1){
                Element.style.display=""
                array.push(name_card)
        }
        else {
                Element.style.display ="none"
        }
        
           
    })

    if (array.length===0){
        no_card.style.display = "block";
        no_card.textContent = "Don't have this animal......!"
        new_product.style.display = "none";
        old_product.style.display = "none";
    }
    else {
        new_product.style.display = "";
        old_product.style.display = "";
        no_card.style.display  = "none";
    }
};

// ------------------------------ show cart data function --------------------------------------------------------
function show_cart_data(){
    hide(document.querySelector("#container"));
    show(dialog_cart );

    document.querySelector("#table").remove();
    let table = document.createElement("table");
    contain_table.appendChild(table)
    table.id = "table";
    

    let tr1 = document.createElement("tr");
    table.appendChild(tr1);

    let th1 = document.createElement("th");
    th1.textContent = "Images";
    tr1.appendChild(th1);

    let th2 = document.createElement("th");
    th2.textContent = "Animal";
    tr1.appendChild(th2);

    let th3 = document.createElement("th");
    th3.textContent = "Cost";
    tr1.appendChild(th3);

    let th4 = document.createElement("th");
    th4.textContent = "Quantity ";
    tr1.appendChild(th4);


    let th5 = document.createElement("th");
    th5.textContent = "Action";
    tr1.appendChild(th5);
    
    for (let i in cart_lists){
        let tr = document.createElement("tr");
        tr.dataset.index = i;
        table.appendChild(tr)
        let td1 = document.createElement("td");
        let img_animal = document.createElement("img");
        img_animal.src = cart_lists[i].img;
        td1.appendChild(img_animal);
        tr.appendChild(td1)
        let td2 = document.createElement("td");
        td2.textContent = cart_lists[i].name;
        tr.appendChild(td2)
        
        let td3 = document.createElement("td");
        td3.textContent = cart_lists[i].cost + cart_lists[i].currency;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        let input = document.createElement("input");
        input.type = "number";
        input.className = "quantity_product"
        input.value = 1;
        input.min = 1;
        td4.appendChild(input)
        tr.appendChild(td4);


        let td5 = document.createElement("td");
        let img = document.createElement("img");
        img.addEventListener("click",remove)
        img.src="../../images/delete.png";
        img.style.width = "50px";
        td5.appendChild(img);
        tr.appendChild(td5);
        table.appendChild(tr)

    }
    
 

}


// ---------------------------------- remove data function ---------------------------------------------------------
function remove(event){
    let index = event.target.parentElement.parentElement.dataset.index;
    cart_lists.splice(index, 1);
    save_data("cart_lists ",cart_lists)
    load_data("cart_lists ",cart_lists )
    show_cart_data()
    
}
// ----------------------------- payment ----------------------------------------------------------------------------
function payment(){
    clear()
    hide(dialog_cart);
    show(document.querySelector(".payment"));
    total_lists();
}


// ----------------------------- fuction show total lists--------------------------------------------------------------
function total_lists(button){
    let cost = 0;
    let sum_products = 0;
    document.querySelector(".total").remove();
    let total =document.createElement("div");
    total.className = "total";
    total_container.appendChild(total)
    
    let h2 = document.createElement("h2");
    h2.textContent = "Carts"
    let product = document.createElement("span");
    product.textContent = "Quantity";
    h2.appendChild(product)
    let img = document.createElement("img");
    img.src = "../../images/cart.png";
    h2.appendChild(img);
    total.appendChild(h2);

    for (let i in cart_lists ){
        let quantity = 1;
        let p = document.createElement("p");
        p.textContent = cart_lists[i].name;
        total.appendChild(p)
        

        let span = document.createElement("span");
        span.className = "price";
        span.style.fontWeight = "bold";
        if( !(button === "buy now")){
            quantity = document.querySelectorAll(".quantity_product")[i].value;
        }
       

        sum_products += Math.floor(quantity)

        let quantity_product = document.createElement("span");
        quantity_product.textContent = quantity;
        p.appendChild(quantity_product);

        span.textContent = Math.floor(cart_lists[i].cost)*quantity + cart_lists[i].currency;
        p.appendChild(span)

        cost += Math.floor(cart_lists[i].cost)*quantity
    }
    let hr = document.createElement("hr");
    total.appendChild(hr)

    let total_cost = document.createElement("p");
    total_cost.textContent = "Total:";
    total.appendChild(total_cost)

    let number_product = document.createElement("span");
    number_product.textContent = sum_products;
    total_cost.appendChild(number_product);

    let span = document.createElement("span");
    span.className = "price";
    span.style.fontWeight = "bold";
    span.textContent = cost + "$"

    total_cost.appendChild(span)

}
//  ----------------------------- fuction check input in payment--------------------------------------------------------
document.querySelector(".checkout").addEventListener("click",function(){
    if (cname.value != "" && ccnum.value !="" && expmonth.value !="" && cvv.value !="" && expyear.value != "" && ccnum.value.length==16 && cvv.value.length==3){
        hide(document.querySelector(".payment"))
        show(document.querySelector("#container"))
        cart_lists = []

    }
    else if(ccnum.value.length!=16 && ccnum.value.length!=0 || cvv.value.length !=3 && cvv.value.length !=0){
        alert("not correct!")

    }
    else{
        alert("You have missing !")
    }
    
})


// function buy now
function buy_now() {
    clear()
    cart_lists.push(data_buy_now[index_buy_now])
    show(document.querySelector(".payment"));
    hide(document.querySelector("#container"))
    total_lists("buy now")
    
}

// -----------------clear data -----------------

function clear(){
    cname.value = "";
    ccnum.value ="" ;
    expmonth.value ="" ;
    cvv.value ="" ;
    expyear.value = "" ;
}
// --------------------------------- call function -----------------------------------------------------------------
save_data("old_data",old_data);
load_data("old_data",old_data);

show_data(animal_data,"#contain_new_product",new_product,"customer");
show_data(old_data,"#contain_old_product",old_product,"customer");





