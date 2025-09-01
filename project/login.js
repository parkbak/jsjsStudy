// 로그인 관련 변수들
let randomCode = ''; // 랜덤 코드를 저장할 변수

$(document).ready(function() {
    generateRandomCode(); // 랜덤 코드 생성 함수 호출
    setupLoginEvents(); // 로그인 이벤트 설정 함수 호출
    $('#startGameBtn').hide(); // 게임 시작 버튼을 숨김
});

// 랜덤 코드 생성 함수
function generateRandomCode() {
    const numbers = []; // 숫자를 저장할 배열
    for (let i = 0; numbers.length < 8; i++) { // 8개 숫자가 될 때까지 반복
        const random = Math.floor(Math.random() * 9) + 1; // 1-9 사이 랜덤 숫자 생성
        if (!numbers.includes(random)) { // 중복되지 않는 숫자인지 확인
            numbers.push(random); // 배열에 추가
        }
    }
    randomCode = numbers.join(''); // 배열을 문자열로 합쳐서 랜덤 코드 생성
    $('#randomCode').val(randomCode); // 입력 필드에 랜덤 코드 표시
}

// 이벤트 리스너 설정
function setupLoginEvents() {
    // 닉네임 입력 이벤트
    $('#nickname').on('propertychange change keyup paste input', function() { // 닉네임 인풋창 모든 입력 감지
        checkInput(); // 검증 함수
    });

    // 게임 시작 버튼 클릭
    $('#startGameBtn').on('click', function() {
        startGame(); // 게임 시작 함수
    });

    $('#nickname').on('keydown', function(e) {
    if (e.key === "Enter") { // 닉네임 입력창에서 엔터쳤을 때 바로 넘어갈 수 있게
        startGame();
    }
});
}

// 입력 검증
function checkInput() {
    const nickname = $('#nickname').val().trim(); // 닉네임 입력값 가져옴
    
    if (nickname !== '') { // 닉네임이 비어있지 않으면
        $('#startGameBtn').show(); 
    } else { // 닉네임이 비어있으면
        $('#startGameBtn').hide();
    }
}

// 게임 시작
function startGame() {
    const nickname = $('#nickname').val().trim(); // 닉네임 입력값 가져오기
    
    if (!nickname) { // 닉네임 비어있으면
        alert('닉네임을 입력해주세요.'); // 입력하라고 뜸
        return;
    }

    localStorage.setItem('userName', nickname); // 로컬 스토리지에 닉네임 저장
    localStorage.setItem('code', randomCode); // 랜덤 코드 저장

    window.location.href = 'puzzle_main.html'; // 메인 페이지로 이동
}
