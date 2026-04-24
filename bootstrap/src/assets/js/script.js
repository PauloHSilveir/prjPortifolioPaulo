var root = document.documentElement;
var btn = document.getElementById("themeToggle");
var mainNav = document.querySelector(".main-nav");
var revealItems = document.querySelectorAll(".reveal-up");
var yearElement = document.getElementById("year");

function applyTheme(theme) {
    root.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    if (btn) {
        btn.innerHTML = theme === "dark"
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
}

var savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "light");

if (btn) {
    btn.addEventListener("click", function () {
        var currentTheme = root.getAttribute("data-bs-theme");
        applyTheme(currentTheme === "light" ? "dark" : "light");
    });
}

if (mainNav) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 14) {
            mainNav.classList.add("shadow-sm");
        } else {
            mainNav.classList.remove("shadow-sm");
        }
    });
}

if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
        observer.observe(item);
    });
} else {
    revealItems.forEach(function (item) {
        item.classList.add("is-visible");
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}