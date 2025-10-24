// Countdown Timer to Birthday
function startCountdown() {
    const birthdayDate = new Date('October 25, 2025 00:00:00').getTime();
    
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthdayDate - now;
        
        // Calculate time units
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Check if countdown finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            // Show lock screen
            document.getElementById('countdownScreen').style.animation = 'fadeOut 1s ease forwards';
            setTimeout(() => {
                document.getElementById('countdownScreen').remove();
                document.getElementById('lockScreen').classList.remove('hidden');
            }, 1000);
        }
    }, 1000);
}

// Start countdown on page load
window.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});

// Password Check (Answer: 10 - number of carnation flowers)
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (input === '10') {
        // Correct password
        document.getElementById('lockScreen').style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            document.getElementById('lockScreen').remove();
            document.getElementById('mainContent').classList.remove('hidden');
            startFloatingHearts();
            celebrateUnlock();
        }, 500);
    } else if (input === '') {
        errorMsg.textContent = '🤔 Please enter a number!';
        shakeElement(document.querySelector('.lock-container'));
    } else {
        errorMsg.textContent = '❌ Not quite! Think about the bouquet... 🌸';
        shakeElement(document.querySelector('.lock-container'));
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Shake animation for wrong password
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// Allow Enter key to submit password
document.getElementById('passwordInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Celebrate unlock with confetti effect
function celebrateUnlock() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)];
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.animation = 'confettiFall ' + (2 + Math.random() * 2) + 's linear forwards';
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Floating Hearts
function startFloatingHearts() {
    setInterval(() => {
        createFloatingHeart();
    }, 2000);
}

function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
}

// Bouquet Collection
function collectBouquet() {
    const bouquet = document.querySelector('.bouquet-wrap');
    const btn = document.getElementById('bouquetBtn');
    
    bouquet.style.animation = 'collectAnimation 1s ease forwards';
    btn.textContent = 'Collected! 💖';
    btn.disabled = true;
    btn.style.background = '#90ee90';
    
    setTimeout(() => {
        createSparkles(bouquet);
    }, 500);
    
    // Show game section after a delay
    setTimeout(() => {
        document.querySelector('.game-section').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

const collectStyle = document.createElement('style');
collectStyle.textContent = `
    @keyframes collectAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(0.95); }
    }
`;
document.head.appendChild(collectStyle);

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkleOut 1s ease forwards';
        sparkle.style.setProperty('--angle', Math.random() * 360 + 'deg');
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleOut {
        to {
            transform: translate(
                calc(cos(var(--angle)) * 100px),
                calc(sin(var(--angle)) * 100px)
            );
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Game Logic
let gameActive = false;
let score = 0;
let basketPosition = 50;
let gameInterval;
let flowerInterval;

function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('gameBtn').textContent = 'Playing...';
    document.getElementById('gameBtn').disabled = true;
    
    const gameArea = document.getElementById('gameArea');
    const basket = document.getElementById('basket');
    
    // Touch and mouse controls
    let isDragging = false;
    
    function updateBasketPosition(clientX) {
        const rect = gameArea.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const percentage = (relativeX / rect.width) * 100;
        basketPosition = Math.max(5, Math.min(95, percentage));
        basket.style.left = basketPosition + '%';
    }
    
    // Mouse events
    gameArea.addEventListener('mousemove', (e) => {
        if (gameActive) {
            updateBasketPosition(e.clientX);
        }
    });
    
    // Touch events
    gameArea.addEventListener('touchmove', (e) => {
        if (gameActive) {
            e.preventDefault();
            updateBasketPosition(e.touches[0].clientX);
        }
    }, { passive: false });
    
    // Start spawning flowers
    flowerInterval = setInterval(() => {
        if (gameActive) spawnFlower();
    }, 1000);
    
    // Check win condition
    gameInterval = setInterval(() => {
        if (score >= 22) {
            endGame(true);
        }
    }, 100);
}

function spawnFlower() {
    const gameArea = document.getElementById('gameArea');
    const flower = document.createElement('div');
    flower.className = 'falling-flower';
    flower.textContent = ['🌸', '🌺', '🌹', '🌷', '🌻'][Math.floor(Math.random() * 5)];
    flower.style.left = Math.random() * 90 + '%';
    flower.style.animationDuration = (2 + Math.random()) + 's';
    gameArea.appendChild(flower);
    
    // Check collision
    const checkCollision = setInterval(() => {
        if (!gameActive || !flower.parentElement) {
            clearInterval(checkCollision);
            return;
        }
        
        const flowerRect = flower.getBoundingClientRect();
        const basketRect = document.getElementById('basket').getBoundingClientRect();
        
        if (flowerRect.bottom >= basketRect.top &&
            flowerRect.top <= basketRect.bottom &&
            flowerRect.left <= basketRect.right &&
            flowerRect.right >= basketRect.left) {
            score++;
            document.getElementById('score').textContent = score;
            flower.remove();
            clearInterval(checkCollision);
            createCatchEffect(basketRect);
        }
    }, 50);
    
    setTimeout(() => {
        if (flower.parentElement) flower.remove();
        clearInterval(checkCollision);
    }, 3500);
}

function createCatchEffect(rect) {
    const effect = document.createElement('div');
    effect.textContent = '+1 ✨';
    effect.style.position = 'fixed';
    effect.style.left = rect.left + rect.width / 2 + 'px';
    effect.style.top = rect.top + 'px';
    effect.style.fontSize = '24px';
    effect.style.fontWeight = 'bold';
    effect.style.color = '#ff1493';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '9999';
    effect.style.animation = 'scoreUp 1s ease forwards';
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 1000);
}

const scoreUpStyle = document.createElement('style');
scoreUpStyle.textContent = `
    @keyframes scoreUp {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(scoreUpStyle);

function endGame(won) {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(flowerInterval);
    
    const btn = document.getElementById('gameBtn');
    
    if (won) {
        btn.textContent = 'You Won! 🎉';
        btn.style.background = '#90ee90';
        
        // Show cake section
        setTimeout(() => {
            const cakeSection = document.getElementById('cakeSection');
            cakeSection.classList.remove('hidden');
            cakeSection.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        
        // Celebration
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createConfetti(), i * 50);
        }
    } else {
        btn.textContent = 'Try Again!';
        btn.disabled = false;
    }
}

// Eat Cake
let bites = 0;
function eatCake() {
    bites++;
    const cakeSlice = document.querySelector('.cake-slice');
    const btn = document.getElementById('eatBtn');
    
    cakeSlice.style.transform = 'translateX(-50%) scale(' + (1 - bites * 0.2) + ')';
    cakeSlice.style.opacity = (1 - bites * 0.2);
    
    if (bites >= 3) {
        btn.textContent = 'Delicious! 😋';
        btn.disabled = true;
        btn.style.background = '#90ee90';
        
        setTimeout(() => {
            cakeSlice.style.display = 'none';
            const plate = document.querySelector('.plate');
            plate.innerHTML += '<div style="text-align: center; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); font-size: 3em;">😋</div>';
        }, 500);
        
        // Show letter section
        setTimeout(() => {
            const letterSection = document.getElementById('letterSection');
            letterSection.classList.remove('hidden');
            letterSection.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    } else {
        btn.textContent = 'Take Another Bite! 🍴';
    }
}

// Open Envelope
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const letter = document.getElementById('letter');
    
    envelope.classList.add('open');
    
    setTimeout(() => {
        letter.classList.remove('hidden');
        letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show fireworks section after reading letter
        setTimeout(() => {
            const fireworksSection = document.getElementById('fireworksSection');
            fireworksSection.classList.remove('hidden');
            fireworksSection.scrollIntoView({ behavior: 'smooth' });
        }, 3000);
    }, 800);
}

// Fireworks
function launchFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }
        
        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function createFirework(x, y) {
        const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ff6347', '#ffd700', '#00ff00', '#00bfff'];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 17, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Launch fireworks randomly
    const fireworkInterval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        createFirework(x, y);
    }, 500);
    
    // Stop after 15 seconds
    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 15000);
    
    // Add birthday message
    setTimeout(() => {
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#ff1493';
        ctx.textAlign = 'center';
        ctx.fillText('Happy Birthday, Charity! 🎂', canvas.width / 2, canvas.height / 2);
        
        setTimeout(() => {
            ctx.fillText('You\'re Amazing! ✨', canvas.width / 2, canvas.height / 2 + 60);
        }, 1000);
    }, 8000);
}

// Prevent accidental page refresh
window.addEventListener('beforeunload', (e) => {
    if (!document.getElementById('lockScreen')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
