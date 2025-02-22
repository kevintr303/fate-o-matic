'use strict';

const DECISION_RESPONSES = [
    "Absolutely!",
    "Not in a million years.",
    "Maybe... who knows?",
    "Definitely yes!",
    "I don't think so.",
    "It is certain.",
    "Ask again later.",
    "Very doubtful.",
    "Sure, if you like bad decisions.",
    "Nah, I'm good.",
    "Do you really need me for this?",
    "Let’s pretend you didn’t ask that.",
    "Go for it... or don't. I don't care.",
    "This feels like a mistake already.",
    "Flip a coin. I’m on break.",
    "You’ll regret it either way.",
    "Only if you’re ready for chaos.",
    "100% yes! (Results may vary.)",
    "Try again when Mercury isn’t in retrograde.",
    "Follow your heart… unless it’s dumb.",
    "You’re better off asking a magic 8-ball.",
    "I would, but I have better judgment.",
    "Error 404: Decision not found.",
    "Honestly? Who cares.",
    "I mean… sure? Maybe?",
    "Let’s pretend I didn’t hear that.",
    "No. Just no.",
    "This question stresses me out.",
    "Proceed at your own risk.",
    "What’s the worst that could happen?",
    "Have you considered just flipping a coin?",
    "If you have to ask, probably not.",
    "I’d tell you, but then I'd have to judge you.",
    "Sounds like a future-you problem.",
    "Eh, you do you.",
    "Follow your gut… unless it's full of bad ideas.",
    "Do it for the plot.",
    "Let’s roll the dice and see what happens.",
    "Nope. Next question.",
    "If you need me to decide, it's probably a bad idea.",
    "Go touch grass instead.",
    "Consult your horoscope first.",
    "Just send it. Full send.",
    "Even I don’t believe that’s a good idea.",
    "Only if you're feeling brave.",
    "The internet has failed you today.",
    "Yes! But also no.",
    "Your call, I take no responsibility.",
    "I’d answer, but my lawyer advised against it.",
    "The prophecy says... unclear.",
    "One does not simply make this decision.",
    "I ran the numbers... and they were imaginary."
];

const decisionCard = document.getElementById('decision-card');
const spotlightOverlay = document.getElementById('overlay');
const drumrollAudio = document.getElementById('drumroll-audio');
const revealAudio = document.getElementById('reveal-audio');
const initialCardContent = decisionCard.innerHTML;

function getRandomDecision() {
    return DECISION_RESPONSES[Math.floor(Math.random() * DECISION_RESPONSES.length)];
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function triggerConfettiEffect() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animateSpotlightTo(targetX, targetY, duration) {
    const startTime = performance.now();
    const currentX = parseFloat(spotlightOverlay.style.getPropertyValue('--spotlight-x')) || window.innerWidth / 2;
    const currentY = parseFloat(spotlightOverlay.style.getPropertyValue('--spotlight-y')) || window.innerHeight / 2;
    return new Promise(resolve => {
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutQuad(progress);
            const newX = currentX + (targetX - currentX) * easedProgress;
            const newY = currentY + (targetY - currentY) * easedProgress;
            spotlightOverlay.style.setProperty('--spotlight-x', `${newX}px`);
            spotlightOverlay.style.setProperty('--spotlight-y', `${newY}px`);
            spotlightOverlay.style.background = `
        radial-gradient(
          circle at ${newX}px ${newY}px,
          rgba(255, 255, 255, 0.25) 100px,
          rgba(0, 0, 0, 0.95) 160px
        )
      `;
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}

async function animateSpotlightPath() {
    const points = [];
    const numPoints = 7;
    for (let i = 0; i < numPoints; i++) {
        points.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
    }
    points.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    for (const point of points) {
        await animateSpotlightTo(point.x, point.y, 400);
    }
}

function initializeDecisionButton() {
    const decisionButton = document.getElementById('decision-button');
    decisionButton.addEventListener('click', processDecision);
    const userInput = document.getElementById('user-input');
    userInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !decisionButton.disabled) {
            decisionButton.click();
        }
    });
}

function triggerShake() {
    decisionCard.classList.add('shake');
    setTimeout(() => decisionCard.classList.remove('shake'), 500);
}

async function processDecision() {
    const decisionButton = document.getElementById('decision-button');
    decisionButton.disabled = true;
    spotlightOverlay.classList.add('active');
    await delay(500);
    drumrollAudio.currentTime = 0;
    try {
        await drumrollAudio.play();
    } catch (error) {
        console.error("Drumroll playback error:", error);
    }
    decisionCard.classList.remove('fade-in');
    decisionCard.classList.add('exit');
    await delay(600);
    await animateSpotlightPath();
    revealAudio.currentTime = 0;
    try {
        await revealAudio.play();
    } catch (error) {
        console.error("Audio playback error:", error);
    }
    const decision = getRandomDecision();
    decisionCard.innerHTML = `<h1 class="decision-text">${decision}</h1>`;
    decisionCard.classList.remove('exit');
    decisionCard.classList.add('enter');
    triggerShake();
    spotlightOverlay.classList.remove('active');
    triggerConfettiEffect();
    await delay(800);
    decisionCard.classList.add('zoom-in');
    await delay(3000);
    decisionCard.classList.remove('enter', 'zoom-in');
    decisionCard.classList.add('exit');
    await delay(600);
    decisionCard.innerHTML = initialCardContent;
    decisionCard.classList.remove('exit');
    decisionCard.classList.add('fade-in');
    setTimeout(initializeDecisionButton, 800);
}

const floatingWordsContainer = document.getElementById('floating-words');
const floatingWordsData = [];
const floatingWordsList = [
    "Why?",
    "What's the meaning of life?",
    "Really?",
    "How?",
    "What now?",
    "Hmmm...",
    "Are you sure?",
    "Maybe?",
    "Is this real?",
    "What if?",
    "Who decided this?",
    "When did it all begin?",
    "Do you even know?",
    "What's the catch?",
    "Can you prove it?",
    "Are we alone?",
    "Is this a glitch?",
    "Why not?",
    "What am I missing?",
    "Is this a test?",
    "What do you expect?",
    "Is that all there is?",
    "Does this ever end?",
    "Have you tried turning it off and on again?",
    "Am I dreaming?",
    "Is it supposed to be like this?",
    "Wait, what?",
    "What comes next?",
    "Do you trust it?",
    "Is this fate?",
    "What's stopping you?",
    "Are we in a loop?",
    "Why does it feel like this?",
    "What’s the worst that could happen?",
    "Is it too late?",
    "What’s the secret?",
    "What happens if you don't?",
    "Who’s watching?",
    "Will it ever make sense?",
    "Where did I go wrong?",
    "Does it even matter?",
    "What’s the point?",
    "Are you watching closely?",
    "How deep does it go?",
    "Are you still there?",
    "Is it working?",
    "Is this what you wanted?"
];

function initFloatingWords() {
    floatingWordsList.forEach(text => {
        const el = document.createElement('div');
        el.className = 'floating-word';
        el.textContent = text;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        floatingWordsContainer.appendChild(el);
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        floatingWordsData.push({ element: el, x, y, dx, dy });
    });
}

function updateFloatingWords() {
    floatingWordsData.forEach(word => {
        word.x += word.dx;
        word.y += word.dy;
        if (word.x < 0 || word.x > window.innerWidth - 50) {
            word.dx *= -1;
        }
        if (word.y < 0 || word.y > window.innerHeight - 20) {
            word.dy *= -1;
        }
        word.element.style.left = `${word.x}px`;
        word.element.style.top = `${word.y}px`;
    });
    requestAnimationFrame(updateFloatingWords);
}

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const repulsionRadius = 100;
    floatingWordsData.forEach(word => {
        const rect = word.element.getBoundingClientRect();
        const wordCenterX = rect.left + rect.width / 2;
        const wordCenterY = rect.top + rect.height / 2;
        const distX = wordCenterX - mouseX;
        const distY = wordCenterY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(distY, distX);
            word.dx += Math.cos(angle) * force * 0.05;
            word.dy += Math.sin(angle) * force * 0.05;
            const maxSpeed = 1.5;
            const speed = Math.sqrt(word.dx * word.dx + word.dy * word.dy);
            if (speed > maxSpeed) {
                word.dx = (word.dx / speed) * maxSpeed;
                word.dy = (word.dy / speed) * maxSpeed;
            }
        }
    });
});

window.addEventListener('load', () => {
    initFloatingWords();
    updateFloatingWords();
    decisionCard.classList.remove('hidden');
    decisionCard.classList.add('fade-in');
    setTimeout(initializeDecisionButton, 800);
    spotlightOverlay.style.setProperty('--spotlight-x', `${window.innerWidth / 2}px`);
    spotlightOverlay.style.setProperty('--spotlight-y', `${window.innerHeight / 2}px`);
});
