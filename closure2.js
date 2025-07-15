function toggle(...args) {
  let currentIndex = args.length-1;
  return function toggleArgs() {
    currentIndex++
    if (currentIndex === args.length) {
      currentIndex = 0;
    }
    console.log(args[currentIndex]);
  };
}

var hello = toggle("hello");
var onOff = toggle("on","off");
var speed = toggle("slow","medium","fast");

hello();      // "hello"
hello();      // "hello"

onOff();      // "on"
onOff();      // "off"
onOff();      // "on"

speed();      // "slow"
speed();      // "medium"
speed();      // "fast"
speed();      // "slow"