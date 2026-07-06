---
name: code-review
description: 對 git diff 跑完整 code review，依六大面向（正確性、可讀性、架構、重用、安全性、效能）輸出分級報告。重用面向會回頭抓 utils-finder 漏網——該複用既有 src/lib、shadcn、TanStack Query 卻重寫的地方。適用 PR 前 self-review 或檢查 agent 產出的前端程式碼。不適用於給別人 PR feedback 或純架構討論。
---

# code-review

## 概覽

PR 送出前的最後把關。對 git diff 依**六大面向**執行 review：正確性、可讀性、架構、**重用**、安全性、效能。其中「重用」是這個 skill 相對通用 review 的重點——它是 [[utils-finder]] 的出口檢查，回頭抓「該用既有共用程式卻重寫」的地方。審查結果統一呈現，一個 finding 只歸最相關的面向，不重複標記。

此專案技術棧：React 19 + TypeScript + Vite、TanStack Router / Query、axios、shadcn/ui、Tailwind v4、react-hook-form + zod、zustand。

## 使用時機

- 要送 PR 前，想先自己 review 一遍
- Agent 生了一堆 code，不確定品質怎樣
- 改完某功能，想確認沒帶出重複實作、安全或效能問題

**不應使用：** 給別人 PR feedback、純架構討論、還沒開始寫 code、只是在規劃。

## 核心流程

### 步驟 1：確認 target branch

詢問使用者：「要跟哪個 branch 比？（預設 main）」，收到後跑：

```bash
git diff <target>...HEAD
```

diff 為空 → 回報「跟 `<target>` 沒有差異，沒東西可以 review」並結束。

### 步驟 2：偵測 best practice 規則（若有）

若 `.agents/references/` 下有對應 stack 的 best practice 文件（如 vitest、playwright），依 diff 命中的檔案類型載入，供步驟 3 各面向套用。文件不存在時跳過，不報錯。

### 步驟 2.5：偵測新 dependency

若 diff 動到 `package.json`，對每個新增 dependency 逐一確認：

1. **必要性**：現有 stack（見上方）能解決嗎？有沒有更輕量替代？
2. **體積**：對 bundle 的影響？
3. **維護狀態**：近期 commit、open issues 合理嗎？
4. **已知漏洞**：`pnpm audit` 有無回報？
5. **重複**：是不是已經有功能重疊的套件（例如又裝一套 state 管理、又裝一套 http client）？

沒動 `package.json` 就跳過本步驟。

### 步驟 3：執行 review

先掃 diff 中的測試檔（`*.test.*`、`*.spec.*`、`__tests__/`）：

- 有測試 → 先讀測試理解預期行為與 edge case，再看實作
- 沒測試 → 在正確性面向標記 🟡

接著依序審查六大面向，只標真正有問題的點。

#### 正確性

- 邏輯符合預期？有沒有跟 spec / 需求對不上？
- 邊界條件（null、空陣列、零值、loading / error / empty state）顧到了嗎？
- Error path 有處理嗎，還是只走 happy path？
- 有沒有 stale closure、useEffect 依賴漏列、race condition？

#### 可讀性

- 命名清楚嗎？`data`、`result`、`temp` 這種沒上下文的要特別注意
- 邏輯好追嗎？巢狀三元、深層 callback、過度「聰明」的寫法要點出
- 能更短嗎？有沒有 dead code、`_unused`、`// removed` 殘留？

#### 架構

- 跟現有 pattern 衝突嗎？引入新 pattern 理由夠充分嗎？
- 元件職責單一嗎？有沒有把 fetch、狀態、UI 全塞一個元件？
- 模組邊界、dependency 方向對嗎？有沒有循環依賴？
- 抽象層級適當，沒有過度設計？

#### 重用（utils-finder 漏抓）

這是 [[utils-finder]] 的出口檢查。對照專案搜尋地圖，抓「重造輪子」：

- className 有沒有自己拼字串 / 各自 import clsx，而沒用 `src/lib/utils.ts` 的 `cn()`？
- 有沒有 `new axios` 或裸 `fetch`，而沒用 `src/lib/axios` 的共用 instance？
- 抓資料有沒有用 `useEffect` 手刻，而沒走 TanStack Query（`src/lib/query-client`）？
- UI 有沒有手刻按鈕 / 輸入框等，而 `src/components/ui`（shadcn）已有或可產生？
- 表單有沒有自己管狀態與驗證，而沒用 react-hook-form + zod？
- 同一段邏輯重複出現 ≥ 3 次卻沒抽共用？

發現可複用卻重寫的，標 🟡 並指出既有實作位置。

#### 安全性

只跑跟 diff 相關的項目：

- 有沒有 hardcode 機密 / API key（應走環境變數）？
- 外部輸入 / API 回傳資料渲染時，有沒有 XSS 風險（特別是 `dangerouslySetInnerHTML`）？
- redirect / 外開連結的目標 URL 有驗證嗎（防 open redirect）？
- 有沒有把敏感資料寫進 console.log 或留在 client 端 state？

#### 效能

只跑跟 diff 相關的項目：

- list render 有沒有缺 stable `key`、大型列表要不要虛擬化？
- 有沒有不必要的整體 re-render（context 濫用、未 memo 的重算）？
- 重型功能 / 路由有沒有用動態 `import()` 做 code splitting？
- 圖片有沒有指定尺寸（防 CLS）、非首屏 `loading="lazy"`？
- 動畫用 `transform` / `opacity`，避免 layout thrashing？

### 步驟 4：輸出報告

```
## Code Review：<branch> → <target>

#### 正確性
🔴 [問題描述] `src/...:42`

#### 重用
🟡 [可改用既有實作] `src/...:15` → 既有：`src/lib/utils.ts` 的 cn()
```

**嚴重度：**
- 🔴 **Critical**：必修，有 bug、安全漏洞或會壞掉
- 🟡 **Warning**：建議修，影響可維護性或有重複 / 潛在風險
- 🔵 **Nit**：風格偏好或微小改善，可忽略

沒問題的面向直接跳過，不輸出「此面向無問題」這種廢話。

### 步驟 5：審查結論

有 🔴 Critical 時：

```
🚫 有 Critical 問題需要先處理。要我現在修嗎？
```

沒有 Critical 直接結束，不輸出結論。使用者確認要修時，逐一用 Edit tool 修。

## 警訊

- 輸出「此面向無問題」（沒問題就不輸出該 section）
- 跑了跟 diff 無關的檢查項目
- 有 Critical 卻沒輸出結論；沒 Critical 卻輸出 🚫
- 步驟 3 沒先看測試就直接看實作
- **跳過「重用」面向**——這是本 skill 的核心價值，不能省
- diff 動了 `package.json` 卻跳過步驟 2.5

## 驗證

- [ ] diff 非空才繼續
- [ ] 步驟 3 先讀測試再看實作（或已標 🟡 無測試）
- [ ] 六大面向都過了一遍，特別是「重用」有對照專案搜尋地圖
- [ ] 動到 `package.json` 時，新 dependency 已逐一確認
- [ ] 安全 / 效能只跑跟 diff 相關的項目
- [ ] 有 Critical 才輸出結論；使用者確認要修時已實際 Edit
