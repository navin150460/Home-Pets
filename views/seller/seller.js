import {hide,show} from '../module/module.js';


// ----------------------------------const variables---------------------------------------
const dialog = document.querySelector("#dialog_product");
const edit_btn = document.querySelector("#edit");
const add_btn = document.querySelector("#add");
const product_view = document.querySelector("#product_view");
let dialog_header = document.querySelector("#dialog_header");



let click_add = document.querySelector("#click_add");
click_add.addEventListener("click",on_add );


let click_concel = document.querySelector("#click_concel");
click_concel.addEventListener("click",on_concel);

let create_new = document.querySelector("#add");
create_new.addEventListener("click",on_create);

let animal_data = [
    {
        name:"Lizard",
        description:"orang lizard",
        cost:"200",
        currency:"$",
        img:"../../images/lizard.png"
        
    },
    {
        name:"Crocodile",
        description:"shy crocodile",
        cost:"500",
        currency:"$",
        img:"../../images/crocodile.webp",
        
    },
    {
        name:"Shark",
        description:"beautiful shark",
        cost:"710",
        currency:"$",
        img:"../../images/shark.webp"
        
    },
    {
        name:"Turtle",
        description:"black turtle",
        cost:"120",
        currency:"$",
        img:"../../images/turtle.jpg"
        
    },
]

//-------------------------------- on add button-------------------------------
function on_add(){
    show(dialog);
    hide(edit_btn);
    show(add_btn)
    dialog_header .textContent = "Create New Product";
    document.querySelector("#nameOf_animal").value = "";
    document.querySelector("#description").value= "";
    document.querySelector("#cost").value = "";
    document.querySelector("#currency").value = "";
    document.querySelector("#url").value = "";


}

// --------------------------on concel -----------------------------------
function on_concel(){
    hide(dialog)
}


// -----------------------------On add button---------------------------------------
function on_create(){
    
    let animal = {}
    let already_completed = true;
    animal.name = document.querySelector("#nameOf_animal").value;
    animal.description = document.querySelector("#description").value;
    animal.cost = document.querySelector("#cost").value;
    animal.currency = document.querySelector("#currency").value;
    animal.img = document.querySelector("#url").value;

    console.log(animal)
    for (let i in animal) {
        if (animal[i]=="" ||  !(isValidUrl(animal.img))){
            already_completed = false;
        }
    }
    if(already_completed){
        if( !check_data(animal)){
            hide(dialog);
            animal_data.push(animal);
            save_data();
            show_data();
            
        }
        else{
            alert("This animal is already had!");
        }
              
    }
    else{
        alert("Please complete it all!");
    }
    
}

// -----------------------url validator from www.freecodecamp.org ---------------------
function isValidUrl(urlString) {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
};


//---------------------------- edit data -----------------------------------------------
function on_edit(event){
    show(dialog);
    hide(add_btn);
    show(edit_btn);
    dialog_header .textContent = "Edit Data Of Animal";
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    document.querySelector("#nameOf_animal").value = animal_data[index].name;
    document.querySelector("#description").value = animal_data[index].description;
    document.querySelector("#cost").value = animal_data[index].cost;
    document.querySelector("#currency").value = animal_data[index].currency;
    document.querySelector("#url").value = animal_data[index].img;

    
    document.querySelector("#edit").addEventListener("click",function(){
        change_data(index);
        index = null;
    });
};

//------------------------------change data ---------------------------------
function change_data(index){

    let animal = {}
    animal.name = document.querySelector("#nameOf_animal").value;
    animal.description = document.querySelector("#description").value;
    animal.cost = document.querySelector("#cost").value;
    animal.currency = document.querySelector("#currency").value;
    animal.img = document.querySelector("#url").value;
    
    let already_completed = true;
    for (let i in animal) {
        if (animal[i]==""){
            already_completed = false;
        }
    }
    if(already_completed){
            hide(dialog)
            animal_data[index] = animal;
            save_data();
            load_data();
            show_data();
    }
    else{
        alert("Please check it again!");
    }
    
}

//------------------------------------------------- check data-----------------------------------------------
function check_data(data){
    let found = false;
    for (let i in animal_data){
        if (animal_data[i].name.toUpperCase() == data.name.toUpperCase()  || animal_data[i].img == data.img){
            found = true;
            
        }
    }
    return  found ;


}
// -------------------------------------remove data ------------------------------------------------------------------
function remove(event){
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    animal_data.splice(index, 1);
    save_data();
    show_data();
}


// ------------------------------------------save data in local-----------------------------------------------------------
function save_data() {
    localStorage.setItem("animal_data", JSON.stringify(animal_data));
    
}
// -----------------------------------------load data-----------------------------------------------------------------------
function load_data() {
    let alldata = JSON.parse(localStorage.getItem("animal_data"));
    if (alldata!= null) {
        animal_data = alldata;
    }
}


// ---------------------------------------------show product ----------------------------------------------------------
function show_data(){
    document.querySelector("#product_container").remove();
    let product_container = document.createElement("div");
    product_container.id ="product_container";
    product_view.appendChild(product_container);

    for(let i=0 ; i<animal_data.length ; i++){
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.index = i;
        product_container.appendChild(card);

        let img = document.createElement("img");
        img.id = "animal";
        img.src = animal_data[i].img;
        card.appendChild(img);

        let retail_news = document.createElement("div");
        retail_news.className = "retail_news";
        card.appendChild(retail_news);

        let news = document.createElement("div");
        retail_news.appendChild(news);

        let name = document.createElement("p");
        name.className = "name_animal";
        name.textContent = animal_data[i].name;
        name.style.fontWeight = "bold";
        news.appendChild(name)

        let cost = document.createElement("p");
        cost.textContent = animal_data[i].cost +animal_data[i].currency;
        news.appendChild(cost);

       

        let span = document.createElement("span");
        news.appendChild(span);

        for (let i = 0 ; i<5 ; i++) {
            let img = document.createElement("img");
            img.className = "stars";
            img.src = "../../images/goal star.png";
            span.appendChild(img);
        }
        let action = document.createElement("div");
        action.className = "action";
        retail_news.appendChild(action);
        let img_edit = document.createElement("img");
        img_edit.addEventListener("click",on_edit);
        img_edit.src = "../../images/edit.png";
        action.appendChild(img_edit);

        let img_delete = document.createElement("img");
        img_delete.id = "delete_btn";
        img_delete.src = "../../images/delete.png";
        img_delete.addEventListener("click",remove);
        action.appendChild(img_delete);
        
    }
}


//-------------------------------- call function -----------------------------------------------------
// save_data()
load_data()
show_data()












