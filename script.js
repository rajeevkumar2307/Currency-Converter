const amountEl = document.getElementById('amount');
const fromEl   = document.getElementById('from-currency');
const toEl     = document.getElementById('to-currency');
const resultEl = document.getElementById('result');
const btn      = document.getElementById('convert-btn');

btn.addEventListener('click', () => {
  const amount = parseFloat(amountEl.value);
  const fromCode = fromEl.value;
  const toCode   = toEl.value;

  if (isNaN(amount)) {
    resultEl.textContent = 'Please enter a valid number';
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCode}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[toCode];
      if (!rate) {
        resultEl.textContent = 'Rate not available';
        return;
      }
      const converted = (amount * rate).toFixed(2);
      resultEl.textContent = `${amount} ${fromCode} = ${converted} ${toCode}`;
    })
    .catch(err => {
      console.error(err);
      resultEl.textContent = 'Error fetching rates';
    });
});
