function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: [
    "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
  ],
  spin() {
    if (this.position == null) {
      this.position = randMax(
        this.symbols.length - 1
      );
    }
    this.position = (
      this.position + 100 + randMax(100)
    ) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(
        this.symbols.length - 1
      );
    }
    return this.symbols[this.position];
  }
};

var slotMachine = {
  reels: [
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
  ],
  spin() {
    this.reels.forEach(function spinReel(reel){
      reel.spin();
    });
  },
  display() {
    let displayOutputArr = [];
    this.reels.forEach(function displayReel(reel) {
      if (reel.position === 0) {
        displayOutputArr.push(reel.symbols[reel.symbols.length - 1]);
        displayOutputArr.push(reel.symbols[reel.position]);
        displayOutputArr.push(reel.symbols[reel.position + 1]);
      } else if (reel.position === reel.symbols.length - 1) {
        displayOutputArr.push(reel.symbols[reel.position - 1]);
        displayOutputArr.push(reel.symbols[reel.position]);
        displayOutputArr.push(reel.symbols[0]);
      } else {
        displayOutputArr.push(reel.symbols[reel.position - 1]);
        displayOutputArr.push(reel.symbols[reel.position]);
        displayOutputArr.push(reel.symbols[reel.position + 1]);
      }
    });

    let displayOutput = displayOutputArr[0] + ' | ' + displayOutputArr[3] + ' | ' + displayOutputArr[6] + '\n' +
    displayOutputArr[1] + ' | ' + displayOutputArr[4] + ' | ' + displayOutputArr[7] + '\n' + 
    displayOutputArr[2] + ' | ' + displayOutputArr[5] + ' | ' + displayOutputArr[8] + '\n';

    return displayOutput;
  }
};

slotMachine.spin();
console.log(slotMachine.display());
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

slotMachine.spin();
console.log(slotMachine.display());
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★