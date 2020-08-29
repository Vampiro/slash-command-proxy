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
    args: "Magic Missile",
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
    title: "MTG",
    destUrl:
      'https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(args.join(" "))}&pageSize=1',
    outputTemplate:
      '${res.cards.map((card) =>\n\n`![Card Image](${card.imageUrl})`)\n\n.join("")}',
    args: "Sengir Vampire",
  },
  {
    title: "Programming Jokes",
    destUrl:
      "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist",
    outputTemplate:
      '${res.type === "single" ? `${res.joke}` : `${res.setup}\n\n*${res.delivery}*`}',
    args: "",
  },
  {
    title: "Random Dog",
    destUrl: "https://dog.ceo/api/breeds/image/random",
    outputTemplate: "![Dog Image](${res.message})",
    args: "",
  },
  {
    title: "Roll a die",
    destUrl: "http://roll.diceapi.com/json/d${args[0]}",
    outputTemplate: "With a d${args[0]}, you roll a ${res.dice[0].value}!",
    args: "20",
  },
];
