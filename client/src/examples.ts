export default [
  {
    title: "Roll a die",
    description: "Roll n-sided die.",
    proxiedUrl: "http://roll.diceapi.com/json/d((args[0]))",
    outputTemplate: "Tossing a d((args[0])), you roll a ((res.dice[0].value))",
    args: "20",
  },
];
