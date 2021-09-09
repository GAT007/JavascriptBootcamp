//Display UI Variables



//Event Listeners
//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e){
    e.preventDefault();
    //Hide Results
    document.querySelector("#results").style.display ="none";
    //Show the loader
    document.querySelector("#loading").style.display="block";
    
    setTimeout(calculateResults,2000);
    

});

//Calculate Results
function calculateResults(){
    //UI vars
    const loanAmount = document.querySelector("#amount");
    const interest = document.querySelector("#percent");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");
    let principal = parseFloat(loanAmount.value);
    let calculatedInterest = parseFloat(interest.value)/100/12;
    let calculatedPayments = parseFloat(years.value)*12;
    //Compute the monthly payment
    let x = Math.pow(1+calculatedInterest,calculatedPayments);
    let monthly =  (principal*x*calculatedInterest)/(x-1);
    if(isFinite(monthly))
    {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        document.querySelector("#results").style.display ="block";
        document.querySelector("#loading").style.display = "none";
    }else{
        showError("Please check your numbers");
    }
}

function showError(errorMessage){
    document.querySelector("#results").style.display ="none";
    document.querySelector("#loading").style.display = "none";
    //Create a div
    const errorDiv = document.createElement("div");
    //Get elements
    const card =document.querySelector(".card");
    const heading = document.querySelector(".heading");
    //Add class
    errorDiv.className="alert alert-danger";
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(errorMessage));
    card.insertBefore(errorDiv,heading);
    //Clear error after 3 seconds
    setTimeout(clearError,3000);
}

//Clear Error function
function clearError(){
    document.querySelector(".alert").remove();
}