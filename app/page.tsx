"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { families, filterOptions, styles, type StyleItem } from "./style-data";

type ComponentRecipe = {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  prompt: string;
};

const componentRecipes: ComponentRecipe[] = [
  {
    id: "button", icon: "↗", title: "按鈕系統", label: "BUTTONS",
    description: "一次說清楚尺寸、形狀、狀態與動效，避免 AI 只做出一個漂亮按鈕。",
    prompt: "建立完整按鈕系統：primary、secondary、tertiary、destructive 四種層級；提供 40/44/48px 三種高度。所有按鈕需包含 default、hover、active、focus-visible、disabled、loading 狀態。文字與背景至少 4.5:1 對比，focus ring 不可只靠顏色辨識。hover 150ms ease-out，active scale(0.98)，觸控目標至少 44×44px。",
  },
  {
    id: "layout", icon: "⊞", title: "介面排版", label: "LAYOUT",
    description: "定義網格、內容寬度與響應式行為，是讓畫面不散亂的關鍵。",
    prompt: "使用 12 欄響應式網格，桌面最大內容寬度 1280px、左右 gutter 32px；平板改 8 欄，手機 4 欄且 gutter 20px。採 8px spacing system，主要 section 垂直間距 96–128px。視覺層級依序為頁面目標、主要行動、支援內容。避免所有元素都置中，長文每行控制在 60–72 個字元。",
  },
  {
    id: "forms", icon: "⌨", title: "表單體驗", label: "FORMS",
    description: "指明標籤、驗證與錯誤回饋，能大幅改善生成表單的可用性。",
    prompt: "設計可及性的表單：label 永遠可見，不以 placeholder 取代；欄位高度至少 44px，輸入說明放在欄位下方。驗證在 blur 或 submit 後顯示，不要使用者輸入第一個字就報錯。錯誤同時提供圖示、顏色和明確文字，並將焦點導向第一個錯誤。提供 success、disabled、read-only 與 loading 狀態。",
  },
  {
    id: "navigation", icon: "☰", title: "導覽結構", label: "NAVIGATION",
    description: "從資訊架構開始，而不是先決定漢堡選單長什麼樣。",
    prompt: "建立清楚的主導覽：桌面顯示不超過 6 個一級項目，當前頁面有持續可見的 active state；主要 CTA 與一般連結有清楚層級。手機使用可鍵盤操作的展開選單，開啟時鎖定背景捲動並管理焦點。sticky header 高度 64–72px，向下捲動可縮小但不完全消失。",
  },
  {
    id: "cards", icon: "▱", title: "卡片與內容", label: "CARDS",
    description: "讓卡片依內容與行動分級，避免千篇一律的白色浮卡。",
    prompt: "建立三種卡片：資訊卡、可點擊內容卡、行動卡。整張可點擊時使用單一連結涵蓋卡片並提供明確 hover/focus；卡片內若有多個操作則不要讓整張可點。內距 20–28px，標題與內文間距 8–12px。陰影只用於真正浮起的層級，其餘以背景或 1px 邊界區分。",
  },
  {
    id: "motion", icon: "≈", title: "動效回饋", label: "MOTION",
    description: "描述動效目的、速度與減少動態模式，避免生成無意義的動畫。",
    prompt: "動效只服務三個目的：回饋操作、說明空間關係、引導注意。微互動 120–180ms，面板轉場 220–320ms，使用 ease-out；不要對所有元素套用 transition: all。避免大面積 parallax 和無限循環動畫。支援 prefers-reduced-motion，關閉位移、縮放與自動播放，只保留必要的 opacity 變化。",
  },
];

const defaultFilters = {
  era: "全部年代",
  mood: "全部色彩",
  density: "全部密度",
  shape: "全部形狀",
  motion: "全部動效",
  industry: "全部產業",
};

function StylePreview({ style, large = false }: { style: StyleItem; large?: boolean }) {
  return (
    <div
      className={`style-preview ${large ? "is-large" : ""}`}
      data-style={style.id}
      data-layout={style.layout}
      style={{
        "--p-bg": style.colors[0],
        "--p-accent": style.colors[1],
        "--p-ink": style.colors[2],
        "--p-extra": style.colors[3],
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="sp-topbar">
        <b>P/{style.number}</b>
        <span>INDEX&nbsp;&nbsp; WORK&nbsp;&nbsp; INFO</span>
        <i></i>
      </div>
      <div className="sp-main">
        <div className="sp-copy">
          <small>{style.en}</small>
          <h4><span>Shape</span><br />the future.</h4>
          <p>One clear system.<br />Many bold outcomes.</p>
          <button type="button">EXPLORE <span>↗</span></button>
        </div>
        <div className="sp-visual">
          <i className="shape-a"></i>
          <i className="shape-b"></i>
          <div className="sp-metric"><small>CLARITY</small><b>84</b><span>↗ 12%</span></div>
          <div className="sp-menu"><span></span><span></span><span></span></div>
          <div className="sp-input">search_<i></i></div>
        </div>
      </div>
      <div className="sp-footer">
        <span>{style.era}</span><span>{style.density}</span><span>{style.motion} MOTION</span>
        <i></i>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeFamily, setActiveFamily] = useState("全部");
  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<StyleItem>(styles[0]);
  const [selectedRecipe, setSelectedRecipe] = useState<ComponentRecipe>(componentRecipes[0]);
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>(["scandi", "cyberpunk", "newspaper"]);
  const [copied, setCopied] = useState<string | null>(null);
  const [temperature, setTemperature] = useState("中性偏暖");
  const [density, setDensity] = useState("適中");
  const [radius, setRadius] = useState(12);
  const [pageType, setPageType] = useState("SaaS 產品首頁");
  const [tone, setTone] = useState("專業但友善");
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoFormMessage, setDemoFormMessage] = useState("");
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!demoModalOpen) return;
    modalCloseRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDemoModalOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [demoModalOpen]);

  const filteredStyles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return styles.filter((style) => {
      const haystack = `${style.name} ${style.en} ${style.family} ${style.description} ${style.bestFor} ${style.traits.join(" ")} ${style.era} ${style.mood} ${style.density} ${style.shape} ${style.motion} ${style.industry}`.toLowerCase();
      return (activeFamily === "全部" || style.family === activeFamily)
        && (filters.era === "全部年代" || style.era === filters.era)
        && (filters.mood === "全部色彩" || style.mood === filters.mood)
        && (filters.density === "全部密度" || style.density === filters.density)
        && (filters.shape === "全部形狀" || style.shape === filters.shape)
        && (filters.motion === "全部動效" || style.motion === filters.motion)
        && (filters.industry === "全部產業" || style.industry === filters.industry)
        && (!needle || haystack.includes(needle));
    });
  }, [activeFamily, filters, query]);

  const comparedStyles = compareIds.map((id) => styles.find((style) => style.id === id)).filter(Boolean) as StyleItem[];
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => value !== defaultFilters[key as keyof typeof defaultFilters]).length;

  const generatedPrompt = useMemo(
    () => `請設計一個 ${pageType}，品牌語氣為「${tone}」。\n\n視覺方向：${selectedStyle.prompt}\n\n風格維度：${selectedStyle.era}美學、${selectedStyle.mood}色盤、${selectedStyle.density}資訊密度、${selectedStyle.shape}元件輪廓、${selectedStyle.motion}動效，主要適用於${selectedStyle.industry}。\n\n設計參數：色溫採「${temperature}」，資訊密度「${density}」，主要元件圓角 ${radius}px。使用一致的 8px spacing system，建立清楚的標題、內文、標籤三級字體層級。\n\n互動與品質：展示 navigation、buttons、cards、form、modal、loading 的真實狀態；所有互動元件都需有 hover、active、focus-visible、disabled 狀態，觸控目標至少 44×44px。版面需支援 1440px、768px 與 390px，手機不可只把桌面縮小。遵守 WCAG AA 對比，支援鍵盤操作與 prefers-reduced-motion。\n\n請先列出 design tokens（色彩、字體、間距、圓角、陰影、動效），再實作完整頁面。避免通用模板感、過多漸層、無目的裝飾和 lorem ipsum。`,
    [density, pageType, radius, selectedStyle, temperature, tone],
  );

  function updateFilter(key: keyof typeof defaultFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 4) return [...current.slice(1), id];
      return [...current, id];
    });
  }

  function runLoadingDemo() {
    setDemoLoading(true);
    window.setTimeout(() => setDemoLoading(false), 1400);
  }

  function submitDemoForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDemoFormMessage(demoEmail.includes("@") ? "訂閱完成，狀態已同步。" : "請輸入有效的 Email 格式。");
  }

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
        <a className="brand" href="#top" aria-label="Prompt Atelier 首頁"><span className="brand-mark">P/</span><span>Prompt Atelier</span></a>
        <nav aria-label="主要導覽"><a href="#styles">風格圖鑑</a><a href="#compare">風格比較</a><a href="#components">元件配方</a><a href="#builder">Prompt 工作台</a></nav>
        <a className="header-cta" href="#builder">開始組合 <span>↘</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span></span> AI × UI/UX DESIGN GUIDE / EXPANDED EDITION</div>
        <div className="hero-copy"><h1>不要只說「<em>做漂亮一點</em>」</h1><p>把抽象的設計感覺，翻譯成 AI 真正能執行的介面指令。</p></div>
        <div className="hero-bottom">
          <p>比較 36 種真正不同的視覺系統，用六個維度精準篩選，並將選擇組成一段完整且可複製的網頁設計 prompt。</p>
          <div className="hero-stats" aria-label="內容統計"><div><strong>36</strong><span>STYLE SYSTEMS</span></div><div><strong>06</strong><span>FILTER DIMENSIONS</span></div><div><strong>04</strong><span>COMPARE SLOTS</span></div></div>
        </div>
        <div className="marquee" aria-hidden="true"><div>VISUAL ERA · COLOR MOOD · INFORMATION DENSITY · COMPONENT SHAPE · MOTION ENERGY · INDUSTRY FIT · ACCESSIBILITY · RESPONSIVE LAYOUT · </div></div>
      </section>

      <section className="section styles-section" id="styles">
        <div className="section-heading">
          <div><span className="eyebrow">01 / STYLE LIBRARY — 36 SYSTEMS</span><h2>風格不是換色，<br />是整套設計行為。</h2></div>
          <p>每個預覽都會改變版面結構、字體比例、元件形狀、資訊密度與動效語言。選一張卡片查看完整 prompt，或加入比較列。</p>
        </div>

        <div className="library-tools">
          <div className="filter-tabs" role="group" aria-label="依風格類別篩選">
            {families.map((family) => <button type="button" className={activeFamily === family ? "active" : ""} key={family} onClick={() => setActiveFamily(family)} aria-pressed={activeFamily === family}>{family}</button>)}
          </div>
          <label className="search-box"><span>⌕</span><span className="sr-only">搜尋風格</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋風格、用途或特徵…" /></label>
        </div>

        <div className="filter-control-row">
          <button type="button" className="filter-toggle" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}>多維度篩選 <span>{activeFilterCount ? activeFilterCount : "+"}</span></button>
          <p>顯示 <b>{filteredStyles.length}</b> / {styles.length} 種風格</p>
          {(activeFilterCount > 0 || query || activeFamily !== "全部") && <button type="button" className="reset-filter" onClick={() => { setFilters(defaultFilters); setQuery(""); setActiveFamily("全部"); }}>清除全部</button>}
        </div>

        {showFilters && (
          <div className="advanced-filters">
            {(Object.keys(filterOptions) as Array<keyof typeof filterOptions>).map((key) => (
              <label key={key}><span>{{ era: "視覺年代", mood: "色彩氣氛", density: "版面密度", shape: "元件形狀", motion: "動效強度", industry: "適用產業" }[key]}</span><select value={filters[key]} onChange={(event) => updateFilter(key, event.target.value)}>{filterOptions[key].map((option) => <option key={option}>{option}</option>)}</select></label>
            ))}
          </div>
        )}

        <div className="style-grid">
          {filteredStyles.map((style) => (
            <article className={`style-card ${selectedStyle.id === style.id ? "selected" : ""}`} data-style={style.id} key={style.id}>
              <button type="button" className="style-select" onClick={() => setSelectedStyle(style)} aria-label={`選擇 ${style.name} 風格`}>
                <div className="card-meta"><span>{style.number}</span><span>{style.family} · {style.mood}</span></div>
                <StylePreview style={style} />
                <div className="card-copy"><div><h3>{style.name}</h3><span>{style.en}</span></div><span className="round-arrow">↗</span></div>
                <p>{style.description}</p>
                <div className="dimension-tags"><span>{style.era}</span><span>{style.density}</span><span>{style.shape}</span></div>
                <div className="swatches" aria-label={`${style.name} 色票`}>{style.colors.map((color) => <i style={{ background: color }} key={color}></i>)}</div>
              </button>
              <button type="button" className={`compare-toggle ${compareIds.includes(style.id) ? "active" : ""}`} onClick={() => toggleCompare(style.id)} aria-pressed={compareIds.includes(style.id)}>{compareIds.includes(style.id) ? "已加入比較 ✓" : "＋ 加入比較"}</button>
            </article>
          ))}
        </div>

        {filteredStyles.length === 0 && <div className="empty-state">找不到符合的風格。清除部分條件，或改用較寬的產業與年代範圍。</div>}

        <section className="compare-section" id="compare">
          <div className="compare-heading"><div><span className="eyebrow">LIVE STYLE COMPARISON</span><h3>同一內容，四種設計語言。</h3></div><p>選取最多四種風格，比較版面結構、字體、材質、元件與動效。加入第五種時會自動替換最早選擇。</p></div>
          <div className={`compare-grid compare-${Math.max(comparedStyles.length, 1)}`}>
            {comparedStyles.map((style) => (
              <article key={style.id}>
                <div className="compare-card-top"><span>{style.number} / {style.name}</span><button type="button" onClick={() => toggleCompare(style.id)} aria-label={`移除 ${style.name}`}>×</button></div>
                <button type="button" className="compare-preview-button" onClick={() => setSelectedStyle(style)}><StylePreview style={style} large /></button>
                <div className="compare-dimensions"><span>{style.era}</span><span>{style.mood}</span><span>{style.density}</span><span>{style.shape}</span><span>{style.motion}</span></div>
              </article>
            ))}
            {comparedStyles.length === 0 && <div className="compare-empty">從上方卡片加入 2–4 種風格開始比較。</div>}
          </div>
        </section>

        <div className="style-detail" data-style={selectedStyle.id}>
          <div className="detail-preview"><span className="detail-number">{selectedStyle.number}</span><StylePreview style={selectedStyle} large /></div>
          <div className="detail-copy">
            <span className="eyebrow">SELECTED DIRECTION</span><h3>{selectedStyle.name}</h3><p className="en-name">{selectedStyle.en}</p><p>{selectedStyle.description}</p>
            <dl>
              <div><dt>適合</dt><dd>{selectedStyle.bestFor}</dd></div><div><dt>年代</dt><dd>{selectedStyle.era}</dd></div><div><dt>密度</dt><dd>{selectedStyle.density} · {selectedStyle.shape} · {selectedStyle.motion}動效</dd></div><div><dt>關鍵字</dt><dd>{selectedStyle.traits.join(" · ")}</dd></div>
            </dl>
            <div className="prompt-box"><div><span>PROMPT / VISUAL DIRECTION</span><button type="button" onClick={() => copyText(selectedStyle.prompt, "style")}>{copied === "style" ? "已複製 ✓" : "複製"}</button></div><p>{selectedStyle.prompt}</p></div>
          </div>
        </div>
      </section>

      <section className="section component-section" id="components">
        <div className="section-heading light"><div><span className="eyebrow">02 / COMPONENT RECIPES</span><h2>好介面，藏在<br />狀態與細節裡。</h2></div><p>「做一顆圓角按鈕」不夠精確。說清楚層級、尺寸、所有狀態與可及性，AI 才能交付完整系統。</p></div>
        <div className="recipe-layout">
          <div className="recipe-list" role="tablist" aria-label="元件 prompt 配方">
            {componentRecipes.map((recipe, index) => <button type="button" role="tab" aria-selected={selectedRecipe.id === recipe.id} className={selectedRecipe.id === recipe.id ? "active" : ""} key={recipe.id} onClick={() => setSelectedRecipe(recipe)}><span className="recipe-index">0{index + 1}</span><span className="recipe-icon">{recipe.icon}</span><span><small>{recipe.label}</small><b>{recipe.title}</b></span><i>↗</i></button>)}
          </div>
          <div className="recipe-detail" role="tabpanel">
            <div className="recipe-demo" data-recipe={selectedRecipe.id}><div className="demo-label">LIVE SPECIMEN / {selectedRecipe.label}</div><div className="button-specimen"><button type="button">主要行動 <span>↗</span></button><button type="button">次要行動</button><button type="button" disabled>無法使用</button></div><div className="state-row"><span><i></i>DEFAULT</span><span><i></i>HOVER</span><span><i></i>FOCUS</span></div></div>
            <div className="recipe-copy"><span className="eyebrow">PROMPT RECIPE</span><h3>{selectedRecipe.title}</h3><p>{selectedRecipe.description}</p><div className="dark-prompt"><p>{selectedRecipe.prompt}</p><button type="button" onClick={() => copyText(selectedRecipe.prompt, "recipe")}>{copied === "recipe" ? "已複製 ✓" : "複製配方 ↗"}</button></div></div>
          </div>
        </div>

        <div className="interaction-lab">
          <div className="interaction-lab-heading"><div><span className="eyebrow">INTERACTION PLAYGROUND</span><h3>外觀之外，也要把狀態做完整。</h3></div><p>直接操作 menu、modal、表單驗證與 loading。這些行為會讓 AI 理解你要的是完整元件系統，不是一張靜態示意圖。</p></div>
          <div className="interaction-grid">
            <article className="interaction-card">
              <div className="interaction-card-top"><span>01 / MENU</span><i className={demoMenuOpen ? "on" : ""}></i></div>
              <div className="menu-demo">
                <button type="button" className="menu-trigger" onClick={() => setDemoMenuOpen((value) => !value)} aria-expanded={demoMenuOpen} aria-controls="demo-menu">專案動作 <span>{demoMenuOpen ? "↑" : "↓"}</span></button>
                {demoMenuOpen && <div className="demo-menu" id="demo-menu" role="menu"><button type="button" role="menuitem">建立副本</button><button type="button" role="menuitem">分享連結</button><button type="button" role="menuitem">封存專案</button></div>}
              </div>
              <small>ARIA EXPANDED · KEYBOARD FOCUS · CLICK FEEDBACK</small>
            </article>

            <article className="interaction-card">
              <div className="interaction-card-top"><span>02 / MODAL</span><i className={demoModalOpen ? "on" : ""}></i></div>
              <div className="modal-demo"><span className="modal-ghost"><i></i><i></i><i></i></span><button type="button" onClick={() => setDemoModalOpen(true)}>開啟確認視窗 ↗</button></div>
              <small>FOCUS ENTRY · ESC TO CLOSE · BACKDROP</small>
            </article>

            <article className="interaction-card form-card">
              <div className="interaction-card-top"><span>03 / FORM</span><i className={demoFormMessage.includes("完成") ? "on" : ""}></i></div>
              <form onSubmit={submitDemoForm} noValidate>
                <label htmlFor="demo-email">工作摘要寄送位置</label>
                <div><input id="demo-email" type="email" value={demoEmail} onChange={(event) => { setDemoEmail(event.target.value); setDemoFormMessage(""); }} placeholder="you@example.com" aria-describedby="demo-form-message" /><button type="submit">送出</button></div>
                <p id="demo-form-message" className={demoFormMessage.includes("完成") ? "success" : "error"} aria-live="polite">{demoFormMessage || "Label 保持可見，錯誤不只靠顏色。"}</p>
              </form>
            </article>

            <article className="interaction-card loading-card">
              <div className="interaction-card-top"><span>04 / LOADING</span><i className={demoLoading ? "on" : ""}></i></div>
              <button type="button" className="loading-trigger" onClick={runLoadingDemo} disabled={demoLoading}>{demoLoading ? <><span className="spinner"></span>正在建立版本…</> : "執行 Loading 狀態"}</button>
              <div className="loading-progress"><i className={demoLoading ? "running" : ""}></i></div>
              <small>DISABLED STATE · STATUS COPY · REDUCED MOTION</small>
            </article>
          </div>
        </div>
      </section>

      {demoModalOpen && (
        <div className="demo-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDemoModalOpen(false); }}>
          <div className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
            <div className="demo-modal-top"><span>CONFIRM ACTION</span><button ref={modalCloseRef} type="button" onClick={() => setDemoModalOpen(false)} aria-label="關閉確認視窗">×</button></div>
            <div><span className="modal-symbol">↗</span><h3 id="demo-modal-title">發布這套設計系統？</h3><p>確認後會建立一個可供團隊檢查的版本。這個範例示範焦點進入、Escape 關閉與背景遮罩。</p></div>
            <div className="demo-modal-actions"><button type="button" onClick={() => setDemoModalOpen(false)}>取消</button><button type="button" onClick={() => setDemoModalOpen(false)}>確認發布</button></div>
          </div>
        </div>
      )}

      <section className="section builder-section" id="builder">
        <div className="builder-intro"><span className="eyebrow">03 / PROMPT BUILDER</span><h2>把選擇組合成<br />一段可以開工的 Prompt。</h2><p>先描述目標，再定義視覺系統、互動規則與品質門檻。右側會依照你的選擇即時產生完整 instruction。</p><div className="formula"><span>目標</span><i>＋</i><span>風格</span><i>＋</i><span>規則</span><i>＝</i><b>好結果</b></div></div>
        <div className="builder-shell">
          <div className="controls-panel">
            <div className="panel-top"><span>DESIGN CONTROLS</span><small>調整你的介面語言</small></div>
            <label><span>頁面類型</span><select value={pageType} onChange={(event) => setPageType(event.target.value)}><option>SaaS 產品首頁</option><option>品牌形象網站</option><option>數據儀表板</option><option>作品集網站</option><option>活動 Landing Page</option></select></label>
            <label><span>品牌語氣</span><select value={tone} onChange={(event) => setTone(event.target.value)}><option>專業但友善</option><option>大膽而前衛</option><option>沉穩且值得信賴</option><option>溫暖而有人味</option><option>精準且高效率</option></select></label>
            <fieldset><legend>色彩溫度</legend><div className="segmented">{["冷色清晰", "中性偏暖", "自然柔和"].map((option) => <button type="button" className={temperature === option ? "active" : ""} onClick={() => setTemperature(option)} key={option}>{option}</button>)}</div></fieldset>
            <fieldset><legend>資訊密度</legend><div className="segmented">{["寬鬆", "適中", "緊湊"].map((option) => <button type="button" className={density === option ? "active" : ""} onClick={() => setDensity(option)} key={option}>{option}</button>)}</div></fieldset>
            <label className="range-control"><span>元件圓角 <output>{radius}px</output></span><input type="range" min="0" max="24" step="2" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /><i><span>俐落</span><span>柔和</span></i></label>
            <div className="selected-direction"><span>已選風格</span><div><i style={{ background: selectedStyle.colors[1] }}></i><b>{selectedStyle.name}</b><small>{selectedStyle.en}</small></div></div>
          </div>
          <div className="output-panel"><div className="panel-top"><span>GENERATED PROMPT</span><small><i></i> LIVE</small></div><pre>{generatedPrompt}</pre><div className="output-actions"><span>{generatedPrompt.length} CHARACTERS · 繁體中文</span><button type="button" onClick={() => copyText(generatedPrompt, "builder")}>{copied === "builder" ? "已複製到剪貼簿 ✓" : "複製完整 Prompt ↗"}</button></div></div>
        </div>
      </section>

      <section className="checklist-section"><div><span className="eyebrow">BEFORE YOU SEND</span><h2>最後，別忘了這 5 句。</h2></div><ol><li><span>01</span><p><b>先列出 design tokens</b><small>讓 AI 先定義色彩、字體、間距、圓角與動效。</small></p></li><li><span>02</span><p><b>手機版不是縮小版</b><small>要求針對 390px 重新安排層級與操作。</small></p></li><li><span>03</span><p><b>補齊所有互動狀態</b><small>明列 hover、active、focus、disabled 和 loading。</small></p></li><li><span>04</span><p><b>寫出不要什麼</b><small>負面約束能有效避開漸層、浮卡與模板感。</small></p></li><li><span>05</span><p><b>用真實內容驗證</b><small>不要 lorem ipsum；文字長度會直接影響版面品質。</small></p></li></ol></section>
      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">P/</span><span>Prompt Atelier</span></a><p>把品味變成規格，把靈感變成可執行的語言。</p><a href="#top">回到頂端 ↑</a></footer>
    </main>
  );
}
