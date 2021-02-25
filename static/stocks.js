"use strict";

function get_stock_info(evt){
    evt.preventDefault();

    let symbol = $("#stock_symbol").val();


    $.get('/api/stock?symbol='+ symbol, updateInfo);


}


function load_page(){


    let symbol = getUrlParameter('symbol');

    if (symbol != false) {

        $.get('/api/stock?symbol='+ symbol, updateInfo);
    }
    get_price();

}



function get_price(){

    let symbol = getUrlParameter('symbol');

    
    if (symbol != false) {

        $.get('/api/price?symbol='+ symbol, (price) => {

        var last_price = (price["Time Series (1min)"][Object.keys(price["Time Series (1min)"])[0]][ "4. close"]);
        var dates = [];
        var pricesClose = [];
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        for (let i = 0; i< 12; i++){
            
            let key = last_price[i]
            console.log('key','last_price')
            pricesClose.push(last_price)
            dates.push(months)
            console.log(pricesClose)
        displayChart(symbol,dates,pricesClose)



        }
    }
        
        );
    }

}

function displayChart(symbol,dates,pricesClose){

    let labels = dates.reverse();
    let data = pricesClose.reverse();
    let myChart = document.getElementById('myChart').getContext('2d');
    let stockChart = new Chart(myChart ,{
        type: 'line',
        data:{
            labels: labels,
            datasets: [{

                label : symbol,
                borderColor: 'rgb(255, 99, 132)',
                data: data,
                lineTension: 0,


            }]
        },
        options: {}
    });





}

function getMonths() {

    let symbol = getUrlParameter('symbol');

    if (symbol != false) {

    var months = [];
    $.get('/api/monthly?symbol='+ symbol)
    for (i = 0; i < 12; i++) {
        var month = moment().subtract(i, 'months').format('MMMM Y');
        months.push(month);
    }
    return months.reverse();
}}

function updateInfo(results){
    $(".company_info").show();
    $("#StockID").html(results.StockID);
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



function favorite(evt){
    evt.preventDefault();
    
    $("#not_favorite").hide();
    $("#favorited").show();

    var stock_id = $('#StockID').text();

    $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);

 };



 function delete_favorite(evt){
    evt.preventDefault();
    

    $("#favorited").hide();
    $("#not_favorite").show();

    var stock_id = $('#StockID').text();

    $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);

    // $('element').load('/get_content')
  

 };

 
function favorite_table(){
    // console.log("we're in the favorite_table now")
    // var favs = ($.get('/api/userfavorite'));
    //     console.log(favs);

    $.get('/api/userfavorite', (favs) => {
        var favs_length = favs.length;
        $("#user_favorites").html("");
        for (var i = 0; i < favs_length; i++) {
            console.log(favs[i]);
            $("#user_favorites").append("<ul><a href ='/stocks?symbol="+favs[i][2]+"'>"+favs[i][1]+"</a></ul>");
    
        };
        
    });
    
};

// $('#button').click(function(){

//     $('#user_favorties').load(favs);
// }


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


// Get the modal
function new_user(){
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    }

$("#stock_select").on('submit', get_stock_info);
$("#not_favorite").on('click', favorite);
$("#favorited").on('click', delete_favorite);
// $('#user_favorites').load(favorite_table);
$(document).ready(favorite_table());
$(document).ready(load_page);
$("#modal").on('click',new_user);
