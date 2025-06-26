//랜덤 숫자 3개 뽑는 함수
function randomNum(min, max) {
    let randomList = [];
    for (let i = 0; i<3; i++) {
        var random = Math.floor(Math.random()*(max-min+1)) + min;
        randomList.push(random);
    }
    return randomList;
}
let rdList = [];
let list = []; 
let result; 
let resultList = [];

//사용자한테 숫자 3개 입력 받는 함수
function inputNumber(turn) {
    list = [];
    const pattern = /^[0-9]*$/; //숫자만 입력할 수 있는 정규식

    for(let i=1; i<=3; i++) {
        while (true) { //제대로된 형태로 입력될 때까지 반복
            let text = prompt(`${turn+1}번째 시도: ${i}번째 숫자를 입력하세요. (0~9)`);
            if (pattern.test(text) && text.length === 1) {
                const number = parseInt(text); //입력값 숫자로 형 변환
                list.push(number); //배열에 추가
                break; // 입력 제대로 되면 탈출
            } else {
                alert("입력값이 0~9 사이의 한 자리 숫자가 아닙니다. 다시 입력해 주세요.");
            }
        }
    }
    result = list.join(', '); //리스트에 담긴 걸 string 형태로 합침
    resultList.push(result); //스트링을 다른 list에 담음
    return compareNumber(); //true/false 값을 return함
}

//입력 받은 숫자랑 랜덤 숫자 비교하는 함수
function compareNumber() {
    let strike=0;
    let ball=0;
    for(let i=0; i<3; i++) {
        const num = list[i]; //i번째 입력한 숫자
        if (rdList.indexOf(num) === list.indexOf(num)) { //인덱스 번호가 같을 때
            strike++; //스트라이크 
        }
        if (rdList.includes(num) && rdList.indexOf(num) !== list.indexOf(num)) { // 값이 존재하지만 인덱스 번호가 다를 때
            ball++; //볼
        }
    }

    if(strike === 3) {
        return "success"; //succes 반환
    } else {
        const msg = `판정 -- ${strike} 스트라이크 , ${ball} 볼`;
        console.log(msg);
        if(num === 9) {
            return "false"; //마지막까지 못 맞췄을 때 false 반환
        } else {
            return "pass"; //pass 반환
        }
        
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let resultMap = {}; //입력 결과를 담을 map
    rdList = randomNum(1,9); //1부터 9까지 숫자 내에서 생성
    console.log("랜덤 숫자: ", rdList);

    //버튼 클릭했을 때 실행
    document.getElementById("btn").addEventListener('click', function() {
        for (let turn=0; turn<10; turn++) { //10번 반복
            const status = inputNumber(turn); //success. false, pass중 하나
            resultMap[`${turn+1}차 입력`] = resultList[turn]; //map에 추가
                // 성공 조건일 때 resultMap 출력
            if (status === "success") {
                for (let key in resultMap) { //map의 key값으로 반복문 실행
                    console.log(key + ": " + resultMap[key]); //입력 결과 출력
                }
                console.log("스트라이크 3번 성공하였습니다. 축하합니다!!");
                break;
            } else if (status === "false") {
                for (let key in resultMap) {
                    console.log(key + ": " + resultMap[key]);
                }
                console.log("조금 더 분발하세요!! 다음 기회에...");
            }
        }
    });
});