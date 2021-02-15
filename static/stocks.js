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

function favorite(evt){
    evt.preventDefault();
    $("#not_favorite").hide();
    $("#favorited").show();

    var stock_id = $('#StockID').text();
    console.log(stock_id);

    $.post('/api/favorite', {"stock_id": stock_id});
  
}

function favorite_table(results){
    
    
    $.get('/api/userfavorite', favs);
    console.log(favs);

    $("#get").html(results.favorited);
    $('#Name').html(results.Name);   



}



$("#stock_select").on('submit', get_stock_info);
$("#not_favorite").on('click', favorite);
$("favorited").on('click', favorite_table);

