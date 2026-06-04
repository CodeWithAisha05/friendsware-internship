const form = document.getElementById("expenseForm");

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const customCategory = document.getElementById("customCategory");

const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

const titleError = document.getElementById("titleError");
const amountError = document.getElementById("amountError");
const categoryError = document.getElementById("categoryError");

let total = 0;

/* SHOW / HIDE CUSTOM CATEGORY INPUT */
category.addEventListener("change", function () {
    if (category.value === "Other") {
        customCategory.style.display = "block";
    } else {
        customCategory.style.display = "none";
        customCategory.value = "";
    }
});

/* FORM SUBMIT */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // reset errors
    titleError.innerText = "";
    amountError.innerText = "";
    categoryError.innerText = "";

    // VALIDATION - TITLE
    if (title.value.trim() === "") {
        titleError.innerText = "Title is required";
        isValid = false;
    }

    // VALIDATION - AMOUNT
    if (amount.value === "" || amount.value <= 0) {
        amountError.innerText = "Amount must be a positive number";
        isValid = false;
    }

    // VALIDATION - CATEGORY
    let finalCategory = category.value;

    if (category.value === "") {
        categoryError.innerText = "Please select a category";
        isValid = false;
    }

    // CUSTOM CATEGORY HANDLING
    if (category.value === "Other") {
        finalCategory = customCategory.value;

        if (finalCategory.trim() === "") {
            categoryError.innerText = "Please enter a custom category";
            isValid = false;
        }
    }

    if (!isValid) return;

    // CREATE ROW
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${title.value}</td>
    <td>PKR ${Number(amount.value).toLocaleString()}</td>
    <td>${finalCategory}</td>
    <td>
      <button onclick="deleteExpense(this, ${amount.value})">
        Delete
      </button>
    </td>
  `;

    expenseList.appendChild(row);

    // UPDATE TOTAL
    total += Number(amount.value);
    totalEl.innerText = total.toLocaleString();

    // RESET FORM
    form.reset();
    customCategory.style.display = "none";
});

/* DELETE EXPENSE */
function deleteExpense(btn, amt) {
    btn.parentElement.parentElement.remove();

    total -= Number(amt);
    totalEl.innerText = total.toLocaleString();
}