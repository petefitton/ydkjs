function calculator() {
    let memory = '';
    let memoryIsComputed = false;
    return function calculate(arg) {
      if (arg === '=') {
        let nums = [];
        let ops = [];
        let isFirstNum = true;
        memory += '=';
        memory.split('').forEach(character => {
          if (character.match(/^\d+$/g)) {
              if (isFirstNum) {
                nums.push(Number(character));
                isFirstNum = false;
              } else {
                nums[nums.length - 1] = Number(nums[nums.length - 1] + character);
              }
          } else {
            if (character === '=') {
              let computation;
              while (nums.length !== 0 || ops.length !== 0) {
                let op = ops.shift();
                let firstNum = nums.shift();
                let secondNum = nums.shift();
                if (secondNum === undefined && op === undefined) {
                  computation = firstNum;
                } else if (secondNum === undefined) {
                  computation = 'ERR';
                } else if (op === '+') {
                  computation = firstNum + secondNum;
                  nums.unshift(computation);
                } else if (op === '-') {
                  computation = firstNum - secondNum;
                  nums.unshift(computation);
                } else if (op === '/') {
                  computation = firstNum / secondNum;
                  nums.unshift(computation);
                } else if (op === '*') {
                  computation = firstNum * secondNum;
                  nums.unshift(computation);
                }
              }
              memory = formatTotal(computation);
              console.log('memory:', memory);
              if (memory === "ERR") {
                memory = '';
              } else {
                memoryIsComputed = true;
              }
            } else {
              ops.push(character);
              isFirstNum = true;
            }
          }
        });
      } else {
        if (memoryIsComputed && arg.match(/^\d+$/g)) {
          memory = arg;
          memoryIsComputed = false;
        } else {
          memory += arg;
          memoryIsComputed = false;
        }
      }
    };
}

var calc = calculator();


calc("4");     // 4
calc("+");     // +
calc("7");     // 7
calc("3");     // 3
calc("-");     // -
calc("2");     // 2
calc("=");     // 75
calc("*");     // *
calc("4");     // 4
calc("=");     // 300
calc("5");     // 5
calc("-");     // -
calc("5");     // 5
calc("=");     // 0


function useCalc(calc,keys) {
    return [...keys].reduce(
        function showDisplay(display,key){
            var ret = String( calc(key) );
            return (
                display +
                (
                  (ret != "" && key == "=") ?
                      "=" :
                      ""
                ) +
                ret
            );
        },
        ""
    );
}

useCalc(calc,"4+3=");           // 4+3=7
useCalc(calc,"+9=");            // +9=16
useCalc(calc,"*8=");            // *5=128
useCalc(calc,"7*2*3=");         // 7*2*3=42
useCalc(calc,"1/0=");           // 1/0=ERR
useCalc(calc,"+3=");            // +3=ERR
useCalc(calc,"51=");            // 51


function formatTotal(display) {
    if (Number.isFinite(display)) {
        // constrain display to max 11 chars
        let maxDigits = 11;
        // reserve space for "e+" notation?
        if (Math.abs(display) > 99999999999) {
            maxDigits -= 6;
        }
        // reserve space for "-"?
        if (display < 0) {
            maxDigits--;
        }

        // whole number?
        if (Number.isInteger(display)) {
            display = display
                .toPrecision(maxDigits)
                .replace(/\.0+$/,"");
        }
        // decimal
        else {
            // reserve space for "."
            maxDigits--;
            // reserve space for leading "0"?
            if (
                Math.abs(display) >= 0 &&
                Math.abs(display) < 1
            ) {
                maxDigits--;
            }
            display = display
                .toPrecision(maxDigits)
                .replace(/0+$/,"");
        }
    }
    else {
        display = "ERR";
    }
    return display;
}