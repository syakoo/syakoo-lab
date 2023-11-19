module.exports = [
  {
    type: "input",
    name: "id",
    message: "id を入力してください: (20231118)",
    validate: (answer) => {
      if (answer !== "") {
        return true;
      }
    },
  },
  {
    type: "select",
    name: "type",
    message: "writing の種類はどれですか？",
    choices: ["diary", "note", "article"],
  },
  {
    type: "toggle",
    name: "index",
    message: "検索結果に表示しますか？",
  },
];
