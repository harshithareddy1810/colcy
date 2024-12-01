document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (!name || !email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }
  alert(`Welcome, ${name}! Your account has been created.`);
  window.location.href = "login.html";
});