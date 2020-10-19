#!/usr/bin/env node
require('./tarot');

const argv = process.argv.slice(2);
const _BIRTHYEAR = parseInt(argv[0]);
const _M = parseInt(argv[1]);
const _D = parseInt(argv[2]);
const _ENDYEAR = argv[3] ? parseInt(argv[3]) : parseInt(_BIRTHYEAR) + 60;


if (!(_BIRTHYEAR && _M && _D && _ENDYEAR)) {
  console.log('Usage: node index.js <birthyear 1999> <month 11> <day 4> [<endyear 2020>]');
  return;
}


if (_BIRTHYEAR > _ENDYEAR) {
  console.error("Birth year must be less than or equal to end year.");
  return false;
}


console.log(getTSV(getChart(_BIRTHYEAR, _M, _D, _ENDYEAR)));
