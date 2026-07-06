# Proposal: GO FUNNY 前端基礎重建

## Why
舊版 GO-FUNNY 的核心情境已經清楚，但前端結構與領域邊界需要重新整理，才能配合 spec-driven 的流程持續演進。

## What
- 以 `Go-Funny-Frontend` 作為新的前端基底。
- 建立 GO-FUNNY 的核心資訊架構與頁面骨架。
- 先定義旅程、成員、一般支出、公積金、結算、邀請等領域名詞。
- 讓後續功能可以透過 OpenSpec 逐步擴充，而不是把舊架構硬搬過來。

## Scope
- 專案首頁與全域路由骨架
- 旅程清單 / 旅程明細 / 旅程管理 / 新增記錄 / 結算 / 邀請接受頁面的結構
- 領域名詞與結算語意的初版定義
- OpenSpec change 流程的落地方式

## Non-goals
- 不做後端 API 實作
- 不做登入 / 註冊 / OAuth 串接
- 不做真實資料同步
- 不做完整記帳與結算演算法重寫

## Success Criteria
- 新專案可以用清楚的路由與頁面結構承接 GO-FUNNY 功能
- 後續功能可以依 OpenSpec change 逐步實作
- 領域名詞與頁面責任邊界清楚，不再把所有行為綁死在單一模式
