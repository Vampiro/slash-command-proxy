export default [
  {
    title: "Roll a die",
    description: "Roll n-sided die.",
    proxiedUrl: "http://roll.diceapi.com/json/d((args[0]))",
    outputTemplate: "You rolled a ((res.dice[0].value))",
    args: "20",
  },
];
