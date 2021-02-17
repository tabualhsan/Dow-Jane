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
    console.log(favs[1]);
    // var favs = JSON.parse(favs);
    // console.log(favs[1]);
    $("#user_favorites").html(favs);



}


function favorite(evt){
    evt.preventDefault();
    $("#not_favorite").hide();
    $("#favorited").show();

    var stock_id = $('#StockID').text();
    console.log(stock_id);

    $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);



}
// var favoriteBox =document.getElementById("favorite-table");
// var btn = document.getElementById("btn");
// function renderHTML(favorites){

//     var favs = ($.get('/api/userfavorite'));
// // }

// function get_definition {
//     let displayCompany = document.getElementById("display-Company");

//     word.addEventListener('mouseover', (get_definition)=> word.innerText = '')

//     word.addEventListener('mouseleave', (get_definition) => word.innerText = '')

//   }

// $(document).ready(get_stock_info(){
//     $( "#definitions" ).hover(get_stock_info() {
//            $('.word').word({
//         show: true
//     });
//   });  
// });


$("#stock_select").on('submit', get_stock_info);
$("#not_favorite").on('click', favorite);
$(document).ready(favorite_table())

