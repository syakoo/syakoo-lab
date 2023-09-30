module.exports = [
  {
    type: "input",
    name: "path",
    message: "コンポーネントのパスを入力してください: (./src/xxx/Component)",
    validate: (answer) => {
      if (answer !== "") {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "name",
    message: "コンポーネント名を入力してください",
    validate: (answer) => {
      if (answer !== "") {
        return true;
      }
    },
  },
];
