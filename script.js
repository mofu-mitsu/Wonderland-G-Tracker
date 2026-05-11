// --- 1. 変数・定数の定義 ---
const tracker = {
    userIdentity: "", cupDrags: 0, choiceTime: 0, hoverTime: 0,
    rabbitClicks: 0, bugClicks: 0, scaleGrow: 0, scaleShrink: 0,
    sortDrags: 0, rosesPainted: 0, isAligned: false,
    boundaryX: 0, fixClockTime: 0, siMicroMovements: 0,
    mirrorCorrect: 0, choice: "", startTime: 0, drawDistance: 0
};

let currentPhaseIndex = -1; 
let randomizedPhases = [];  
let activeIntervals = [];

const mainArea = document.getElementById('main-area');
const instruction = document.getElementById('instruction');
const liveLog = document.getElementById('live-log');

function updateLog(text) { if(liveLog) liveLog.textContent = text; }

// --- 2. 進行制御 ---
document.getElementById('start-btn').addEventListener('click', () => {
    const input = document.getElementById('user-identity');
    tracker.userIdentity = input ? input.value : "";
    randomizedPhases = [...appData.phases].sort(() => Math.random() - 0.5);
    nextPhase();
});

function clearAllIntervals() {
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];
}

function nextPhase() {
    clearAllIntervals();
    currentPhaseIndex++;

    if (currentPhaseIndex >= randomizedPhases.length) {
        showResult();
        return;
    }

    const phase = randomizedPhases[currentPhaseIndex];
    instruction.textContent = phase.instruction;
    document.querySelector('h1').innerHTML = phase.title;
    mainArea.innerHTML = '';
    tracker.startTime = Date.now();

    const setupFunctions = {
        'choice': setupChoicePhase,
        'drag': setupDragPhase,
        'clicker': setupClickerPhase,
        'scale': setupScalePhase,
        'sort': setupSortPhase,
        'boundary': setupBoundaryPhase,
        'hats': setupHatsPhase,
        'fix_clock': setupFixClockPhase,
        'si_cushion': setupSiCushionPhase,
        'roses': setupRosesPhase,
        'mirror': setupMirrorPhase,
        'draw': setupDrawPhase
    };

    if (setupFunctions[phase.type]) {
        setupFunctions[phase.type]();
    }
}

// --- 3. ユーティリティ ---
function makeDraggable(el, area, onDrag) {
    let isDragging = false;
    el.onmousedown = (e) => {
        isDragging = true;
        if(onDrag) onDrag();
    };
    const doDrag = (e) => {
        if (isDragging) {
            const r = area.getBoundingClientRect();
            el.style.left = (e.clientX - r.left - 25) + 'px';
            el.style.top = (e.clientY - r.top - 25) + 'px';
        }
    };
    const stopDrag = () => { isDragging = false; };
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
}

/* ==================================
   🐛 芋虫ギミック
================================== */
const bug = document.getElementById('caterpillar');
const speech = document.getElementById('caterpillar-speech');
let bugPos = -100;
let bugMoving = false;

setInterval(() => {
    if (Math.random() < 0.5 && !bugMoving && tracker.bugClicks < 30) {
        bugMoving = true; bugPos = -100;
        let walkInterval = setInterval(() => {
            bugPos += 8;
            if(bug) bug.style.right = bugPos + 'px';
            if(speech) speech.style.right = (bugPos - 10) + 'px';
            if (bugPos > window.innerWidth + 100) {
                bugMoving = false; clearInterval(walkInterval);
            }
        }, 30);
    }
}, 3000);

const lsiQuotes = ["……秩序を乱すな。", "時間は正確に。", "非合理的だ。", "干渉するな。", "無駄が多い。"];
if(bug) {
    bug.addEventListener('mousedown', () => {
        if (tracker.bugClicks >= 30) return;
        tracker.bugClicks++;
        updateLog(`芋虫に干渉: ${tracker.bugClicks}回`);
        if (tracker.bugClicks >= 30) {
            bug.textContent = '💥';
            if(speech) { speech.textContent = "SLEパパに圧殺されました"; speech.style.opacity = 1; }
            return;
        }
        if(speech) {
            speech.textContent = lsiQuotes[tracker.bugClicks % lsiQuotes.length];
            speech.style.opacity = 1; setTimeout(() => { speech.style.opacity = 0; }, 2000);
        }
    });
}

/* ==================================
   各フェーズ関数 (全部揃ってるよ！)
================================== */

function setupChoicePhase() {
    const area = document.createElement('div'); area.className = 'choice-area';
    ['♥️', '♠️'].forEach(c => {
        const item = document.createElement('div');
        item.textContent = c; item.style.fontSize = '5rem'; item.style.cursor = 'pointer';
        item.onclick = () => { tracker.choice = c; tracker.choiceTime += Date.now() - tracker.startTime; nextPhase(); };
        area.appendChild(item);
    });
    mainArea.appendChild(area);
}

function setupDragPhase() {
    const area = document.createElement('div'); area.className = 'play-area';
    for (let i = 0; i < 3; i++) {
        const cup = document.createElement('div'); cup.textContent = '☕️';
        cup.className = 'item'; cup.style.left = (20 + i*25) + '%'; cup.style.top = '40%';
        makeDraggable(cup, area, () => { tracker.cupDrags++; updateLog(`カップ移動: ${tracker.cupDrags}`); });
        area.appendChild(cup);
    }
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '配置完了';
    btn.onclick = nextPhase; mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupClickerPhase() {
    const area = document.createElement('div'); area.className = 'play-area';
    const rabbit = document.createElement('div'); rabbit.textContent = '🐇'; rabbit.className = 'item';
    const move = () => { rabbit.style.left = Math.random()*80+'%'; rabbit.style.top = Math.random()*80+'%'; };
    move();
    let iv = setInterval(move, 700); activeIntervals.push(iv);
    rabbit.onmousedown = () => { tracker.rabbitClicks++; updateLog(`ウサギ捕獲: ${tracker.rabbitClicks}`); move(); };
    area.appendChild(rabbit); mainArea.appendChild(area);
    activeIntervals.push(setTimeout(nextPhase, 5000));
}

function setupScalePhase() {
    const area = document.createElement('div'); area.style.marginTop = '20px';
    const shroom = document.createElement('div'); shroom.textContent = '🍄'; shroom.style.fontSize = '5rem';
    let size = 5;
    const b1 = document.createElement('span'); b1.className = 'fa-solid fa-wine-bottle scale-btn'; b1.style.color = '#2980b9';
    b1.onclick = () => { size--; shroom.style.fontSize = size+'rem'; tracker.scaleShrink++; };
    const b2 = document.createElement('span'); b2.className = 'fa-solid fa-cookie-bite scale-btn'; b2.style.color = '#c0392b';
    b2.onclick = () => { size++; shroom.style.fontSize = size+'rem'; tracker.scaleGrow++; };
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '決定'; btn.onclick = nextPhase;
    area.append(b1, shroom, b2); mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupSortPhase() {
    const area = document.createElement('div'); area.className = 'play-area';
    const suits =['♠️', '♥️', '♦️', '♣️']; const cards =[];
    suits.forEach((s) => {
        const c = document.createElement('div'); c.textContent = s; c.className = 'item';
        c.style.left = Math.random()*80+'%'; c.style.top = Math.random()*80+'%';
        makeDraggable(c, area, () => tracker.sortDrags++);
        area.appendChild(c); cards.push(c);
    });
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '整列完了';
    btn.onclick = () => {
        const tops = cards.map(c => parseInt(c.style.top || 0));
        if (Math.max(...tops) - Math.min(...tops) < 30) tracker.isAligned = true;
        nextPhase();
    };
    mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupBoundaryPhase() {
    const area = document.createElement('div'); area.className = 'play-area';
    area.style.background = 'linear-gradient(to right, #ffe6f2, #e6f2ff)';
    const alice = document.createElement('div'); alice.textContent = '👱‍♀️'; alice.className = 'item'; alice.style.left = '10%';
    const cat = document.createElement('div'); cat.textContent = '🐱'; cat.className = 'item'; cat.style.right = '10%';
    const line = document.createElement('div'); line.className = 'boundary-line'; line.style.left = '50%';
    area.onmousedown = (e) => {
        const r = area.getBoundingClientRect(); tracker.boundaryX = e.clientX - r.left;
        line.style.left = tracker.boundaryX + 'px';
    };
    area.append(alice, cat, line);
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = 'ここで引く'; btn.onclick = nextPhase;
    mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupFixClockPhase() {
    const area = document.createElement('div'); area.className = 'play-area';
    const mainClock = document.createElement('div'); mainClock.textContent = '🕰️';
    mainClock.style.cssText = "position:absolute; left:40%; top:30%; font-size:5rem; opacity:0.5;";
    const startTe = Date.now();
    for(let i=0; i<3; i++) {
        const gear = document.createElement('div'); gear.textContent = '⚙️'; gear.className = 'item';
        gear.style.left = (Math.random()*60+10)+'%'; gear.style.top = (Math.random()*60+10)+'%';
        makeDraggable(gear, area); area.appendChild(gear);
    }
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '修理完了！';
    btn.onclick = () => { tracker.fixClockTime = Date.now() - startTe; nextPhase(); };
    area.appendChild(mainClock); mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupSiCushionPhase() {
    const area = document.createElement('div'); area.className = 'play-area';
    const mush = document.createElement('div'); mush.textContent = '🍄'; mush.style.cssText = "position:absolute; left:40%; top:50%; font-size:5rem;";
    const cushion = document.createElement('div'); cushion.textContent = '🍪'; cushion.className = 'item';
    makeDraggable(cushion, area, () => tracker.siMicroMovements++);
    area.append(mush, cushion);
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '調節完了'; btn.onclick = nextPhase;
    mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupRosesPhase() {
    const area = document.createElement('div'); area.style.marginTop = '20px';
    for(let i=0; i<5; i++){
        const r = document.createElement('div'); r.textContent = '🌹'; r.className = 'rose';
        r.onclick = () => { if(!r.classList.contains('painted')){ r.classList.add('painted'); tracker.rosesPainted++; }};
        area.appendChild(r);
    }
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '塗り終わり'; btn.onclick = nextPhase;
    mainArea.appendChild(area); mainArea.appendChild(btn);
}

function setupHatsPhase() {
    const area = document.createElement('div'); area.className = 'choice-area';
    ['🎩', '👒', '🧢'].forEach(h => {
        const item = document.createElement('div'); item.textContent = h; item.style.fontSize = '4rem'; item.style.cursor = 'pointer';
        item.onclick = () => { tracker.choice = h; nextPhase(); };
        area.appendChild(item);
    });
    mainArea.appendChild(area);
}

function setupMirrorPhase() {
    const area = document.createElement('div'); area.style.padding = "20px";
    const icons = ['🐱', '🐱', '🦉', '🦊'].sort(() => Math.random()-0.5);
    icons.forEach(icon => {
        const item = document.createElement('span'); item.textContent = icon;
        item.style.fontSize = '3rem'; item.style.margin = '10px'; item.style.cursor = 'pointer';
        item.onclick = () => { if(icon === '🐱') tracker.mirrorCorrect++; nextPhase(); };
        area.appendChild(item);
    });
    mainArea.appendChild(area);
}

function setupDrawPhase() {
    const canvas = document.createElement('canvas'); canvas.id = 'canvas-area'; canvas.width = 400; canvas.height = 200;
    const ctx = canvas.getContext('2d'); let isDrawing = false, lastX = 0, lastY = 0;
    canvas.onmousedown = (e) => { isDrawing = true; [lastX, lastY] = [e.offsetX, e.offsetY]; };
    canvas.onmouseup = () => isDrawing = false;
    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        tracker.drawDistance += Math.sqrt(Math.pow(e.offsetX-lastX,2) + Math.pow(e.offsetY-lastY,2));
        ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = '#d32f2f'; ctx.lineWidth = 3; ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    };
    mainArea.appendChild(canvas);
    activeIntervals.push(setTimeout(nextPhase, 5000));
}

function showResult() {
    clearAllIntervals();
    instruction.textContent = ""; document.querySelector('h1').innerHTML = '🎩 観測終了 ☕️';
    const res = appData.calculateType(tracker);
    const typeData = appData.socionicsTypes[res.key];
    mainArea.innerHTML = `
        <h2 style="color:var(--accent-red); font-size:1.8rem;">${typeData.name}</h2>
        <h3 style="margin:5px 0; color:#333;">社会使命: ${typeData.mission}</h3>
        <p style="font-weight:bold; color:#666;">自認: ${tracker.userIdentity || '未入力'}</p>
        <div style="background:rgba(255,255,255,0.8); padding:15px; border-radius:12px; margin:15px 0; border:2px solid var(--text-dark); text-align:left; line-height:1.5;">${typeData.desc}</div>
        <div style="text-align:left; background:#eee; padding:12px; border-radius:10px; font-size:0.85rem;">
            <b style="color:var(--accent-red)">【機能スコア (Top: ${res.topPair})】</b><br>
            Ti:${res.scores.Ti} / Ni:${res.scores.Ni} / Ne:${res.scores.Ne} / Se:${res.scores.Se} / Te:${res.scores.Te} / Si:${res.scores.Si} / Fe:${res.scores.Fe} / Fi:${res.scores.Fi}
        </div>
        <div style="font-size:0.7rem; color:#888; margin-top:10px; text-align:left; display:grid; grid-template-columns:1fr 1fr;">
            <span>・カップ移動: ${tracker.cupDrags}</span>
            <span>・ウサギ捕獲: ${tracker.rabbitClicks}</span>
            <span>・整列Tiフラグ: ${tracker.isAligned}</span>
            <span>・境界線位置: ${Math.round(tracker.boundaryX)}px</span>
            <span>・時計修理タイム: ${tracker.fixClockTime}ms</span>
            <span>・Si微調整: ${tracker.siMicroMovements}回</span>
            <span>・バラ塗装: ${tracker.rosesPainted}本</span>
            <span>・芋虫干渉: ${tracker.bugClicks}回</span>
        </div>
        <button class="btn" style="margin-top:15px; width:100%;" onclick="location.reload()">再挑戦</button>
    `;
}