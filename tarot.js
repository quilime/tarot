#!/usr/bin/env node

const $_BIRTHYEAR = process.argv[3];
const $_M = process.argv[4];
const $_D = process.argv[5];
const $_ENDYEAR = process.argv[6];


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


const addDates = (y, m, d) => {
  const dStr = (y + m + d).toString();
  let r = 0;
  for (i = 0; i < dStr.length; i++) {
    r += parseInt(dStr.charAt([i % majorArcana.length]));
  }
  return r;
}


const getChart = (birthYear, m, d, endYear) => {

  if (birthYear > endYear) {
    console.error("getUniversal(): Birth year must be less than or equal to end year.");
    return false;
  }

  let r = [];
  let age = 0;
  let uni = 0;
  let n = addDates(birthYear, m, d);
  for (var y = birthYear; y <= endYear; y++, n++, uni++, age++) {
    const n = addDates(y, m, d);
    r.push({
      age: age,
      year: y,
      uni: card(uni % majorArcana.length),
      growth: card(n)
    });
  }

  return r;
}


const printTSV = (birthYear, m, d, endYear) => {
  console.log("Year\tAge\tGrowth\tUniversal");
  getChart(1981, 8, 24, 2020).map((c) => {
    console.log(`${c.year}\t${c.age}\t${c.growth}\t${c.uni}`);
  });
}


printTSV($_BIRTHYEAR, $_M, $_D, $_ENDYEAR);