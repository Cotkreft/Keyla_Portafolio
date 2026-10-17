
document.addEventListener("DOMContentLoaded", () => {
    const skillItems = document.querySelectorAll(
        "#skills .skill-item"
    );

    if (!skillItems.length) return;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const skill = entry.target;
            const progress = skill.querySelector(".skill-progress");

            if (!progress) {
                observer.unobserve(skill);
                return;
            }

   
            const percent = Number(skill.dataset.percent);

            if (!Number.isFinite(percent)) {
                observer.unobserve(skill);
                return;
            }

            const level = Math.max(0, Math.min(100, percent));

            progress.style.width = `${level}%`;
            const percentLabel = skill.querySelector(".skill-percent");

            if (percentLabel) {
                const duration = 1000;
                const startTime = performance.now();

                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progressAmount = Math.min(elapsed / duration, 1);

                    const eased = 1 - Math.pow(1 - progressAmount, 3);
                    const currentValue = Math.round(eased * level);

                    percentLabel.textContent = `${currentValue}%`;

                    if (progressAmount < 1) {
                        requestAnimationFrame(updateNumber);
                    }
                }

                requestAnimationFrame(updateNumber);
            }

            observer.unobserve(skill);
        });
    }, {
        threshold: 0.2
    });

    skillItems.forEach(skill => {
        const progress = skill.querySelector(".skill-progress");

        if (progress) {
            progress.style.width = "0%";
            observer.observe(skill);
        }
    });
});
