# コンバージョン設定の調査・実装確認

## 1. Google 広告コンバージョンの公式要件

### 1.1 必要なタグ（2つ）

| タグ | 設置場所 | 役割 |
|------|----------|------|
| **Google タグ** (gtag.js + config) | 全ページの `<head>` 内 | 広告アカウントの識別・リマーケティング用のベース |
| **イベント スニペット** | コンバージョンが発生するタイミングで実行 | コンバージョン 1件として計測 |

- Google 広告アカウントごとに **Google タグは1つだけ**、**全ページ**に設置する。
- 既に GA 用の gtag がある場合は、同じ gtag に **config コマンド**（`gtag('config', 'AW-xxxxx')`）を追加すればよい。

### 1.2 イベント スニペットの形式

```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-17873890605/a7GECP-0se4bEK3a98pC'
});
```

- コンバージョンページの「表示時」に実行するか、**クリック時**など「コンバージョンとみなすアクションの発生時」に実行する。
- 購入など重複排除が必要な場合は `transaction_id` を付与する（今回のチケット CTA クリックでは必須ではない）。

---

## 2. 当サイトの実装確認

### 2.1 Google タグ（layout.tsx）

- **場所**: `src/app/layout.tsx` の `<head>` 内
- **条件**: `NEXT_PUBLIC_GA_MEASUREMENT_ID` が設定されているときのみ Script を出力
- **内容**:
  - `gtag/js?id=${GA_MEASUREMENT_ID}` で gtag を読み込み
  - `gtag('config', '${GA_MEASUREMENT_ID}', ...)`（GA4）
  - `gtag('config', 'AW-17873890605')`（Google 広告）

**判定**: ✅ 公式どおり。全ページで Google 広告用 config が呼ばれている。

### 2.2 イベント スニペット（gtag.ts）

- **送信タイミング**: チケットボタンクリック時（`trackTicketButtonClick` 内）
- **送信内容**: `gtag('event', 'conversion', { send_to: 'AW-17873890605/a7GECP-0se4bEK3a98pC' })`

**判定**: ✅ 形式・ID・ラベルとも正しい。サンキューページがないため「クリック＝コンバージョン」とする実装で問題ない。

### 2.3 呼び出し箇所

| コンポーネント | 場所（button_location） |
|----------------|---------------------------|
| `hero/cta-buttons.tsx` | hero_cta |
| `header.tsx` | header_icon, header_text, header_mobile_menu |
| `mobile-ticket-button.tsx` | mobile_fixed |

**判定**: ✅ チケット系 CTA はすべて `trackTicketButtonClick` 経由でコンバージョン送信されている。

---

## 3. GA4（キーイベント）との関係

- **GA4**: イベント名 `ticket_button_click`、条件 `form_name = ticket_cta`、`page_location` に `/` を含む、でキーイベント化。
- **Google 広告**: 上記と同じクリック時に `gtag('event', 'conversion', { send_to: '...' })` を送信。
- どちらも「チケット CTA クリック」をコンバージョンとして扱う設計で一致している。

---

## 4. 注意点・改善の余地

### 4.1 gtag の読み込み条件

- 現在は **GA の測定 ID が未設定だと gtag 自体が読み込まれない**ため、Google 広告のコンバージョンも送信されない。
- **GA を使わず Google 広告だけ**使う場合は、layout で `AW-17873890605` 用の Script を GA と独立して読み込む必要がある（現状は GA 必須）。

### 4.2 重複コンバージョン

- 同一ユーザーが複数回チケットボタンを押すと、その都度コンバージョンとして計測される（仕様どおり）。
- 「1ユーザー1回だけ」にしたい場合は、セッション単位でフラグを立てるなどの追加実装が必要（多くの場合は現状のままでよい）。

---

## 5. 結論

- **Google 広告**: タグ設置・イベント形式・送信タイミングとも公式要件を満たしており、実装は正しい。
- **GA4**: イベント名・条件（form_name, page_location）とコードの送信内容が一致しており、キーイベント設定と整合している。

追加で変更する必要があるのは、「GA なしで Google 広告だけ動かしたい」場合の gtag 読み込み分岐のみ。
