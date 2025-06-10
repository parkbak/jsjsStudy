document.addEventListener("DOMContentLoaded", function() {
    
    // 수요일에 할 것: 사용자 입력 제한하기(0-9까지 숫자만 입력할 수 있도록)
    function randomNum(min, max) {
        let randomList = [];
        for (let i = 0; i<3; i++) {
            var random = Math.floor(Math.random()*(max-min+1)) + min;
            randomList.push(random);
        }
        return randomList;
    }

    let rdList = randomNum(1,9);
    console.log(rdList);
    
    document.getElementById("btn").addEventListener('click', function() {
        let list = [];
        let strike=0;
        let ball=0;
        for(let i=0; i<3; i++) {
            const number = parseInt(prompt((i+1) + "번째 숫자를 입력하세요 (0~9)"));
            list.push(number);
            if (rdList.indexOf(number) === list.indexOf(number)) {
                strike++;
            }
            if (rdList.includes(number) && rdList.indexOf(number) !== list.indexOf(number)) {
                ball++;
            }
        }
        const msg = `판정 -- ${strike} 스트라이크 , ${ball} 볼`;
        console.log(msg);
        alert(msg);
    });
});