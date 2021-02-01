module.exports = [
  {
    type: 'select',
    name: 'level',
    message: 'Which Atomic Design Level?',
    choices: ['atoms', 'molecules', 'organisms', 'templates', 'layouts']
  },
  {
    message: 'What is the component name?',
    name: 'name',
    type: 'input',
    validate: (answer) => {
      if (answer !== '') {
        return true
      }
    },
  },
]
