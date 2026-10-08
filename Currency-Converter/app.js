
const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const amount = document.querySelector(".amount input");
const form = document.querySelector("form");
const msg = document.querySelector(".msg");


// Add currencies to dropdowns
for (let select of dropdowns) {

    for (let currCode in countryList) {

        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;

        // Default From currency
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }

        // Default To currency
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }


    // Change flag when currency changes
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


// Change Flag
const updateFlag = (element) => {

    let currCode = element.value;

    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};


// Currency Conversion
form.addEventListener("submit", async (evt) => {

    evt.preventDefault();

    let amountValue = Number(amount.value);

    // Check amount
    if (amountValue < 1 || isNaN(amountValue)) {

        amountValue = 1;
        amount.value = 1;
    }


    // API URL
    const URL =
        `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    console.log("API URL:", URL);


    try {

        let response = await fetch(URL);

        let data = await response.json();

        console.log("API Data:", data);


        // Get exchange rate
        let rate =
            data[fromCurr.value.toLowerCase()]
                [toCurr.value.toLowerCase()];

        console.log("Exchange Rate:", rate);


        // Check rate
        if (rate === undefined) {
            msg.innerText = "Exchange rate not found.";
            return;
        }


        // Calculate final amount
        let finalAmount = amountValue * rate;


        // Show result
        msg.innerText =
            `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    } catch (error) {

        console.log("Error:", error);

        msg.innerText =
            "Unable to get exchange rate.";
    }

});
