document.addEventListener("DOMContentLoaded", function () {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark");
            themeIcon.textContent = document.body.classList.contains("dark") ? "☾" : "☼";
        });
    }

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

    setTimeout(function () {
        document.querySelectorAll(".hero .reveal").forEach(function (element) {
            element.classList.add("active");
        });
    }, 300);

    const cursor = document.getElementById("cursor");
    const cursorDot = document.getElementById("cursorDot");

    if (window.matchMedia("(pointer:fine)").matches && cursor && cursorDot) {
        document.addEventListener("mousemove", function (event) {
            cursor.style.left = event.clientX + "px";
            cursor.style.top = event.clientY + "px";
            cursorDot.style.left = event.clientX + "px";
            cursorDot.style.top = event.clientY + "px";
        });

        document.querySelectorAll("a, button, .project, .skill").forEach(function (element) {
            element.addEventListener("mouseenter", function () {
                cursor.style.width = "48px";
                cursor.style.height = "48px";
            });

            element.addEventListener("mouseleave", function () {
                cursor.style.width = "30px";
                cursor.style.height = "30px";
            });
        });
    }

    document.querySelectorAll(".project").forEach(function (project) {
        const visual = project.querySelector(".project-visual");
        if (!visual) return;

        project.addEventListener("mousemove", function (event) {
            if (window.innerWidth <= 800) return;

            const rect = project.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            visual.style.transform =
                "perspective(800px) rotateY(" + (x * 3) +
                "deg) rotateX(" + (y * -3) + "deg) scale(1.02)";
        });

        project.addEventListener("mouseleave", function () {
            visual.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
        });
    });
});
