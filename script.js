const form = document.getElementById("expenseForm");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

// error elements
const titleError = document.getElementById("titleError");
const amountError = document.getElementById("amountError");
const categoryError = document.getElementById("categoryError");

let total = 0;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // RESET ERRORS
    titleError.innerText = "";
    amountError.innerText = "";
    categoryError.innerText = "";

    // VALIDATION 1: TITLE
    if (title.value.trim() === "") {
        titleError.innerText = "Title is required";
        isValid = false;
    }

    // VALIDATION 2: AMOUNT
    if (amount.value === "" || amount.value <= 0) {
        amountError.innerText = "Amount must be a positive number";
        isValid = false;
    }

    // VALIDATION 3: CATEGORY
    if (category.value === "") {
        categoryError.innerText = "Please select a category";
        isValid = false;
    }

    // STOP IF INVALID
    if (!isValid) {
        return;
    }

    // CREATE ROW
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${title.value}</td>
    <td>PKR ${Number(amount.value).toLocaleString()}</td>
    <td>${category.value}</td>
    <td><button onclick="deleteExpense(this, ${amount.value})">Delete</button></td>
  `;

    expenseList.appendChild(row);

    // UPDATE TOTAL
    total += Number(amount.value);
    totalEl.innerText = total.toLocaleString();

    // RESET FORM
    form.reset();
});

// DELETE FUNCTION
function deleteExpense(btn, amt) {
    btn.parentElement.parentElement.remove();

    total -= Number(amt);
    totalEl.innerText = total.toLocaleString();
}