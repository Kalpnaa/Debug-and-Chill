document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "admin") window.location.href = "admin.html";
      else if (data.role === "member") window.location.href = "member.html";
      else if (data.role === "viewer") window.location.href = "viewer.html";
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Error logging in.");
  }
});
