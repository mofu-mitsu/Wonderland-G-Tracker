const appData = {
    // 観測フェーズ（合計8個に増やしたよ！）
    phases: [
        { id: 'phase1', type: 'choice', title: '🃏 赤と黒', instruction: '惹かれるマークを選んでね。' },
        { id: 'phase2', type: 'drag', title: '☕️ お茶会の準備', instruction: '3つのカップを好きな場所に配置して。' },
        { id: 'phase3', type: 'clicker', title: '🐇 白ウサギを追え', instruction: '逃げ回るウサギを捕まえて！' },
        { id: 'phase4', type: 'scale', title: '🍄 EAT ME / DRINK ME', instruction: 'キノコのサイズを調節して。' },
        { id: 'phase5', type: 'sort', title: '♠️ トランプの整列', instruction: 'カードを好きなように動かして。' },
        { id: 'phase6', type: 'boundary', title: '📏 心の境界線', instruction: 'あなた(左)とチェシャ猫(右)の間に境界線を引いて。' },
        { id: 'phase7', type: 'hats', title: '🎩 帽子の選択', instruction: 'お茶会に被っていく帽子は？' },
        { id: 'phase8', type: 'fix_clock', title: '⚙️ 壊れた時計', instruction: '3つの歯車を中央の時計に集めて！' },
        { id: 'phase9', type: 'si_cushion', title: '🛋️ 最高の座り心地', instruction: 'キノコの上にクッキー(座布団)を置いて、一番しっくりくる位置に微調整して。' },
        { id: 'phase10', type: 'roses', title: '🌹 バラを赤く塗ろう', instruction: '白いバラをタップして赤く塗ってね。' },
        { id: 'phase11', type: 'mirror', title: '🪞 鏡の国', instruction: '左右対称なペアをクリック！' },
        { id: 'phase12', type: 'draw', title: '🌀 狂気のお絵描き', instruction: '自由に撫でて軌跡を残して。' }
    ],

    // ソシオニクス16タイプ
    socionicsTypes: {
        ILE: { name: "ILE (ENTp)", mission: "NeTe: 革新的な行動", desc: "大胆なアイデアや発明を見つけ出し、それを実現するエネルギー！" },
        ESE: { name: "ESE (ESFj)", mission: "FeSe: 感情的な圧力", desc: "人々を新しいビジネスに巻き込み、熱気で無関心を克服する！" },
        SEI: { name: "SEI (ISFp)", mission: "SiFi: 快適な関係", desc: "人々が心地よく、リラックスして交流できる環境を作り出す力🌸" },
        LII: { name: "LII (INTj)", mission: "TiNi: 時間構造", desc: "イベントを分析し、システムの論理に従って行動する観察者✨" },
        EIE: { name: "EIE (ENFj)", mission: "FeNe: エモーショナルなアイデア", desc: "能力発見への意欲を生み出し、アイデアのためにリスクを冒す！" },
        SLE: { name: "SLE (ESTp)", mission: "SeTe: 力強い行動", desc: "過酷な競争の中でも果敢に行動する圧倒的制圧力！(芋虫クラッシャー🐛💥)" },
        LSI: { name: "LSI (ISTj)", mission: "TiSi: 快適さの論理", desc: "快適さと安定をもたらす秩序とルールをつくる構築者⚙️" },
        IEI: { name: "IEI (INFp)", mission: "NiFi: 関係性の時間", desc: "人間関係の発展を予測し、タイムリーに調整する調和の力🕰️" },
        SEE: { name: "SEE (ESFp)", mission: "SeFe: 力強い感情", desc: "対立する当事者間の互恵的な合意を形成する外交エネルギー！" },
        LIE: { name: "LIE (ENTj)", mission: "TeNe: 収益性の高いイノベーション", desc: "大きな利益が約束されたビジネスでリスクを冒す開拓者💰" },
        ILI: { name: "ILI (INTp)", mission: "NiTi: システム予測", desc: "イベントの経過を予測し、システムのバランスを取る対策を講じる🔮" },
        ESI: { name: "ESI (ISFj)", mission: "FiSi: 快適さの倫理", desc: "グループの身体的・心理的な健康を確保する守護者🛡️" },
        LSE: { name: "LSE (ESTj)", mission: "TeSe: ビジネス力", desc: "領域内を移動し、問題や障害が発生した場所に即座に介入する！" },
        IEE: { name: "IEE (ENFp)", mission: "NeFe: 興味深いコミュニケーション", desc: "面白い人たちと出会い、他者の才能を刺激して開花させる🌟" },
        EII: { name: "EII (INFj)", mission: "FiNi: 時間の倫理", desc: "優しさと忍耐で、少しずつ世界に良い変化をもたらす癒やし手🌱" },
        SLI: { name: "SLI (ISTp)", mission: "SiTi: 快適な要求", desc: "快適な状態でツールとメカニズムを完璧に管理・操作する🛠️" }
    },

    // ガチの判定ロジック（みつき仕様）
    // 🧠 心理機能ベースの判定ロジック
// data.js の判定ロジック部分をこれに差し替えてね！
// data.js の calculateType の中身をちょっと調整
calculateType: function(logs) {
    let scores = { Ti:0, Ne:0, Se:0, Ni:0, Te:0, Si:0, Fe:0, Fi:0 };

    // --- Ti (論理) ---
    if (logs.isAligned) scores.Ti += 15;
    if (logs.mirrorCorrect > 0) scores.Ti += 5;
    if (logs.choice === '🎩') scores.Ti += 5; // 文脈に合わせる判断

    // --- Ni (時間・収束) ---
    if (logs.hoverTime > 2500) scores.Ni += 12;
    if (logs.scaleShrink > logs.scaleGrow) scores.Ni += 7;
    if (logs.choice === '🎩') scores.Ni += 5; // 概念的な一致

    // --- Ne (可能性) ---
    if (logs.cupDrags > 8) scores.Ne += 8;
    if (logs.bugClicks > 0 && logs.bugClicks < 20) scores.Ne += 8;

    // --- Se (直接的行動) ---
    if (logs.rabbitClicks > 4) scores.Se += 12;
    if (logs.bugClicks >= 30) scores.Se += 100;

    // --- Te (実用的効率) ---
    if (logs.fixClockTime < 3000) scores.Te += 15; // 素早く修理完了
    if (logs.sortDrags > 15) scores.Te += 5;

    // --- Fi (関係・距離感) ---
    // 境界線の位置。アリス(左)に近いほどFi+、遠いほどFi-（客観的）
    if (logs.boundaryX > 0) {
        if (logs.boundaryX < 150) scores.Fi += 15; // 近距離(親密)
        else scores.Fi += 5; // 遠距離(礼儀)
    }
    if (logs.choice === '👒') scores.Fi += 10; // 自分の好みで選ぶ(Fi)

    // --- Si / Fe はバラ塗りやカップ配置で加算 ---

    // 判定
    let sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
    let top1 = sorted[0][0];
    let top2 = sorted[1][0];
    return { key: this.getGType(top1, top2), scores: scores, topPair: `${top1}-${top2}` };
},

getGType: function(t1, t2) {
    const map = {
        "Ti-Ni": "LII", "Ti-Si": "LSI", "Ni-Ti": "ILI", "Ni-Fi": "IEI",
        "Ne-Te": "ILE", "Ne-Fe": "IEE", "Se-Te": "SLE", "Se-Fe": "SEE",
        "Te-Ne": "LIE", "Te-Se": "LSE", "Fe-Ne": "EIE", "Fe-Se": "ESE",
        "Fi-Ni": "EII", "Fi-Si": "ESI", "Si-Ti": "SLI", "Si-Fi": "SEI"
    };
    return map[`${t1}-${t2}`] || "LII";
}
};