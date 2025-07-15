// global scope
let marbles = ['blue', 'green', 'red'];
let marblesToShadow = ['blue', 'green', 'red'];
let areNotBlueMarbles = [];

(function handleMarbles() {
  // function scope

  let filteredMarbles = marbles.filter(marble => marble != 'blue');
  let marblesToShadow = filteredMarbles;

  console.log('Marbles that are not blue:');
  for (marble of marblesToShadow) {
    // block scope
    let currentMarble = marble;
    console.log(currentMarble);
  }

  for (let i=0; i<marbles.length; i++) {
    // block scope
    if (marbles[i] === 'blue') {
      areNotBlueMarbles.push(false);
    } else {
      areNotBlueMarbles.push(true);
    } 
  }
})();

(function printNonBlueMarbles() {
  // function scope
  areNotBlueMarbles.forEach((bool, index) => {
    // block scope
    console.log(marbles[index], ' = ', bool ? 'true' : 'false');
  });
})();

console.log(marbles);
console.log(areNotBlueMarbles);
