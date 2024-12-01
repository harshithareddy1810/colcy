document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    
    const roll_number = document.getElementById('roll_number').value;
    const password = document.getElementById('password').value;
  
    if (!roll_number || !password) {
      alert('Please fill in all fields.');
      return;
    }
  
    
    if (roll_number === "23bd1a05au" && password === "1234") {
      alert('Login successful! Redirecting...');
      
      window.location.href = 'category.html'; 
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });