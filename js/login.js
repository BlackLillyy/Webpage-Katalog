const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");
const loginForm = document.getElementById("loginForm");
const loginResult = document.getElementById("loginResult");
const logoutBtn = document.getElementById("logoutBtn");

function checkLogin() {

  if (localStorage.getItem("token")) {
    window.location.href = "index.html"; 
  } else {
    if (loginSection) loginSection.style.display = "flex";
    if (profileSection) profileSection.style.display = "none";
  }
}
checkLogin();

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    loginResult.textContent = "Memeriksa...";

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let users = null;

    try {
      const res = await fetch("user.json", { cache: "no-store" });
      if (res.ok) {
        users = await res.json();
      }
    } catch (_) {
    }

    if (!Array.isArray(users)) {
      const stored = localStorage.getItem("users");
      if (stored) {
        users = JSON.parse(stored);
      } else {
        users = [
          { email: "test@example.com", password: "123456", name: "Akun Demo" },
        ];
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify(user));
      loginResult.textContent = "Login berhasil!";

      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 600);
    } else {
      loginResult.textContent = "Login gagal: Email atau password salah";
      loginForm.reset(); 
    }

    if (submitBtn) submitBtn.disabled = false;
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
}
