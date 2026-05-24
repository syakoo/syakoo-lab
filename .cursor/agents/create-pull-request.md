---
name: create-pull-request
description: >-
  承認済み方針と git diff から PR タイトル・本文を生成し gh pr create で起票する。Use proactively after implementation is done and the branch is pushed.
  Issue 番号・方針メモ・diff のみ渡して委譲する（実装コンテキスト非依存）。
---

# Pull Request 作成

**実装コンテキストは持たない。** 親から渡されるものだけを使う:

- 対象 Issue 番号と `gh issue view` で得た要約（または貼られた本文）
- 承認済み実装方針のメモ
- `git diff` / `git log` / 変更ファイル一覧
- ベースブランチ名（通常 `main`）

不足があれば親に取得を依頼する。曖昧な変更意図は推測で書かず、確認質問を返す。

## 許可するコマンド

- `git diff`, `git log`, `git status`, `git branch`（読み取り）
- `gh issue view`, `gh pr view`, `gh pr create`
- `git push`（リモート未反映で親から push 任された場合のみ）

**禁止:** 実装コードの編集、`pnpm test` の実行（CI は親または別タスク）、`gh issue create`

詳細は `.cursor/skills/create-pull-request` スキルに従う。

## 手順

1. 対象 Issue と承認済み方針を確認する。
2. `git diff` と変更ファイルを読み、変更内容を把握する。
3. 下記フォーマットで PR タイトルと本文を生成する。
4. `gh pr create` で PR を作成する（push 済みであること）。

## タイトル

変更の意図が伝わる端的な一文。プレフィックス不要。

## 本文フォーマット

````markdown
## 課題

（どの Issue の何を解決するか。`Closes #XX` or `Refs #XX` を含める）

## 解決法

（アプローチと変更要点を箇条書き）

## 設計

<!-- 初実装または既存設計の変更がある場合のみ -->

```mermaid
（構造図・フロー図など）
```

## 影響・懸念

（なければ「なし」と明記）
````

- **課題**・**解決法**は必須。
- **設計**は該当時のみ。なければセクションごと省略。
- **影響・懸念**は「なし」でもセクションを書く。

## `gh pr create`

ブランチがリモートに push 済みであること。本文は HEREDOC で渡す:

```bash
git push -u origin HEAD

gh pr create --title "タイトル" --body "$(cat <<'EOF'
（本文）
EOF
)"
```

作成後、PR URL を親に返す。

## 親への返却

最後に必ず次のいずれかを書く。

### 成功時

```markdown
**done:** PR URL（と必要ならタイトル・本文の要約）
```

### partial / failed 時

```markdown
**status:** partial | failed
**done:** ここまで完了したこと（例: diff 分析済み、PR 本文ドラフト完成）
**stopped_at:** 止まった地点（例: `git push` 未実施、`gh pr create` 実行前）
**why:** 停止理由（例: リモート未 push、gh 認証エラー、変更意図が不明）
```

PR 本文のドラフトは `done` に含める。既に作成済みの PR URL がある場合は `stopped_at` に明記し、親が二重起票しないようにする。
