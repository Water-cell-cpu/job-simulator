// Load users from localStorage or initialize with default admin
const defaultAdmin = [{ username: "Sp4tan", password: "Elipson Eridani 2", balance: 0, isAdmin: true }];
let users = JSON.parse(localStorage.getItem("users")) || defaultAdmin;

// Ensure users is always an array
if (!Array.isArray(users)) {
  users = defaultAdmin;
  saveUsers();
}

// Save updated users list to localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Login function
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Ensure users is an array
  if (!Array.isArray(users)) {
    alert("User data is corrupted. Resetting to default.");
    users = defaultAdmin;
    saveUsers();
    return;
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    if (user.isAdmin) {
      showAdminPanel();
    } else {
      showUserDashboard(user);
    }
  } else {
    alert("Invalid credentials!");
  }
}

// Register function
function register() {
  const newUsername = document.getElementById("new-username").value;
  const newPassword = document.getElementById("new-password").value;

  if (!newUsername || !newPassword) {
    alert("Please fill in all fields!");
    return;
  }

  const existingUser = users.find(u => u.username === newUsername);
  if (existingUser) {
    alert("Username already exists!");
    return;
  }

  users.push({ username: newUsername, password: newPassword, balance: 0, isAdmin: false });
  saveUsers();
  alert("Registration successful! You can now log in.");
  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";
}

// Display admin panel
function showAdminPanel() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("admin-panel").style.display = "block";

  const userList = document.getElementById("user-list");
  userList.innerHTML = "<h3>Users:</h3>";
  users.forEach(user => {
    userList.innerHTML += `<p>${user.username} (Password: ${user.password}, Balance: $${user.balance})</p>`;
  });
}

// Display user dashboard
function showUserDashboard(user) {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("user-dashboard").style.display = "block";
  document.getElementById("user-name").textContent = user.username;
  document.getElementById("balance").textContent = user.balance;
}

// Logout function
function logout() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("register-section").style.display = "block";
  document.getElementById("admin-panel").style.display = "none";
  document.getElementById("user-dashboard").style.display = "none";

  // Clear inputs
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";
}

// Save initial admin user if localStorage was empty
saveUsers();
