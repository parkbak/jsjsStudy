let a = {name: 'kim', age: 23};
let b = a;
console.log(b.name); //kim
b.name = 'lee';
console.log(a.name); //lee
b={...a};
b.name = 'park';
console.log(a.name); //park 