"use strict";

function get_stock_info(evt){
    evt.preventDefault();

    let symbol = $("#stock_symbol").val();


    $.get('/api/stock?symbol='+ symbol, updateInfo);


}


function load_page(){


    let symbol = getUrlParameter('stock');

    if (symbol != false) {

        $.get('/api/stock?symbol='+ symbol, updateInfo);
    }

}



function get_women_lead(evt){


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
    $('#RevenueTTM').html(results.RevenueTTM);
    $('#FiscalYearEnd').html(results.FiscalYearEnd);
    $('#AssetType').html(results.AssetType);
    $('#DividendPerShare').html(results.DividendPerShare);
    $('#DividendYield').html(results.DividendYield);
    $('#DividendPerShare').html(results.DividendPerShare);
    $('#PEGRatio').html(results.PEGRatio);
    $('#PERatio').html(results.PERatio);
    $('#EPS').html(results.EPS);
    $('#WomenLead').html(results.WomenLead ? 'Yes': 'No');
    $('#52WeekHigh').html(results["52WeekHigh"]);
    $('#52WeekLow').html(results["52WeekLow"]);
    $('#EPS').html(results.EPS);
    
    if (results["UserFaved"] == true) {
        $("#not_favorite").hide();
        $("#favorited").show();

    } 

};


function favorite_table(){

    var favs = ($.get('/api/userfavorite'));
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

 };



 function delete_favorite(evt){
    evt.preventDefault();
    $("#favorited").hide();
    $("#not_favorite").show();

    var stock_id = $('#StockID').text();

    $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);

 };

// const messages = {
//     "EPS": "Earnings Per Share (EPS) - is defined as Net Income divided by the total number of outstanding shares. This measure tells you the accounting profit of the company that each share is entitled to. ",
//     "Dividend Yield": "The ratio of the company's annual dividend compared to its share price.",
//     "Dividend Per Share" : "The sum of declared dividends issued by a company for every ordinary share outstanding.",
//     "PERRatio": "The ratio for valuing a company that measures its current share price relative to its per-share earnings (EPS). The price-to-earnings ratio is also sometimes known as the price multiple or the earnings multiple.",
//     "PEGratio": "The 'PEG ratio' (price/earnings to growth ratio) is a valuation metric for determining the relative trade-off between the price of a stock, the earnings generated per share (EPS), and the company's expected growth. In general, the P/E ratio is higher for a company with a higher growth rate.",
//     "52WeekHigh": "The 52-week high/low is the highest and lowest price at which a security, such as a stock, has traded during the time period that equates to one year.",
//     "52WeekLow": "The 52-week high/low is the highest and lowest price at which a security, such as a stock, has traded during the time period that equates to one year."

// };
// function wordDef(e){
    
//     console.log(e.target);
    
  
// };



// function wordDef(e){
    // console.log(e)
    // // $(".content").on("click", "span", function(e) {
    //     e.stopPropagation();
    //     var $this = $(this);
    //     word = $this.text();

    //     var dialogContent = messages[_text.toLowerCase()];
    //     if (dialogContent && dialogContent.length > 0) {
    //     $("#dialog").dialog({
    //         "modal": true,
    //         "title": word
    //     }).html(dialogContent);
    //     }
    // // });
    // };


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};


$("#stock_select").on('submit', get_stock_info);
$("#not_favorite").on('click', favorite);
$("#favorited").on('click', delete_favorite);
$(document).ready(favorite_table());
$(document).ready(load_page); 
