var arr = ['zero', 'one', 'two'];
var arr2 = new Array();

arr2.push('zero');
arr2.push('one');
arr2.push('two');

arr2[2] = "1";
document.addEventListener("DOMContentLoaded", function() { 
    document.getElementById("btn1").addEventListener('click', function() {
        for (let value of arr) {
            console.log(value);
        }
    });
    
    document.getElementById("btn2").addEventListener('click', function() {    
        for (let i in arr) {
            console.log(i, arr[i]);
        }
    });
});