# AGENTS.md

> AI agent（Claude / Codex）規範總入口，唯一事實來源。`CLAUDE.md` 僅 `@AGENTS.md` 指向此檔。

## 語言
- 與使用者對話一律**繁體中文**；程式碼的變數、函式、型別名稱用英文。

## 技術棧
- React 19 + TypeScript + Vite 8
- 路由：TanStack Router（file-based，`src/routes/`；`routeTree.gen.ts` 自動生成，勿手改）
- 資料請求：TanStack Query + axios（共用實例 `src/lib/axios`）
- UI：shadcn（Base UI）+ Tailwind CSS v4｜狀態：zustand｜表單：react-hook-form + zod

## 程式碼風格
- Lint 用 `@antfu/eslint-config`：`pnpm lint` / `pnpm lint:fix`
- 嚴格 TypeScript，提交前 `pnpm type-check` 必須過
- import 別名 `@/*` → `src/*`
- 實作前先用 `utils-finder` 找可複用的 lib / hook / store，避免重造輪子

## 套件管理
- 一律 **pnpm**：安裝 `pnpm add`，執行腳本 `pnpm run`

## 測試
- 完整規範見 `.agents/references/tester.md`，由 `tester` agent 執行；失敗交 `debug` agent 找根因
- 兩維度：mode（`once`→`tests/scratch/`／`permanent`→進 CI）× type（Unit/Component→Vitest；E2E→Playwright）
- 擺放：Unit/Component **co-locate 在 feature 內**；E2E 放**外層 `e2e/<feature>/`**

## Commit 與版本
- **Conventional Commits**，訊息用**中文**（如 `feat: 新增登入頁`）；建議用 `commit` skill
- type 決定版號（release-please）：`fix:`→PATCH、`feat:`→MINOR、`feat!:` 或 `BREAKING CHANGE:`→MAJOR
- 破壞性變更**務必**加 `!`；一個 commit 只對應一種 type
- **不要自動 commit**，由開發者決定時機

## 開發流程與設定位置
- 完整 7 步驟流程（需求釐清 → spec → 實作 → 測試 → debug → review → commit）與目錄/設定位置，見 `README.md`。
