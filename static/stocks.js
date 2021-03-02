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
    }


}


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

$('#testButton').toggle(function() { console.log('this will work') }, function() { console.log('did it work?')});

// function favorites(evt){
//     $('a.btn-favorite').on('click', function() {
//         $(this).toggleClass('liked');
//         $('.favorite-text,.unfavorite-text').toggle();
//       });



// }

// $("#like").on("click", function() {
//     console.log("Hello");
//     $(this).toggleClass("bi-heart bi-heart-fill");
//     // $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);

//   })

// $("#not_favorite").toggle(function(){


//     console.log("favorite")
    
// }, function(){

//     console.log("unfavorite")

// })



    $("#favorite").toggle(function(){
        
        console.log("favorite");
        console.log(stock_id);


        var stock_id = $('#StockID').text();

        $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);
    },
    function(){
        
        
        console.log("unfavorite");
        console.log(stock_id);

        var stock_id = $('#StockID').text();

        $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);



    })




// function favorite_button()
// {function favorite(evt){
//     evt.preventDefault();

//     console.log("Hello");
    
//     $("#not_favorite").hide();
//     $("#favorited").show();

//     var stock_id = $('#StockID').text();

//     $.post('/api/favorite', {"stock_id": stock_id}, favorite_table);

//  };};


// function delete_button()
//  {function delete_favorite(evt){
//     evt.preventDefault();
//     console.log("Hello");

//     $("#favorited").hide();
//     $("#not_favorite").show();

//     var stock_id = $('#StockID').text();

//     $.post('/api/delete_favorite', {"stock_id": stock_id}, favorite_table);

//     // $('element').load('/get_content')
  

//  };};

 
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
    }
$("#stock_select").on('submit', get_stock_info);
// $("#not_favorite").on('click', favorite);
// $("#favorited").on('click', delete_favorite);
$("#modal").on('click',new_user);
$(document).ready(favorite_table());
$(document).ready(load_page);

