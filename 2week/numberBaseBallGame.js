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
    let val = obj.value; //입력값 가져오기
    val = val.replace(/[^0-9]/g, ''); // 숫자만 남기고 제거
    val = val.substr(0, 1); // 첫 자리 숫자만 남김
    obj.value = val; // 입력창에 반영
}

//입력 받은 숫자랑 랜덤 숫자 비교하는 함수
function compareNumber(list, inputCount) {
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
    inputThreeNum = list.join(',');
    resultObj.msg = `${inputCount}회차 : ${inputThreeNum} --> ${strike} 스트라이크 , ${ball} 볼`; //msg 추가
    return resultObj; //결과 객체 반환
}

document.addEventListener("DOMContentLoaded", function() {
    rdList = createRandomNum(1,9); //1부터 9까지 숫자 내에서 생성
    
    let userName = document.getElementById("userName"); //사용자 이름
    let randomNum = document.getElementById("randomNum"); //랜덤 숫자 input창
    let inputNum1 = document.getElementById("inputNum1"); //사용자 숫자 입력 input창 -1
    let inputNum2 = document.getElementById("inputNum2"); //사용자 숫자 입력 input창 -2
    let inputNum3 = document.getElementById("inputNum3"); //사용자 숫자 입력 input창 -3
    let gameResultText = document.getElementById("gameResultText"); //결과메시지 출력할 부분
    let textArea = document.getElementById("textArea"); //게임 결과(resultobj.msg) 출력할 textarea
    
    inputNum1.setAttribute("readonly", "readonly"); //기본적으로 readonly로 막아둠
    inputNum2.setAttribute("readonly", "readonly"); //기본적으로 readonly로 막아둠
    inputNum3.setAttribute("readonly", "readonly"); //기본적으로 readonly로 막아둠

    userName.addEventListener("keyup", function (e) { //사용자 이름 입력 후
        if (e.key === 'Enter') { //엔터쳤을 때
            if (userName.value) { //값이 있다면
                randomNum.value = rdList.join(','); //랜덤리스트에 있는 값을 ,로 묶어서 문자열 만들고 그걸 랜덤 숫자 input창에 출력
                inputNum1.removeAttribute("readonly"); //사용자 숫자 입력 input1창 readonly 속성 삭제
                inputNum1.focus(); //사용자 숫자 입력 input1창에 포커스  
            }
        }
    });

    inputNum1.addEventListener("keyup", function (e) { //input1 입력 후
        if (e.key === 'Enter') { //엔터쳤을 때
            if (inputNum1.value) { //값이 있다면
                inputNum2.removeAttribute("readonly"); //사용자 숫자 입력 input2창 readonly 속성 삭제
                inputNum2.focus(); //사용자 숫자 입력 input2창에 포커스
            }
        }
    });

    inputNum2.addEventListener("keyup", function (e) { //input2 입력 후
        if (e.key === 'Enter') { //엔터쳤을 때
            if (inputNum2.value) { //값이 있다면
                inputNum3.removeAttribute("readonly"); //사용자 숫자 입력 input3창 readonly 속성 삭제
                inputNum3.focus(); //사용자 숫자 입력 input3창에 포커스
            }
        }
    });

    let count =0; //입력 횟수 카운트 할 변수
    document.getElementById("btn").addEventListener('click', function() { //숫자 맞추기 버튼 클릭 시
        list = []; //list 초기화
        list.push(parseInt(inputNum1.value));
        list.push(parseInt(inputNum2.value));
        list.push(parseInt(inputNum3.value)); //list에 사용자 입력 값을 담음
        count +=1; //카운트 +1
        const status = compareNumber(list, count); //resultobj를 가져옴
        let beforeText = textArea.value; //기존에 있던 textarea 값들
        let newText = beforeText + '\n' + status.msg; //기존값+새로운값
        textArea.value = newText; //새로운 값으로 출력

        if(status.result === "pass") { //결과가 pass일 때
            inputNum1.value = '';
            inputNum2.value = '';
            inputNum3.value = ''; 
            inputNum1.focus(); //다시 입력할 수 있게 포커스 설정
        } else { //결과가 pass가 아닐 때(success or false)
            if (status.result === "success") { //성공 메시지 출력
                gameResultText.innerText = "스트라이크 3번 성공하였습니다. 축하드립니다!!";
            } else { //실패 메시지 출력
                gameResultText.innerText = "조금 더 분발하세요!! 다음 기회에...";
            }

            inputNum1.setAttribute("readonly", "readonly"); //다시 readonly 속성 추가
            inputNum2.setAttribute("readonly", "readonly"); //다시 readonly 속성 추가
            inputNum3.setAttribute("readonly", "readonly"); //다시 readonly 속성 추가
            
            inputNum1.value = ''; //사용자 숫자 input1창 빈창으로 변경
            inputNum2.value = ''; //사용자 숫자 input2창 빈창으로 변경
            inputNum3.value = ''; //사용자 숫자 input3창 빈창으로 변경

            setTimeout(() => {
                if (confirm("게임을 다시 하시겠습니까?")) {
                    window.location.reload(); //확인을 누르면 화면 새로고침해서 다시 시작됨

                    ///////
                    // 사용자 정보 그대로 가지고 와서 걍 바로 숫자 입력할 수 있게 해도 좋을 것 같음 tobe..
                    ///////
                }
            }, 1000); //1초 후에 실행
        }
    });
});
