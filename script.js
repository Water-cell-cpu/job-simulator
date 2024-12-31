// Script to manage users and their bank accounts
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to register a new user
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, password, balance: 0 });
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully');
}

// Function to log in a user
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        alert('Invalid username or password');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = username === 'Sp4tan' ? 'admin.html' : 'dashboard.html';
}

// Function to log out a user
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

// Function to add money to a user's account (admin only)
function addMoney(username, amount) {
    const user = users.find(u => u.username === username);
    if (!user) {
        alert('User not found');
        return;
    }

    user.balance += parseFloat(amount);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`${amount} added to ${username}'s account`);
}

// Function to remove money from a user's account (admin only)
function removeMoney(username, amount) {
    const user = users.find(u => u.username === username);
    if (!user) {
        alert('User not found');
        return;
    }

    user.balance -= parseFloat(amount);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`${amount} removed from ${username}'s account`);
}

// Function to load users for admin panel
function loadUsers() {
    const usersTable = document.getElementById('users-table');
    usersTable.innerHTML = ''; // Clear previous entries

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.balance}</td>
            <td>
                <button onclick="addMoney('${user.username}', prompt('Enter amount to add:'))">Add Money</button>
                <button onclick="removeMoney('${user.username}', prompt('Enter amount to remove:'))">Remove Money</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}
