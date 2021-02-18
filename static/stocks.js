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

};
const messages = {
    "EPS": "Earnings Per Share (EPS) - is defined as Net Income divided by the total number of outstanding shares. This measure tells you the accounting profit of the company that each share is entitled to. ",
    "Dividend Yield": "The ratio of the company's annual dividend compared to its share price.",
    "Dividend Per Share" : "The sum of declared dividends issued by a company for every ordinary share outstanding.",
    "PERRatio": "The ratio for valuing a company that measures its current share price relative to its per-share earnings (EPS). The price-to-earnings ratio is also sometimes known as the price multiple or the earnings multiple.",
    "PEGratio": "The 'PEG ratio' (price/earnings to growth ratio) is a valuation metric for determining the relative trade-off between the price of a stock, the earnings generated per share (EPS), and the company's expected growth. In general, the P/E ratio is higher for a company with a higher growth rate.",
    "52WeekHigh": "The 52-week high/low is the highest and lowest price at which a security, such as a stock, has traded during the time period that equates to one year.",
    "52WeekLow": "The 52-week high/low is the highest and lowest price at which a security, such as a stock, has traded during the time period that equates to one year."

};
function wordDef(e){
    
    console.log(e.target);
    
  
};



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


$("#stock_select").on('submit', get_stock_info);
$("#not_favorite").on('click', favorite);
$(".toggle-info").load('/api/stocks?symbol=A');
$(document).ready(favorite_table());
