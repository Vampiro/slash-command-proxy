/* eslint-disable no-template-curly-in-string */

export default [
  {
    title: "Cat facts",
    destUrl: "https://catfact.ninja/fact",
    outputTemplate: "${res.fact}",
    args: "",
  },
  {
    title: "Chuck Norris Facts",
    destUrl: "http://api.icndb.com/jokes/random",
    outputTemplate: "${res.value.joke}",
    args: "",
  },
  {
    title: "D&D 5e Spells",
    destUrl:
      'https://www.dnd5eapi.co/api/spells/${args.join("-").toLowerCase()}',
    outputTemplate:
      '### ${res.name}\n*Level ${res.level} ${res.school.name}*\n\n**Casting Time:** ${res["casting_time"]}\n\n**Range:** ${res.range}\n\n**Components**: ${res.components.length === 0 ? "*None*" : res.components.join(", ")}\n\n**Duration:** ${res.duration}\n\n**Classes:** ${res.classes ? res.classes.map((c) => c.name).join(", ") : ""}\n\n**Description:** ${res.desc ? res.desc.map((desc) => desc).join("\\n") : ""}\n\n${res["higher_level"] ? res["higher_level"].map((hl) => `**At Higher Levels:** ${hl}\\n`).join(""): ""}',
    args: "entangle",
  },
  {
    title: "Dictionary",
    destUrl: "https://api.dictionaryapi.dev/api/v1/entries/en/${args[0]}",
    outputTemplate:
      '**${args[0]}**\n*${res[0].phonetics[0].text}*\n\n${Object.entries(res[0].meaning)\n  .map(([type, definitions]) =>\n    `_(${type})_\\n${definitions.map((d, i) => (i + 1) + ". " + d.definition)\n      .join("\\n")}`)\n    .join("\\n\\n")}',
    args: "great",
  },
  {
    title: "Magic 8-ball",
    destUrl: "https://8ball.delegator.com/magic/JSON/Question",
    outputTemplate: "${res.magic.answer}",
    args: "",
  },
  {
    title: "Roll a die",
    destUrl: "http://roll.diceapi.com/json/d${args[0]}",
    outputTemplate: "With a d${args[0]}, you roll a ${res.dice[0].value}!",
    args: "20",
  },
];
