document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btn1").addEventListener('click', function() {
        let text = '문자열이 긴 경우에는 ' + '문자열을 ' + '나눈 뒤 ' + '다시 합칩니다.';
        console.log(text);
    });

    document.getElementById("btn2").addEventListener('click', function() {
        let number = 3 ** (2+1);
        console.log(number);
    });

    document.getElementById("btn3").addEventListener('click', function() {
        let number = 5+4*3 < 27;
        console.log(number);
    });

    document.getElementById("btn4").addEventListener('click', function() {
        console.log("2번, 4번, 5번");
    });
    
    document.getElementById("btn5").addEventListener('click', function() {
        let a = 1;
        let b = 2;
        console.log(`기존 a: ${a}, 기존 b: ${b}`);

        let c;
        console.log("c라는 변수 새로 생성. c: ", c);

        c=a;
        a=b;
        b=c;
        console.log("c=a, a=b, b=c를 함");

        console.log(`바뀐 a: ${a}, 바뀐 b: ${b}`);
    });

    document.getElementById("btn6-1").addEventListener('click', function() {
        let cond = true;
        let value = '';
        switch (cond) {
            case true:
                value = '참';
                break;
            case false:
                value = '거짓';
                break;
        }
        console.log(`switch (cond) {
            case true:
                value = '참';
                break;
            case false:
                value = '거짓';
                break;
        }`);
        console.log(value);
    });

    document.getElementById("btn6-2").addEventListener('click', function() {
        let cond = true;
        let value = '';
        cond = true ? value = '참' : value = '거짓';
        console.log(`cond = true ? value = '참' : value = '거짓';`)
        console.log(value);
    });

    document.getElementById("btn7").addEventListener('click', function() {
        console.log(`for (i=1; i<=100; i++) {
            console.log(i);
        }`);
        for (i=1; i<=100; i++) {
            console.log(i);
        }
    });

    document.getElementById("btn8").addEventListener('click', function() {
        for(let i=1; i<=9; i++) {
            for(let j=1; j<=9; j++) {
                if((i*j)%2 === 1 ) {
                    console.log(i*j);
                } else {
                    continue;
                }
            }
        }
    });

    document.getElementById("btn9").addEventListener('click', function() {
        let arr = ['a', 'b', 'c', 'd', 'e'];
        console.log("arr.at(-3): ", arr.at(-3));
    });

    document.getElementById("btn10").addEventListener('click', function() {
        let arr = ['가', '라', '다', '라', '마', '라'];
        for (i=0; i < arr.length; i++) {
            const index = arr.indexOf('라');
            arr.splice(index, 1);
        }
        console.log(arr);
    });

    document.getElementById("btn11").addEventListener('click', function() {
        let x = 2;
        let y = 3;
        let z = 4;

        const multiply = (x, y, z) => {
            return x*y*z;
        }
        console.log(`
            const multiply = (x, y, z) => {
            return x*y*z;
        }
            `);
        console.log(multiply(x, y, z));
    });
});