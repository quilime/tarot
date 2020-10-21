const majorArcana = [
  {
    "name": "Fool",
    "desc": "In spiritual matters, represents ideas, thoughts, spirituality, that which endeavors to transcend Earth. In material matters may show, if ill-dignified, folly, eccentricity, even mania. It represents the original, subtle, sudden impulse coming from a strange and unexpected quarter."
  },
  {
    "name": "Magician",
    "desc": "Skill. Wisdom. Adroitness. Elasticity. Craft. Conning. Deceit. Theft. Sometimes occult wisdom or power. Messages. Business transactions. Ill-dignified: Learning or intelligence interfering with the matter at hand."
  },
  {
    "name": "High Priestess",
    "desc": "Pure, exalted and gracious influence enters the matter, hence change, alternation, increase and decrease, fluctuation. May be led away by enthusiasm unless careful balance maintained."
  },
  {
    "name": "Empress",
    "desc": "Love. Beauty. Happiness. Pleasure. Success. Fruitfulness. Good fortune. Graciousness. Elegance. Gentleness. Ill-dignified: Dissipation. Debauchery. Idleness. Sensuality."
  },
  {
    "name": "Emperor",
    "desc": "War. Conquest. Victory. Strife. Stability. Power. Originality. Government. Energy. Ambition. Ill-dignified: Over-weening pride. Megalomania. Rashness. Ill-temper."
  },
  {
    "name": "Hierophant",
    "desc": "Divine wisdom. Inspiration. Stubborn strength. Toil. Endurance. Persistence. Teaching. Help from superiors. Patience. Organization. Peace. Goodness of heart. Occult force voluntarily invoked."
  },
  {
    "name": "Lovers",
    "desc": "Openness to inspiration. Intuition. Intelligence. Childishness. Attraction. Beauty. Love. Ill-dignified: Self-contradiction. Instability. Indecision. Union in a shallow degree with others. Superficiality. "
  },
  {
    "name": "Chariot",
    "desc": "Triumph. Victory. Hope. Obedience. Faithfulness. Health. Success, though sometimes not enduring. Authority under authority. Ill-dignified: Violence in maintaining traditional ideas. Lust of destruction."
  },
  {
    "name": "Adjustment/Justice",
    "desc": "Justice. Balance. Adjustment. Suspension of action pending decision. May refer to lawsuits, trials, marriages, treaties, etc."
  },
  {
    "name": "Hermit",
    "desc": "Illumination from within. Divine inspiration. Wisdom. Prudence. Circumspection. Retirement from participation in current events."
  },
  {
    "name": "Wheel of Fortune",
    "desc": "Change of fortune, generally good. Destiny."
  },
  {
    "name": "Strength/Lust",
    "desc": "Courage. Strength. Energy. Use of magical power. Control of the life force. Great love affair. Resort to magic."
  },
  {
    "name": "Hanged Man",
    "desc": "Redemption through sacrifice. Enforced sacrifice. Suffering. Ill-dignified: Punishment. Loss. Defeat. Failure. Death."
  },
  {
    "name": "Death/Rebirth",
    "desc": "Transformation. Change voluntary or involuntary, perhaps sudden and unexpected. Apparent death or destruction that is illusory when viewed from a higher perspective."
  },
  {
    "name": "Art/Temperance",
    "desc": "Combination of forces. Realization. Action based on accurate calculation. Economy. management. Success after elaborate maneuvers. The way of escape."
  },
  {
    "name": "Devil/Pan",
    "desc": "Blind impulse. Irresistibly strong and unscrupulous person. Ambition. Temptation. Obsession. Secret plan about to be executed. hard work. Endurance. Aching discontent. Materialism. Fate."
  },
  {
    "name": "Tower",
    "desc": "Quarrel. Combat. Danger. Ruin. Destruction of plans. Ambition. Courage. Sudden death. Escape from prison and all it implies."
  },
  {
    "name": "Star",
    "desc": "Hope. Unexpected help. Clarity of vision. Spiritual insight. Ill-dignified: Error of judgment. Dreaminess. Disappointment."
  },
  {
    "name": "Moon",
    "desc": "Illusion. Deception. Bewilderment. Hysteria. Madness. Dreaminess. Falsehood. Voluntary change. The brink of an important change. This card is very sensitive to dignity."
  },
  {
    "name": "Sun",
    "desc": "Glory. Gain. Riches. Triumph. Pleasure. Frankness. Truth. Shamelessness. Manifestation. Recovery from sickness, but sometimes sudden death. Ill-dignified: Arrogance. Vanity."
  },
  {
    "name": "Aeon/Judgment",
    "desc": "Final decision concerning the past. New current for the future. Always represents the taking of a definite step."
  },
  {
    "name": "Universe",
    "desc": "The essence of the question itself. Synthesis. The end of the matter. Delay. Opposition. Inertia. Perseverance. Patience. The crystallization of the whole matter involved."
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
