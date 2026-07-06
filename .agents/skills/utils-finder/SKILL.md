---
name: utils-finder
description: Use before adding or refactoring React/TypeScript code in this project. Search existing shared code (lib utils, the axios instance, TanStack Query setup, shadcn ui primitives, zustand stores, zod schemas) and reuse or extend it instead of writing new duplicates.
---

# utils-finder

在這個專案新增功能或重構前，**先找現有的共用程式再決定是否新寫**。重點不只是「避免重複」，而是讓新程式**沿用既有的技術棧慣例與放置位置**。

此專案技術棧：React 19 + TypeScript + Vite、TanStack Router（檔案式路由）、TanStack Query、axios、shadcn/ui、Tailwind v4、react-hook-form + zod、zustand。

## 何時使用

動手寫以下任一類東西**之前**，先跑這個流程：

- 工具函式 / helper、自訂 hook
- 打 API / 抓資料的邏輯
- UI 元件（按鈕、輸入框、對話框…）
- 全域狀態 / store
- 表單與驗證

## 專案搜尋地圖

先看這些既有位置，多數需求已經有對應的「正確做法」：

| 需求 | 先看這裡 | 既有慣例 |
|---|---|---|
| className 合併 | `src/lib/utils.ts` | 用 `cn()`（clsx + tailwind-merge），**不要**自己手拼字串或各自 import clsx |
| 打 API | `src/lib/axios/index.ts` | 用共用的 axios instance，**不要** `new axios` 或裸 `fetch` |
| 資料抓取 / 快取 | `src/lib/query-client/index.ts` | 走 TanStack Query（`useQuery`/`useMutation`），別自己用 `useEffect` 抓 |
| UI 基礎元件 | `src/components/ui/` | shadcn 元件（如 `button.tsx`）；先找有沒有，沒有再用 shadcn 產生，別重造 |
| 組合型元件 | `src/components/` | 共用的非 ui-primitive 元件 |
| 路由 | `src/routes/`、`src/router.ts` | TanStack Router 檔案式路由；`routeTree.gen.ts` 是自動產生，勿手改 |
| 全域狀態 | 搜 `from 'zustand'` | 用 zustand store；先找有沒有現成 store |
| 表單 / 驗證 | 搜 `react-hook-form`、`zod` | react-hook-form + `@hookform/resolvers` 接 zod schema |

## 搜尋手法

1. **以「概念」grep**，不只搜檔名：例如要做 debounce，就搜 `debounce`、`useDebounce`；要呼叫某 API，搜該 endpoint 或資源名稱。
2. **看 `src/lib/` 與 barrel/index 檔**，掌握已匯出的共用單位。
3. **比對命名慣例**：找到相似實作時，沿用它的命名、參數形狀與回傳型別，不要另立一套。

## 判斷：重用 / 擴充 / 新建

- **完全涵蓋需求** → 直接重用。
- **部分涵蓋** → 優先**擴充既有**（加參數、加 overload、抽共用），而非複製一份改。
- **確實沒有** → 才新建，並放到**符合上表慣例的位置**（共用工具進 `src/lib/`、UI primitive 進 `src/components/ui/`、組合元件進 `src/components/`）。

## 出口檢查

寫完後快速自問：剛剛新增的東西，有沒有哪一塊其實 `src/lib/` 或 shadcn 已經有了？若有，回頭改用既有的。此檢查也是 code review 階段會回頭抓的重點之一。
