function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields required");
    return;
  }

  const user = { name, email, password };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful!");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== email || user.password !== password) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("loggedIn", true);
  alert("Login successful!");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
