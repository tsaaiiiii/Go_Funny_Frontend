# Agent_Foundry

這是一個以 AI 協作流程為核心的前端專案殼。專案本身不包含產品功能或領域邏輯；Claude 與 Codex 共用同一套規範、skills 與測試知識。

## AI Workflow

```text
需求釐清 → OpenSpec 規格 → 實作 → 測試 ─┬→ 通過 → Code Review → Commit
                                        └→ 失敗 → Debug → 修復 → 重新測試
```

完整工作流分成七個階段。每一階段都由開發者主動觸發，只有測試失敗後的 debug 交棒會自動發生。

| # | 階段 | 使用者觸發方式 | 執行者 | 主要產出 |
|---|---|---|---|---|
| 1 | 需求釐清 | 說明想法，或呼叫 `openspec-explore` / `grill-with-docs` | 主 agent + skill | 明確需求、領域語言，必要時更新 CONTEXT / ADR |
| 2 | 規格化 | 呼叫 `openspec-propose` | 主 agent + skill | proposal、design、specs、tasks |
| 3 | 實作 | 呼叫 `openspec-apply-change` | 主 agent + skill | 程式碼與完成的 task checklist |
| 4 | 測試 | 呼叫 `tester` agent | tester | 測試策略、測試程式與執行結果 |
| 5 | Debug | 測試失敗時由 tester 交棒，或直接呼叫 `debug` | debug | 根因判定、最小修復與回歸結果 |
| 6 | Code Review | 呼叫 `code-review` | 主 agent + skill | 依嚴重度分類的 review 報告 |
| 7 | Commit | 呼叫 `commit` | 主 agent + skill | 經使用者確認的 Conventional Commits |

### 1. 需求釐清

需求還不確定時，先探索，不直接寫程式。

- `openspec-explore`：調查問題、比較方案、釐清範圍與限制，不產生實作。
- `grill-with-docs`：用既有領域模型壓測方案、統一名詞。
- `CONTEXT.md`：只保存長期有效的領域名詞與 canonical language。
- `docs/adr/`：只記錄難以反悔、存在真實 trade-off 的架構決策。

這一階段的出口條件是：目標、範圍、非目標、關鍵情境與驗收標準足以進入規格化。

### 2. OpenSpec 規格化

使用 `openspec-propose` 將需求建立為 `openspec/changes/<change-name>/` 下的變更。預設會產生：

- `proposal.md`：為什麼要做、要改什麼。
- `design.md`：技術方案、邊界與取捨。
- `specs/`：可驗證的行為規格。
- `tasks.md`：可逐項完成的實作清單。

規格不完整時先補問題，不以猜測代替產品決策。所有 OpenSpec 必要 artifacts 完成後才能進入實作。

### 3. 實作

使用 `openspec-apply-change` 讀取 proposal、design、specs 與 tasks，依清單逐項實作。

實作前必須先跑 `utils-finder`，確認是否能沿用或擴充既有基礎設施：

- HTTP：`src/lib/axios`
- Server state：TanStack Query 與 `src/lib/query-client`
- UI primitives：`src/components/ui`
- className 合併：`src/lib/utils.ts` 的 `cn()`
- Client state：zustand
- 表單與驗證：react-hook-form + zod

每完成一項工作便更新 `tasks.md` 的 checkbox。若實作暴露規格或設計問題，暫停實作並回到第 1 或第 2 階段更新文件，不自行擴張需求。

### 4. 測試

由 `tester` agent 先分析變更，再提出測試建議。使用者確認最終清單後才撰寫測試。

每條測試同時具有兩個維度：

| 維度 | 選項 | 用途 |
|---|---|---|
| Mode | `once` | 一次性驗證，放在 `tests/scratch/`，不進 CI |
| Mode | `permanent` | 長期 regression guard，納入 CI |
| Type | `Unit` | Vitest，驗證純邏輯與邊界 |
| Type | `Component` | Vitest + React Testing Library，驗證 UI 行為 |
| Type | `E2E` | Playwright，驗證關鍵使用者旅程 |

永久 Unit / Component test 與 feature co-locate；永久 E2E test 放在 `e2e/<feature>/`。關鍵流程應有 permanent E2E，測試描述使用繁體中文，並遵循 AAA 與一個 test 驗一件事。

### 5. Debug

測試失敗時，tester 只直接修正明顯的測試筆誤；其他失敗交給 `debug` agent：

1. 明確描述預期、實際與差異。
2. 穩定重現問題。
3. 縮小範圍並以證據驗證根因。
4. 判定是 production code 錯、test 錯，或需求不明。
5. 只對已驗證的根因做最小修復。
6. 交回 tester 重跑原測試與相關 regression tests。

禁止為了讓測試變綠而任意修改 production code。需求不明時回到需求釐清，不由 agent 自行決定行為。

### 6. Code Review

實作與測試完成後，使用 `code-review` 對目標 branch 的 diff 做最後檢查：

- 正確性
- 可讀性
- 架構
- 重用
- 安全性
- 效能

Review findings 分為 Critical、Warning、Nit。Critical 必須先處理；修正後重新執行相關測試與 review。重用面向會再次檢查是否漏用 `utils-finder` 找到的共用能力。

提交前至少執行：

```bash
pnpm type-check
pnpm lint
pnpm test:run
pnpm build
```

涉及關鍵使用者流程時，再執行：

```bash
pnpm e2e
```

### 7. Commit

只有開發者明確要求時才使用 `commit` skill。它會：

1. 掃描 staged、unstaged 與 untracked changes。
2. 依功能與變更類型分組。
3. 將 lock file 與業務變更拆開。
4. 產生中文 Conventional Commit 訊息。
5. 展示完整 commit 計畫。
6. 等使用者確認後才執行 `git add` 與 `git commit`。

Agent 不會自動 commit，也不會自動 push。

| Commit type | 用途 | release-please 版號 |
|---|---|---|
| `fix:` | 修正錯誤 | PATCH |
| `feat:` | 新增功能 | MINOR |
| `feat!:` / `BREAKING CHANGE:` | 不相容變更 | MAJOR |
| `refactor:` / `test:` / `docs:` / `chore:` | 非產品行為變更 | 不升版 |

一個 commit 只對應一種 type；破壞性變更必須明確標註 `!` 或 `BREAKING CHANGE:`。

## 完成後流程

### Archive OpenSpec change

確認 artifacts 與 tasks 完成後，使用 `openspec-archive-change`：

1. 檢查 artifacts 與 task completion。
2. 評估 delta specs 是否要同步至 `openspec/specs/`。
3. 將 change 移至 `openspec/changes/archive/YYYY-MM-DD-<change-name>/`。

未完成的 artifacts 或 tasks 不會被靜默忽略，必須由使用者確認後才能封存。

### PR 與 release

- 一般 feature / fix PR 使用 Rebase and merge，保留每筆 Conventional Commit。
- 合併到 `main` 後，GitHub Actions 會建立或更新 release-please PR。
- release PR 使用 Squash merge。
- 合併 release PR 後建立 tag、GitHub Release 與 Changelog。

## 單一事實來源

規範與知識只維護一份，Claude 與 Codex 透過各自入口共用。

| 路徑 | 內容 |
|---|---|
| `AGENTS.md` | 全域開發規範，Claude / Codex 的共同入口 |
| `CLAUDE.md` | 指向 `AGENTS.md`，不重複規範 |
| `.agents/skills/` | 共用 skills |
| `.agents/references/` | tester、debug 等完整知識來源 |
| `.claude/agents/` | Claude agent 入口 |
| `.codex/agents/` | Codex agent 入口 |
| `openspec/` | change artifacts、主規格與封存紀錄 |

修改共用流程時，優先更新 `AGENTS.md`、`.agents/skills/` 或 `.agents/references/`，不要在 Claude 與 Codex 的入口檔各維護一份規則。

## 技術棧

- React 19 + TypeScript + Vite 8
- TanStack Router + TanStack Query
- axios
- shadcn（Base UI）+ Tailwind CSS v4
- zustand
- react-hook-form + zod
- Vitest + Playwright

## 開始使用

環境需求：Node.js 22.22.3、pnpm 9.15.9。

```bash
pnpm install
pnpm dev
```

建立新專案後，先修改 `package.json` 的 `name`、`index.html` 的 `title`，以及本文件的專案名稱與說明。
# Go_Funny_Frontend
