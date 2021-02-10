"use strict";


async function start() {


    const response = await fetch("https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=3LOOI2SBODXLNS10") 
    const data = await response.json()
    
}



start()

function createStockList(stockList){
    document.getElementById("stocks").innerHTML = `
    <option> Choose a Stock</option>
        ${Object.keys(stockList).map(function (stocks) {
            return `<option>${stocks}</option>`
        }).join('')}     
        </select>

    `
}