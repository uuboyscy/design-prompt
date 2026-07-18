"use client";

import { useMemo, useState } from "react";

type StyleItem = {
  id: string;
  number: string;
  name: string;
  en: string;
  family: string;
  mood: string;
  description: string;
  bestFor: string;
  colors: string[];
  prompt: string;
  traits: string[];
};

type ComponentRecipe = {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  prompt: string;
};

const styles: StyleItem[] = [
  {
    id: "scandi",
    number: "01",
    name: "北歐極簡",
    en: "Scandinavian Minimal",
    family: "極簡",
    mood: "冷色",
    description: "留白充足、低彩度與精準層級，讓內容自然成為畫面主角。",
    bestFor: "SaaS、作品集、知識產品",
    colors: ["#F5F7F5", "#DCE5E0", "#24322D", "#7A9288"],
    traits: ["大量留白", "1px 細框", "克制動效"],
    prompt:
      "採用 Scandinavian minimal UI。使用偏冷的灰白背景、炭灰文字與低飽和鼠尾草綠作為唯一強調色。建立清楚的 8px spacing system，大量留白，卡片使用 1px 淺灰邊框而非陰影。標題採中等字重的現代無襯線字，內文行高 1.6。按鈕高度 44px、圓角 10px，hover 僅做 2px 上移與背景加深。避免漸層、裝飾插圖和過度動畫。",
  },
  {
    id: "warm-editorial",
    number: "02",
    name: "暖調編輯",
    en: "Warm Editorial",
    family: "編輯感",
    mood: "暖色",
    description: "像一本精心編排的獨立雜誌，帶有紙張質感與人文溫度。",
    bestFor: "品牌故事、餐飲、文化內容",
    colors: ["#F5EEDF", "#C85B36", "#5B3028", "#D8B68D"],
    traits: ["襯線大標", "紙張底色", "不對稱網格"],
    prompt:
      "設計成 warm editorial website，如高品質獨立雜誌。使用米白紙張色背景、陶土橘與深咖啡紅；大標題採高對比襯線字，介面文字採乾淨無襯線字。運用不對稱 12 欄網格、超大標題與細分隔線。卡片不要浮起，讓內容像排版在紙面上。按鈕以文字連結或深色膠囊呈現，hover 加入細底線滑入效果。整體應溫暖、知性、有手作感。",
  },
  {
    id: "soft-tech",
    number: "03",
    name: "柔光科技",
    en: "Soft Tech",
    family: "科技",
    mood: "冷色",
    description: "清澈的藍紫冷光與柔和玻璃層次，科技感但不冰冷。",
    bestFor: "AI 產品、開發工具、Fintech",
    colors: ["#EAF3FF", "#6D72FF", "#151B3B", "#9FD8FF"],
    traits: ["微光漸層", "玻璃浮層", "細緻回饋"],
    prompt:
      "建立 soft futuristic tech UI，而非典型霓虹科幻。背景使用極淺冰藍，搭配靛藍、霧紫和少量青藍 glow。容器使用半透明白與 backdrop blur，但維持文字對比。按鈕為 12px 圓角的靛藍實心樣式，hover 出現柔和外光與 1.02 scale。資訊密度中等，資料以精準網格對齊；動畫 180–240ms、ease-out，呈現安靜且可信賴的先進感。",
  },
  {
    id: "brutalist",
    number: "04",
    name: "新粗獷主義",
    en: "Neo Brutalism",
    family: "實驗",
    mood: "高對比",
    description: "大膽色塊、粗框與直接的視覺語言，個性鮮明且充滿能量。",
    bestFor: "活動頁、創意工具、潮流品牌",
    colors: ["#FFF35C", "#FF6B8A", "#111111", "#F7F1E8"],
    traits: ["3px 粗框", "硬陰影", "高彩度色塊"],
    prompt:
      "使用 refined neo-brutalist visual language。背景為暖白，搭配亮黃與珊瑚粉色塊；所有主要元件使用 2–3px 黑色外框與 5px 無模糊硬陰影。標題使用超粗無襯線字，標籤可使用等寬字。按鈕看起來像可按壓的實體物件，active 時位移到陰影位置。保持網格與間距嚴謹，避免隨機混亂；確保鮮豔色塊上的文字通過 WCAG AA。",
  },
  {
    id: "zen",
    number: "05",
    name: "日式侘寂",
    en: "Japanese Wabi-sabi",
    family: "極簡",
    mood: "自然",
    description: "安靜、自然、留有呼吸感，以細微的不完美創造真實質地。",
    bestFor: "旅宿、生活風格、身心健康",
    colors: ["#EEE9DF", "#A69C88", "#30322E", "#7D836E"],
    traits: ["自然色階", "寬鬆節奏", "低調細節"],
    prompt:
      "採用 Japanese wabi-sabi digital aesthetic。以灰米色、石墨黑、苔綠構成低飽和自然色盤。版面留有大量不均等但平衡的空白，使用纖細分隔線、直排小標或印章感數字作點綴。按鈕保持樸素，使用文字加箭頭或細框矩形。動畫緩慢而短暫，像紙張滑動。避免完美對稱、亮色漸層、過度圓角與厚重陰影。",
  },
  {
    id: "bento",
    number: "06",
    name: "模組便當盒",
    en: "Bento Grid",
    family: "產品",
    mood: "中性",
    description: "將複雜資訊拆成大小不一的清晰模組，兼顧故事與掃讀效率。",
    bestFor: "功能展示、產品首頁、儀表板",
    colors: ["#F3F4F6", "#FFFFFF", "#191A1D", "#C8FF62"],
    traits: ["模組網格", "資訊分區", "多尺寸卡片"],
    prompt:
      "使用 bento grid product layout。將內容放入尺寸有層級的模組化卡片：一張主卡、兩張中卡與數張小型指標卡；桌面採 12 欄網格，手機改為單欄。背景淺灰，卡片純白、16px 圓角、1px 邊框與極淡陰影。以酸橙綠作少量強調色。每張卡只表達一件事，保留一致內距，避免把每個區塊都塞滿。",
  },
  {
    id: "dark-luxury",
    number: "07",
    name: "暗黑奢華",
    en: "Dark Luxury",
    family: "品牌",
    mood: "深色",
    description: "深色層次、香檳金與精緻字級，呈現沉穩而克制的高級感。",
    bestFor: "精品、建築、會員服務",
    colors: ["#10100F", "#24221E", "#C6A66B", "#F1EBDD"],
    traits: ["深色層次", "高反差襯線", "細金線"],
    prompt:
      "打造 understated dark luxury interface。使用近黑、深炭與香檳金，禁止純黑大面積死黑；文字採暖象牙白。Hero 標題使用優雅高對比襯線，介面採窄版無襯線。卡片以細金灰邊界區隔，不使用明顯陰影。CTA 是香檳金底深色字，圓角 2–6px。動效以淡入、遮罩揭露與緩慢字距變化為主，避免霓虹光、浮誇金屬漸層與廉價奢華符號。",
  },
  {
    id: "playful",
    number: "08",
    name: "友善玩味",
    en: "Playful Friendly",
    family: "產品",
    mood: "暖色",
    description: "圓潤造型與明快回饋降低操作壓力，親切但不幼稚。",
    bestFor: "教育、社群、個人理財",
    colors: ["#FFF8E8", "#FF7A59", "#2C365D", "#A8D8B9"],
    traits: ["圓潤輪廓", "彈性動效", "清楚圖示"],
    prompt:
      "設計 playful but grown-up UI。使用奶油白背景、珊瑚橘、墨藍與薄荷綠；元件採 18–24px 圓角，形狀柔和但排版仍有清楚秩序。字體使用友善的幾何無襯線，避免卡通字。按鈕提供明確 hover、pressed 與 success feedback，可使用 220ms 輕微 spring。錯誤訊息保持鼓勵語氣。插圖若非必要則以簡單 CSS 形狀取代，避免過度可愛。",
  },
  {
    id: "monochrome",
    number: "09",
    name: "瑞士網格",
    en: "Swiss Grid",
    family: "編輯感",
    mood: "高對比",
    description: "嚴謹的網格、醒目字級與黑白對比，讓訊息快速而有權威感。",
    bestFor: "設計工作室、出版、資料故事",
    colors: ["#F7F7F2", "#111111", "#DADAD2", "#E43D30"],
    traits: ["嚴格網格", "粗體字級", "紅色定位點"],
    prompt:
      "採用 International Typographic Style / Swiss grid。使用黑、暖白、灰與少量訊號紅。桌面以 12 欄網格和可見基線組織資訊，標題使用大尺寸 grotesk 無襯線粗體，標籤使用小型等寬大寫字。所有內容左對齊，分隔線清楚。按鈕為黑色矩形或帶箭頭文字連結，圓角不超過 2px。不要插圖、柔和陰影、玻璃效果或裝飾性漸層。",
  },
  {
    id: "glass",
    number: "10",
    name: "玻璃景深",
    en: "Glass Depth",
    family: "科技",
    mood: "深色",
    description: "透過透明度與模糊建立空間景深，適合沉浸式數位產品。",
    bestFor: "媒體、音樂、沉浸式產品",
    colors: ["#15162B", "#5156A8", "#D8E0FF", "#E66CB4"],
    traits: ["透明浮層", "背景模糊", "環境色光"],
    prompt:
      "使用 accessible glassmorphism with real depth。背景建立深靛藍到梅紫的柔和環境漸層，前景面板採 8–14% 白色透明度、16px blur、1px 半透明亮邊。限制玻璃層最多兩層，確保文字與背景有足夠對比。按鈕使用不透明亮紫或白色，避免透明 CTA。hover 改變邊框亮度與 translateY，不要大量漂浮動畫。為不支援 backdrop-filter 的環境提供實色 fallback。",
  },
  {
    id: "retro",
    number: "11",
    name: "復古數位",
    en: "Retro Digital",
    family: "實驗",
    mood: "暖色",
    description: "取材自早期網路與印刷色彩，以現代可用性重新整理。",
    bestFor: "音樂、創意活動、個人品牌",
    colors: ["#F3E6C9", "#E54B2C", "#2143A5", "#2F2B24"],
    traits: ["像素點綴", "復古四色", "功能性裝飾"],
    prompt:
      "建立 modern retro-digital website，參考 90s web 與網版印刷，但保留現代可用性。使用褪色奶油、番茄紅、鈷藍與墨黑；搭配粗體 grotesk、等寬小字和有限的像素化點綴。按鈕採方形、雙層邊線或標籤貼紙樣式。使用跑馬燈、游標反應或抖動作為少量驚喜，但尊重 prefers-reduced-motion。避免低解析度文字、閃爍與難以辨識的導覽。",
  },
  {
    id: "organic",
    number: "12",
    name: "有機自然",
    en: "Organic Calm",
    family: "品牌",
    mood: "自然",
    description: "植物與礦物色系、柔和曲線，建立可靠、平靜且有生命力的體驗。",
    bestFor: "永續品牌、健康、居家生活",
    colors: ["#F1EFE5", "#49745C", "#D49A6A", "#2C3B32"],
    traits: ["自然色盤", "不規則曲線", "柔和觸感"],
    prompt:
      "設計 organic calm interface。色盤取自亞麻、森林綠、陶土與深松針色。區塊可使用柔和不對稱圓角與弧形分界，但內容網格需清楚。標題使用帶人味的柔和襯線字，內文使用高可讀無襯線。按鈕為深綠膠囊，focus ring 明確。微互動像葉片受風般輕微，速度 200–300ms。避免直接套用葉子圖示、過度米色或犧牲對比。",
  },
];

const componentRecipes: ComponentRecipe[] = [
  {
    id: "button",
    icon: "↗",
    title: "按鈕系統",
    label: "BUTTONS",
    description: "一次說清楚尺寸、形狀、狀態與動效，避免 AI 只做出一個漂亮按鈕。",
    prompt:
      "建立完整按鈕系統：primary、secondary、tertiary、destructive 四種層級；提供 40/44/48px 三種高度。所有按鈕需包含 default、hover、active、focus-visible、disabled、loading 狀態。文字與背景至少 4.5:1 對比，focus ring 不可只靠顏色辨識。hover 150ms ease-out，active scale(0.98)，觸控目標至少 44×44px。",
  },
  {
    id: "layout",
    icon: "⊞",
    title: "介面排版",
    label: "LAYOUT",
    description: "定義網格、內容寬度與響應式行為，是讓畫面不散亂的關鍵。",
    prompt:
      "使用 12 欄響應式網格，桌面最大內容寬度 1280px、左右 gutter 32px；平板改 8 欄，手機 4 欄且 gutter 20px。採 8px spacing system，主要 section 垂直間距 96–128px。視覺層級依序為頁面目標、主要行動、支援內容。避免所有元素都置中，長文每行控制在 60–72 個字元。",
  },
  {
    id: "forms",
    icon: "⌨",
    title: "表單體驗",
    label: "FORMS",
    description: "指明標籤、驗證與錯誤回饋，能大幅改善生成表單的可用性。",
    prompt:
      "設計可及性的表單：label 永遠可見，不以 placeholder 取代；欄位高度至少 44px，輸入說明放在欄位下方。驗證在 blur 或 submit 後顯示，不要使用者輸入第一個字就報錯。錯誤同時提供圖示、顏色和明確文字，並將焦點導向第一個錯誤。提供 success、disabled、read-only 與 loading 狀態。",
  },
  {
    id: "navigation",
    icon: "☰",
    title: "導覽結構",
    label: "NAVIGATION",
    description: "從資訊架構開始，而不是先決定漢堡選單長什麼樣。",
    prompt:
      "建立清楚的主導覽：桌面顯示不超過 6 個一級項目，當前頁面有持續可見的 active state；主要 CTA 與一般連結有清楚層級。手機使用可鍵盤操作的展開選單，開啟時鎖定背景捲動並管理焦點。sticky header 高度 64–72px，向下捲動可縮小但不完全消失。",
  },
  {
    id: "cards",
    icon: "▱",
    title: "卡片與內容",
    label: "CARDS",
    description: "讓卡片依內容與行動分級，避免千篇一律的白色浮卡。",
    prompt:
      "建立三種卡片：資訊卡、可點擊內容卡、行動卡。整張可點擊時使用單一連結涵蓋卡片並提供明確 hover/focus；卡片內若有多個操作則不要讓整張可點。內距 20–28px，標題與內文間距 8–12px。陰影只用於真正浮起的層級，其餘以背景或 1px 邊界區分。",
  },
  {
    id: "motion",
    icon: "≈",
    title: "動效回饋",
    label: "MOTION",
    description: "描述動效目的、速度與減少動態模式，避免生成無意義的動畫。",
    prompt:
      "動效只服務三個目的：回饋操作、說明空間關係、引導注意。微互動 120–180ms，面板轉場 220–320ms，使用 ease-out；不要對所有元素套用 transition: all。避免大面積 parallax 和無限循環動畫。支援 prefers-reduced-motion，關閉位移、縮放與自動播放，只保留必要的 opacity 變化。",
  },
];

const families = ["全部", "極簡", "產品", "編輯感", "科技", "品牌", "實驗"];

export default function Home() {
  const [activeFamily, setActiveFamily] = useState("全部");
  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<StyleItem>(styles[0]);
  const [selectedRecipe, setSelectedRecipe] = useState<ComponentRecipe>(componentRecipes[0]);
  const [copied, setCopied] = useState<string | null>(null);
  const [temperature, setTemperature] = useState("中性偏暖");
  const [density, setDensity] = useState("適中");
  const [radius, setRadius] = useState(12);
  const [pageType, setPageType] = useState("SaaS 產品首頁");
  const [tone, setTone] = useState("專業但友善");

  const filteredStyles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return styles.filter((style) => {
      const matchesFamily = activeFamily === "全部" || style.family === activeFamily;
      const haystack = `${style.name} ${style.en} ${style.description} ${style.bestFor} ${style.traits.join(" ")}`.toLowerCase();
      return matchesFamily && (!needle || haystack.includes(needle));
    });
  }, [activeFamily, query]);

  const generatedPrompt = useMemo(
    () =>
      `請設計一個 ${pageType}，品牌語氣為「${tone}」。\n\n視覺方向：${selectedStyle.prompt}\n\n設計參數：色溫採「${temperature}」，資訊密度「${density}」，主要元件圓角 ${radius}px。使用一致的 8px spacing system，建立清楚的標題、內文、標籤三級字體層級。\n\n互動與品質：所有互動元件都需有 hover、active、focus-visible、disabled 狀態；觸控目標至少 44×44px。版面需支援 1440px、768px 與 390px，手機不可只把桌面縮小。遵守 WCAG AA 對比，支援鍵盤操作與 prefers-reduced-motion。\n\n請先列出 design tokens（色彩、字體、間距、圓角、陰影、動效），再實作完整頁面。避免通用模板感、過多漸層、無目的裝飾和 lorem ipsum。`,
    [density, pageType, radius, selectedStyle, temperature, tone],
  );

  async function copyText(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Prompt Atelier 首頁">
          <span className="brand-mark">P/</span>
          <span>Prompt Atelier</span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#styles">風格圖鑑</a>
          <a href="#components">元件配方</a>
          <a href="#builder">Prompt 工作台</a>
        </nav>
        <a className="header-cta" href="#builder">開始組合 <span>↘</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span></span> AI × UI/UX DESIGN GUIDE</div>
        <div className="hero-copy">
          <h1>不要只說「<em>做漂亮一點</em>」</h1>
          <p>把抽象的設計感覺，翻譯成 AI 真正能執行的介面指令。</p>
        </div>
        <div className="hero-bottom">
          <p>比較 12 種視覺方向、拆解 6 組元件配方，最後組成一段完整且可複製的網頁設計 prompt。</p>
          <div className="hero-stats" aria-label="內容統計">
            <div><strong>12</strong><span>STYLE SYSTEMS</span></div>
            <div><strong>06</strong><span>UI RECIPES</span></div>
            <div><strong>01</strong><span>LIVE BUILDER</span></div>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div>VISUAL HIERARCHY · COLOR SYSTEM · TYPOGRAPHY · SPACING · COMPONENT STATES · ACCESSIBILITY · RESPONSIVE LAYOUT · MOTION · </div>
        </div>
      </section>

      <section className="section styles-section" id="styles">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / STYLE LIBRARY</span>
            <h2>風格不是形容詞，<br />是一組可執行的決策。</h2>
          </div>
          <p>選一張卡片，比較它的色彩、字體、形狀與互動語言。每一套都附上可以直接交給 AI 的完整 prompt。</p>
        </div>

        <div className="library-tools">
          <div className="filter-tabs" role="group" aria-label="依風格類別篩選">
            {families.map((family) => (
              <button
                type="button"
                className={activeFamily === family ? "active" : ""}
                key={family}
                onClick={() => setActiveFamily(family)}
                aria-pressed={activeFamily === family}
              >
                {family}
              </button>
            ))}
          </div>
          <label className="search-box">
            <span>⌕</span>
            <span className="sr-only">搜尋風格</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋風格、用途或特徵…" />
          </label>
        </div>

        <div className="style-grid">
          {filteredStyles.map((style) => (
            <button
              type="button"
              className={`style-card ${selectedStyle.id === style.id ? "selected" : ""}`}
              data-style={style.id}
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              aria-label={`選擇 ${style.name} 風格`}
            >
              <div className="card-meta"><span>{style.number}</span><span>{style.family} · {style.mood}</span></div>
              <div className="mini-canvas">
                <div className="mini-nav"><i></i><span></span><span></span></div>
                <div className="mini-content">
                  <small>{style.en}</small>
                  <b>Design with<br />intention.</b>
                  <p></p><p></p>
                  <i>Explore <span>↗</span></i>
                </div>
                <div className="mini-panel"><span></span><b>64%</b><small>CLARITY</small></div>
              </div>
              <div className="card-copy">
                <div><h3>{style.name}</h3><span>{style.en}</span></div>
                <span className="round-arrow">↗</span>
              </div>
              <p>{style.description}</p>
              <div className="swatches" aria-label={`${style.name} 色票`}>
                {style.colors.map((color) => <i style={{ background: color }} key={color}></i>)}
              </div>
            </button>
          ))}
        </div>

        {filteredStyles.length === 0 && (
          <div className="empty-state">找不到符合的風格。試試「品牌」、「科技」或清除篩選。</div>
        )}

        <div className="style-detail" data-style={selectedStyle.id}>
          <div className="detail-preview">
            <span className="detail-number">{selectedStyle.number}</span>
            <div className="preview-window">
              <div className="preview-bar"><i></i><i></i><i></i><span>studio.example</span></div>
              <div className="preview-page">
                <div className="preview-nav"><b>STUDIO</b><span>Work&nbsp;&nbsp; About&nbsp;&nbsp; Journal</span></div>
                <div className="preview-hero">
                  <small>INDEPENDENT DIGITAL PRACTICE</small>
                  <h3>Quiet ideas.<br />Clear impact.</h3>
                  <p>We shape thoughtful digital experiences for people and the planet.</p>
                  <button type="button">Start a project <span>↗</span></button>
                </div>
                <div className="preview-cards"><i></i><i></i><i></i></div>
              </div>
            </div>
          </div>
          <div className="detail-copy">
            <span className="eyebrow">SELECTED DIRECTION</span>
            <h3>{selectedStyle.name}</h3>
            <p className="en-name">{selectedStyle.en}</p>
            <p>{selectedStyle.description}</p>
            <dl>
              <div><dt>適合</dt><dd>{selectedStyle.bestFor}</dd></div>
              <div><dt>關鍵字</dt><dd>{selectedStyle.traits.join(" · ")}</dd></div>
            </dl>
            <div className="prompt-box">
              <div><span>PROMPT / VISUAL DIRECTION</span><button type="button" onClick={() => copyText(selectedStyle.prompt, "style")}>{copied === "style" ? "已複製 ✓" : "複製"}</button></div>
              <p>{selectedStyle.prompt}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section component-section" id="components">
        <div className="section-heading light">
          <div>
            <span className="eyebrow">02 / COMPONENT RECIPES</span>
            <h2>好介面，藏在<br />狀態與細節裡。</h2>
          </div>
          <p>「做一顆圓角按鈕」不夠精確。說清楚層級、尺寸、所有狀態與可及性，AI 才能交付完整系統。</p>
        </div>

        <div className="recipe-layout">
          <div className="recipe-list" role="tablist" aria-label="元件 prompt 配方">
            {componentRecipes.map((recipe, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={selectedRecipe.id === recipe.id}
                className={selectedRecipe.id === recipe.id ? "active" : ""}
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <span className="recipe-index">0{index + 1}</span>
                <span className="recipe-icon">{recipe.icon}</span>
                <span><small>{recipe.label}</small><b>{recipe.title}</b></span>
                <i>↗</i>
              </button>
            ))}
          </div>
          <div className="recipe-detail" role="tabpanel">
            <div className="recipe-demo" data-recipe={selectedRecipe.id}>
              <div className="demo-label">LIVE SPECIMEN / {selectedRecipe.label}</div>
              <div className="button-specimen">
                <button type="button">主要行動 <span>↗</span></button>
                <button type="button">次要行動</button>
                <button type="button" disabled>無法使用</button>
              </div>
              <div className="state-row"><span><i></i>DEFAULT</span><span><i></i>HOVER</span><span><i></i>FOCUS</span></div>
            </div>
            <div className="recipe-copy">
              <span className="eyebrow">PROMPT RECIPE</span>
              <h3>{selectedRecipe.title}</h3>
              <p>{selectedRecipe.description}</p>
              <div className="dark-prompt">
                <p>{selectedRecipe.prompt}</p>
                <button type="button" onClick={() => copyText(selectedRecipe.prompt, "recipe")}>{copied === "recipe" ? "已複製 ✓" : "複製配方 ↗"}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section builder-section" id="builder">
        <div className="builder-intro">
          <span className="eyebrow">03 / PROMPT BUILDER</span>
          <h2>把選擇組合成<br />一段可以開工的 Prompt。</h2>
          <p>先描述目標，再定義視覺系統、互動規則與品質門檻。右側會依照你的選擇即時產生完整 instruction。</p>
          <div className="formula"><span>目標</span><i>＋</i><span>風格</span><i>＋</i><span>規則</span><i>＝</i><b>好結果</b></div>
        </div>

        <div className="builder-shell">
          <div className="controls-panel">
            <div className="panel-top"><span>DESIGN CONTROLS</span><small>調整你的介面語言</small></div>
            <label>
              <span>頁面類型</span>
              <select value={pageType} onChange={(event) => setPageType(event.target.value)}>
                <option>SaaS 產品首頁</option><option>品牌形象網站</option><option>數據儀表板</option><option>作品集網站</option><option>活動 Landing Page</option>
              </select>
            </label>
            <label>
              <span>品牌語氣</span>
              <select value={tone} onChange={(event) => setTone(event.target.value)}>
                <option>專業但友善</option><option>大膽而前衛</option><option>沉穩且值得信賴</option><option>溫暖而有人味</option><option>精準且高效率</option>
              </select>
            </label>
            <fieldset>
              <legend>色彩溫度</legend>
              <div className="segmented">
                {["冷色清晰", "中性偏暖", "自然柔和"].map((option) => <button type="button" className={temperature === option ? "active" : ""} onClick={() => setTemperature(option)} key={option}>{option}</button>)}
              </div>
            </fieldset>
            <fieldset>
              <legend>資訊密度</legend>
              <div className="segmented">
                {["寬鬆", "適中", "緊湊"].map((option) => <button type="button" className={density === option ? "active" : ""} onClick={() => setDensity(option)} key={option}>{option}</button>)}
              </div>
            </fieldset>
            <label className="range-control">
              <span>元件圓角 <output>{radius}px</output></span>
              <input type="range" min="0" max="24" step="2" value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
              <i><span>俐落</span><span>柔和</span></i>
            </label>
            <div className="selected-direction">
              <span>已選風格</span>
              <div><i style={{ background: selectedStyle.colors[1] }}></i><b>{selectedStyle.name}</b><small>{selectedStyle.en}</small></div>
            </div>
          </div>

          <div className="output-panel">
            <div className="panel-top"><span>GENERATED PROMPT</span><small><i></i> LIVE</small></div>
            <pre>{generatedPrompt}</pre>
            <div className="output-actions">
              <span>{generatedPrompt.length} CHARACTERS · 繁體中文</span>
              <button type="button" onClick={() => copyText(generatedPrompt, "builder")}>{copied === "builder" ? "已複製到剪貼簿 ✓" : "複製完整 Prompt ↗"}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="checklist-section">
        <div>
          <span className="eyebrow">BEFORE YOU SEND</span>
          <h2>最後，別忘了這 5 句。</h2>
        </div>
        <ol>
          <li><span>01</span><p><b>先列出 design tokens</b><small>讓 AI 先定義色彩、字體、間距、圓角與動效。</small></p></li>
          <li><span>02</span><p><b>手機版不是縮小版</b><small>要求針對 390px 重新安排層級與操作。</small></p></li>
          <li><span>03</span><p><b>補齊所有互動狀態</b><small>明列 hover、active、focus、disabled 和 loading。</small></p></li>
          <li><span>04</span><p><b>寫出不要什麼</b><small>負面約束能有效避開漸層、浮卡與模板感。</small></p></li>
          <li><span>05</span><p><b>用真實內容驗證</b><small>不要 lorem ipsum；文字長度會直接影響版面品質。</small></p></li>
        </ol>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">P/</span><span>Prompt Atelier</span></a>
        <p>把品味變成規格，把靈感變成可執行的語言。</p>
        <a href="#top">回到頂端 ↑</a>
      </footer>
    </main>
  );
}
