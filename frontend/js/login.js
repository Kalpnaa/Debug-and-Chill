document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const role = document.getElementById("login-role").value; // ✅ Added this line

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }), // ✅ Included role
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      // Redirect based on role
      window.location.href = `${role}.html`;
    }else{
      alert(data.message || "Login Failed");
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Error logging in.");
  }
});
