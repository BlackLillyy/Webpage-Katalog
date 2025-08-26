const loadingTime = 5000; // 5 detik

window.addEventListener("load", function() {
  const loadingOverlay = document.getElementById("loading-overlay");

  setTimeout(() => {
    loadingOverlay.classList.add("hidden");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 500); 
  }, loadingTime);
});
