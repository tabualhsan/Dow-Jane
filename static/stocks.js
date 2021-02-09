
async function start() {

    const response = await fetch("https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=3LOOI2SBODXLNS10")
    const data = await response.json
    createStockList(data.message)


}


function createStockList(stocks)
    document.getElementById("Stock").innerHTML = `
    ${Object.keys(stocks).map(function (stock) {
        return `<option>${stock}</option>`
    }).join('')}     
    </select>

    `
