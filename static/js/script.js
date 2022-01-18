const pages =  {
    add_stock: { file: "stock_form.html", data: (settings = {}) =>  { addEditStock(settings) }},
    home: { file: "home.html", data: (settings = {}) => {  } },
    list_stock: { file: "list_stock.html", data: (settings = {}) => {} }
}

function changeTab(page) {
    $("#content").load(pages[page].file, () => {
        pages[page].data();
    });
    
}

$(function() {
    changeTab("add_stock");
})

function addEditStock(settings) {
    let heading = settings.id == undefined ? "Add" : "Edit";
    $("#variableText").html(heading);
    $("#submit").attr("onclick", `submitForm(${settings.id != undefined ? settings.id : ""})`);
}

function resetForm() {
    $("#product_name, #sale_price, #cost_price, #expiery_date, #quantity").val("")
}

function submitForm(id) {
    consoole.log("Hello");
}