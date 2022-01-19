const BASE_URL = "http://localhost:8000";
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
});

function preventKeyDown(e) {
    if (e.keyCode !== 8) e.preventDefault();
}

function addEditStock(settings) {
    let heading = settings.id == undefined ? "Add" : "Edit";
    $("#variableText").html(heading);
    $("#submit").attr("onclick", `submitForm(event, ${settings.id != undefined ? settings.id : ""})`);
    $("#expiry_date").datepicker({ 
        minDate: -0,
        dateFormat: "d-mm-yy"
    });
}

function resetForm() {
    $("#product_name, #sale_price, #cost_price, #expiery_date, #quantity").val("")
}

function submitForm(e, id = null) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let cost_price = parseInt($("#cost_price").val());
    let sale_price = parseInt($("#sale_price").val());
    if (cost_price > sale_price) {
        Swal.fire(
            "Error", 
            "Sale Price cannot be less than Cost Price", 
            "error"
        );
        return false;
    }
    let quantity = parseInt($("#quantity").val());
    let product_name = $("#product_name").val();
    let expiry_date = $("#expiry_date").val();
    let targetUrl = `${BASE_URL}/stock/${id != null ? id : ""}`;
    $.ajax({
        url: targetUrl,
        data: JSON.stringify({
            cost_price, sale_price, quantity, product_name, expiry_date
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        complete: function(xhr, e) {
            if (xhr.status) {
                Swal.fire(
                    "Success",
                    "Stock Added Successfully",
                    "success"
                )
            }
        }
    })
}

