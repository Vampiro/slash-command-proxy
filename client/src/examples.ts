/* eslint-disable no-template-curly-in-string */

export default [
  {
    title: "Roll a die",
    proxiedUrl: "http://roll.diceapi.com/json/d${args[0]}",
    outputTemplate: "With a d${args[0]}, you roll a ${res.dice[0].value}!",
    args: "20",
  },
  {
    title: "Ask the magic 8-ball",
    proxiedUrl: "https://8ball.delegator.com/magic/JSON/Question",
    outputTemplate: "${res.magic.answer}",
    args: "",
  },
  {
    title: "Cat facts",
    proxiedUrl: "https://catfact.ninja/fact",
    outputTemplate: "${res.fact}",
    args: "",
  },
  // {
  //   title: "Dictionary",
  //   proxiedUrl: "https://owlbot.info/api/v2/dictionary/${args[0]}?format=json",
  //   outputTemplate:
  //     '**${args[0]}**\n${res.map((word, i) => `${i + 1}. *${word.type}* ${word.definition}`).join("\\n")}',
  //   args: "great",
  // },
  {
    title: "Dictionary",
    proxiedUrl: "https://api.dictionaryapi.dev/api/v1/entries/en/${args[0]}",
    outputTemplate:
      '**${args[0]}**\n*${res[0].phonetics[0].text}*\n\n${Object.entries(res[0].meaning)\n  .map(([type, definitions]) =>\n    `*(${type})*\\n\\n${definitions.map((d, i) => (i + 1) + ". " + d.definition)\n      .join("\\n")}`)\n    .join("\\n\\n")}',
    args: "great",
  },
];
