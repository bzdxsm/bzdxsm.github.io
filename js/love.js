!function(window, document) {
    function init() {
        addStyles();
        setupClickHandler();
        startAnimation();
    }

    function startAnimation() {
        function animate() {
            for (let i = 0; i < hearts.length; i++) {
                if (hearts[i].alpha <= 0) {
                    document.body.removeChild(hearts[i].element);
                    hearts.splice(i, 1);
                    i--;
                } else {
                    hearts[i].y--;
                    hearts[i].scale += 0.004;
                    hearts[i].alpha -= 0.013;
                    hearts[i].element.style.cssText = `left:${hearts[i].x}px;top:${hearts[i].y}px;opacity:${hearts[i].alpha};transform:scale(${hearts[i].scale},${hearts[i].scale}) rotate(45deg);background:${hearts[i].color};z-index:99999`;
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    function setupClickHandler() {
        const originalOnClick = typeof window.onclick === 'function' ? window.onclick : null;
        window.onclick = function(event) {
            originalOnClick && originalOnClick(event);
            createHeart(event);
        };
    }

    function createHeart(event) {
        const heartElement = document.createElement('div');
        heartElement.className = 'heart';
        hearts.push({
            element: heartElement,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: getRandomColor()
        });
        document.body.appendChild(heartElement);
    }

    function addStyles() {
        const styleElement = document.createElement('style');
        const css = `.heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}`;
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    }

    function getRandomColor() {
        return `rgb(${Math.floor(255 * Math.random())},${Math.floor(255 * Math.random())},${Math.floor(255 * Math.random())})`;
    }

    const hearts = [];
    init();
}(window, document);