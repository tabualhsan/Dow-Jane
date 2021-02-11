"use strict";

function get_stock_info(evt){

    evt.preventDefault();

    let symbol = $("#stock_symbol").val()
    console.log(symbol);


    $.get('/api/stock?symbol='+ symbol);


}

$("#stock_select").on('submit', get_stock_info);
