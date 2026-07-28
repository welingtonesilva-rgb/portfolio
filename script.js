document.addEventListener("DOMContentLoaded", () => {

    // 1. Alternador de Tema Claro/Escuro
    const btnTheme = document.getElementById('btn-theme');
    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // 2. Relógio Digital em Tempo Real
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString();
    }, 1000);

    // 3. Cronômetro de Estudo
    let timerInterval = null;
    let secondsStudied = 0;
    const timerDisplay = document.getElementById('timer-display');
    
    document.getElementById('btn-timer-start').addEventListener('click', () => {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                secondsStudied++;
                const mins = String(Math.floor(secondsStudied / 60)).padStart(2, '0');
                const secs = String(secondsStudied % 60).padStart(2, '0');
                timerDisplay.textContent = `${mins}:${secs}`;
            }, 1000);
        }
    });

    document.getElementById('btn-timer-stop').addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    // 4. Gerador de Som de Foco (Web Audio API nativa)
    let audioCtx = null;
    const btnAudio = document.getElementById('btn-audio');
    btnAudio.addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, audioCtx.currentTime); // Frequência suave
            gain.gain.setValueAtTime(0.01, audioCtx.currentTime); // Volume bem baixo
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            btnAudio.textContent = "Desligar Som";
        } else {
            audioCtx.close();
            audioCtx = null;
            btnAudio.textContent = "Ligar Som de Foco";
        }
    });

    // 5. Apresentação Automática (Tour pelo Site)
    document.getElementById('btn-pitch').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => window.scrollTo({ top: 350, behavior: 'smooth' }), 2000);
        setTimeout(() => window.scrollTo({ top: 700, behavior: 'smooth' }), 4000);
    });

    // 6. Acessibilidade
    document.getElementById('select-access').addEventListener('change', (e) => {
        document.body.classList.remove('high-contrast', 'grayscale');
        if (e.target.value !== 'normal') {
            document.body.classList.add(e.target.value);
        }
    });

    // 7. Gerador de QR Code do Aluno (Via API pública super estável)
    document.getElementById('btn-qr').addEventListener('click', () => {
        const qrBox = document.getElementById('qr-result');
        const text = encodeURIComponent("Estudante: Seu Nome | Turma: 3º Ano");
        qrBox.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${text}" alt="QR Code">`;
    });

    // 8. Barra de Progresso do Scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    // 9. Status de Conexão Online/Offline
    function updateStatus() {
        const el = document.getElementById('net-status');
        if (navigator.onLine) {
            el.textContent = 'Online';
            el.className = 'status-online';
        } else {
            el.textContent = 'Offline';
            el.className = 'status-offline';
        }
    }
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    // 10. Medidor de FPS
    let frames = 0, lastTime = performance.now();
    function calcFPS() {
        frames++;
        const now = performance.now();
        if (now - lastTime >= 1000) {
            document.getElementById('fps-display').textContent = frames + ' FPS';
            frames = 0;
            lastTime = now;
        }
        requestAnimationFrame(calcFPS);
    }
    requestAnimationFrame(calcFPS);

    // 11. Tempo de Sessão
    let sessionSecs = 0;
    setInterval(() => {
        sessionSecs++;
        document.getElementById('session-counter').textContent = sessionSecs + 's';
    }, 1000);

    // 12. Busca Dinâmica de Projetos
    document.getElementById('input-search').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.card-item').forEach(card => {
            const tags = card.getAttribute('data-tags').toLowerCase();
            const text = card.textContent.toLowerCase();
            if (tags.includes(term) || text.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 13. Terminal Interativo
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');
    const commands = {
        'help': 'Comandos: projetos, notas, contato, clear',
        'projetos': 'Projetos: Ecossistema, Carrinho Robô e Ensaio Histórico.',
        'notas': 'Média Geral: 8.5 | Frequência: 98%',
        'contato': 'Email: meu.nome@escola.com'
    };

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = termInput.value.trim().toLowerCase();
            if (val === 'clear') {
                termOutput.innerHTML = '';
            } else {
                const res = commands[val] || `Comando '${val}' não encontrado. Digite 'help'.`;
                termOutput.innerHTML += `<p><strong>$ ${val}</strong></p><p>${res}</p>`;
            }
            termInput.value = '';
            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });

    // 14. Calculadora de Média
    document.getElementById('btn-calc').addEventListener('click', () => {
        const n1 = parseFloat(document.getElementById('n1').value) || 0;
        const n2 = parseFloat(document.getElementById('n2').value) || 0;
        const media = ((n1 + n2) / 2).toFixed(1);
        document.getElementById('calc-result').innerHTML = `Sua média parcial é: <strong>${media}</strong>`;
    });

    // 15. Lista de Metas (To-Do List Escolar)
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    document.getElementById('btn-todo-add').addEventListener('click', () => {
        if (todoInput.value.trim() !== '') {
            const li = document.createElement('li');
            li.innerHTML = `${todoInput.value} <button class="btn-del">X</button>`;
            todoList.appendChild(li);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-del')) {
            e.target.parentElement.remove();
        }
    });

    // Easter Egg: Konami Code
    const seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === seq[pos]) {
            pos++;
            if (pos === seq.length) {
                alert("🎮 MODO NOTA 10 ATIVADO!");
                document.body.style.background = "#064e3b";
                pos = 0;
            }
        } else { pos = 0; }
    });
});
