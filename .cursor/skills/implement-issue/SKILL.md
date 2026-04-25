---
name: implement-issue
description: >-
  GitHub Issue を読み、ブランチ作成から実装・コミット・PR 作成まで一気通貫で実行する。
  Use when the user asks to implement, work on, or execute a GitHub issue
  (e.g. "#123 を実行して", "Issue #42 を実装して").
---

# Issue 実装

`ai-workflow.mdc` のフロー (方針提示 → 承認 → 実装 → PR) を具体手順に落としたもの。

## ワークフロー

### 1. Issue の読み込み

```bash
gh issue view <number>
```

Issue の背景・要件・受け入れ基準を把握する。

### 2. ブランチ作成

```bash
git fetch origin && git checkout -b cursor/<簡潔な説明>-<Issue番号> origin/main
```

main への直接コミットはしない。

### 3. 分析と方針提示

- 対象コードを読み、変更の影響範囲を把握する
- 実装方針を提示し、ユーザーの承認を待つ
- 不明点があれば推測で進めず質問する

### 4. 実装

承認後、タスクを分解して順に実行する。コーディング規約は `coding-guide` スキルに従う。

### 5. コミット

```bash
git add <変更ファイル>
git commit -m "<メッセージ>"
```

- `git log --oneline -10` で既存のコミットメッセージスタイルを確認し、それに合わせる
- `closes #<Issue番号>` をメッセージ末尾に含める

### 6. Push & PR 作成

```bash
git push -u origin HEAD
```

push 後、`create-pull-request` スキルに従って PR を作成する。

## 重要

- ステップ 4〜6 は承認後に **止まらず一気に完遂** する。途中でユーザーに確認を挟まない。
- フックがタイムアウトする場合は Shell ツールの `timeout` パラメータを伸ばして再試行する。`--no-verify` は使わない。
