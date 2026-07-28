document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    // 2. Feedback Hápico (Vibração Mobile)
    const triggerHaptic = () => {
        if ("vibrate" in navigator) navigator.vibrate(50);
    };
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', triggerHaptic);
    });

    // 3. Fuso Horário Local
    setInterval(() => {
        const now = new Date();
        document.getElementById('local-time').textContent = now.toLocaleTimeString();
    }, 1000);

    // 4. Barra de Progresso de Leitura
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + '%';
    });

    // 5. Terminal Interativo (CLI)
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    
    const commands = {
        'help': 'Comandos: about, skills, clear, contact',
        'about': 'Desenvolvedor Full Stack focado em soluções web robustas.',
        'skills': 'JavaScript, Node.js, React, CSS3, HTML5, Python',
        'contact': 'Email: dev@exemplo.com | GitHub: @dev'
    };

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = termInput.value.trim().toLowerCase();
            const response = commands[input] || `Comando desconhecido: '${input}'. Digite 'help'.`;
            
            if(input === 'clear') {
                termOutput.innerHTML = '';
            } else {
                termOutput.innerHTML += `<p><strong>$ ${input}</strong></p><p>${response}</p>`;
            }
            termInput.value = '';
            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });

    // 6. Estimador de Custos
    const calcType = document.getElementById('calc-type');
    const calcTime = document.getElementById('calc-time');
    const timeVal = document.getElementById('time-val');
    const calcTotal = document.getElementById('calc-total');

    function updateCalc() {
        timeVal.textContent = `${calcTime.value} Semanas`;
        const base = parseInt(calcType.value);
        const weeks = parseInt(calcTime.value);
        calcTotal.textContent = base + (weeks * 200);
    }
    calcType.addEventListener('change', updateCalc);
    calcTime.addEventListener('input', updateCalc);

    // 7. Idiomas (i18n)
    const translations = {
        pt: { heroTitle: "Desenvolvedor Full Stack & Designer de Experiências", heroSub: "Criando produtos digitais de alto impacto." },
        en: { heroTitle: "Full Stack Developer & Experience Designer", heroSub: "Building high-impact digital products." }
    };
    let currentLang = 'pt';
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        document.getElementById('lang-toggle').textContent = currentLang.toUpperCase();
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = translations[currentLang][key];
        });
    });

    // 8. Modo Apresentação (Pitch)
    document.getElementById('pitch-mode').addEventListener('click', () => {
        alert("Iniciando Modo Apresentação...");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => window.scrollTo({ top: 400, behavior: 'smooth' }), 3000);
        setTimeout(() => window.scrollTo({ top: 800, behavior: 'smooth' }), 6000);
    });

    // 9. Gerador de QR Code
    document.getElementById('generate-qr-btn').addEventListener('click', () => {
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = "";
        new QRCode(qrContainer, {
            text: "BEGIN:VCARD\nN:Dev;Portfolio\nTEL:123456789\nEND:VCARD",
            width: 128, height: 128
        });
    });

    // 10. Suporte a Daltônicos
    document.getElementById('accessibility-mode').addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });

    // 11. Tocador de Ruído Branco (Web Audio API)
    let audioCtx, oscillator;
    document.getElementById('audio-toggle').addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // Tom suave
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Volume baixo
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            alert("Áudio de Foco Ativado!");
        } else {
            audioCtx.close();
            audioCtx = null;
            alert("Áudio de Foco Desativado.");
        }
    });

    // 12. Status de Conexão com a Internet
    window.addEventListener('online', () => updateNetworkStatus(true));
    window.addEventListener('offline', () => updateNetworkStatus(false));
    function updateNetworkStatus(isOnline) {
        const netEl = document.getElementById('network-status');
        netEl.className = isOnline ? 'online' : 'offline';
        netEl.textContent = isOnline ? 'Conectado' : 'Sem Conexão';
    }

    // 13. Busca por Voz
    const voiceBtn = document.getElementById('voice-search-btn');
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new Speech();
        voiceBtn.addEventListener('click', () => recognition.start());
        recognition.onresult = (e) => {
            document.getElementById('project-search').value = e.results[0][0].transcript;
        };
    } else {
        voiceBtn.style.display = 'none';
    }

    // 14. Contador de Tempo & Medidor de FPS
    let seconds = 0;
    setInterval(() => {
        seconds++;
        document.getElementById('session-time').textContent = seconds + 's';
    }, 1000);

    let frameCount = 0;
    let lastTime = performance.now();
    function loopFPS() {
        const now = performance.now();
        frameCount++;
        if (now - lastTime >= 1000) {
            document.getElementById('fps-count').textContent = frameCount;
            frameCount = 0;
            lastTime = now;
        }
        requestAnimationFrame(loopFPS);
    }
    requestAnimationFrame(loopFPS);

    // 15. Easter Egg - Código Konami (Cima, Cima, Baixo, Baixo, Esquerda, Direita, Esquerda, Direita, B, A)
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                alert("🎮 MODO RETRO DESBLOQUEADO!");
                document.body.style.background = "#002b36";
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});
