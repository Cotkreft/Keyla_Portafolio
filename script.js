
document.querySelectorAll("#app card").forEach((element) => {
    const image = element.dataset.image;
    const header = element.querySelector('[slot="header"]');
    const content = element.querySelector('[slot="content"]');

    const wrap = document.createElement("div");
    wrap.className = "card-wrap";
    wrap.tabIndex = 0;

    const card = document.createElement("div");
    card.className = "card";

    const background = document.createElement("div");
    background.className = "card-bg";
    background.style.backgroundImage = `url("${image}")`;

    const info = document.createElement("div");
    info.className = "card-info";

    if (header) {
        header.removeAttribute("slot");
        info.appendChild(header);
    }

    if (content) {
        content.removeAttribute("slot");
        info.appendChild(content);
    }

    card.append(background, info);
    wrap.appendChild(card);
    element.replaceWith(wrap);

    wrap.addEventListener("mousemove", (event) => {
        const rect = wrap.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
            `rotateY(${x * 24}deg) rotateX(${-y * 24}deg)`;

        background.style.transform =
            `translate(${x * -25}px, ${y * -25}px) scale(1.08)`;
    });

    wrap.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
        background.style.transform = "translate(0, 0) scale(1)";
    });

    wrap.addEventListener("focus", () => {
        card.style.transform = "translateY(-5px)";
    });

    wrap.addEventListener("blur", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
});


const typingElement = document.querySelector(".typing-text span");

const titles = [
    "Web Developer",
    "Developer",
    "Web Designer",
    "Digital media"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    typingElement.textContent = currentTitle.substring(0, characterIndex);

    let delay = deleting ? 100 : 160;

    if (!deleting && characterIndex === currentTitle.length) {
        deleting = true;
        delay = 1800;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 500;
    } else {
        characterIndex += deleting ? -1 : 1;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();
