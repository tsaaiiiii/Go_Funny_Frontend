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

## Agent 協作

- 收到功能新增、錯誤修正或產品行為變更的實作需求時，由主 agent 預設依 `README.md` 的七階段流程協調工作；使用者提出實作需求視為啟動需求釐清，後續各階段仍須遵守 README 的觸發與確認條件。
- 進入實作前，主 agent 必須確認需求與 OpenSpec artifacts 已足以實作；除非使用者明確要求略過，不得直接跳過規格化或測試階段。
- 實作完成後，由主 agent 委派 `tester` subagent 分析變更、提出測試清單並執行經確認的測試；測試失敗時依規範交由 `debug` subagent 處理。
- Subagent 不直接與使用者對話。所有需求問題、確認事項、進度與結果，都由主 agent 統一轉達與回報。
- 純文件、文案或不影響執行行為的設定整理，可略過 OpenSpec 與 tester，但主 agent 必須在交付時說明略過項目。
- Commit 維持由使用者明確觸發，任何 agent 都不得自動 commit 或 push。
