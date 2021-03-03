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
    console.log($("#StockID").text())
    
    if (symbol != false) {

        $.get('/api/price?symbol='+ symbol, (price) => {
        var last_price = (price["Time Series (1min)"][Object.keys(price["Time Series (1min)"])[0]][ "1. open"]);
        $("#price").html(last_price);
    }

        );
        // console.log(price);
    };

 }

// ("#like_button").click(function(){
// $("#swapHeart").toggle(function(){

//     var stock_id = $('#StockID').text();

//     $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);




// }, function (){

//     var stock_id = $('#StockID').text();

//     $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);


// })})


jQuery(function($) {
    $('#swapHeart').on('click', function() {
      var $el = $(this),
        textNode = this.lastChild;
      $el.find('span').toggleClass('glyphicon-heart glyphicon-heart-empty');
      
      $el.toggleClass('swap');
       
    // $("#unHeart").hide();
    // $("#swapHeart").show();
      var stock_id = $('#StockID').text();

      $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);
    $('#swapHeart').attr("id","unHeart")
    });
  });

jQuery(function($) {
$('#unHeart').on('click', function() {
    var $el = $(this),
    textNode = this.lastChild;
    $el.find('span').toggleClass('glyphicon-empty glyphicon-heart-heart');
    $el.toggleClass('swap');
// $("#unHeart").show();
// $("#swapHeart").hide();
    var stock_id = $('#StockID').text();

    $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);
    $('#unheart').attr("id","swapHeart")
});
});

  
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






// function favorite(evt){
//     evt.preventDefault();

//     console.log("Hello");
    
//     $("#not_favorite").hide();
//     $("#favorited").show();

//     var stock_id = $('#StockID').text();

//     $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);

// };


//  function delete_favorite(evt){
//     evt.preventDefault();
//     console.log("Hello");

//     $("#favorited").hide();
//     $("#not_favorite").show();

//     var stock_id = $('#StockID').text();

//     $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);
//  };
//     // $('element').load('/get_content')
  



 
function favorite_table(){
    // console.log("we're in the favorite_table now")
    // var favs = ($.get('/api/userfavorite'));
    //     console.log(favs);

    $.get('/api/userfavorite', (favs) => {
        var favs_length = favs.length;
        $("#user_favorites").html("");
        for (var i = 0; i < favs_length; i++) {
            // console.log(favs[i]);
            $("#user_favorites").append("<ul><a href ='/stocks?symbol="+favs[i][2]+"'>"+favs[i][1]+"</a></ul>");
    
        };
        
    });
    
};



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
    };


    $("#stock_select").on('submit', get_stock_info);
    // $("#not_favorite").on('click', favorite);
    // $("#favorited").on('click', delete_favorite);
    $("#modal").on('click',new_user);
    $(document).ready(favorite_table());
    $(document).ready(load_page);
// *****************************************chart*******************************************************************

displayPrices();
function displayPrices(){

let duration = $("#duration").val();

if (duration == null) {
duration = 12

};

console.log("hellll")

let symbol = getUrlParameter('symbol');

var xmlhttp = new XMLHttpRequest(),
    url = `http://localhost:5000/api/monthly?symbol=${symbol}`;
    console.log(url);

xmlhttp.open('GET', url, true);
xmlhttp.onload = function() {
if (this.readyState == 4 && this.status == 200) {
    let json=JSON.parse(this.responseText);
    let keys = Object.keys(json['Monthly Time Series']);
    var dates = [];
    var pricesClose = [];
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    for (let i=0; i<duration; i++) {
    let key = keys[i];
    pricesClose.push(json['Monthly Time Series'][key]['4. close']);
    dates.push(months[Number(key.slice(5, 7) - 1)] + key.slice(2, 4));
    }

    displayChart(symbol, dates, pricesClose)
}
};
xmlhttp.send();
}

function displayChart(symbol, dates, pricesClose) {
let labels = dates;
let data = pricesClose;

let ctx = document.getElementById('stock-chart').getContext('2d');
let chart = new Chart(ctx, {
    
    type: 'line',

    
    data: {
        labels: labels,
        datasets: [{
            label: symbol,
            borderColor: 'rgb(255, 99, 132)',
            data: data,
            lineTension: 0,
        }]
    },

    
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});
}

// $("#stock_select").on('submit', get_stock_info);
// // $("#not_favorite").on('click', favorite);
// // $("#favorited").on('click', delete_favorite);
// $("#modal").on('click',new_user);
// $(document).ready(favorite_table());
// $(document).ready(load_page);