const appData = {
    phases:[
        { id: 'p1', type: 'choice', title: '🃏 赤と黒', instruction: '直感で、惹かれるスートを選んでね。' },
        { id: 'p2', type: 'drag', title: '☕️ お茶会の準備', instruction: 'ティーカップを好きな場所に配置して！' },
        { id: 'p3', type: 'clicker', title: '🐇 白ウサギを追え', instruction: '逃げ回るウサギを捕まえて！(連打)' },
        { id: 'p4', type: 'scale', title: '🍄 EAT ME / DRINK ME', instruction: 'クッキー(拡大)か小瓶(縮小)で、キノコのサイズを変えて。' },
        { id: 'p5', type: 'sort', title: '♠️ トランプの整列', instruction: '4枚のトランプを動かしてみて。(散らかしても整列させてもOK)' },
        { id: 'p6', type: 'darling', title: '💌 ダーリンからの手紙', instruction: '手紙が届いたよ。どうする？' },
        { id: 'p7', type: 'telescope', title: '🔭 時間のピント', instruction: '望遠鏡のピントを合わせて覗いてみて。' },
        { id: 'p8', type: 'chess', title: '♟️ 盤上の制圧', instruction: '相手のキング(♚)に対して、駒(♙)をどう配置する？' },
        { id: 'p9', type: 'hats', title: '🎩 帽子の選択', instruction: 'お茶会に被っていく帽子は？' },
        { id: 'p10', type: 'fix_clock', title: '⚙️ 壊れた時計', instruction: '3つの歯車を中央の時計に重ねて！' },
        { id: 'p11', type: 'te_obstacle', title: '🪨 障害物の排除', instruction: '邪魔な岩を素早くゴミ箱(🗑️)に片付けて！' },
        { id: 'p12', type: 'te_task', title: '📑 タスク処理', instruction: '1から5の数字を順番に素早くタップ！' },
        { id: 'p13', type: 'se_attack', title: '⚔️ 兵士の撃退', instruction: '迫りくるトランプ兵を連打で押し返せ！' },
        { id: 'p14', type: 'escape', title: '🏃‍♀️ 逃走劇', instruction: 'トランプ兵から5秒間逃げ切れ！' },
        { id: 'p15', type: 'si_tea', title: '🍵 お茶の温度', instruction: 'バーが動くよ！「適温(緑)」の瞬間にストップ！' },
        { id: 'p16', type: 'si_frame', title: '🖼️ 歪んだ額縁', instruction: 'ドラッグして、額縁の傾きを完全に真っ直ぐ(0度)に直して！' },
        { id: 'p17', type: 'si_cushion', title: '🛋️ 最高の座り心地', instruction: 'クッキーの座布団を一番しっくりくる位置に微調整して。' },
        { id: 'p18', type: 'roses', title: '🌹 バラを赤く塗ろう', instruction: '白いバラをクリックして、好きな数だけ赤く塗ってね。' },
        { id: 'p19', type: 'boundary', title: '📏 心の境界線', instruction: 'バーを動かしてチェシャ猫(🐱)との心の距離を決めて。(右端に追いやってもOK)' },
        { id: 'p20', type: 'bgm', title: '🎶 お茶会の演出', instruction: 'ドラッグでBGMテンションを上げると空間を熱狂させられるよ！' },
        { id: 'p21', type: 'chaos', title: '🌀 狂気のお茶会', instruction: 'DRINK MEボタンを押してみて…' },
        { id: 'p22', type: 'mirror', title: '🪞 鏡の国', instruction: '左右対称なペアをクリック！' },
        { id: 'p23', type: 'draw', title: '🌀 狂気のお絵描き', instruction: '白いキャンバスを自由に撫でて、軌跡を残して！(5秒間)' },
        { id: 'p24', type: 'se_command', title: '🛡️ 兵士の招集', instruction: '動き回る3人の兵士(🃏)をドラッグして、中央の旗(🚩)に固めて制圧せよ！' },
    ],

    socionicsTypes: {
        ILE: { name: "ILE (ENTp)", mission: "NeTe: 革新的な行動", desc: "【無数の可能性を現実のシステムに落とし込む発明家】\n大胆なアイデアを見つけ出し、それを実行するエネルギーの持ち主。既存のルールに縛られず、常に「もっと面白い方法」を探求し続けます。" },
        ESE: { name: "ESE (ESFj)", mission: "FeSe: 感情的な圧力", desc: "【場の空気を熱狂で支配するパーティの主役】\n感情エネルギーを外部に放ち、周囲の人々を巻き込んでいく力があります。無関心な人すらもあなたの熱意で動かしてしまう、圧倒的な求心力を持っています。" },
        SEI: { name: "SEI (ISFp)", mission: "SiFi: 快適な関係", desc: "【心と身体の平穏を作り出す調和のアーティスト】\n人々がリラックスして心地よく過ごせる環境を作り出す天才です。争いを避け、美味しいお茶と温かい関係性の中で、周囲に癒やしをもたらします。" },
        LII: { name: "LII (INTj)", mission: "TiNi: 時間構造", desc: "【複雑な世界を論理の糸で解き明かす静かなる観察者】\n感情や常識に流されず、「それは構造的に正しいか？」を常に観察しています。現象を分析し、システムの論理に従ってマクロな法則を導き出す知性の持ち主です。" },
        EIE: { name: "EIE (ENFj)", mission: "FeNe: エモーショナルなアイデア", desc: "【人々の心を揺さぶり、未来へ導くドラマチックな導き手】\n言葉や感情に強いエネルギーを乗せ、他者の眠れる可能性（才能）を引き出します。新しい理想のためにリスクを恐れず挑戦する情熱家です。" },
        SLE: { name: "SLE (ESTp)", mission: "SeTe: 力強い行動", desc: "【障害を物理的に粉砕し、目標を奪取する制圧者】\n過酷な状況下でも決して怯まず、状況を見極めて最善の手で勝利を掴みます。目標達成のためには手段を選ばない、圧倒的な行動力と制圧力を持っています。" },
        LSI: { name: "LSI (ISTj)", mission: "TiSi: 快適さの論理", desc: "【揺るぎない秩序とルールで世界を安定させる構築者】\n物事をあるべき場所に整頓し、快適で安定したシステムを作り上げます。不確実性を嫌い、一つ一つの事実を積み上げて強固な城を築きます。" },
        IEI: { name: "IEI (INFp)", mission: "NiFi: 関係性の時間", desc: "【時の流れを読み、人の心をそっと繋ぐ夢想家】\n人間関係が未来にどう発展するかを無意識に予測し、絶妙なタイミングで調和をもたらします。争いを避け、精神的な理想を追い求めるロマンチストです。" },
        SEE: { name: "SEE (ESFp)", mission: "SeFe: 力強い感情", desc: "【圧倒的な対人スキルで場を動かすカリスマ外交官】\n対立する人々の間に入り、感情的なエネルギーと政治力で互恵的な合意を形成します。空気を読みつつも自分の要求を通す、社会的な駆け引きの達人です。" },
        LIE: { name: "LIE (ENTj)", mission: "TeNe: 収益性の高いイノベーション", desc: "【未来の利益を見越し、システムを最適化する開拓者】\n「それがどう役に立つか」を最重視し、常に動き回りながら大きな利益を生むビジネスを開拓します。無駄を嫌い、効率よく目標へ突き進みます。" },
        ILI: { name: "ILI (INTp)", mission: "NiTi: システム予測", desc: "【破滅を予見し、未然に防ぐマクロな預言者】\n遥か先の未来を見通し、システムのバランスが崩れるポイントを的確に予測します。無駄な熱狂を避け、冷静に最適解だけを導き出す戦略家です。" },
        ESI: { name: "ESI (ISFj)", mission: "FiSi: 快適さの倫理", desc: "【愛する者を守るため、善悪の境界線を引くガーディアン】\n大切な人の関係性と身体的・心理的な健康を何よりも重んじます。一度「敵」と見なしたものには容赦せず、静かですが非常に強固な個人的価値観を持っています。" },
        LSE: { name: "LSE (ESTj)", mission: "TeSe: ビジネス力", desc: "【現場のトラブルを即座に鎮圧する頼れる現場監督】\n自分の領域内で起きた問題に対し、即座に介入して解決する圧倒的な実務能力の持ち主。働き者で、物事がスムーズに機能することを至上の喜びとします。" },
        IEE: { name: "IEE (ENFp)", mission: "NeFe: 興味深いコミュニケーション", desc: "【人々の才能の種を見つけて花開かせるインスパイアラー】\n面白い人々や未知の可能性に惹かれ、コミュニケーションを通して他者のやる気を刺激します。一つの場所に縛られず、常に新しい繋がりを探し求めます。" },
        EII: { name: "EII (INFj)", mission: "FiNi: 時間の倫理", desc: "【深い共感と忍耐で、世界を密かに癒やし続ける調停者】\n他者の痛みに寄り添い、少しずつ時間をかけて世界に良い変化をもたらします。争いを好まず、静かに自分の内なる道徳律に従って生きる癒やし手です。" },
        SLI: { name: "SLI (ISTp)", mission: "SiTi: 快適な要求", desc: "【無駄を削ぎ落とし、完璧な心地よさを追求する職人】\n自分が快適に過ごせる環境を整え、ツールとメカニズムを完璧に管理します。大げさな感情表現は苦手ですが、自分の手で触れられる現実の質を極限まで高めます。" }
    },

    calculateType: function(logs) {
        let scores = { Ti:0, Ne:0, Se:0, Ni:0, Te:0, Si:0, Fe:0, Fi:0 };

        // ★ 迷った時間の判定
        if ((logs.choiceTime || 0) > 2000) scores.Ti += 10; 
        if ((logs.hoverTime || 0) > 3000) { scores.Fi += 10; scores.Ni += 10; } 

        // ★ Ti: 論理処理 ★
        if (logs.isAligned) {
            scores.Ti += 15; 
            if (logs.isAlternating) {
                scores.Ti += 25; 
            }
        } 
        if ((logs.mirrorCorrect || 0) > 0) scores.Ti += 10;
        if (logs.letterAction === "drawer") scores.Ti += 10; 
        if ((logs.frameError || 100) === 0) scores.Ti += 15; 

        // ★ Ni: 時間と予測 ★
        const niVal = (logs.niFocus || 0);
        if (niVal >= 66) {
            // 🚀 マクロ未来ボーナス：右に振り切るほど幾何級数的に増える
            scores.Ni += Math.floor(niVal * 1.2); // 100なら+120点！
        } else if (niVal >= 33) {
            scores.Ni += Math.floor(niVal * 0.6); // 60なら+36点
        }
        if ((logs.scaleShrink || 0) > (logs.scaleGrow || 0)) scores.Ni += 15; 

        // ★ Ne: 可能性とカオス (NaN対策ガード実装！) ★
        scores.Ne += Math.min(30, (logs.chaosClicks || 0) * 2); 
        scores.Ne += Math.floor((logs.escapeDistance || 0) / 200); 
        scores.Ne += Math.floor((logs.cupDrags || 0) * 0.5);
        if (logs.boundaryAction === 'removed') scores.Ne += 15; 
        scores.Ne += Math.min(30, (logs.rabbitClicks || 0) * 3); 
        scores.Ne += Math.floor((logs.drawDistance || 0) / 500);
        // ★ Se: 制圧と見極め ★
        scores.Se += Math.min(30, (logs.rabbitClicks || 0) * 3); 
        if ((logs.attackTime || 0) > 0) scores.Se += Math.max(0, 40 - Math.floor(logs.attackTime/100));
        if ((logs.seChessDist || 0) < 30) scores.Se += 20;
        // ④ 逃走成功：生き残っても +5点（あくまで補助的なSe）。
        if ((logs.escapeTime || 0) >= 5000) scores.Se += 10;
        if ((logs.bugClicks || 0) >= 30) scores.Se += 100;
        if (logs.isCornered) scores.Se += 30; // ★新：トランプを四隅に置く(領域支配)
        if ((logs.commandTime || 0) > 0) {
            scores.Se += Math.max(0, 15 - Math.floor(logs.commandTime / 400));
        }
        // ★ Te: 効率と処理 (早いほど高得点) ★
        if ((logs.fixClockTime || 0) > 0) scores.Te += Math.max(0, 30 - Math.floor(logs.fixClockTime / 200));
        if ((logs.obstacleTime || 0) > 0) scores.Te += Math.max(0, 30 - Math.floor(logs.obstacleTime / 200));
        if ((logs.taskTime || 0) > 0) scores.Te += Math.max(0, 35 - Math.floor(logs.taskTime / 150));
        if ((logs.attackTime || 0) > 0) scores.Te += Math.max(0, 20 - Math.floor(logs.attackTime / 200));
        if (logs.letterAction === "ignored") scores.Te += 15;

        // ★ Si: 快適さと微調整 ★
        scores.Si += Math.min(20, (logs.siMicroMovements || 0) * 2); 
        if ((logs.teaError || 100) <= 3) scores.Si += 20; 
        if (Math.abs(logs.frameError || 100) <= 2) scores.Si += 10; 
        if ((logs.niFocus || 50) < 33) scores.Si += 15; 
        if ((logs.scaleGrow || 0) === 0 && (logs.scaleShrink || 0) === 0) scores.Si += 10; 

        // ★ Fi: 個人的価値と防衛 ★
        if ((logs.rosesPainted || 0) === 1) scores.Fi += 20; 
        if (logs.letterAction === "trashed") scores.Fi += 25; 
        if (logs.choice === '👒') scores.Fi += 15;
        if (logs.boundaryAction === 'drawn' && (logs.boundaryX || 200) < 150) scores.Fi += 20; 

        // ★ Fe: 感情の彩りと融合 ★
        scores.Fe += Math.floor((logs.bgmVolume || 50) * 0.4); 
        if ((logs.rosesPainted || 0) > 2) scores.Fe += (logs.rosesPainted * 5);
        if (logs.boundaryAction === 'melted') scores.Fe += 25; 
        if (logs.boundaryAction === 'removed') { scores.Fe += 15; scores.Ne += 10; } 
        if (logs.letterAction === "touched") scores.Fe += 15; 
        scores.Fe += Math.floor((logs.drawDistance || 0) / 400);
        // ★ プロファイルマッチング ★
        const missionMap = {
            "ILE":["Ne", "Te"], "ESE": ["Fe", "Se"], "SEI":["Si", "Fi"], "LII":["Ti", "Ni"],
            "EIE":["Fe", "Ne"], "SLE":["Se", "Te"], "LSI":["Ti", "Si"], "IEI":["Ni", "Fi"],
            "SEE":["Se", "Fe"], "LIE":["Te", "Ne"], "ILI": ["Ni", "Ti"], "ESI":["Fi", "Si"],
            "LSE":["Te", "Se"], "IEE": ["Ne", "Fe"], "EII":["Fi", "Ni"], "SLI": ["Si", "Ti"]
        };

        let rankings =[];
        for (const [type, funcs] of Object.entries(missionMap)) {
            const currentScore = Math.round((scores[funcs[0]] * 1.5) + scores[funcs[1]]);
            rankings.push({
                type: type,
                pair: `${funcs[0]}-${funcs[1]}`,
                matchScore: currentScore
            });
        }
        rankings.sort((a, b) => b.matchScore - a.matchScore);

        // ★ SLEパパ特別ルート ★
        if ((logs.bugClicks || 0) >= 30) { 
            const sleIndex = rankings.findIndex(r => r.type === "SLE");
            if (sleIndex > -1) {
                const sleObj = rankings.splice(sleIndex, 1)[0];
                sleObj.matchScore = 999; 
                rankings.unshift(sleObj);
            }
        } 

        return { key: rankings[0].type, scores: scores, topPair: rankings[0].pair, rankings: rankings };
    }
};
