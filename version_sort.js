list = [
  '/TEST-R1.0.4.zip',
  '/TEST-R1.0.5.zip',
  '/TEST-R1.0.10.zip',
  '/TEST-R1.1.1.zip',
  '/TEST-R2.0.0.zip',
  '/TEST-R1.1.14.zip',
  '/TEST-R1.2.4.zip',
  '/TEST-R1.2.5.zip',
];

// Never go over 999
const VERSION_BASE = 1000;
const ranked_list = list.map((entry, idx) => {
  [a, b, c] = entry.match(/\d+\.\d+.\d+/)[0].split('.').map((val) => Number(val));
  const rank = (a * VERSION_BASE + b) * VERSION_BASE + c;
  return {idx, rank};
});
ranked_list.sort((a,b) => {
  return a.rank - b.rank;
});
const sorted_list = ranked_list.map((entry) => list[entry.idx]);
console.log('sorted_list', sorted_list);

list.sort((a, b) => {
  const version_a = a.match(/\d+\.\d+.\d+/)[0].split('.');
  const version_b = b.match(/\d+\.\d+.\d+/)[0].split('.');
  const compare = version_a.map((val, idx, arr) => {
    return val - version_b[idx];
  });
  return compare.reduce((prev, curr) => {
    return prev === 0 ? curr : prev;
  }, 0);
});

console.log(list);
