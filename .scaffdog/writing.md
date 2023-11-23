---
name: "writing"
root: "./src/contents/writings"
output: "."
ignore: []
questions:
  id: "id を入力してください: (例 20231118)"
  type:
    message: "writing の種類はどれですか？"
    choices:
      - "diary"
      - "note"
      - "article"
    initial: "note"
  index:
    confirm: "検索結果に表示しますか？"
    initial: false
---

# `{{ inputs.id }}/index.mdx`

```mdx
---
id: "{{ inputs.id }}"
type: "{{ inputs.type }}"
title: "Sample Writing"
published: "{{ date "YYYY-MM-DD" }}"
{{ inputs.index ? "" : "noindex: true" }}
tags:
  - "雑記"
---

導入文

## Sample title

本文
```
