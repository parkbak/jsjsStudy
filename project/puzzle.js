let rdList = []; //랜덤 list
let uploadedImage = null; // 업로드된 이미지 저장

$(function () {
    // 로그인 페이지 관련 코드
    $("#goToMainBtn").css("display", "none"); //메인 페이지 이동 버튼 가려놓기
    rdList = createRandomNum(1, 9); //랜덤 코드 생성
    $("#randomCodeInput").val(rdList.join('')); //랜덤코드input창에 넣기

    // 파일 업로드 영역 클릭했을 때 파일선택창 열리게
    $("#uploadArea").on("click", function () {
        $("#imageInput").click();
    });

    //이미지가 업로드된 캔버스를 클릭했을 때 파일선택창 열리게
    $("#imageCanvas").on("click", function () {
        $("#imageInput").click();
    });

    // 파일 선택 이벤트
    $("#imageInput").on("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // 드래그 앤 드롭 이벤트
    $("#uploadArea").on("dragover", function (e) {
        e.preventDefault();
        $(this).addClass("drag-over");
    });

    $("#uploadArea").on("dragleave", function (e) {
        e.preventDefault();
        $(this).removeClass("drag-over");
    });

    $("#uploadArea").on("drop", function (e) {
        e.preventDefault();
        $(this).removeClass("drag-over");

        const files = e.originalEvent.dataTransfer.files;
        if (filesㄴlength > 0) {
            handleImageUpload(files[0]);
        }
    });

    function handleImageUpload(file) {
        // 파일 타입 검증
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // 파일 크기 제한 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                uploadedImage = img;
                imgOnCanvas(img);
                $("#startBtn").prop("disabled", false);
                $("#uploadArea").hide();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function imgOnCanvas(img) {
        const canvas = document.getElementById('imageCanvas');
        
        // canvas가 존재하는지 확인
        if (!canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        const ctx = canvas.getContext('2d');

        // 캔버스 크기 설정 (정사각형 400x400)
        const canvasSize = 400;
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // 이미지 크기 계산 (정사각형으로 잘라내기)
        const { sourceX, sourceY, sourceWidth, sourceHeight, destWidth, destHeight } = calculateCropSize(img.width, img.height, canvasSize);

        // 배경을 흰색으로 채우기
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // 이미지를 정사각형으로 잘라서 캔버스에 그리기
        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);

        // 캔버스 컨테이너 표시
        $("#canvasContainer").show();
    }

    function calculateCropSize(imgWidth, imgHeight, canvasSize) {
        // 이미지의 가로세로 비율 계산
        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = 1; // 정사각형

        let sourceX, sourceY, sourceWidth, sourceHeight;

        if (imgRatio > canvasRatio) {
            // 이미지가 가로로 긴 경우 - 가로를 잘라냄
            sourceHeight = imgHeight;
            sourceWidth = imgHeight; // 정사각형으로 만들기 위해 높이에 맞춤
            sourceX = (imgWidth - sourceWidth) / 2; // 중앙에서 잘라내기
            sourceY = 0;
        } else {
            // 이미지가 세로로 긴 경우 - 세로를 잘라냄
            sourceWidth = imgWidth;
            sourceHeight = imgWidth; // 정사각형으로 만들기 위해 가로에 맞춤
            sourceX = 0;
            sourceY = (imgHeight - sourceHeight) / 2; // 중앙에서 잘라내기
        }

        return {
            sourceX: sourceX,
            sourceY: sourceY,
            sourceWidth: sourceWidth,
            sourceHeight: sourceHeight,
            destWidth: canvasSize,
            destHeight: canvasSize
        };
    }

    function createRandomNum(min, max) {
        let randomList = []; //랜덤 숫자 담을 List 선언

        for (let i = 0; randomList.length < 8; i++) { //list 길이가 3보다 작을때까지 반복
            const random = Math.floor(Math.random() * (max - min + 1)) + min; //랜덤 숫자 출력
            if (!randomList.includes(random)) { //list안에 만들어진 랜덤 숫자가 "없으면"
                randomList.push(random); //list에 추가
            }
        }
        return randomList; //list 반환
    }

    $("#userNameInput").on("propertychange change keyup paste input", function () {
        //propertychange change keyup paste input 값 입력되는 걸 실시간으로 알 수 있음
        let inputText = $("#userNameInput").val(); //실시간으로 userNameInput창에 입력되는 값을 가져옴
        if (inputText.trim() != "") { //공백을 제거했을 때 빈값이 아니면
            $("#goToMainBtn").css("display", "block"); //메인 화면 넘어가는 버튼 보이게
        } else {
            $("#goToMainBtn").css("display", "none");
        }
    });

    $("#goToMainBtn").on("click", function () {
        localStorage.setItem('userName', $("#userNameInput").val());
        localStorage.setItem('code', $("#randomCodeInput").val()); //메인버튼 클릭 시 인풋창 값 로컬스토리지에 저장
        window.location.href = "puzzle_main.html"; //메인화면으로 이동
    });

});