---
name: commit
description: 掃描 git 工作區變更，智慧分組後依 Conventional Commits 產生中文 commit 訊息，展示計畫待確認再依序提交。正確標註 type 與破壞性變更（feat! / BREAKING CHANGE），供 release-please 算版號。適用於使用者說「commit」、「提交變更」、「幫忙 commit」。不適用於需要手動 staging、push、rebase 的情境。
---

# commit

## 概覽

掃描工作區未提交變更，依語意與目錄結構分組，產生 **Conventional Commits 格式、中文** 的 commit 訊息，展示計畫等使用者確認後依序提交。

**本專案用 release-please 自動發版，commit type 會直接決定版號與 changelog**，因此本 skill 的核心責任是「選對 type、正確標註破壞性變更」。

## 使用時機

- 使用者說「commit」、「幫我 commit」、「提交變更」
- 需要把工作區變更整理成有意義的 commit

**不應使用：** 需手動控制 staging、需 `git push`、需 rebase / cherry-pick。
**鐵則：** 收到確認（`y`）前，不得執行任何 `git add` / `git commit`；全程不執行 `git push`。

## 核心流程

### 步驟 1：掃描工作區

```bash
git status --short
git diff -U1 --no-color
git diff --cached -U1 --no-color
```

- 無變更 → 顯示「工作區無變更」後結束。
- 有 merge conflict 標記（`UU`/`AA`/`DD` 等）→ 提示先解衝突後結束。
- `??` untracked 檔案 → 列出並詢問「是否納入本次 commit？」，未確認不納入。

### 步驟 2：前處理

- **Lock file**（`pnpm-lock.yaml`、`package-lock.json`、`*.lock` 等）：抽離成獨立群組，訊息固定 `chore: 更新 lock file`，不混入業務變更。
- **敏感檔案**（`.env*`、`*.pem`、`*.key`、`*secret*`、`*credential*`）：顯示警告、列出檔名，等使用者確認才納入。

### 步驟 3：分組

依目錄與語意分組，原則：

- 同功能模組（同目錄或緊密相關的跨目錄變更）一組
- 測試檔與對應實作視為同組
- 設定 / 文件 / 工具設定可獨立成組
- **一個 commit 只對應一種 type**：若一批變更同時含新功能與修錯，**拆成不同 commit**，避免一個 commit 掛錯 type 害 release-please 漏報

分組超過 5 個時，詢問是否合併部分群組。

### 步驟 4：選 type（最關鍵，影響版號）

對每組從下表選**最符合語意**的 type：

| type | 用途 | release-please 版號 |
|---|---|---|
| `feat` | 新增功能 | MINOR |
| `fix` | 修正錯誤 | PATCH |
| `refactor` | 重構，不改行為 | 不影響 |
| `test` | 只動測試 | 不影響 |
| `docs` | 只動文件 | 不影響 |
| `chore` / `style` / `ci` | 雜項 / 格式 / CI | 不影響 |

**破壞性變更（最容易漏，務必處理）：** 只要變更會讓既有使用方式不相容（改 API 介面、移除 / 改名 export、改 props 形狀、改設定格式等），**必須**標註其一：

- type 後加 `!`：`feat!: 重構 auth API`
- 或在 footer 加 `BREAKING CHANGE: <說明>`

→ 兩者都會讓 release-please 跳 **MAJOR**。漏標 = 版號漏報，是最嚴重的錯。

> 判斷不確定「這算不算破壞性」時，主動問使用者，不要自行假設成非破壞性。

### 步驟 5：生成訊息

- **語言：中文**（subject 用中文描述）。
- 格式：`<type>(<scope>)<!>: <subject>`，有明確模組邊界才加 scope，否則省略。
- subject ≤ 72 字元、祈使語氣、不加句號。
- 破壞性變更：subject 加 `!`，並在 body 後加 `BREAKING CHANGE: <影響與遷移說明>`。

### 步驟 6：展示計畫並確認

```
將建立 N 個 commit：

[1] feat(auth): 新增 token 自動刷新
    - src/lib/axios/index.ts
[2] fix: 修正表單驗證錯誤
    - src/routes/index.tsx
[3] chore: 更新 lock file
    - pnpm-lock.yaml

確認執行？(y/n)
```

收到 `y` 才進步驟 7。收到 `n` 或修改意見 → 依指示調整後重新展示。

### 步驟 7：依序提交

```bash
git restore --staged .
# 對每組：
git add <該組檔案>
git commit -m "<訊息>"
```

完成後顯示各 commit 的 hash 與訊息摘要。**不執行 push。** 若 pre-commit hook 失敗，顯示錯誤、停止後續、提示修復後重跑。

## 警訊

- 收到 `y` 前就執行 `git add` / `git commit`
- 自行 `git push`
- **破壞性變更沒標 `!` / `BREAKING CHANGE:`**（版號會漏報 MAJOR）
- 一個 commit 混了 feat 與 fix 卻只掛一種 type
- lock file 混進業務 commit
- 敏感檔案未警告就納入
- subject 用英文（本專案 commit 用中文）

## 驗證

- [ ] 收到確認後才提交
- [ ] 每個 commit 的 type 與實際變更語意相符
- [ ] 破壞性變更已標註 `!` 或 `BREAKING CHANGE:`
- [ ] lock file 在獨立 `chore` commit
- [ ] 無敏感檔案在未警告下被提交
- [ ] 未執行 git push
