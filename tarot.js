const majorArcana = [
  {
    "name": "Fool",
    "desc": "Courage; state of no fear; extacy and peak experience"
  },
  {
    "name": "Magician",
    "desc": "Communication and timing"
  },
  {
    "name": "High Priestess",
    "desc": "Intuition, self-trust, and self-resourcefulness"
  },
  {
    "name": "Empress",
    "desc": "Love with wisdom: The Earth mother"
  },
  {
    "name": "Emperor",
    "desc": "Personal power and leadership"
  },
  {
    "name": "Hierophant",
    "desc": "Learning and Teaching"
  },
  {
    "name": "Lovers",
    "desc": "Art and craft of relationship. The journey of the twins"
  },
  {
    "name": "Chariot",
    "desc": "Change. Movement. Combination of stillness and activity"
  },
  {
    "name": "Adjustment/Justice",
    "desc": "Balance, Justice, Realignment"
  },
  {
    "name": "Hermit",
    "desc": "Completion, introspection and space"
  },
  {
    "name": "Wheel of Fortune",
    "desc": "Opportunity, breakthrough and prosperity"
  },
  {
    "name": "Strength/Lust",
    "desc": "Strength, passion, and lustre"
  },
  {
    "name": "Hanged Man",
    "desc": "Surrender, breaking old patterns"
  },
  {
    "name": "Death/Rebirth",
    "desc": "Letting go and moving forward. Release and detachement"
  },
  {
    "name": "Art/Temperance",
    "desc": "Integration, synthesis, synergy"
  },
  {
    "name": "Devil/Pan",
    "desc": "Mirth and humor at what 'bedevils' us"
  },
  {
    "name": "Tower",
    "desc": "Restoration and renovation. De-structuring old forms"
  },
  {
    "name": "Star",
    "desc": "Self-Sufficiency and talent recognized by others"
  },
  {
    "name": "Moon",
    "desc": "Choice, authenticity vs dutifulness"
  },
  {
    "name": "Sun",
    "desc": "Collaboration, teamwork and partnership. Co-operation"
  },
  {
    "name": "Aeon/Judgment",
    "desc": "Good judgement and discernment"
  },
  {
    "name": "Universe",
    "desc": "Totality, individuation and wholeness"
  }
];


card = (n, type) => {
  return { "num": n, ...majorArcana[n] };
}


combineStrAndAdd = (number) => {
  const numStr = number.toString();
  const numSplit = numStr.split('').map((n) => parseInt(n));
  return combineAndAdd(numSplit);
}


combineAndAdd = function () {
  let numbers = [...arguments];
  if (typeof numbers[0] === "object") {
    numbers = [...numbers[0]];
  }
  let r = 0;
  numbers.forEach((num) => {
    r += parseInt(num);
  });
  if (r >= majorArcana.length)
    r = combineStrAndAdd(r);
  return r;
}


getChart = (birthYear, m, d, endYear) => {
  let r = [];
  let age = 0;
  let uni = 0;
  let n = combineAndAdd(birthYear, m, d);
  for (var y = birthYear; y <= endYear; y++, n++, uni++, age++) {
    const growth = combineAndAdd(y, m, d);
    r.push({
      age: age,
      year: y,
      uni: card(uni % majorArcana.length),
      growth: card(growth)
    });
  }
  return r;
}


getTSV = (chart) => {
  let str = "Year\tAge\tGrowth\tUniversal\n";
  chart.map((c, i) => {
    str += `${c.year}\t${c.age}\t${c.growth.num} ${c.growth.name}\t${c.uni.num} ${c.uni.name}\n`;
  });
  return str;
}
