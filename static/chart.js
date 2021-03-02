displayPrices();
function displayPrices(){
  
let duration = $("#duration").val();

if (duration == null) {
  duration = 12
  
}


let symbol = getUrlParameter('symbol');

var xmlhttp = new XMLHttpRequest(),
    url = `http://localhost:5000/api/monthly?symbol=${symbol}`;
    console.log(url);

xmlhttp.open('GET', url, true);
xmlhttp.onload = function() {
  if (this.readyState == 4 && this.status == 200) {
    json=JSON.parse(this.responseText);
    let keys = Object.keys(json['Monthly Time Series']);
    var dates = [];
    var pricesClose = [];
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    // get prices for last no. of months
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
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: labels,
          datasets: [{
              label: symbol,
              borderColor: 'rgb(255, 99, 132)',
              data: data,
            lineTension: 0,
          }]
      },

      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
  });
}