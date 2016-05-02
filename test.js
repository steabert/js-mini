var a = (Function ('return this'))();
var b = function () {return this;}();
console.log(b);
