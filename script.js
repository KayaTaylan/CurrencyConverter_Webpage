// Function to fetch currency codes from ExchangeRate-API
async function fetchCurrencyCodes() {
    const response = await fetch('https://open.er-api.com/v6/latest');
    const data = await response.json();

    const currencies = Object.keys(data.rates);
    const selectFrom = document.getElementById('fromCurrency');
    const selectTo = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');

        optionFrom.value = currency;
        optionTo.value = currency;

        optionFrom.textContent = currency;
        optionTo.textContent = currency;

        selectFrom.appendChild(optionFrom);
        selectTo.appendChild(optionTo);
    });
}

// Function to convert currency
async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    const response = await fetch(`https://open.er-api.com/v6/latest`);
    const data = await response.json();

    const rate = data.rates[toCurrency] / data.rates[fromCurrency];
    const result = (amount * rate).toFixed(2);

    document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
}

// Load currency codes when the page loads
window.onload = fetchCurrencyCodes;
