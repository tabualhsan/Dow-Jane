"use strict";

function get_stock_info(evt){

    evt.preventDefault();

    let symbol = $("#stock_symbol").val();

    $.get('/api/stock?symbol='+ symbol, updateInfo);


}
function updateInfo(results){
    $(".company_info").show();
    $("#StockID").html(results.StockID);
    console.log(results.StockID);
    $('#Name').html(results.Name);    
    $('#Symbol_ticker').html(results.Symbol);
    $('#Description').html(results.Description);      
    $('#Address').html(results.Address);
    $('#FullTimeEmployees').html(results.FullTimeEmployees);
    $('#AssetType').html(results.AssetType);
    $('#DividendPerShare').html(results.DividendPerShare);
    $('#DividendYield').html(results.DividendYield);
    $('#DividendPerShare').html(results.DividendPerShare);
    $('#PEGRatio').html(results.PEGRatio);
    $('#PERatio').html(results.PERatio);
    $('#52WeekHigh').html(results.Week52High);
    $('#52WeekLow').html(results.Week52Low);
    $('#EPS').html(results.EPS);

}


function favorite_table(){

    // for fav in favs:
        // console.log(fav)
    var favs = ($.get('/api/userfavorite'));
    console.log(favs[0]);

    $("#user_favorites").html(favs[0]);

    console.log("Hello");


}


function favorite(evt){
    evt.preventDefault();
    $("#not_favorite").hide();
    $("#favorited").show();

    var stock_id = $('#StockID').text();
    console.log(stock_id);

    $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);
  
}





$("#stock_select").on('submit', get_stock_info);
$("#not_favorite").on('click', favorite);
$(document).ready(favorite_table())

