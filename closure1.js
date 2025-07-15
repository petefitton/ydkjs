var isPrime = (function isPrime(v) {
    var isPrimeCache = {};
    return function isPrime(v) {
      if (v in isPrimeCache) {
        return isPrimeCache[v];
      }
      if (v <= 3) {
          isPrimeCache[v] = v > 1;
          return isPrimeCache[v];
      }
      if (v % 2 == 0 || v % 3 == 0) {
          isPrimeCache[v] = false;
          return false;
      }
      var vSqrt = Math.sqrt(v);
      for (let i = 5; i <= vSqrt; i += 6) {
          if (v % i == 0 || v % (i + 2) == 0) {
              isPrimeCache[v] = false;
              return false;
          }
      }
      isPrimeCache[v] = true;
      return true;
    }
})();

var factorize = (function factorize(v){
    var factorCache = {};

    return function findFactors(v) {
      if (v in factorCache) {
        return factorCache[v];
      }
      if (!isPrime(v)) {
          let i = Math.floor(Math.sqrt(v));
          while (v % i != 0) {
              i--;
          }
          return (factorCache[v] = [
              ...findFactors(i),
              ...findFactors(v / i)
          ]);
      }
      return (factorCache[v] = [v]);
    }
})();

console.log(isPrime(11));        // true
console.log(isPrime(12));        // false

console.log(factorize(11));      // [ 11 ]
console.log(factorize(12));      // [ 3, 2, 2 ] --> 3*2*2=12
