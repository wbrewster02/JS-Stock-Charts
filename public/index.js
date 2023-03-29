function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

function findHighest(values){
    let highest = 0;
    values.forEach(value =>{
        if(parseFloat(value.high) > highest){
            highest = parseFloat(value.high)
        }
    })
    return highest;
}


function findAveage(values){
    let total = 0
    values.forEach(value=>{
        total+= parseFloat(value.high)
    })
    return total/ values.length
}




async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&apikey=52f59b7959014d76a9a4e705e6d55dae`)
    const result = await response.json();

    const {GME, MSFT, DIS, BNTX} = result;

    const stocks = [GME, MSFT, DIS, BNTX];   

    stocks.forEach( stock => stock.values.reverse())

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.reverse().map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
    new Chart(highestPriceChartCanvas.getContext('2d'),{
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
              label: 'Highest Price',
              data: stocks.map(stock =>(findHighest(stock.values))),
              backgroundColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            borderColor:stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
        }]
    }
});


new Chart(averagePriceChartCanvas.getContext('2d'),{
    type: 'pie',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
          label: 'Average Price',
          data: stocks.map(stock =>(findAveage(stock.values))),
          backgroundColor: stocks.map(stock => (
            getColor(stock.meta.symbol)
        )),
        borderColor:stocks.map(stock => (
            getColor(stock.meta.symbol)
        )),
    }]
}
});


    
    
                                                  

}

main()