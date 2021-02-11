"use strict";

function get_stock_info(evt){

    evt.preventDefault();

    let symbol = $("#stock_symbol").val()
    console.log(symbol);


    $.get('/api/stock?symbol='+ symbol, updateInfo);


}
function updateInfo(results){
    $(".company_info").show();
    $('#Name').html(results.Name);    
    $('#Symbol').html(results.Symbol);  
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

function favorite(like){
    $('.empty-like-button').show();



}
$("#stock_select").on('submit', get_stock_info);
