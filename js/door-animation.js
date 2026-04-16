document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("door-canvas");
    const siteWrap = document.getElementById("site-wrap");
    const navbar = document.getElementById("main-navbar");
    const scrollIndicator = document.getElementById("door-scroll-indicator");
    if(!canvas || !siteWrap) return;
    const context = canvas.getContext("2d");
    
    // A porta gerada tem 240 frames
    const frameCount = 240;
    
    const currentFrame = index => (
      `assets/door-frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    );
    
    const images = [];
    
    // Altura de todo o scroll da animação da porta
    // Usaremos 3x a altura da tela para rodar toda a animação
    const doorSpace = window.innerHeight * 3;
    
    // Ajustar o site-wrap para dar o espaço do scroll
    siteWrap.style.marginTop = `${doorSpace}px`;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Pré-carregar
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderImage(Math.max(0, currentImageIndex));
    });

    let currentImageIndex = -1;
    function renderImage(index) {
        if (!images[index]) return;
        const img = images[index];
        if (img.complete) {
            drawImageCover(img);
        } else {
            img.onload = () => drawImageCover(img);
        }
    }

    function drawImageCover(img) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = drawWidth / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
    
    images[0].onload = () => {
        renderImage(0);
        currentImageIndex = 0;
    };
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Progresso do container (0 a 1)
        let progress = Math.max(0, Math.min(1, scrollY / doorSpace));
        
        const frameIndex = Math.floor(progress * (frameCount - 1));
        
        if (frameIndex !== currentImageIndex) {
            requestAnimationFrame(() => renderImage(frameIndex));
            currentImageIndex = frameIndex;
        }

        if (scrollIndicator) {
            if (progress > 0.02) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }

        // Lógica de visualização do site 'vindo de trás v2'
        // Calculamos um offset para manter o site visualmente parado no top 0
        let transformY = Math.min(0, scrollY - doorSpace);
        
        // Efeito de revelação no final do tunel da porta
        if (progress > 0.8) {
            // Entre 80% e 100%, desvanece a porta e escala o site
            let fadeOut = (progress - 0.8) * 5; // 0 ao 1
            
            canvas.style.opacity = 1 - fadeOut;
            siteWrap.style.opacity = fadeOut;
            
            // Site cresce de 90% para 100% de tamanho dando sensação que estava atras
            let scale = 0.9 + (fadeOut * 0.1);
            siteWrap.style.transform = `translateY(${transformY}px) scale(${scale})`;
            
            if (navbar) {
                navbar.style.opacity = fadeOut;
                navbar.style.pointerEvents = fadeOut > 0.9 ? 'auto' : 'none';
            }
        } else {
            canvas.style.opacity = 1;
            siteWrap.style.opacity = 0;
            siteWrap.style.transform = `translateY(${transformY}px) scale(0.9)`;
            if (navbar) {
                navbar.style.opacity = 0;
                navbar.style.pointerEvents = 'none';
            }
        }
        
    });
    
    // Forçar trigger inicial do scroll
    window.dispatchEvent(new Event('scroll'));
});
