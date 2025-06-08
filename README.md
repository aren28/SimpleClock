# 🕒 シンプル時計 (Simple Clock)

**シンプルで美しいリアルタイム時計アプリ**  
WebSocketを活用した軽快な時間表示と、モダンなUIデザインを提供します。

[![Vercel Deploy](https://img.shields.io/badge/deployed_on-Vercel-black?logo=vercel)](https://simple-clock-sigma.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

https://simple-clock-sigma.vercel.app

**美しいアナログ時計とデジタル表示の融合**  
APIから取得した正確な時刻を元に、スムーズなアニメーションで表示するハイブリッド時計アプリ

[![Demo Thumbnail](https://github.com/user-attachments/assets/4d59962d-b985-4572-90e2-c83f2ed07ded)](https://simple-clock-sigma.vercel.app)

## ✨ 特徴

- **リアルタイム更新**: WebSocketでサーバーと通信し、秒単位で正確な時間を表示
- **シンプルUI**: MUI (Material-UI) を採用したミニマルで美しいデザイン
- **軽量**: React + TypeScriptで構築された高速な動作
- **レスポンシブ**: あらゆるデバイスで最適な表示

## 🛠 技術スタック

| カテゴリ       | 技術要素                  |
|----------------|---------------------------|
| フロントエンド | React 19, TypeScript 5    |
| UIフレームワーク| MUI (Material-UI v5)      |
| リアルタイム通信| useEffectを使用                 |
| ホスティング    | Vercel                    |
| バージョン管理  | GitHub                    |
| コード品質      | ESLint, Prettier          |

## 🚀 セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/aren28/SimpleClock.git

# 依存関係をインストール
npm install

# 開発サーバーを起動 (localhost:3000)
npm run dev
