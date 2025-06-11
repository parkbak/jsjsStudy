document.addEventListener("DOMContentLoaded", function() {
    
    //랜덤 숫자 3개 뽑는 함수
    function randomNum(min, max) {
        let randomList = [];
        for (let i = 0; i<3; i++) {
            var random = Math.floor(Math.random()*(max-min+1)) + min;
            randomList.push(random);
        }
        return randomList;
    }
    let rdList = randomNum(1,9); //1부터 9까지 숫자 내에서 생성
    
    document.getElementById("btn").addEventListener('click', function() {
        let list = [];
        let strike=0;
        let ball=0;
        for(let i=0; i<3; i++) {
            const pattern = /^[0-9]*$/; //숫자만 입력할 수 있는 정규식
            const text = prompt((i+1) + "번째 숫자를 입력하세요 (0~9)");
            if (pattern.test(text) && text.length === 1) {  //한 자리 숫자만 입력했을 때 아래 실행
                const number = parseInt(text); //입력값 숫자로 형 변환
                list.push(number); //배열에 추가
                if (rdList.indexOf(number) === list.indexOf(number)) { //인덱스 번호가 같을 때
                    strike++; //스트라이크 
                }
                if (rdList.includes(number) && rdList.indexOf(number) !== list.indexOf(number)) { // 값이 존재하지만 인덱스 번호가 다를 때
                    ball++; //볼
                }
            } else { //입력 조건 만족하지 않았을 때
                alert("잘못 입력하셨습니다. 다시 진행해주세요.") //안내 메세지 띄우고
                window.location.reload(); //화면 초기화
                break; // 반복문 탈출
            }
        }
        const msg = `판정 -- ${strike} 스트라이크 , ${ball} 볼`;
        console.log(msg);
        alert(msg); //결과 출력
    });
});