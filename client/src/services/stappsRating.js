

export const stappsRating = ({x, y, z, price}) => {
    const rating = 1;


    // x = annualIncome
    // y = balanceSheet
    // z = cashFlow


    // different parameters 
    var uptrendRev = 0;
    var uptrendEps = 0;
    var uptrendDiv = 0;
    var uptrendGrossMargin = 0;
    var uptrendNetMargin = 0;
    var uptrendEbitdaMargin = 0;
    var uptrendEbitMargin = 0;
    var uptrendOperatingMargin = 0;
    console.log(x)
    console.log(y)
    console.log(z)



    // price to earnings ration 
    // pe = market value per share / earnings per share
    
    const pe = price / x?.results[0]?.basicEps;
    const profitperformance = (x?.results[0]?.netIncome - x?.results[0]?.totalExpenses)
    const peg = (pe / (x?.results[0]?.basicEps-x?.results[1]?.basicEps))
    //console.log(pe)
    
    for (let i = 1; i < x?.results?.length; i++) {
        console.log("here")
        //revenue
        if (x?.results[i]?.totalRevenue > x?.results[i - 1]?.totalRevenue) {
            uptrendRev += 1;

        }
        // earnings per share
        if (x?.results[i]?.basicEps > x?.results[i - 1]?.basicEps) {
            uptrendEps += 1;
        }
       
        // gorss profit 
        if (x?.results[i]?.grossProfit > x?.results[i - 1]?.grossProfit) {
            uptrendGrossMargin += 1;
        }
        // net profit
        if (x?.results[i]?.grossProfit - x?.results[i]?.totalExpenses > x?.results[i - 1]?.grossProfit - x.results[i - 1]?.totalExpenses) {
            uptrendNetMargin += 1;
        }
        // ebitda
        if (x?.results[i]?.ebitda > x.results[i - 1]?.ebitda) {
            uptrendEbitdaMargin += 1;
        }
        // ebit
        if (x?.results[i]?.ebit > x?.results[i - 1]?.ebit) {
            uptrendEbitMargin += 1;
        }
        // operating margin
        

        // dividend per share 
        if(x.results[1].dividendPerShare){
        if (x.results[i].dividendPerShare > x.results[i - 1].dividendPerShare) {
            uptrendDiv += 1;
        }
    }
        // if (x.results[i].dividendPerShare > x.results[i - 1].dividendPerShare) {

        

    }



   
    return rating 

}