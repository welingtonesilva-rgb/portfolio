document.addEventListener("DOMContentLoaded", () => {

    // 1. Feedback Hápico (Vibração Mobile ao Clicar)
    const triggerHaptic = () => {
        if ("vibrate" in navigator) navigator.vibrate(40);
    };
    document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', triggerHaptic));

    // 2. Fuso Horário Local
    setInterval(() => {
        const now = new Date();
        document.getElementById('local-time').textContent = now.toLocaleTimeString();
    }, 1000);

    // 3. Barra de Progresso de Leitura
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + '%';
    });

    // 4. Terminal Interativo Escolar (CLI)
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    
    const commands = {
        'help': 'Comandos: materias, notas, projetos, contato, clear',
        'materias': 'Matemática, Física, Biologia, História, Geografia, Robótica',
        'notas': 'Média Geral do Ano: 8.5 | Frequência: 96%',
        'projetos': '1. Ecosistema Sustentável | 2. Carrinho Robô com Arduino',
        'contato': 'Email Escolar: estudante@escola.edu.br'
    };

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = termInput.value.trim().toLowerCase();
            if (input === 'clear') {
                termOutput.innerHTML = '';
            } else {
                const response = commands[input] || `Comando '${input}' não reconhecido. Digite 'help'.`;
                termOutput.innerHTML += `<p><strong>$ ${input}</strong></p><p>${response}</p>`;
            }
            termInput.value = '';
            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });

    // 5. Estimador / Calculadora de Desempenho
    const calcType = document.getElementById('calc-type');
    const calcTime = document.getElementById('calc-time');
    const timeVal = document.getElementById('time-val');
    const calcTotal = document.getElementById('calc-total');

    function updateCalc() {
        const hours = parseInt(calcTime.value);
        timeVal.textContent = `${hours} Horas`;
        const base = parseFloat(calcType.value);
        const estimatedGrade = Math.min(10, base + (hours * 0.3)).toFixed(1);
        calcTotal.textContent = estimatedGrade;
    }
    calcType.addEventListener('change', updateCalc);
    calcTime.addEventListener('input', updateCalc);

    // 6. Alternador de Idioma (PT / EN)
    const translations = {
        pt: { sub: "Estudante do Ensino Médio | Projetos, Feiras de Ciências e Automação" },
        en: { sub: "High School Student | Science Fair Projects & Automation" }
    };
    let currentLang = 'pt';
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        document.getElementById('lang-indicator').textContent = currentLang.toUpperCase();
        document.getElementById('hero-subtitle').textContent = translations[currentLang].sub;
    });

    // 7. Modo Apresentação Guiada (Pitch)
    document.getElementById('pitch-mode').addEventListener('click', () => {
        alert("Iniciando tour guiado pelos trabalhos escolares...");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => window.scrollTo({ top: 300, behavior: 'smooth' }), 2500);
        setTimeout(() => window.scrollTo({ top: 600, behavior: 'smooth' }), 5000);
    });

    // 8. Gerador de QR Code do Cartão Estudantil
    document.getElementById('generate-qr-btn').addEventListener('click', () => {
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = "";
        new QRCode(qrContainer, {
            text: "ESTUDANTE: João Silva | MATRÍCULA: 2026-9874 | TURMA: 3º Ano A",
            width: 120, height: 120
        });
    });

    // 9. Seletor de Acessibilidade Daltônica
    document.getElementById('accessibility-mode').addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });

    // 10. Som de Foco para Estudos (Web Audio API)
    let audioCtx;
    document.getElementById('audio-toggle').addEventListener('click', function() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(180, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            this.textContent = "🎵 Som de Foco (On)";
        } else {
            audioCtx.close();
            audioCtx = null;
            this.textContent = "🎵 Som de Foco (Off)";
        }
    });

    // 11. Monitor de Conexão com a Internet
    window.addEventListener('online', () => setNetworkStatus(true));
    window.addEventListener('offline', () => setNetworkStatus(false));
    function setNetworkStatus(isOnline) {
        const el = document.getElementById('network-status');
        el.className = isOnline ? 'online' : 'offline';
        el.textContent = isOnline ? 'Online' : 'Offline';
    }

    // 12. Reconhecimento de Voz para Pesquisa
    const voiceBtn = document.getElementById('voice-search-btn');
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new Speech();
        voiceBtn.addEventListener('click', () => rec.start());
        rec.onresult = (e) => {
            document.getElementById('project-search').value = e.results[0][0].transcript;
        };
    } else {
        voiceBtn.disabled = true;
        voiceBtn.textContent = "🎙️ Voz Não Suportada";
    }

    // 13. Contador do Tempo de Sessão
    let seconds = 0;
    setInterval(() => {
        seconds++;
        document.getElementById('session-time').textContent = seconds + 's';
    }, 1000);

    // 14. Medidor do Desempenho Gráfico (FPS)
    let frameCount = 0;
    let lastTime = performance.now();
    function checkFPS() {
        const now = performance.now();
        frameCount++;
        if (now - lastTime >= 1000) {
            document.getElementById('fps-count').textContent = frameCount;
            frameCount = 0;
            lastTime = now;
        }
        requestAnimationFrame(checkFPS);
    }
    requestAnimationFrame(checkFPS);

    // 15. Easter Egg - Código Konami
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiPos = 0;
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiSequence[konamiPos]) {
            konamiPos++;
            if (konamiPos === konamiSequence.length) {
                alert("🎉 MODO NOTA 10 ACTIVATED!");
                document.body.style.background = "#022c22";
                konamiPos = 0;
            }
        } else {
            konamiPos = 0;
        }
    });
});
