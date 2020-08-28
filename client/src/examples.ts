/* eslint-disable no-template-curly-in-string */

export default [
  {
    title: "Roll a die",
    destUrl: "http://roll.diceapi.com/json/d${args[0]}",
    outputTemplate: "With a d${args[0]}, you roll a ${res.dice[0].value}!",
    args: "20",
  },
  {
    title: "Magic 8-ball",
    destUrl: "https://8ball.delegator.com/magic/JSON/Question",
    outputTemplate: "${res.magic.answer}",
    args: "",
  },
  {
    title: "Cat facts",
    destUrl: "https://catfact.ninja/fact",
    outputTemplate: "${res.fact}",
    args: "",
  },
  {
    title: "Dictionary",
    destUrl: "https://api.dictionaryapi.dev/api/v1/entries/en/${args[0]}",
    outputTemplate:
      '**${args[0]}**\n*${res[0].phonetics[0].text}*\n\n${Object.entries(res[0].meaning)\n  .map(([type, definitions]) =>\n    `_(${type})_\\n${definitions.map((d, i) => (i + 1) + ". " + d.definition)\n      .join("\\n")}`)\n    .join("\\n\\n")}',
    args: "great",
  },
];
