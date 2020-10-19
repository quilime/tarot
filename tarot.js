const majorArcana = [
  'Fool',
  'Magician',
  'High Priestess',
  'Empress',
  'Emperor',
  'Hierophant',
  'Lovers',
  'Chariot',
  'Adjustment/Justice',
  'Hermit',
  'Wheel of Fortune',
  'Strength/Lust',
  'Hanged Man',
  'Death/Rebirth',
  'Art/Temperance',
  'Devil/Pan',
  'Tower',
  'Star',
  'Moon',
  'Sun',
  'Aeon/Judgement',
  'Universe'
];


card = (n, type) => {
  return `${n} ${majorArcana[n]}`;
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
  chart.map((c) => {
    str += `${c.year}\t${c.age}\t${c.growth}\t${c.uni}\n`;
  });
  return str;
}
