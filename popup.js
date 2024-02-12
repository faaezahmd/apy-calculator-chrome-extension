document.addEventListener('DOMContentLoaded', function () {
  const calculateBtn = document.getElementById('calculateBtn');
  const principalInput = document.getElementById('principal');
  const interestRateInput = document.getElementById('interestRate');
  const intervalsInput = document.getElementById('intervals');
  const periodTypeSelect = document.getElementById('periodType');
  const resultDisplay = document.getElementById('result');
  const resultContainer = document.createElement('table');

  calculateBtn.addEventListener('click', function () {
    const principal = parseFloat(principalInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const intervals = parseInt(intervalsInput.value);
    const periodType = periodTypeSelect.value;

    resultContainer.innerHTML = `<tr>
      <th>Year</th>
      <th>Future Value</th>
      <th>Interest Earned</th>
      <th>Balance</th>
    </tr>`; // Clear previous results

    for (let year = 1; year <= intervals; year++) {
      const { futureValue, interestEarned } = calculateAPY(principal, interestRate, year, periodType);
      const yearResult = document.createElement('tr');
      yearResult.innerHTML = `
        <td><strong>${year}</strong></td>
        <td>$${futureValue.toFixed(2)}</td>
        <td>$${interestEarned.toFixed(2)}</td>
        <td>$${(futureValue + interestEarned).toFixed(2)}</td>
      `;
      resultContainer.appendChild(yearResult);
    }

    resultDisplay.innerHTML = ''; // Clear previous results
    resultDisplay.appendChild(resultContainer);
    resultDisplay.style.display = 'block';
  });

  function calculateAPY(principal, interestRate, year, periodType) {
    let compoundRate;
    let periods;

    switch (periodType) {
      case 'yearly':
        compoundRate = interestRate / 100;
        periods = year;
        break;
      case 'semi-annually':
        compoundRate = interestRate / (2 * 100);
        periods = year * 2;
        break;
      case 'quarterly':
        compoundRate = interestRate / (4 * 100);
        periods = year * 4;
        break;
      case 'monthly':
        compoundRate = interestRate / (100 * 12);
        periods = year * 12;
        break;
      case 'daily':
        compoundRate = interestRate / (100 * 365);
        periods = year * 365;
        break;
      // Add cases for other compounding frequencies as needed
      default:
        compoundRate = interestRate / 100;
        periods = year;
    }

    const futureValue = principal * Math.pow(1 + compoundRate, periods);
    const interestEarned = futureValue - principal;

    return { futureValue, interestEarned };
  }
});
