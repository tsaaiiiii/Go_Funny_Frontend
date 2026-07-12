# Design: GO FUNNY 前端基礎重建

## Overview
這個 change 的目標不是一次做完產品，而是把前端專案的結構先定住。
後續所有旅程、記帳、結算與成員功能，都會掛在這個骨架上分階段建立。

## Architecture
- Frontend stack 維持 React + TypeScript + Vite
- 路由使用 TanStack Router
- Server state 使用 TanStack Query + axios
- UI primitives 以 `src/components/ui` 為共用基礎
- 領域資料會優先透過 OpenSpec 定義，再進入實作

## Page Model
- Home / Trip List: 入口與旅程概覽
- Trip Detail: 單一旅程的明細與快速入口
- Trip Manage: 旅程成員與設定管理
- New Record: 新增一般支出、公積金存入、公積金支出
- Settlement: 一般結算與公積金結算
- Invitation Accept: 加入旅程邀請流程

## Domain Principles
- 一個旅程不應被單一模式綁死
- 一般支出、公積金存入、公積金支出屬於不同記錄類型
- 結算必須先按記錄類型分流，再按幣別分開顯示
- UI 以 mobile-first 為優先，避免堆疊過多說明文

## Risks
- 若一開始就把舊版行為完全複製，會把舊架構問題帶回來
- 若頁面與資料模型沒有先分清楚，後續結算與公積金邏輯會再次混淆

## Out of Scope
- Auth / Google login
- Production API contract finalization
- Cloudflare deployment configuration
