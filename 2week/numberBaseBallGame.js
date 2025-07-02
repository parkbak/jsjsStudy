let rdList = []; //랜덤 list
let list = []; //입력 list
let msg; //결과 메세지
let result; //결과 상태(success, false, pass)
let resultObj = {msg, result}; //결과 객체
let resultList = []; //결과 string 담는 list

//랜덤 숫자 3개 뽑는 함수
function createRandomNum(min, max) {
    let randomList = []; //랜덤 숫자 담을 List 선언

    for (let i = 0; randomList.length <3; i++) { //list 길이가 3보다 작을때까지 반복
        const random = Math.floor(Math.random()*(max-min+1)) + min; //랜덤 숫자 출력
        if (!randomList.includes(random)) { //list안에 만들어진 랜덤 숫자가 "없으면"
            randomList.push(random); //list에 추가
        }
    }
    return randomList; //list 반환
}

//입력 숫자 제한하는 함수
function onlyNumAndComma(obj) {
    let val = obj.value; //입력되고 있는 값
    val = val.replace(/[^0-9,]/g, ''); //숫자와 콤마 빼고는 전부 '' <- 대체
    const comma = val.toString().replace(/\B(?<!\.\d*)(?=(\d{1})+(?!\d))/g, ","); //1번마다 콤마 추가하는 정규식
    const  threeNum= comma.substr(0,5); // 5번째 인덱스 이후로 문자열 다 자름 ex) 1,2,3 (세자리숫자만 표기)
    obj.value = threeNum; //입력창에 있는 입력값에 반영함
}

//사용자한테 숫자 3개 입력 받는 함수
function inputNumber(inputThreeNum, inputCount) {
    list = inputThreeNum.split(',').map(n => parseInt(n)); //입력받은 숫자를 , 기준으로 나눠서 배열에 담음(숫자로 형변환해서) 
    return compareNumber(inputThreeNum, inputCount); //숫자 비교 함수를 호출하고 그 결과를 반환
}

//입력 받은 숫자랑 랜덤 숫자 비교하는 함수
function compareNumber(inputThreeNum, inputCount) {
    let strike=0;
    let ball=0;
    for(let i=0; i<3; i++) {
        const num = list[i]; //i번째 입력한 숫자
        if (rdList[i] === list[i]) { //값이 똑같은 경우에
            strike++; //스트라이크 
        }
        if (rdList.includes(num) && rdList.indexOf(num) !== list.indexOf(num)) { // 값이 존재하지만 인덱스 번호가 다를 때
            ball++; //볼
        }
    }

    if(strike === 3) {
        resultObj.result = "success"; //스트라이크 3번 성공했을 때 상테:succes
    } else {
        if(inputCount === 10) {
            resultObj.result = "false"; //마지막까지 못 맞췄을 때 상태:false
        } else {
            resultObj.result = "pass"; //중간 단계에 못 맞췄을 때 상태:pass
        }
    }
    resultObj.msg = `${inputCount}회차 : ${inputThreeNum} --> ${strike} 스트라이크 , ${ball} 볼`; //msg 추가
    return resultObj; //결과 객체 반환
}

document.addEventListener("DOMContentLoaded", function() {
    rdList = createRandomNum(1,9); //1부터 9까지 숫자 내에서 생성
    console.log("rdList: ", rdList);
    
    let userName = document.getElementById("userName"); //사용자 이름
    let randomNum = document.getElementById("randomNum"); //랜덤 숫자 input창
    let inputNum = document.getElementById("inputNum"); //사용자 숫자 입력 input창
    let gameResultText = document.getElementById("gameResultText"); //결과메시지 출력할 부분
    let textArea = document.getElementById("textArea"); //게임 결과(resultobj.msg) 출력할 textarea
    
    inputNum.setAttribute("readonly", "readonly"); //기본적으로 readonly로 막아둠

    userName.addEventListener("keyup", function (e) { //사용자 이름 입력 후
        if (e.key === 'Enter') { //엔터쳤을 때
            if (userName.value) { //값이 있다면
                inputNum.removeAttribute("readonly"); //사용자 숫자 입력 input창 readonly 속성 삭제
                inputNum.focus(); //사용자 숫자 입력 input창에 포커스
            }
        }
    });

    let count =0; //입력 횟수 카운트 할 변수

    inputNum.addEventListener("keyup", function(e) { //숫자 입력창 입력 후
        if (e.key === 'Enter') { //엔터쳤을 때
            count +=1; //카운트 +1
            const status = inputNumber(inputNum.value, count); //resultobj를 가져옴
            let beforeText = textArea.value; //기존에 있던 textarea 값들
            let newText = beforeText + '\n' + status.msg; //기존값+새로운값
            textArea.value = newText; //새로운 값으로 출력
            if (status.result === "success") { //게임 결과가 success일 때
                randomNum.value = rdList.join(','); //랜덤리스트에 있는 값을 ,로 묶어서 문자열 만들고 그걸 랜덤 숫자 input창에 출력
                gameResultText.innerText = "스트라이크 3번 성공하였습니다. 축하드립니다!!"; //결과메시지 출력
                inputNum.setAttribute("readonly", "readonly"); //다시 readonly 속성 추가
                inputNum.value = ''; //사용자 숫자 input창 빈창으로 변경
            } else if (status.result === "false") { //게임 결과가 false일 때
                randomNum.value = rdList.join(',');
                gameResultText.innerText = "조금 더 분발하세요!! 다음 기회에...";
                inputNum.setAttribute("readonly", "readonly");
                inputNum.value = '';
            } else { //게임 결과가 pass일 떄
                inputNum.value = ''; 
                inputNum.focus(); //다시 입력할 수 있게 포커스 설정
            }
        }
    });
});
