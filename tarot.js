#!/usr/bin/env node

const argv = process.argv.slice(2);
const _BIRTHYEAR = parseInt(argv[0]);
const _M = parseInt(argv[1]);
const _D = parseInt(argv[2]);
const _ENDYEAR = argv[3] ? parseInt(argv[3]) : parseInt(_BIRTHYEAR) + 60;


if (!(_BIRTHYEAR && _M && _D && _ENDYEAR)) {
  console.log('Usage: node tarot.js <birthyear 1999> <month 01> <day 04> <endyear 2020>');
  return;
}


if (_BIRTHYEAR > _ENDYEAR) {
  console.error("Birth year must be less than or equal to end year.");
  return false;
}


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
  'Strength/List',
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


const card = (n, type) => {
  return `${n} ${majorArcana[n]}`;
}


const combineStrAndAdd = (number) => {
  const numStr = number.toString();
  const numSplit = numStr.split('').map((n) => parseInt(n));
  return combineAndAdd(numSplit);
}


const combineAndAdd = function () {

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


const getChart = (birthYear, m, d, endYear) => {
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


const printTSV = (chart) => {
  console.log("Year\tAge\tGrowth\tUniversal");
  chart.map((c) => {
    console.log(`${c.year}\t${c.age}\t${c.growth}\t${c.uni}`);
  });
}


printTSV(getChart(_BIRTHYEAR, _M, _D, _ENDYEAR));
