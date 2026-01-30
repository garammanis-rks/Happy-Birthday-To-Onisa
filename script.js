// Wait until the page and animations are done
window.addEventListener('load', () => {
    // Delay the confetti start until the cake/candle animations are finished
    setTimeout(() => {
        startConfetti();
    }, 5000); // Adjust delay if animations are longer
});

function startConfetti() {
    const container = document.getElementById('confetti-container');
    
    if (!container) {
        console.error('Confetti container not found');
        return;
    }

    const colors = ['#f2d74e', '#95c3de', '#ff9a91', '#a4ffc4', '#ffffff'];

    // Adjust confetti count based on screen size
    const isMobile = window.innerWidth <= 768;
    const confettiCount = isMobile ? 100 : 200;

    // Create confetti dots
    for (let i = 0; i < confettiCount; i++) {
        const dot = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const delay = Math.random() * 5; // stagger start
        const duration = Math.random() * 3 + 3; // random duration between 3-6s
        
        dot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: 50%;
            opacity: ${Math.random()};
            transform: translateY(0) rotate(${Math.random() * 360}deg);
            animation: confettiFall ${duration}s linear ${delay}s infinite;
        `;
        
        container.appendChild(dot);
    }

    // Add CSS for the fall animation dynamically
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.innerHTML = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(110vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Optional: Restart confetti on window resize for better responsiveness
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const container = document.getElementById('confetti-container');
        if (container && container.children.length > 0) {
            // Clear existing confetti
            container.innerHTML = '';
            // Restart with new screen size
            startConfetti();
        }
    }, 500);
});
