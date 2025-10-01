// App logic
let budgets = { needs: 0, wants: 0, savings: 0 };
let remaining = { needs: 0, wants: 0, savings: 0 };
let expenses = { needs: [], wants: [], savings: [] };

window.onload = function () {
  const savedData = JSON.parse(localStorage.getItem("salaryApp"));
  if (savedData) {
    budgets = savedData.budgets;
    remaining = savedData.remaining;
    expenses = savedData.expenses;
    document.getElementById("salary").value = savedData.salary;
    updateUI();
    showTab("dashboard");
  } else {
    showTab("dashboard");
  }
};

function calculateSplit() {
  const salary = parseFloat(document.getElementById("salary").value);
  if (isNaN(salary) || salary <= 0) return;

  budgets.needs = salary * 0.5;
  budgets.wants = salary * 0.3;
  budgets.savings = salary * 0.2;

  remaining = { ...budgets };
  expenses = { needs: [], wants: [], savings: [] };

  saveData(salary);
  updateUI();
  showTab("dashboard");
}

function addExpense(category) {
  const input = document.getElementById(category + "Spent");
  const value = parseFloat(input.value);
  if (isNaN(value) || value <= 0) return;

  expenses[category].push(value);
  remaining[category] -= value;

  input.value = "";
  saveData(document.getElementById("salary").value);
  updateUI();
}

function updateUI() {
  document.getElementById("needsBudget").innerText = budgets.needs.toFixed(2);
  document.getElementById("wantsBudget").innerText = budgets.wants.toFixed(2);
  document.getElementById("savingsBudget").innerText = budgets.savings.toFixed(2);

  document.getElementById("needsRemaining").innerText = remaining.needs.toFixed(2);
  document.getElementById("wantsRemaining").innerText = remaining.wants.toFixed(2);
  document.getElementById("savingsRemaining").innerText = remaining.savings.toFixed(2);

  renderList("needs");
  renderList("wants");
  renderList("savings");
}

function renderList(category) {
  const list = document.getElementById(category + "List");
  list.innerHTML = "";
  expenses[category].forEach((exp, i) => {
    const div = document.createElement("div");
    div.className = "flex justify-between border-b py-1";
    div.innerHTML = `<span>Expense ${i + 1}</span><span>$${exp.toFixed(2)}</span>`;
    list.appendChild(div);
  });
}

function saveData(salary) {
  const data = { salary, budgets, remaining, expenses };
  localStorage.setItem("salaryApp", JSON.stringify(data));
}

function clearAll() {
  localStorage.removeItem("salaryApp");
  budgets = { needs: 0, wants: 0, savings: 0 };
  remaining = { needs: 0, wants: 0, savings: 0 };
  expenses = { needs: [], wants: [], savings: [] };
  document.getElementById("salary").value = "";
  updateUI();
  showTab("dashboard");
}

function showTab(tab) {
  document.getElementById("dashboardTab").classList.add("hidden");
  document.getElementById("historyTab").classList.add("hidden");
  document.getElementById("tabDashboard").classList.remove("border-b-4", "border-blue-500", "text-blue-600");
  document.getElementById("tabHistory").classList.remove("border-b-4", "border-blue-500", "text-blue-600");

  if (tab === "dashboard") {
    document.getElementById("dashboardTab").classList.remove("hidden");
    document.getElementById("tabDashboard").classList.add("border-b-4", "border-blue-500", "text-blue-600");
  } else {
    document.getElementById("historyTab").classList.remove("hidden");
    document.getElementById("tabHistory").classList.add("border-b-4", "border-blue-500", "text-blue-600");
  }
}