// Initial totals
let totalIncome = 0;
let totalExpense = 0;

// Add button event listener
document.getElementById('add-btn').addEventListener('click', function() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // Validate input
    if (!description) {
        alert('Please enter a description!');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }

    // Add transaction
    addTransaction(description, amount, type);

    // Update totals
    if (type === 'income') {
        totalIncome += amount;
    } else if (type === 'expense') {
        totalExpense += amount;
    }

    // Update summary
    updateSummary();

    // Clear input fields
    clearFields();
});

// Function to add a transaction
function addTransaction(description, amount, type) {
    const transactionList = document.getElementById('transaction-list');

    // Create list item
    const listItem = document.createElement('li');
    listItem.classList.add(type);
    listItem.innerHTML = `${description}: ${amount.toFixed(2)} <button>Delete</button>`;

    // Add delete functionality
    const deleteButton = listItem.querySelector('button');
    deleteButton.addEventListener('click', function() {
        if (type === 'income') {
            totalIncome -= amount;
        } else if (type === 'expense') {
            totalExpense -= amount;
        }
        transactionList.removeChild(listItem);
        updateSummary();
    });

    // Append to transaction list
    transactionList.appendChild(listItem);
}

// Function to update the summary
function updateSummary() {
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    document.getElementById('balance').textContent = (totalIncome - totalExpense).toFixed(2);
}

// Function to clear input fields
function clearFields() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}
