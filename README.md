# Prompt Atelier

Prompt Atelier 是一個繁體中文、靜態但具互動性的 AI 網頁 UI/UX Prompt 圖鑑。設計師可以比較 36 種介面風格，依年代、色彩、密度、形狀、動效與產業篩選，並組合可直接交給 AI 的完整網頁設計 instruction。

## 功能

- 36 種 UI 視覺風格與可比較的介面預覽
- 六個維度的搜尋與篩選
- 最多四種風格並排比較
- 按鈕、排版、表單、導覽、卡片與動效 Prompt 配方
- 互動式 Prompt Builder
- 選單、Modal、表單驗證與 Loading 示範
- Responsive、鍵盤操作、WCAG 對比與 reduced-motion 支援

## 本機開發

需要 Node.js 22 以上與 pnpm 11。

```bash
pnpm install
pnpm dev
```

正式建置會輸出純靜態檔案至 `out/`：

```bash
pnpm build
pnpm test
```

## GitHub Pages

專案已設定 Next.js static export，並包含 GitHub Actions 部署流程。請到 repository 的 **Settings → Pages**，將 **Source** 設為 **GitHub Actions**。之後每次推送到 `main` 都會重新部署。

正式網址：<https://design-prompt.uuboyscy.dev/>（設定完成前可暫以 <https://uuboyscy.github.io/design-prompt/> 存取。）
