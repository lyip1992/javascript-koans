var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = _.chain(products).filter(function(x) {
        return x.containsNuts === false && _(x.ingredients).all(function(y) {
          return y !== "mushrooms";
        });
      }).value();

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.chain(_.range(3, 1000)).reduce(function(a, b) {
      if (b % 3 === 0 || b % 5 === 0) return a + b;
      else return a;
    }, 0).value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    ingredientCount = _.chain(products).map(function(x) {
      return x.ingredients;
    }).flatten().reduce(function(a, b) {
      a[b] = (a[b] || 0) + 1;
      return a;
    }, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    
    var largestPrimeFactor = function(num) {
      var array = [];
      upperLimit = Math.sqrt(num);
      output = [];

      for (var i = 0; i < num; i++)
        array.push(true);

      for (var i = 2; i <= upperLimit; i++)  {
        if (array[i]) {
          for var j = i * i; j < num; j += i)
            array[j] = false;
        }
      }

      for (var i = 2; i < num; i++) {
        if (array[i])
          output.push(i);
      }

      return output.pop();
    }

    expect(largestPrimeFactor(100))toBe(97);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
    var largestPalindrome = function() {
      var palinArray = [];
      for (var i = 999; i > 100; i--) {
        for (var j = 999; j > 100; j--) {
          var product = j * i;
          if(isPalindrome(product))
            palinArray.push(product);
        }
      }
      return Math.max.apply(Math, palinArray);
    }

    function isPalindrome(product) {
      return product.toString() == product.toString().split('').reverse().join('');
    }

    expect(largestPalindrome()).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    var PrimeFactors = function(num) {
      var array = [];
      upperLimit = Math.sqrt(num);
      output = [];

      for (var i = 0; i < num; i++)
        array.push(true);

      for (var i = 2; i <= upperLimit; i++)  {
        if (array[i]) {
          for var j = i * i; j < num; j += i)
            array[j] = false;
        }
      }

      for (var i = 2; i < num; i++) {
        if (array[i])
          output.push(i);
      }

      return output;
    }

    var smallestNumInDivisible = function(num) {
      var primeArray = PrimeFactors(num);
      var LCM = 1;

      for (var i = 0; i < primeArray.length; i++) {
        var step = primeArray[i];
        while(step < 20) {
          LCM *= primeArray[i];
          step *= primeArray[i];
        }
      }

      return LCM;
    }
    
    expect(smallestNumInDivisibleRange(20)).toBe(232792560);

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
    var sumSquareDifference = function(a, b) {
      return Math.abs((a * a + b * b) - Math.pow(a + b, 2));
    }

    expect(sumSquareDifference(12,13)).toBe(312);

  });

  it("should find the 10001st prime", function () {

    var getNthPrime = function(num) {
      for (var primes = [], i = 2; primes.length < num; i++) {
        for (var root = Math.sqrt(i), j = 0; primes[j] <= root; j++) {
          if (i % primes[j] === 0) {
            root = 0;
          }
        }
        if (root) {
          primes.push(i);
        }
      }
      return primes.pop();
    }

    expect(getNthPrime(10001)).toBe(104743);

  });
  
});
