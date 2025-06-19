//랜덤 숫자 3개 뽑는 함수
function randomNum(min, max) {
    let randomList = [];
    for (let i = 0; i<3; i++) {
        var random = Math.floor(Math.random()*(max-min+1)) + min;
        randomList.push(random);
    }
    return randomList;
}
let rdList = []; //전역으로 rdList 선언
let list = []; //전역으로 list 선언

//사용자한테 숫자 3개 입력 받는 함수
function inputNumber() {
    list = [];
    const pattern = /^[0-9]*$/; //숫자만 입력할 수 있는 정규식

    for(let i=1; i<=3; i++) {
        while (true) {
            let text = prompt(i + "번째 숫자를 입력하세요. (0~9)");
            if (pattern.test(text) && text.length === 1) {
                const number = parseInt(text); //입력값 숫자로 형 변환
                list.push(number); //배열에 추가
                break; // 입력 제대로 되면 탈출
            } else {
                alert("입력값이 0~9 사이의 한 자리 숫자가 아닙니다. 다시 입력해 주세요.");
            }
        }
    }
    return compareNumber(); //true/false 값을 return함
}

//입력 받은 숫자랑 랜덤 숫자 비교하는 함수
function compareNumber() {
    let strike=0;
    let ball=0;
    for(let i=0; i<3; i++) {
        const num = list[i];
        if (rdList.indexOf(num) === list.indexOf(num)) { //인덱스 번호가 같을 때
            strike++; //스트라이크 
        }
        if (rdList.includes(num) && rdList.indexOf(num) !== list.indexOf(num)) { // 값이 존재하지만 인덱스 번호가 다를 때
            ball++; //볼
        }
    }
    
    if(strike === 3) {
        const msg = "스트라이크 3번 완료. 게임 클리어";
        console.log(msg);
        return true; //true 반환
    } else {
        const msg = `판정 -- ${strike} 스트라이크 , ${ball} 볼`;
        console.log(msg);
        return false; //false 반환
    }
}

document.addEventListener("DOMContentLoaded", function() {

    rdList = randomNum(1,9); //1부터 9까지 숫자 내에서 생성
    console.log("rdList: ", rdList);

    //버튼 클릭했을 때 실행
    document.getElementById("btn").addEventListener('click', function() {
        for (let i=0; i<10; i++) { //10번 반복
            const status = inputNumber();
            if (status) { //true면(스트라이크 3번이면) 반복문 탈출
                alert("스트라이크 3번 성공하였습니다. 축하합니다!!"); //true alert 띄우고 반복문 탈출
                break;
            } else {
                alert("조금 더 분발하세요!! 다음 기회에..."); //false면 alert 띄우고 반복문 탈출
                break;
            }
        }
    });
});