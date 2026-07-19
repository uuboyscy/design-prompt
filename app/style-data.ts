export type PreviewLayout =
  | "editorial"
  | "dashboard"
  | "poster"
  | "spatial"
  | "terminal"
  | "commerce"
  | "collage"
  | "system";

export type StyleItem = {
  id: string;
  number: string;
  name: string;
  en: string;
  family: string;
  mood: string;
  era: string;
  density: string;
  shape: string;
  motion: string;
  industry: string;
  layout: PreviewLayout;
  description: string;
  bestFor: string;
  colors: string[];
  prompt: string;
  traits: string[];
};

export const styles: StyleItem[] = [
  {
    id: "scandi", number: "01", name: "北歐極簡", en: "Scandinavian Minimal",
    family: "極簡", mood: "冷色", era: "當代", density: "寬鬆", shape: "圓潤", motion: "克制", industry: "科技產品", layout: "editorial",
    description: "留白充足、低彩度與精準層級，讓內容自然成為畫面主角。", bestFor: "SaaS、作品集、知識產品",
    colors: ["#F5F7F5", "#DCE5E0", "#24322D", "#7A9288"], traits: ["大量留白", "1px 細框", "克制動效"],
    prompt: "採用 Scandinavian minimal UI。使用偏冷灰白、炭灰與低飽和鼠尾草綠。建立 8px spacing system、大量留白，卡片以 1px 淺灰邊框取代陰影。標題採中等字重現代無襯線字；按鈕高度 44px、圓角 10px，hover 僅做 2px 上移與背景加深。避免漸層、裝飾插圖與過度動畫。",
  },
  {
    id: "warm-editorial", number: "02", name: "暖調編輯", en: "Warm Editorial",
    family: "編輯感", mood: "暖色", era: "當代", density: "適中", shape: "銳利", motion: "克制", industry: "品牌內容", layout: "editorial",
    description: "像一本精心編排的獨立雜誌，帶有紙張質感與人文溫度。", bestFor: "品牌故事、餐飲、文化內容",
    colors: ["#F5EEDF", "#C85B36", "#5B3028", "#D8B68D"], traits: ["襯線大標", "紙張底色", "不對稱網格"],
    prompt: "設計成 warm editorial website，如高品質獨立雜誌。使用米白紙張色、陶土橘與深咖啡紅；大標題採高對比襯線，介面文字採無襯線。不對稱 12 欄網格搭配超大標題與細分隔線。卡片不浮起，按鈕以文字連結或深色膠囊呈現，hover 加入細底線滑入。",
  },
  {
    id: "soft-tech", number: "03", name: "柔光科技", en: "Soft Tech",
    family: "科技", mood: "冷色", era: "未來", density: "適中", shape: "圓潤", motion: "適中", industry: "科技產品", layout: "dashboard",
    description: "清澈藍紫冷光與柔和玻璃層次，科技感但不冰冷。", bestFor: "AI 產品、開發工具、Fintech",
    colors: ["#EAF3FF", "#6D72FF", "#151B3B", "#9FD8FF"], traits: ["微光漸層", "玻璃浮層", "細緻回饋"],
    prompt: "建立 soft futuristic tech UI。背景使用極淺冰藍，搭配靛藍、霧紫和少量青藍 glow。容器使用半透明白與 backdrop blur 並維持文字對比。按鈕為 12px 圓角靛藍實心樣式，hover 出現柔和外光與 1.02 scale；動畫 180–240ms ease-out。",
  },
  {
    id: "brutalist", number: "04", name: "新粗獷主義", en: "Neo Brutalism",
    family: "實驗", mood: "高對比", era: "當代", density: "適中", shape: "銳利", motion: "強烈", industry: "文化創意", layout: "poster",
    description: "大膽色塊、粗框與直接的視覺語言，個性鮮明且充滿能量。", bestFor: "活動頁、創意工具、潮流品牌",
    colors: ["#FFF35C", "#FF6B8A", "#111111", "#F7F1E8"], traits: ["3px 粗框", "硬陰影", "高彩度色塊"],
    prompt: "使用 refined neo-brutalist visual language。暖白搭配亮黃與珊瑚粉；主要元件使用 2–3px 黑框與 5px 無模糊硬陰影。標題用超粗無襯線，標籤用等寬字。按鈕像可按壓物件，active 位移到陰影位置。保持網格嚴謹並確保 WCAG AA。",
  },
  {
    id: "zen", number: "05", name: "日式侘寂", en: "Japanese Wabi-sabi",
    family: "極簡", mood: "自然", era: "跨時代", density: "寬鬆", shape: "有機", motion: "克制", industry: "消費生活", layout: "editorial",
    description: "安靜、自然、留有呼吸感，以細微的不完美創造真實質地。", bestFor: "旅宿、生活風格、身心健康",
    colors: ["#EEE9DF", "#A69C88", "#30322E", "#7D836E"], traits: ["自然色階", "寬鬆節奏", "低調細節"],
    prompt: "採用 Japanese wabi-sabi digital aesthetic。以灰米、石墨、苔綠構成低飽和色盤。版面保留不均等但平衡的空白，以纖細分隔線、直排小標或印章數字點綴。按鈕採文字加箭頭或細框矩形；動畫短暫而緩慢。避免完美對稱、亮色漸層與厚重陰影。",
  },
  {
    id: "bento", number: "06", name: "模組便當盒", en: "Bento Grid",
    family: "產品", mood: "中性", era: "當代", density: "適中", shape: "圓潤", motion: "適中", industry: "科技產品", layout: "dashboard",
    description: "將複雜資訊拆成大小不一的清晰模組，兼顧故事與掃讀效率。", bestFor: "功能展示、產品首頁、儀表板",
    colors: ["#F3F4F6", "#FFFFFF", "#191A1D", "#C8FF62"], traits: ["模組網格", "資訊分區", "多尺寸卡片"],
    prompt: "使用 bento grid product layout。內容置於不同尺寸模組：一張主卡、兩張中卡與數張小型指標卡；桌面 12 欄、手機單欄。背景淺灰，卡片純白、16px 圓角、1px 邊框與極淡陰影；酸橙綠只作少量強調。每張卡只表達一件事。",
  },
  {
    id: "dark-luxury", number: "07", name: "暗黑奢華", en: "Dark Luxury",
    family: "品牌", mood: "深色", era: "跨時代", density: "寬鬆", shape: "銳利", motion: "克制", industry: "品牌內容", layout: "commerce",
    description: "深色層次、香檳金與精緻字級，呈現沉穩而克制的高級感。", bestFor: "精品、建築、會員服務",
    colors: ["#10100F", "#24221E", "#C6A66B", "#F1EBDD"], traits: ["深色層次", "高反差襯線", "細金線"],
    prompt: "打造 understated dark luxury interface。使用近黑、深炭、香檳金與暖象牙白。Hero 用高對比襯線，介面用窄版無襯線；卡片以細金灰邊界區隔。CTA 為香檳金底深色字、2–6px 圓角。動效以淡入與遮罩揭露為主，避免霓虹與廉價金屬漸層。",
  },
  {
    id: "playful", number: "08", name: "友善玩味", en: "Playful Friendly",
    family: "產品", mood: "暖色", era: "當代", density: "適中", shape: "圓潤", motion: "強烈", industry: "教育研究", layout: "collage",
    description: "圓潤造型與明快回饋降低操作壓力，親切但不幼稚。", bestFor: "教育、社群、個人理財",
    colors: ["#FFF8E8", "#FF7A59", "#2C365D", "#A8D8B9"], traits: ["圓潤輪廓", "彈性動效", "清楚圖示"],
    prompt: "設計 playful but grown-up UI。奶油白搭配珊瑚橘、墨藍與薄荷綠；元件採 18–24px 圓角但排版仍有秩序。使用友善幾何無襯線。按鈕提供明確 hover、pressed、success feedback 與 220ms 輕微 spring；避免卡通字與過度可愛。",
  },
  {
    id: "monochrome", number: "09", name: "瑞士網格", en: "Swiss Grid",
    family: "編輯感", mood: "高對比", era: "現代主義", density: "緊湊", shape: "銳利", motion: "克制", industry: "文化創意", layout: "poster",
    description: "嚴謹網格、醒目字級與黑白對比，讓訊息快速而有權威感。", bestFor: "設計工作室、出版、資料故事",
    colors: ["#F7F7F2", "#111111", "#DADAD2", "#E43D30"], traits: ["嚴格網格", "粗體字級", "紅色定位點"],
    prompt: "採用 International Typographic Style / Swiss grid。使用黑、暖白、灰與少量訊號紅。桌面以 12 欄和可見基線組織資訊；標題用大尺寸 grotesk 粗體，標籤用小型等寬大寫。所有內容左對齊，按鈕為黑色矩形或箭頭文字連結，圓角不超過 2px。",
  },
  {
    id: "glass", number: "10", name: "玻璃景深", en: "Glass Depth",
    family: "科技", mood: "深色", era: "未來", density: "適中", shape: "圓潤", motion: "適中", industry: "娛樂遊戲", layout: "spatial",
    description: "透過透明度與模糊建立空間景深，適合沉浸式數位產品。", bestFor: "媒體、音樂、沉浸式產品",
    colors: ["#15162B", "#5156A8", "#D8E0FF", "#E66CB4"], traits: ["透明浮層", "背景模糊", "環境色光"],
    prompt: "使用 accessible glassmorphism with real depth。深靛到梅紫環境漸層，面板採 8–14% 白色透明、16px blur、1px 半透明亮邊。玻璃層最多兩層，CTA 必須不透明。hover 改變邊框亮度與 translateY，並為不支援 backdrop-filter 的環境提供實色 fallback。",
  },
  {
    id: "retro", number: "11", name: "復古數位", en: "Retro Digital",
    family: "復古", mood: "暖色", era: "復古", density: "適中", shape: "銳利", motion: "強烈", industry: "文化創意", layout: "poster",
    description: "取材自早期網路與印刷色彩，以現代可用性重新整理。", bestFor: "音樂、創意活動、個人品牌",
    colors: ["#F3E6C9", "#E54B2C", "#2143A5", "#2F2B24"], traits: ["像素點綴", "復古四色", "功能性裝飾"],
    prompt: "建立 modern retro-digital website，參考 90s web 與網版印刷並保留現代可用性。使用褪色奶油、番茄紅、鈷藍和墨黑；粗體 grotesk 搭配等寬小字。按鈕採方形雙層邊線或貼紙樣式，可少量使用跑馬燈與游標反應，並尊重 reduced-motion。",
  },
  {
    id: "organic", number: "12", name: "有機自然", en: "Organic Calm",
    family: "品牌", mood: "自然", era: "當代", density: "寬鬆", shape: "有機", motion: "克制", industry: "消費生活", layout: "commerce",
    description: "植物與礦物色系、柔和曲線，建立可靠且有生命力的體驗。", bestFor: "永續品牌、健康、居家生活",
    colors: ["#F1EFE5", "#49745C", "#D49A6A", "#2C3B32"], traits: ["自然色盤", "不規則曲線", "柔和觸感"],
    prompt: "設計 organic calm interface。色盤取自亞麻、森林綠、陶土與深松針色。區塊使用柔和不對稱圓角與弧形分界，但網格仍清楚。標題用柔和襯線、內文用高可讀無襯線；按鈕為深綠膠囊並有明確 focus ring。",
  },
  {
    id: "bauhaus", number: "13", name: "包浩斯幾何", en: "Bauhaus Geometry",
    family: "現代主義", mood: "原色", era: "現代主義", density: "適中", shape: "銳利", motion: "適中", industry: "文化創意", layout: "poster",
    description: "基本幾何、原色與功能主義，讓結構本身成為視覺焦點。", bestFor: "展覽、設計品牌、文化活動",
    colors: ["#F1E9D2", "#E53B2C", "#1D4E9E", "#F2C230"], traits: ["圓方三角", "原色色塊", "功能網格"],
    prompt: "採用 Bauhaus functional geometry。使用暖白、純紅、鈷藍、芥黃與黑色，將圓、方、線作為結構而非裝飾。排版用粗幾何無襯線與不對稱模組網格。按鈕方正、邊界明確；動畫以幾何元素旋轉 6–12 度或沿網格平移，保持短促且有目的。",
  },
  {
    id: "memphis", number: "14", name: "曼菲斯後現代", en: "Memphis Postmodern",
    family: "實驗", mood: "高彩度", era: "復古", density: "適中", shape: "有機", motion: "強烈", industry: "文化創意", layout: "collage",
    description: "不規則圖形、鮮明撞色與幽默秩序，帶來有控制的叛逆感。", bestFor: "活動、青年品牌、創意教育",
    colors: ["#F6E9CE", "#F25C54", "#3BCEAC", "#5B4B8A"], traits: ["不規則圖形", "撞色", "圖案節奏"],
    prompt: "設計 Memphis postmodern UI。以奶油底搭配珊瑚紅、青綠、紫色和黑色；使用波浪、圓點、斜線與不對稱貼片，但每屏裝飾不超過三種。標題粗而有趣，內文保持中性。元件以不同形狀區分層級；hover 可做短促旋轉與彈跳，避免造成閱讀干擾。",
  },
  {
    id: "art-deco", number: "15", name: "裝飾藝術", en: "Art Deco",
    family: "復古", mood: "深色", era: "復古", density: "寬鬆", shape: "銳利", motion: "克制", industry: "品牌內容", layout: "commerce",
    description: "對稱軸線、金屬細節與扇形幾何，呈現舞台般的精緻秩序。", bestFor: "精品旅宿、珠寶、藝文活動",
    colors: ["#0F2526", "#D8B56A", "#F1E7D2", "#8D2B3D"], traits: ["對稱構圖", "扇形線條", "金屬點綴"],
    prompt: "建立 refined Art Deco interface。使用深墨綠、暖金、象牙白與酒紅；以對稱軸線、細雙框、階梯與扇形幾何建立層級。標題採優雅高對比字體並增加字距。CTA 方正、金色細邊；動效以遮罩揭露和線條展開為主，避免滿版金色與過度裝飾。",
  },
  {
    id: "mid-century", number: "16", name: "世紀中現代", en: "Mid-century Modern",
    family: "復古", mood: "暖色", era: "復古", density: "適中", shape: "有機", motion: "克制", industry: "消費生活", layout: "commerce",
    description: "溫暖木質色、簡潔幾何與樂觀排版，復古卻依然實用。", bestFor: "家具、建築、生活品牌",
    colors: ["#E8D8BA", "#C6573B", "#557A68", "#2D302A"], traits: ["暖木色", "豆形曲線", "幾何襯線"],
    prompt: "使用 Mid-century modern visual system。色盤為亞麻、柿紅、橄欖綠、胡桃木；搭配低重心幾何構圖、豆形曲線與細腳線條。標題可用人文幾何襯線，介面用乾淨無襯線。卡片少陰影、圓角不完全對稱；互動沉穩且短暫。",
  },
  {
    id: "y2k", number: "17", name: "Y2K 鍍鉻", en: "Y2K Chrome",
    family: "復古", mood: "冷色", era: "復古", density: "適中", shape: "立體", motion: "強烈", industry: "娛樂遊戲", layout: "spatial",
    description: "鍍鉻、液態字型與早期千禧數位樂觀感，強烈而俐落。", bestFor: "音樂、時尚、數位活動",
    colors: ["#DCEBFF", "#A8B7D8", "#5A48FF", "#17152F"], traits: ["鍍鉻質感", "液態輪廓", "閃光反射"],
    prompt: "建立 Y2K chrome digital UI。使用冰藍、銀灰、電紫與深靛；以受控金屬漸層、液態輪廓和細星芒作點綴。標題可寬體或延展，內文保持高可讀。按鈕像透明塑膠或金屬膠囊，但主要 CTA 必須不透明；hover 做反光掃過，支援 reduced-motion。",
  },
  {
    id: "cyberpunk", number: "18", name: "賽博龐克", en: "Cyberpunk Neon",
    family: "科技", mood: "深色", era: "未來", density: "緊湊", shape: "銳利", motion: "強烈", industry: "娛樂遊戲", layout: "terminal",
    description: "高密度資訊、霓虹警示與城市夜色，營造即時任務感。", bestFor: "遊戲、音樂科技、沉浸體驗",
    colors: ["#080A12", "#00F0FF", "#FF2BD6", "#F4EF5A"], traits: ["霓虹警示", "切角面板", "掃描線"],
    prompt: "設計 legible cyberpunk interface。近黑背景搭配青色、洋紅與警示黃；面板使用切角、細線與小型狀態標籤，不用大量 glow 模糊文字。標題採窄體粗字，資料採等寬字。互動可短暫 glitch 或掃描，但正文保持穩定，所有霓虹文字對比需通過 AA。",
  },
  {
    id: "vaporwave", number: "19", name: "蒸氣波夢境", en: "Vaporwave Dream",
    family: "實驗", mood: "高彩度", era: "復古", density: "寬鬆", shape: "立體", motion: "強烈", industry: "文化創意", layout: "spatial",
    description: "粉紫夕陽、數位網格與超現實空間，帶有慢速夢境感。", bestFor: "音樂、藝術計畫、實驗品牌",
    colors: ["#1C1445", "#FF71CE", "#65D9FF", "#B967FF"], traits: ["粉紫漸層", "透視網格", "超現實景深"],
    prompt: "使用 tasteful vaporwave aesthetic。深紫夜色搭配粉紅、電藍與淡紫夕陽漸層；以透視網格、柔和太陽圓盤與少量噪點建立空間。標題寬鬆、介面資訊置於穩定深色面板。動畫緩慢漂移且尊重 reduced-motion；避免低對比粉字與過多復古符號。",
  },
  {
    id: "terminal", number: "20", name: "終端機介面", en: "Terminal CLI",
    family: "專業", mood: "深色", era: "跨時代", density: "緊湊", shape: "銳利", motion: "克制", industry: "專業工具", layout: "terminal",
    description: "以命令列的直接性與精準回饋，建立高效率的工具感。", bestFor: "開發工具、資安、技術文件",
    colors: ["#0B0F0C", "#A6FF9E", "#D6E0D7", "#46504A"], traits: ["等寬字", "命令提示符", "狀態日誌"],
    prompt: "打造 terminal-inspired interface，不要只是黑底綠字。使用近黑、柔和磷光綠、灰白與狀態色；全站等寬字需有足夠字級與行高。以命令提示符、日誌時間戳和框線組織資訊。按鈕可用 [ RUN ] 形式，focus 與錯誤狀態清楚；游標動畫不可影響閱讀。",
  },
  {
    id: "skeuomorphic", number: "21", name: "現代擬物", en: "Modern Skeuomorphism",
    family: "產品", mood: "暖色", era: "跨時代", density: "適中", shape: "立體", motion: "適中", industry: "消費生活", layout: "system",
    description: "材質、刻度與物理回饋讓數位操作更直覺，但保留現代清晰度。", bestFor: "音樂工具、家電控制、創作軟體",
    colors: ["#D9D1C2", "#625B52", "#D46E43", "#272A2C"], traits: ["實體旋鈕", "材質陰影", "物理回饋"],
    prompt: "使用 modern restrained skeuomorphism。選擇磨砂金屬、軟塑料或紙張其中一種材質語言，不混用。控制元件具有光源一致的內外陰影、刻度和 pressed 狀態；文字與功能層級仍遵循現代介面。避免仿真到影響掃讀，所有操作提供鍵盤等價方式。",
  },
  {
    id: "clay", number: "22", name: "黏土立體", en: "Claymorphism",
    family: "產品", mood: "暖色", era: "當代", density: "寬鬆", shape: "立體", motion: "適中", industry: "教育研究", layout: "collage",
    description: "柔軟立體元件與粉彩色塊，帶來可觸摸般的親近感。", bestFor: "兒童教育、健康、輕量工具",
    colors: ["#F5EEFF", "#8D74E8", "#FF9B8E", "#334155"], traits: ["厚實圓角", "雙層陰影", "粉彩材質"],
    prompt: "設計 accessible claymorphism UI。以淡紫背景、柔紫、珊瑚與深灰構成；元件使用 24–32px 厚實圓角、柔和外陰影加微弱內亮邊，維持單一光源。CTA 用高對比實色，文字不得壓在複雜陰影上。按壓時縮短陰影並下沉 2px。",
  },
  {
    id: "neumorphism", number: "23", name: "柔性浮雕", en: "Soft Neumorphism",
    family: "極簡", mood: "中性", era: "當代", density: "寬鬆", shape: "圓潤", motion: "克制", industry: "消費生活", layout: "system",
    description: "同色系浮雕與微妙光影，呈現安靜而精密的控制面板。", bestFor: "音訊、智慧家庭、專注工具",
    colors: ["#E7ECF2", "#C5CDD8", "#344256", "#6B7C93"], traits: ["同色浮雕", "內凹控制", "單一光源"],
    prompt: "採用 accessibility-first neumorphism。淺灰藍底配深藍灰文字；浮起與內凹效果只用於次要控制，主要 CTA 與文字欄位必須有清楚邊界和實色對比。陰影遵循左上光源，focus ring 使用高對比藍。不要用陰影作為唯一狀態訊號。",
  },
  {
    id: "handdrawn", number: "24", name: "手繪草圖", en: "Hand-drawn Sketch",
    family: "實驗", mood: "自然", era: "跨時代", density: "適中", shape: "有機", motion: "適中", industry: "文化創意", layout: "collage",
    description: "不規則線條、註記與紙面節奏，像正在共同發想的工作桌。", bestFor: "工作坊、創作者、教育內容",
    colors: ["#F7F2E6", "#27231F", "#E85D4A", "#3D7A68"], traits: ["手寫註記", "不規則框線", "紙張節奏"],
    prompt: "建立 hand-drawn editorial UI。使用暖紙色、炭筆黑、紅色批註與墨綠；框線微微不規則但文字排版保持精準。以手寫註記、箭頭與圈選作少量強調，正文使用高可讀字體。按鈕像被筆框起，hover 出現短線條補畫效果，避免整頁潦草。",
  },
  {
    id: "scrapbook", number: "25", name: "剪報拼貼", en: "Digital Scrapbook",
    family: "實驗", mood: "暖色", era: "跨時代", density: "適中", shape: "有機", motion: "強烈", industry: "品牌內容", layout: "collage",
    description: "撕紙、膠帶與錯位圖層組成可探索的數位剪貼簿。", bestFor: "文化品牌、旅遊日誌、活動故事",
    colors: ["#EFE7D4", "#D74A35", "#2E5A4F", "#24211E"], traits: ["撕紙邊緣", "膠帶標籤", "錯位圖層"],
    prompt: "設計 structured digital scrapbook。暖紙底搭配番茄紅、森林綠與墨黑；以撕紙邊、紙膠帶、圖章和輕微旋轉建立層次，但內容仍對齊隱形網格。互動卡片可像翻開紙片，手機版降低重疊。避免每個元素都傾斜或加入材質。",
  },
  {
    id: "cinematic", number: "26", name: "電影敘事", en: "Cinematic Storytelling",
    family: "品牌", mood: "深色", era: "當代", density: "寬鬆", shape: "銳利", motion: "強烈", industry: "品牌內容", layout: "editorial",
    description: "寬銀幕比例、字幕式排版與章節轉場，讓內容像一段預告片。", bestFor: "影像作品、品牌敘事、娛樂內容",
    colors: ["#090909", "#E9E2D2", "#B53A2D", "#55524D"], traits: ["寬銀幕構圖", "章節字幕", "遮罩轉場"],
    prompt: "建立 cinematic web experience。使用深黑、膠片暖白、暗紅與低彩度灰；版面參考 2.39:1 寬銀幕與字幕安全區。標題短而巨大，內容以章節和時間碼組織。轉場可使用遮罩揭露與畫面淡出，但導覽始終可用，並為 reduced-motion 提供直接切換。",
  },
  {
    id: "industrial", number: "27", name: "工業控制台", en: "Industrial Control",
    family: "專業", mood: "中性", era: "跨時代", density: "緊湊", shape: "銳利", motion: "克制", industry: "專業工具", layout: "dashboard",
    description: "功能標籤、警示色與耐用結構，像可靠的專業設備面板。", bestFor: "製造、物流、監控與營運工具",
    colors: ["#D8D4C8", "#202421", "#F2B705", "#C23B2A"], traits: ["設備標籤", "警示色", "強韌邊框"],
    prompt: "設計 industrial control interface。以機械灰、炭黑、警示黃與錯誤紅建立功能性層級。面板使用方正邊框、編號、狀態燈與刻度；資料採高可讀等寬數字。動效只用於狀態變更，重要警示不得只靠顏色或閃爍表示。",
  },
  {
    id: "data-dense", number: "28", name: "高密度數據", en: "Data-dense Pro",
    family: "專業", mood: "冷色", era: "當代", density: "緊湊", shape: "銳利", motion: "克制", industry: "專業工具", layout: "dashboard",
    description: "緊湊表格、精準數字與層級化狀態，服務長時間專業工作。", bestFor: "金融、營運、分析與管理後台",
    colors: ["#F3F5F7", "#243447", "#2166D1", "#16A085"], traits: ["緊湊表格", "固定欄列", "狀態密度"],
    prompt: "建立 professional data-dense dashboard。使用 4px/8px 混合間距、12–14px 資料字級與 tabular numbers。表格需有固定表頭、欄位對齊、排序、篩選、空值和錯誤狀態；以色彩加圖示或文字呈現狀態。避免巨型卡片、無效留白和把每個數字做成 KPI 卡。",
  },
  {
    id: "newspaper", number: "29", name: "新聞報紙", en: "Newspaper Editorial",
    family: "編輯感", mood: "中性", era: "跨時代", density: "緊湊", shape: "銳利", motion: "克制", industry: "品牌內容", layout: "editorial",
    description: "多欄文字、醒目頭條與資訊優先級，適合大量內容快速掃讀。", bestFor: "新聞、研究報告、內容平台",
    colors: ["#F5F1E8", "#161616", "#A92323", "#BDB8AC"], traits: ["多欄文字", "頭條層級", "細密分隔線"],
    prompt: "採用 contemporary newspaper layout。暖白紙色、黑色與少量深紅；桌面使用多欄網格、頭條、導言、byline 和細分隔線，手機回到單欄。標題採新聞襯線、介面採無襯線。將內容優先於卡片，避免每篇文章都放入圓角白卡。",
  },
  {
    id: "academic", number: "30", name: "學術研究", en: "Academic Research",
    family: "專業", mood: "中性", era: "跨時代", density: "緊湊", shape: "銳利", motion: "克制", industry: "教育研究", layout: "editorial",
    description: "引文、註腳與結構化證據，營造可信、可追溯的閱讀環境。", bestFor: "論文、研究機構、知識庫",
    colors: ["#FAF9F5", "#263238", "#315B7D", "#A7A29A"], traits: ["註腳系統", "引文標記", "長文閱讀"],
    prompt: "設計 academic research interface。使用溫和白底、深灰藍文字與低飽和連結藍；長文每行 65–75 字元，提供章節目錄、引文編號、腳註與圖表說明。標題層級嚴謹，互動克制。所有來源連結有明確外部標示，避免行銷式大字與裝飾卡片。",
  },
  {
    id: "gamer-hud", number: "31", name: "遊戲 HUD", en: "Gamer HUD",
    family: "科技", mood: "深色", era: "未來", density: "緊湊", shape: "銳利", motion: "強烈", industry: "娛樂遊戲", layout: "system",
    description: "狀態條、任務提示與環形數據，在有限空間傳達即時資訊。", bestFor: "遊戲、電競、互動展示",
    colors: ["#081117", "#38E8B0", "#F2D64B", "#DCE8E5"], traits: ["環形狀態", "任務提示", "即時回饋"],
    prompt: "打造 game HUD-inspired web UI。深藍黑背景搭配薄荷綠、警示黃與冷白；使用環形進度、狀態條、任務標籤和切角框。資訊分為常駐、情境和警示三級。動畫要快速回應但不持續閃爍；文字需保持正常字距與 AA 對比，避免整頁像遊戲畫面而失去網頁導覽。",
  },
  {
    id: "spatial", number: "32", name: "空間介面", en: "Spatial Vision UI",
    family: "科技", mood: "冷色", era: "未來", density: "寬鬆", shape: "圓潤", motion: "適中", industry: "科技產品", layout: "spatial",
    description: "景深、半透明材質與寬鬆目標，模擬空間運算的層次感。", bestFor: "XR、媒體瀏覽、展示工具",
    colors: ["#DCE4E8", "#FFFFFF", "#1D2935", "#6C8EA5"], traits: ["空間景深", "寬鬆目標", "材質層級"],
    prompt: "設計 spatial computing inspired interface。以柔和環境背景、半透明材質和清楚景深區分層級；互動目標至少 52px，面板間保留空間。使用圓角矩形與柔和 focus glow，但主要內容需有不透明底。hover 模擬注視放大 1.02，避免大量玻璃層與過度漂浮。",
  },
  {
    id: "liquid", number: "33", name: "流體漸層", en: "Liquid Gradient",
    family: "實驗", mood: "高彩度", era: "當代", density: "寬鬆", shape: "有機", motion: "強烈", industry: "品牌內容", layout: "spatial",
    description: "流動色場與有機邊界創造情緒，介面則維持穩定清楚。", bestFor: "創意科技、音樂、品牌活動",
    colors: ["#15152A", "#FF5FA2", "#6C63FF", "#61E8E1"], traits: ["流動色場", "有機遮罩", "環境動畫"],
    prompt: "建立 liquid gradient visual system。深靛背景搭配桃紅、紫藍和青色流體色場；漸層只存在於背景或大型遮罩，不放在小字和每顆按鈕。內容使用穩定不透明面板。色場可緩慢變形 8–12 秒循環，reduced-motion 時固定為靜態構圖。",
  },
  {
    id: "developer", number: "34", name: "開發者工具", en: "Monospace Developer",
    family: "專業", mood: "深色", era: "當代", density: "緊湊", shape: "銳利", motion: "克制", industry: "專業工具", layout: "terminal",
    description: "程式碼、檔案樹與可組合面板，為高效率技術工作而設計。", bestFor: "IDE、API 文件、開發平台",
    colors: ["#111418", "#E6EDF3", "#58A6FF", "#7EE787"], traits: ["程式碼語法", "分割面板", "快捷鍵提示"],
    prompt: "設計 developer-tool interface。使用深炭背景、冷白文字、語法藍與成功綠；建立檔案樹、分割面板、tabs、命令面板和快捷鍵提示。程式碼用等寬字，介面文字可用中性無襯線。控制資訊密度，focus state 明確，避免無目的霓虹與假終端裝飾。",
  },
  {
    id: "enterprise", number: "35", name: "企業系統", en: "Corporate Enterprise",
    family: "專業", mood: "冷色", era: "當代", density: "緊湊", shape: "銳利", motion: "克制", industry: "專業工具", layout: "dashboard",
    description: "穩定導覽、權限清楚與可預測元件，服務複雜長期工作流程。", bestFor: "CRM、ERP、行政與內部工具",
    colors: ["#F5F7FA", "#17324D", "#246BCE", "#66788A"], traits: ["側欄導覽", "權限層級", "批次操作"],
    prompt: "建立 modern corporate enterprise UI。使用淺灰背景、深海軍藍、功能藍和中性灰；固定側欄、頁面標題、breadcrumb、批次操作和資料表要有一致模式。密度緊湊但行高可讀，狀態文字明確。動效低調，優先可預測性、權限可見性與錯誤恢復。",
  },
  {
    id: "accessible", number: "36", name: "高可及性", en: "Accessible High Contrast",
    family: "產品", mood: "高對比", era: "當代", density: "適中", shape: "銳利", motion: "克制", industry: "公共服務", layout: "system",
    description: "以清楚層級、強對比與多重訊號，讓更多人可靠完成任務。", bestFor: "政府、醫療、公共服務、所有產品",
    colors: ["#FFFFFF", "#111111", "#005FCC", "#FFD400"], traits: ["AAA 對比", "明確焦點", "多重狀態訊號"],
    prompt: "設計 accessibility-first high-contrast UI。白底黑字搭配深藍連結與黃色警示；正文至少 16px、行高 1.6，互動目標至少 44×44px。focus ring 3px 且不被裁切；錯誤、成功與警告同時使用文字、圖示和顏色。支援鍵盤、放大 200%、forced-colors 與 reduced-motion，目標 WCAG 2.2 AA，核心文字盡量達 AAA。",
  },
];

export const families = ["全部", "極簡", "產品", "編輯感", "科技", "品牌", "實驗", "復古", "現代主義", "專業"];
export const filterOptions = {
  era: ["全部年代", "當代", "現代主義", "復古", "未來", "跨時代"],
  mood: ["全部色彩", "冷色", "暖色", "中性", "自然", "深色", "高對比", "高彩度", "原色"],
  density: ["全部密度", "寬鬆", "適中", "緊湊"],
  shape: ["全部形狀", "銳利", "圓潤", "有機", "立體"],
  motion: ["全部動效", "克制", "適中", "強烈"],
  industry: ["全部產業", "科技產品", "品牌內容", "文化創意", "專業工具", "教育研究", "消費生活", "娛樂遊戲", "公共服務"],
};
