function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) {
    alert("Admin not configured");
    return;
  }

  if (email === admin.email && password === admin.password) {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials ❌");
  }
}
