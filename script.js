// Users and balances in localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Login functionality
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        loadDashboard(user);
    } else {
        alert("Invalid username or password!");
    }
}

// Register functionality
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (users.some(u => u.username === username)) {
        alert("Username already exists!");
    } else {
        const newUser = { username, password, balance: 0 };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! You can now log in.");
    }
}

// Load the dashboard
function loadDashboard(user) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("welcome-message").textContent = `Welcome, ${user.username}!`;
    document.getElementById("balance").textContent = user.balance;

    if (user.username === "Sp4tan") {
        showAdminControls();
    }
}

// Show admin controls
function showAdminControls() {
    const adminControls = document.getElementById("admin-controls");
    adminControls.style.display = "block";

    const userList = document.getElementById("user-list");
    userList.innerHTML = "<h3>All Users</h3>";

    users.forEach(u => {
        userList.innerHTML += `<p>${u.username} - Balance: $${u.balance}, Password: ${u.password}</p>`;
    });
}

// Add money as admin
function addMoney() {
    const username = document.getElementById("admin-username").value;
    const amount = parseFloat(document.getElementById("admin-amount").value);

    const user = users.find(u => u.username === username);
    if (user) {
        user.balance += amount;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Added $${amount} to ${username}'s balance.`);
    } else {
        alert("User not found.");
    }
}

// Remove money as admin
function removeMoney() {
    const username = document.getElementById("admin-username").value;
    const amount = parseFloat(document.getElementById("admin-amount").value);

    const user = users.find(u => u.username === username);
    if (user) {
        user.balance -= amount;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Removed $${amount} from ${username}'s balance.`);
    } else {
        alert("User not found.");
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}
