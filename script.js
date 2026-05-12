const tracker = {
    userIdentity: "", cupDrags: 0, choiceTime: 0, hoverTime: 0,
    rabbitClicks: 0, bugClicks: 0, scaleGrow: 0, scaleShrink: 0,
    sortDrags: 0, rosesPainted: 0, isAligned: false,
    fixClockTime: 0, obstacleTime: 0, attackClicks: 0,
    escapeTime: 0, taskTime: 0, teaError: 100,
    siMicroMovements: 0, mirrorCorrect: 0, frameError: 100, 
    choice: "", drawDistance: 0, chaosClicks: 0, teaTime: 0,
    letterAction: "ignored", niFocus: 50, seChessDist: 0, 
    boundaryX: 200, boundaryAction: "drawn", bgmVolume: 50,
    startTime: 0, hoverStart: 0
};

let currentPhaseIndex = -1; let randomizedPhases = []; let activeIntervals =[];

const mainArea = document.getElementById('main-area');
const instruction = document.getElementById('instruction');
const liveLog = document.getElementById('live-log');
const progressDisplay = document.getElementById('progress-counter');
const exitBtn = document.getElementById('exit-btn');
const backBtn = document.getElementById('back-btn');

function updateLog(text) { if(liveLog) liveLog.textContent = "行動ログ: " + text; }

document.getElementById('start-btn').addEventListener('click', () => {
    const input = document.getElementById('user-identity');
    tracker.userIdentity = input ? input.value : "";
    randomizedPhases = [...appData.phases].sort(() => Math.random() - 0.5);
    
    const setupArea = document.getElementById('setup-area');
    if(setupArea) setupArea.style.display = 'none';
    if(exitBtn) exitBtn.style.display = 'none';
    if(backBtn) backBtn.style.display = 'block';
    if(progressDisplay) progressDisplay.style.display = 'block';

    nextPhase();
});

backBtn.onclick = prevPhase;

function clearAllIntervals() { 
    activeIntervals.forEach(id => { clearInterval(id); clearTimeout(id); }); 
    activeIntervals =[]; 
    document.body.style.transform = ''; document.body.style.filter = ''; 
}

function nextPhase() {
    clearAllIntervals(); currentPhaseIndex++;
    if (currentPhaseIndex >= randomizedPhases.length) { showResult(); return; }
    loadPhase();
}

function prevPhase() {
    if(currentPhaseIndex > 0) {
        clearAllIntervals(); currentPhaseIndex--;
        loadPhase();
    } else {
        location.reload(); 
    }
}

function loadPhase() {
    if(progressDisplay) progressDisplay.textContent = `${currentPhaseIndex + 1} / ${randomizedPhases.length}`;
    if(backBtn) backBtn.innerHTML = (currentPhaseIndex === 0) ? '◀ タイトルへ' : '◀ 前の問題へ';

    const phase = randomizedPhases[currentPhaseIndex];
    instruction.textContent = phase.instruction;
    document.querySelector('h1').innerHTML = phase.title;
    mainArea.innerHTML = ''; 
    tracker.startTime = Date.now();

    const setups = {
        'choice': setupChoicePhase, 'drag': setupDragPhase, 'clicker': setupClickerPhase,
        'scale': setupScalePhase, 'sort': setupSortPhase, 'darling': setupDarlingPhase,
        'telescope': setupTelescopePhase, 'chess': setupChessPhase, 'hats': setupHatsPhase, 
        'fix_clock': setupFixClockPhase, 'te_obstacle': setupTeObstaclePhase, 
        'te_task': setupTeTaskPhase, 'se_attack': setupSeAttackPhase, 'escape': setupEscapePhase, 
        'si_tea': setupSiTeaPhase, 'si_frame': setupSiFramePhase,
        'si_cushion': setupSiCushionPhase, 'roses': setupRosesPhase, 
        'boundary': setupBoundaryPhase, 'bgm': setupBgmPhase, 'chaos': setupChaosPhase,
        'mirror': setupMirrorPhase, 'draw': setupDrawPhase
    };
    if (setups[phase.type]) setups[phase.type]();
}

// ★スマホ対応：共通ドラッグ機能★
function makeDraggable(el, area, onGrab, onDrop) {
    let isDragging = false;
    const start = (e) => { isDragging = true; if(onGrab) onGrab(); };
    const stop = () => { if(isDragging && onDrop) onDrop(); isDragging = false; };
    const move = (e) => {
        if (isDragging) {
            if(e.cancelable) e.preventDefault(); // スマホのスクロール防止
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            const r = area.getBoundingClientRect();
            el.style.left = (clientX - r.left - 25) + 'px'; el.style.top = (clientY - r.top - 25) + 'px';
        }
    };
    el.addEventListener('mousedown', start); el.addEventListener('touchstart', start, {passive: false});
    document.addEventListener('mousemove', move); document.addEventListener('touchmove', move, {passive: false});
    document.addEventListener('mouseup', stop); document.addEventListener('touchend', stop);
}

function checkCollision(el1, el2) {
    const r1 = el1.getBoundingClientRect(); const r2 = el2.getBoundingClientRect();
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}

/* ================== 各フェーズの関数 ================== */

function setupTeTaskPhase() { const a=document.createElement('div'); a.className='play-area'; let t=1; const sT=Date.now(); for(let i=1;i<=5;i++){ const b=document.createElement('div'); b.textContent=i; b.style.cssText=`position:absolute; width:40px; height:40px; background:#2c3e50; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; cursor:pointer; left:${10+Math.random()*70}%; top:${10+Math.random()*70}%;`; b.onclick=()=>{ if(i===t){ b.style.background='#d32f2f'; b.style.pointerEvents='none'; t++; updateLog(`タスク: ${i}/5`); if(t>5){ tracker.taskTime=Date.now()-sT; updateLog(`完了: ${tracker.taskTime}ms`); activeIntervals.push(setTimeout(nextPhase,500)); } } }; a.appendChild(b); } mainArea.appendChild(a); }
function setupSiTeaPhase() { const a=document.createElement('div'); a.className='play-area'; const l=document.createElement('p'); l.innerHTML='🍵 お茶の温度<br><span style="font-size:0.7rem;">「適温(緑)」の瞬間にストップ！</span>'; const t=document.createElement('div'); t.style.cssText="width:80%; height:20px; background:linear-gradient(to right, #cce5ff 0%, #cce5ff 45%, #ccffcc 48%, #ccffcc 52%, #ffcccc 55%, #ffcccc 100%); border-radius:10px; margin:40px auto; position:relative; overflow:hidden;"; const th=document.createElement('div'); th.style.cssText="width:10px; height:30px; background:#333; position:absolute; top:-5px; left:0%;"; let p=0; let d=2; let iv=setInterval(()=>{ p+=d; if(p>95){ p=95; d=-2-Math.random(); } if(p<0){ p=0; d=2+Math.random(); } th.style.left=p+'%'; },20); activeIntervals.push(iv); t.appendChild(th); a.append(l,t); const btn=document.createElement('button'); btn.className='btn'; btn.textContent='ストップ！'; btn.onclick=()=>{ clearInterval(iv); tracker.teaError=Math.abs(p-50); updateLog(`誤差: ${tracker.teaError.toFixed(1)}%`); btn.onclick=null; activeIntervals.push(setTimeout(nextPhase,1000)); }; mainArea.appendChild(a); mainArea.appendChild(btn); }

// ★スマホ対応：境界線
function setupBoundaryPhase() { const a=document.createElement('div'); a.className='play-area'; a.style.background='linear-gradient(to right, #ffe6f2, #e6f2ff)'; const al=document.createElement('div'); al.textContent='👱‍♀️'; al.className='item'; al.style.left='10%'; al.style.top='40%'; const c=document.createElement('div'); c.textContent='🐱'; c.className='item'; c.style.right='10%'; c.style.top='40%'; const cs=document.createElement('div'); cs.style.cssText="position:absolute; right:15%; top:15%; background:white; padding:5px 10px; border-radius:10px; font-size:0.8rem; border:2px solid #555; opacity:0; transition:0.3s;"; const l=document.createElement('div'); l.style.cssText="position:absolute; width:10px; height:100%; background:rgba(211,47,47,0.5); left:50%; cursor:col-resize; border-left:2px dashed red;"; 
    let isD=false; 
    const startDrag = () => isD = true;
    const stopDrag = () => { isD = false; cs.style.opacity = '0'; };
    const doDrag = (e) => {
        if(isD){
            if(e.cancelable) e.preventDefault();
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const r=a.getBoundingClientRect(); let x=clientX-r.left; if(x<0) x=0; if(x>r.width) x=r.width; l.style.left=x+'px'; tracker.boundaryX=x; 
            if(x>r.width*0.85){ tracker.boundaryAction='removed'; cs.textContent="境界なんて無かったんだねぇ。"; }
            else{ tracker.boundaryAction='drawn'; if(x>r.width*0.7) cs.textContent="そんなに近づいて…僕に食べられちゃってもいいのかい？"; else if(x<r.width*0.3) cs.textContent="おや…随分と警戒してるねぇ…ヒヒヒ。"; else cs.textContent="ここは誰の領土だい？"; }
            updateLog(`境界線: ${Math.round(x)}px`); cs.style.opacity='1'; 
        }
    };
    l.addEventListener('mousedown', startDrag); l.addEventListener('touchstart', startDrag, {passive:false});
    document.addEventListener('mouseup', stopDrag); document.addEventListener('touchend', stopDrag);
    document.addEventListener('mousemove', doDrag); document.addEventListener('touchmove', doDrag, {passive:false});
    a.append(al,cs,c,l); const btnA=document.createElement('div'); btnA.style.marginTop='10px'; const b1=document.createElement('button'); b1.className='btn'; b1.textContent='ここで決める'; b1.onclick=nextPhase; const b2=document.createElement('button'); b2.className='btn'; b2.textContent='境界線を溶かす'; b2.style.background='#ff99c2'; b2.style.color='#fff'; b2.style.marginLeft='10px'; b2.onclick=()=>{ l.style.display='none'; tracker.boundaryAction='melted'; updateLog('境界が溶けた'); activeIntervals.push(setTimeout(nextPhase,1000)); }; btnA.append(b1,b2); mainArea.appendChild(a); mainArea.appendChild(btnA); 
}

// ★スマホ対応：逃走劇
function setupEscapePhase() { const a=document.createElement('div'); a.className='play-area'; a.style.overflow='hidden'; a.style.cursor='none'; const al=document.createElement('div'); al.textContent='👱‍♀️'; al.style.cssText="position:absolute; font-size:3rem; pointer-events:none; transition:0.05s;"; const en=document.createElement('div'); en.textContent='🃏'; en.style.cssText="position:absolute; font-size:4rem; left:80%; top:50%; pointer-events:none; transition:0.1s;"; let ax=50,ay=50,ex=300,ey=100; 
    const doMove = (e) => {
        if(e.cancelable) e.preventDefault();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const r=a.getBoundingClientRect(); ax=clientX-r.left-20; ay=clientY-r.top-20; al.style.left=ax+'px'; al.style.top=ay+'px'; 
    };
    a.addEventListener('mousemove', doMove); a.addEventListener('touchmove', doMove, {passive:false});
    const sT=Date.now(); let cght=false; const iv=setInterval(()=>{ if(cght) return; const dx=ax-ex; const dy=ay-ey; const dist=Math.sqrt(dx*dx+dy*dy); if(dist<40){ cght=true; tracker.escapeTime=Date.now()-sT; updateLog(`捕まった...: ${tracker.escapeTime}ms`); clearInterval(iv); a.style.cursor='default'; activeIntervals.push(setTimeout(nextPhase,1000)); }else{ ex+=dx*0.06; ey+=dy*0.06; en.style.left=ex+'px'; en.style.top=ey+'px'; if(Date.now()-sT>5000){ cght=true; tracker.escapeTime=5000; updateLog("逃げ切った！"); clearInterval(iv); a.style.cursor='default'; activeIntervals.push(setTimeout(nextPhase,1000)); } } },50); activeIntervals.push(iv); a.append(al,en); mainArea.appendChild(a); 
}

function setupTelescopePhase() { const a = document.createElement('div'); a.className = 'play-area'; a.style.transition = 'background 0.5s'; const bg = document.createElement('div'); bg.style.cssText = "position:absolute; width:100%; height:100%; top:0; left:0; z-index:0; transition:all 0.5s; display:flex; align-items:center; justify-content:center; font-size:4rem; opacity:0;"; const v = document.createElement('p'); v.style.cssText = "position:relative; z-index:1; font-size:1.2rem; font-weight:bold; transition:color 0.5s;"; const s = document.createElement('input'); s.type = 'range'; s.min = '0'; s.max = '100'; s.value = '10'; s.style.cssText = "position:relative; z-index:1; width:80%; margin-top:40px;"; s.oninput = () => { tracker.niFocus = s.value; if(s.value < 33) { v.innerHTML = '今現在 (Si/Se)'; a.style.background = '#fff0f5'; v.style.color = '#333'; bg.innerHTML = '☕️🧁🫖'; bg.style.opacity = '0.8'; } else if(s.value < 66) { v.innerHTML = 'ミクロな未来構造 (◯週間〜◯ヶ月後程度の未来予測)'; a.style.background = '#e6f7ff'; v.style.color = '#333'; bg.innerHTML = '⚙️📐⏱️'; bg.style.opacity = '0.5'; } else { v.innerHTML = 'はるか遠い宇宙の崩壊 (◯年後〜、ずっと遠い未来予測)'; a.style.background = '#0a0a2a'; v.style.color = '#fff'; bg.innerHTML = '✨🌌☄️'; bg.style.opacity = '1'; } updateLog(`ピント: ${s.value}`); }; s.oninput(); a.append(bg, v, s); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '決定'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); }

// ★スマホ対応：額縁
function setupSiFramePhase() { const a = document.createElement('div'); a.className = 'play-area'; a.style.display = 'flex'; a.style.justifyContent = 'center'; a.style.alignItems = 'center'; const f = document.createElement('div'); f.style.cssText = "width:150px; height:200px; border:15px solid #8b4513; background:url('https://www.transparenttextures.com/patterns/stardust.png') #fff; cursor:grab; box-shadow:5px 5px 15px rgba(0,0,0,0.3);"; let cA = (Math.random()>0.5?1:-1)*(15+Math.random()*15); f.style.transform = `rotate(${cA}deg)`; 
    let isD = false, sY = 0; 
    const startRotate = (e) => { isD = true; sY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY; f.style.cursor = 'grabbing'; };
    const stopRotate = () => { isD = false; f.style.cursor = 'grab'; };
    const doRotate = (e) => {
        if(isD) {
            if(e.cancelable) e.preventDefault();
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            let d = (clientY - sY)*0.5; cA += d; f.style.transform = `rotate(${cA}deg)`; tracker.frameError = Math.abs(cA%360); sY = clientY; updateLog(`傾き調整中...`);
        }
    };
    f.addEventListener('mousedown', startRotate); f.addEventListener('touchstart', startRotate, {passive:false});
    document.addEventListener('mouseup', stopRotate); document.addEventListener('touchend', stopRotate);
    document.addEventListener('mousemove', doRotate); document.addEventListener('touchmove', doRotate, {passive:false});
    a.appendChild(f); const b = document.createElement('button'); b.className = 'btn'; b.textContent = 'ヨシ！'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); 
}

// ★スマホ対応：BGM
function setupBgmPhase() { const a = document.createElement('div'); a.className = 'play-area'; const l = document.createElement('p'); l.innerHTML = '🎶 BGMテンション'; const t = document.createElement('div'); t.style.cssText = "width:80%; height:20px; background:#ddd; border-radius:10px; margin:40px auto; position:relative;"; const th = document.createElement('div'); th.style.cssText = "width:30px; height:30px; background:var(--accent-red); border-radius:50%; position:absolute; top:-5px; left:50%; cursor:pointer;"; 
    let isD = false; 
    const startDrag = () => isD = true;
    const stopDrag = () => isD = false;
    const doDrag = (e) => {
        if(isD) {
            if(e.cancelable) e.preventDefault();
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const r = t.getBoundingClientRect(); let x = clientX - r.left; if(x < 0) x = 0; if(x > r.width) x = r.width; th.style.left = (x - 15) + 'px'; tracker.bgmVolume = Math.floor((x / r.width) * 100); updateLog(`演出熱量: ${tracker.bgmVolume}%`);
        }
    };
    th.addEventListener('mousedown', startDrag); th.addEventListener('touchstart', startDrag, {passive:false});
    document.addEventListener('mouseup', stopDrag); document.addEventListener('touchend', stopDrag);
    document.addEventListener('mousemove', doDrag); document.addEventListener('touchmove', doDrag, {passive:false});
    
    let iv = setInterval(() => { if(Math.random()*100 < tracker.bgmVolume) { let n = document.createElement('div'); n.textContent =['♪', '🎶', '🥳', '✨', '🎸'][Math.floor(Math.random()*5)]; n.style.cssText = `position:absolute; left:${Math.random()*90}%; bottom:10px; font-size:${Math.random()*2+1}rem; transition:all 1s ease-out; pointer-events:none;`; a.appendChild(n); setTimeout(() => { n.style.bottom = '100%'; n.style.opacity = '0'; }, 50); setTimeout(() => n.remove(), 1050); } }, 100); activeIntervals.push(iv); t.appendChild(th); a.append(l, t); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '決定'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); 
}

function setupChaosPhase() { const a = document.createElement('div'); a.className = 'play-area'; const l = document.createElement('p'); l.innerHTML = 'DRINK ME...'; const bc = document.createElement('button'); bc.className = 'btn'; bc.textContent = '🧪 飲む'; bc.style.fontSize = '2rem'; bc.style.padding = '20px'; bc.onclick = () => { tracker.chaosClicks++; updateLog(`カオス度: ${tracker.chaosClicks}回`); document.body.style.transform = `rotate(${Math.random()*10-5}deg) scale(${1+Math.random()*0.1})`; document.body.style.filter = `hue-rotate(${Math.random()*360}deg)`; let o = document.createElement('div'); o.textContent =['☕️', '🫖', '🧁', '🃏', '🎩'][Math.floor(Math.random()*5)]; o.style.cssText = `position:absolute; left:${Math.random()*90}%; top:${Math.random()*90}%; font-size:3rem; pointer-events:none;`; a.appendChild(o); }; a.append(l, bc); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '我に返る'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); }
function setupChoicePhase() { const a = document.createElement('div'); a.className = 'choice-area';['♥️','♠️'].forEach(c=>{ const i = document.createElement('div'); i.textContent = c; i.style.fontSize = '5rem'; i.style.cursor = 'pointer'; i.addEventListener('mouseenter', () => tracker.hoverStart = Date.now()); i.addEventListener('mouseleave', () => tracker.hoverTime += (Date.now() - tracker.hoverStart)); i.onclick = () => { tracker.choice = c; tracker.choiceTime = Date.now() - tracker.startTime; updateLog(`選択完了: ${c}`); nextPhase(); }; a.appendChild(i); }); mainArea.appendChild(a); }
function setupDragPhase() { const a = document.createElement('div'); a.className = 'play-area'; for(let i=0; i<3; i++) { const c = document.createElement('div'); c.textContent = '☕️'; c.className = 'item'; c.style.left = (20+i*25)+'%'; c.style.top = '40%'; makeDraggable(c, a, () => { tracker.cupDrags++; updateLog(`移動[${tracker.cupDrags}回]`); }); a.appendChild(c); } const b = document.createElement('button'); b.className = 'btn'; b.textContent = '配置完了'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); }

// ★スマホ対応：ウサギ
function setupClickerPhase() { const a = document.createElement('div'); a.className = 'play-area'; const r = document.createElement('div'); r.textContent = '🐇'; r.className = 'item'; const m = () => { r.style.left = Math.random()*80+'%'; r.style.top = Math.random()*80+'%'; }; m(); activeIntervals.push(setInterval(m, 700)); 
    const hitRabbit = (e) => { if(e.cancelable) e.preventDefault(); tracker.rabbitClicks++; updateLog(`ウサギ捕獲[${tracker.rabbitClicks}回]`); m(); };
    r.addEventListener('mousedown', hitRabbit); r.addEventListener('touchstart', hitRabbit, {passive:false});
    a.appendChild(r); mainArea.appendChild(a); activeIntervals.push(setTimeout(nextPhase, 5000)); 
}

function setupScalePhase() { const a = document.createElement('div'); a.style.marginTop = '20px'; const s = document.createElement('div'); s.textContent = '🍄'; s.style.fontSize = '5rem'; let sz = 5; const b1 = document.createElement('span'); b1.className = 'fa-solid fa-wine-bottle scale-btn'; b1.onclick = () => { sz--; s.style.fontSize = sz+'rem'; tracker.scaleShrink++; }; const b2 = document.createElement('span'); b2.className = 'fa-solid fa-cookie-bite scale-btn'; b2.onclick = () => { sz++; s.style.fontSize = sz+'rem'; tracker.scaleGrow++; }; const b = document.createElement('button'); b.className = 'btn'; b.textContent = '決定'; b.onclick = nextPhase; a.append(b1, s, b2); mainArea.appendChild(a); mainArea.appendChild(b); }
function setupSortPhase() { const a = document.createElement('div'); a.className = 'play-area'; const suits =['♠️', '♥️', '♣️', '♦️']; const colors = { '♠️': 'black', '♣️': 'black', '♥️': 'red', '♦️': 'red' }; const cards =[]; suits.forEach(s => { const c = document.createElement('div'); c.textContent = s; c.className = 'item'; c.dataset.color = colors[s]; c.style.left = Math.random() * 80 + '%'; c.style.top = Math.random() * 80 + '%'; makeDraggable(c, a, () => { tracker.sortDrags++; updateLog(`整理[${tracker.sortDrags}手]`); }); a.appendChild(c); cards.push(c); }); const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = '整列完了'; btn.onclick = () => { const sortedCards = [...cards].sort((x, y) => parseInt(x.style.left) - parseInt(y.style.left)); const tops = cards.map(c => parseInt(c.style.top || 0)); if (Math.max(...tops) - Math.min(...tops) < 30) tracker.isAligned = true; let pattern = sortedCards.map(c => c.dataset.color).join('-'); if (pattern === 'black-red-black-red' || pattern === 'red-black-red-black') { tracker.isAlternating = true; updateLog("赤黒交互の秩序を検出！(Ti)"); } nextPhase(); }; mainArea.appendChild(a); mainArea.appendChild(btn); }
function setupDarlingPhase() {
    const a = document.createElement('div'); a.className = 'play-area';
    const l = document.createElement('div'); l.className = 'item';
    l.style.cssText = "background:white; padding:15px; border:2px solid #ff66a3; border-radius:10px; width:70%; font-size:0.8rem; color:#333; z-index:2; left:10%; top:10%;";
    l.innerHTML = `「ねえダーリン♡ あなたのその『完璧なシステム』、もし現実のノイズが一つでも混じったら、あっという間に崩れ去る『ただの砂上の楼閣』になっちゃうわよ……？🥺」<br><br><span style="font-size:0.6rem; color:gray;">- 某ILIより</span>`;
    
    const t = document.createElement('div'); t.textContent = '🗑️';
    t.style.cssText = "font-size:3rem; position:absolute; bottom:10px; right:10px; z-index:1;";
    const d = document.createElement('div'); d.textContent = '🗃️';
    d.style.cssText = "font-size:3rem; position:absolute; bottom:10px; left:10px; z-index:1;";

    makeDraggable(l, a, () => updateLog("手紙を触った"), () => {
        if(checkCollision(l, t)){
            l.style.display='none'; 
            tracker.letterAction="trashed"; // ここを確実に記録！
            updateLog("不快なので捨てた [Fi]");
        } else if(checkCollision(l, d)){
            l.style.display='none'; 
            tracker.letterAction="drawer"; // ここを確実に記録！
            updateLog("情報としてしまった [Ti]");
        }
    });

    a.append(d, t, l);
    const b = document.createElement('button'); b.className = 'btn'; b.textContent = '次へ';
    b.onclick = () => {
        if(tracker.letterAction === "ignored") updateLog("スルーした [Te]");
        nextPhase();
    };
    mainArea.appendChild(a); mainArea.appendChild(b);
}
function setupChessPhase() { const a = document.createElement('div'); a.className = 'play-area'; const k = document.createElement('div'); k.textContent = '♚'; k.style.cssText = "position:absolute; left:45%; top:40%; font-size:4rem; color:#2c3e50;"; const p = document.createElement('div'); p.textContent = '♙'; p.className = 'item'; p.style.left = '10%'; p.style.top = '10%'; p.style.color = "#d32f2f"; makeDraggable(p, a, () => updateLog('見極め中...')); a.append(k, p); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '配置完了'; b.onclick = () => { const kr = k.getBoundingClientRect(), pr = p.getBoundingClientRect(); tracker.seChessDist = Math.floor(Math.abs(kr.left - pr.left) + Math.abs(kr.top - pr.top)); nextPhase(); }; mainArea.appendChild(a); mainArea.appendChild(b); }
function setupFixClockPhase() { const a = document.createElement('div'); a.className = 'play-area'; const clock = document.createElement('div'); clock.textContent = '🕰️'; clock.style.cssText = "position:absolute; left:40%; top:30%; font-size:5rem; opacity:0.5;"; a.appendChild(clock); const sT = Date.now(); let fc = 0; for(let i=0; i<3; i++) { const g = document.createElement('div'); g.textContent = '⚙️'; g.className = 'item'; g.style.left = (Math.random()*60+10)+'%'; g.style.top = (Math.random()*60+10)+'%'; makeDraggable(g, a, () => updateLog("修理実行中..."), () => { if(checkCollision(g, clock)){ g.style.pointerEvents = 'none'; fc++; if(fc === 3) { tracker.fixClockTime = Date.now() - sT; updateLog(`修理: ${tracker.fixClockTime}ms`); activeIntervals.push(setTimeout(nextPhase, 600)); } } }); a.appendChild(g); } const b = document.createElement('button'); b.className = 'btn'; b.textContent = '完了'; b.onclick = () => { if(tracker.fixClockTime === 0) tracker.fixClockTime = Date.now() - sT; nextPhase(); }; mainArea.appendChild(a); mainArea.appendChild(b); }
function setupTeObstaclePhase() { const a = document.createElement('div'); a.className = 'play-area'; const t = document.createElement('div'); t.textContent = '🗑️'; t.style.cssText = "position:absolute; right:5%; bottom:5%; font-size:4rem; z-index:1;"; a.appendChild(t); const sT = Date.now(); let rc = 0; for(let i=0; i<3; i++) { const r = document.createElement('div'); r.textContent = '🪨'; r.className = 'item'; r.style.left = (20+Math.random()*50)+'%'; r.style.top = (20+Math.random()*50)+'%'; r.style.zIndex = '2'; makeDraggable(r, a, () => updateLog("排除中..."), () => { if(checkCollision(r, t)) { r.style.display = 'none'; rc++; if(rc === 3) { tracker.obstacleTime = Date.now() - sT; activeIntervals.push(setTimeout(nextPhase, 600)); } } }); a.appendChild(r); } const b = document.createElement('button'); b.className = 'btn'; b.textContent = '諦める'; b.onclick = () => { if(tracker.obstacleTime === 0) tracker.obstacleTime = Date.now() - sT; nextPhase(); }; mainArea.appendChild(a); mainArea.appendChild(b); }
function setupSeAttackPhase() {
    const a = document.createElement('div'); a.className = 'play-area'; a.style.overflow = 'hidden';
    const s = document.createElement('div'); s.textContent = '🃏';
    s.style.cssText = "position:absolute; right:10%; top:30%; font-size:5rem; transition:0.1s;";
    a.appendChild(s);
    let p = 10; const startAtk = Date.now();
    
    // 兵士がジリジリ迫ってくるタイマー
    const iv = setInterval(() => {
        p += 2.5; s.style.right = p + '%';
        if (p > 85) { 
            clearInterval(iv); 
            tracker.attackTime = 9999; // 失敗時は大きな数字をいれる
            updateLog("押し切られた..."); 
            setTimeout(nextPhase, 800); 
        }
    }, 100);
    activeIntervals.push(iv);

    const b = document.createElement('button'); b.className = 'btn'; b.innerHTML = '⚔️ 押し返す！';
    // touch-action: manipulation でダブルタップズームを無効化！
    b.style.cssText = "position:absolute; bottom:10px; left:50%; transform:translateX(-50%); z-index:10; padding:15px 30px; touch-action: manipulation;";
    
    const pushBack = (e) => {
        if(e.cancelable) e.preventDefault(); // スマホの余計な挙動をカット
        p -= 7; tracker.attackClicks++; s.style.right = p + '%';
        updateLog(`撃退連打: ${tracker.attackClicks}回`);
        if (p < 0) {
            clearInterval(iv);
            tracker.attackTime = Date.now() - startAtk; // 撃退までにかかった時間を記録
            updateLog(`完全撃退！タイム: ${tracker.attackTime}ms`);
            activeIntervals.push(setTimeout(nextPhase, 500));
        }
    };
    
    // マウスとタッチ両方対応
    b.addEventListener('touchstart', pushBack, {passive: false});
    b.addEventListener('mousedown', pushBack);
    
    a.appendChild(b); mainArea.appendChild(a);
}
function setupSiCushionPhase() { const a = document.createElement('div'); a.className = 'play-area'; const m = document.createElement('div'); m.textContent = '🍄'; m.style.cssText = "position:absolute; left:40%; top:50%; font-size:5rem;"; const c = document.createElement('div'); c.textContent = '🍪'; c.className = 'item'; makeDraggable(c, a, () => tracker.siMicroMovements++); a.append(m, c); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '完了'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); }
function setupRosesPhase() { const a = document.createElement('div'); a.style.marginTop = '20px'; for(let i=0; i<5; i++){ const r = document.createElement('div'); r.textContent = '🌹'; r.className = 'rose'; r.onclick = () => { if(!r.classList.contains('painted')){ r.classList.add('painted'); tracker.rosesPainted++; }}; a.appendChild(r); } const b = document.createElement('button'); b.className = 'btn'; b.textContent = '塗り終わり'; b.onclick = nextPhase; mainArea.appendChild(a); mainArea.appendChild(b); }
function setupHatsPhase() { const a = document.createElement('div'); a.className = 'choice-area';['🎩','👒','🧢'].forEach(h=>{ const i = document.createElement('div'); i.textContent = h; i.style.fontSize = '4rem'; i.style.cursor = 'pointer'; i.onclick = () => { tracker.choice = h; updateLog(`帽子: ${h}`); nextPhase(); }; a.appendChild(i); }); mainArea.appendChild(a); }
function setupMirrorPhase() { const a = document.createElement('div'); a.style.padding = "20px"; const icons =['🐱', '🐱', '🦉', '🦊'].sort(() => Math.random()-0.5); icons.forEach(i => { const el = document.createElement('span'); el.textContent = i; el.style.fontSize = '3rem'; el.style.margin = '10px'; el.style.cursor = 'pointer'; el.onclick = () => { if(i === '🐱') tracker.mirrorCorrect++; updateLog(`ペア照合`); nextPhase(); }; a.appendChild(el); }); mainArea.appendChild(a); }

// ★スマホ対応：お絵描き★
function setupDrawPhase() { 
    const canvas = document.createElement('canvas'); canvas.id = 'canvas-area'; canvas.width = 300; canvas.height = 200; 
    const ctx = canvas.getContext('2d'); let isDrawing = false, lx = 0, ly = 0; 
    const startDraw = (e) => { 
        isDrawing = true; 
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const r = canvas.getBoundingClientRect(); lx = clientX - r.left; ly = clientY - r.top; 
    }; 
    const stopDraw = () => isDrawing = false; 
    const doDraw = (e) => { 
        if (!isDrawing) return; 
        if(e.cancelable) e.preventDefault();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const r = canvas.getBoundingClientRect(); const x = clientX - r.left; const y = clientY - r.top; 
        tracker.drawDistance += Math.sqrt(Math.pow(x-lx, 2) + Math.pow(y-ly, 2)); 
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.strokeStyle = '#d32f2f'; ctx.lineWidth = 3; ctx.stroke(); 
        lx = x; ly = y; updateLog(`描写中...`); 
    }; 
    canvas.addEventListener('mousedown', startDraw); canvas.addEventListener('touchstart', startDraw, {passive:false});
    document.addEventListener('mouseup', stopDraw); document.addEventListener('touchend', stopDraw);
    document.addEventListener('mousemove', doDraw); document.addEventListener('touchmove', doDraw, {passive:false});
    mainArea.appendChild(canvas); activeIntervals.push(setTimeout(nextPhase, 5000)); 
}

/* ================== 結果発表＆シェア＆画像保存 ================== */
function showResult() {
    clearAllIntervals(); instruction.textContent = ""; document.querySelector('h1').innerHTML = '🎩 観測終了 ☕️'; backBtn.style.display = 'none';
    if(progressDisplay) progressDisplay.style.display = 'none';

    const res = appData.calculateType(tracker); const typeData = appData.socionicsTypes[res.key];
    const scoreStr = `Ti:${res.scores.Ti} / Ni:${res.scores.Ni} / Ne:${res.scores.Ne} / Se:${res.scores.Se} / Te:${res.scores.Te} / Si:${res.scores.Si} / Fe:${res.scores.Fe} / Fi:${res.scores.Fi}`;
    const logStr = `・迷い時間: ${(tracker.choiceTime + tracker.hoverTime)/1000}秒\n・カップ移動: ${tracker.cupDrags}回\n・ウサギ捕獲: ${tracker.rabbitClicks}回\n・タスク処理: ${tracker.taskTime}ms\n・兵士撃退タイム: ${tracker.attackTime}ms\n・逃走タイム: ${tracker.escapeTime}ms\n・整列Tiフラグ: ${tracker.isAligned}\n・赤黒交互Tiフラグ: ${tracker.isAlternating}\n・手紙の扱い: ${tracker.letterAction}\n・境界線: ${tracker.boundaryAction} (${Math.round(tracker.boundaryX)}px)\n・額縁のズレ: ${Math.round(tracker.frameError)}度\n・望遠鏡ピント: ${tracker.niFocus}\n・チェス制圧: ${tracker.seChessDist}px\n・時計修理: ${tracker.fixClockTime}ms\n・岩の排除: ${tracker.obstacleTime}ms\n・お茶温度誤差: ${tracker.teaError.toFixed(1)}%\n・BGM熱量: ${tracker.bgmVolume}%\n・カオス連打: ${tracker.chaosClicks}回\n・芋虫干渉: ${tracker.bugClicks}回`;

    mainArea.innerHTML = `
        <div id="result-capture-area" style="background:var(--card-bg); padding:15px; border-radius:10px; border:3px solid var(--text-dark);">
            <h2 style="color:var(--accent-red); font-size:1.8rem; margin:10px 0;">${typeData.name}</h2>
            <h3 style="margin:5px 0; color:#333;">社会使命: ${typeData.mission}</h3>
            <p style="font-weight:bold; color:#666; font-size:0.9rem;">自認: ${tracker.userIdentity || '未入力'}</p>
            <div style="background:rgba(255,255,255,0.8); padding:15px; border-radius:12px; margin:15px 0; border:2px solid var(--text-dark); text-align:left; line-height:1.6; font-size:0.95rem; white-space:pre-wrap;">${typeData.desc}</div>
            <div style="text-align:left; background:#eee; padding:12px; border-radius:10px; font-size:0.85rem;">
                <b style="color:var(--accent-red)">【機能スコア (Top: ${res.topPair})】</b><br>${scoreStr}
            </div>
            <div style="font-size:0.65rem; color:#666; margin-top:10px; text-align:left; display:grid; grid-template-columns:1fr 1fr; gap:3px;">
                ${logStr.replace(/\n/g, '<br>')}
            </div>
        </div>
        
        <div style="display:flex; justify-content:center; gap:10px; margin-top:20px; flex-wrap:wrap;">
            <button class="btn" style="font-size:1rem; padding:10px;" onclick="shareResult()"><i class="fa-solid fa-share-nodes"></i> シェア</button>
            <button class="btn" style="font-size:1rem; padding:10px;" onclick="saveImage()"><i class="fa-solid fa-camera"></i> 画像保存</button>
            <button class="btn" style="font-size:1rem; padding:10px;" onclick="window.location.reload()"><i class="fa-solid fa-rotate-left"></i> もう一度</button>
        </div>
        <p id="save-msg" style="font-size:0.8rem; color:#d32f2f; display:none; margin-top:10px;">↓下に画像が生成されたよ！スマホは長押しで保存してね！↓</p>
    `;

    // GAS送信
    const gasUrl = "https://script.google.com/macros/s/AKfycby2SEmP5d0t_F2XEeEsIeNLR-R9-yf1J1UC1AGykCYETfPa1Mbw_Duu4RFx-SNuUmCK/exec"; 
    const payload = { userIdentity: tracker.userIdentity || '未入力', resultType: typeData.name, scores: scoreStr, logs: logStr };
    fetch(gasUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: JSON.stringify(payload) }).catch(e => console.log(e));
}

function shareResult() {
    const res = appData.calculateType(tracker);
    const text = `私のモデルG行動観測結果は【${appData.socionicsTypes[res.key].name}】でした！\n社会使命: ${appData.socionicsTypes[res.key].mission}\n#モデルG行動観測診断 #ソシオニクス\n`;
    const url = 'https://mofu-mitsu.github.io/Wonderland-G-Tracker';
    if (navigator.share) { navigator.share({ title: 'モデルG行動観測診断', text: text, url: url }).catch(console.error); }
    else { navigator.clipboard.writeText(text + url).then(() => alert("結果をクリップボードにコピーしました！")); }
}

function saveImage() {
    const target = document.getElementById('result-capture-area');
    html2canvas(target, { backgroundColor: '#fffdf5' }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const img = document.createElement('img');
        img.src = imgData; img.style.width = '100%'; img.style.marginTop = '15px'; img.style.borderRadius = '10px'; img.style.border = '2px solid #ccc';
        document.getElementById('save-msg').style.display = 'block';
        mainArea.appendChild(img);
        if(!/Mobi|Android/i.test(navigator.userAgent)) {
            const link = document.createElement('a'); link.href = imgData; link.download = 'model-g-result.png'; link.click();
        }
    });
}

/* ================== 🐛 芋虫 (タッチ対応版) ================== */
const bug = document.getElementById('caterpillar'); const speech = document.getElementById('caterpillar-speech');
let bugPos = -100; let bugMoving = false;

setInterval(() => {
    if (Math.random() < 0.5 && !bugMoving && tracker.bugClicks < 30) {
        bugMoving = true; bugPos = -100;
        let walkInterval = setInterval(() => {
            bugPos += 8; if(bug) bug.style.right = bugPos + 'px'; if(speech) speech.style.right = (bugPos - 10) + 'px';
            if (bugPos > window.innerWidth + 100) { bugMoving = false; clearInterval(walkInterval); }
        }, 30);
    }
}, 3000);

// LSI-Niらしい理屈っぽいセリフ集
const lsiQuotes = [
    "……なんだ。僕の規則的な歩行を邪魔する気か？",
    "時間は正確に守りたまえ。1秒のズレも許されん。",
    "非合理なタッチだ。君のエネルギー代謝はどうなっている？",
    "僕のTiSiに干渉しないでくれるか。",
    "無駄が多いな。もっと効率的な経路があるはずだ。",
    "おい、いい加減にしろ。論理が崩れるだろう。",
    "……やめたまえ。不快な刺激はSiを乱す。"
];

if(bug) {
    const hitBug = (e) => {
        if(e.cancelable) e.preventDefault();
        if (tracker.bugClicks >= 30) return;
        tracker.bugClicks++;
        updateLog(`芋虫干渉[${tracker.bugClicks}回]`);
        
        // 30回タップ＝圧殺（SLEパパ降臨）
        if (tracker.bugClicks >= 30) {
            bug.textContent = '💥';
            if(speech) {
                speech.textContent = "システムダウン……！！論理が……崩壊する……ッ（SLEパパに敗北）";
                speech.style.color = "red";
                speech.style.opacity = 1;
            }
            updateLog("警告：LSIの秩序がSLEの暴力に屈しました");
            return;
        }

        if(speech) {
            speech.textContent = lsiQuotes[tracker.bugClicks % lsiQuotes.length];
            speech.style.opacity = 1; 
            setTimeout(() => { speech.style.opacity = 0; }, 2000);
        }
    };
    bug.addEventListener('mousedown', hitBug);
    bug.addEventListener('touchstart', hitBug, {passive:false});
}
