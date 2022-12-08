




export function save_data(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
    
}
  
// ------------------------------------------ load data ----------------------------
export function load_data(key,value) {
    let alldata = JSON.parse(localStorage.getItem(key));
    if (alldata!= null) {
        value = alldata;
    }
  
}


export function hide(element){
    element.style.display = "none";
}

// ---------------------------------function show-----------------------------------
export function show(element){
    element.style.display = "block";
}


