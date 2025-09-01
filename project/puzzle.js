// 게임 관련 변수들 전역 선언
let uploadedImage = null; // 업로드된 이미지 객체
let puzzlePieces = []; // 퍼즐 조각들을 저장할 배열
let gameStarted = false; // 게임 시작 여부
let correctPieces = 0; // 올바르게 맞춰진 조각 수
let totalPieces = 9; // 전체 퍼즐 조각 수 (3x3)
let draggedPiece = null; // 현재 드래그 중인 조각
let gameTimer = null; // 게임 타이머
let startTime = null; // 게임 시작 시간
let elapsedTime = 0; // 경과 시간

$(document).ready(function () {
  GameEvents(); // 이번트 리스너 함수
  DragAndDrop(); // 드래그 앤 드롭 설정 함수 호출
});

// 이벤트 리스너 설정
function GameEvents() {
  // 파일 업로드 영역 클릭
  $("#uploadArea").on("click", function () {
    $("#imageInput").click();
  });

  // 캔버스 클릭했을 때도 이미지 변경할 수 있게
  $("#imageCanvas").on("click", function () {
    $("#imageInput").click();
  });

  // 파일 선택
  $("#imageInput").on("change", function (e) {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      // 파일이 있으면
      ImageUpload(file); // 이미지 업로드 처리 함수 호출
    }
  });

  // 게임 시작 버튼
  $("#startBtn").on("click", function () {
    if (uploadedImage && !gameStarted) {
      // 이미지가 있고 게임이 시작되지 않았으면
      startGame(); // 게임 시작 함수 호출
    }
  });

  // 기록 보기 버튼
  $("#recordBtn").on("click", function () {
    showGameRecords(); // 게임 기록 표시 함수 호출 (records.js에 잇음)
  });

  // 힌트 보기 버튼
  $("#hintBtn").on("click", function () {
    showHint(); // 힌트 표시 함수 호출
  });

  // 정답 확인 버튼
  $("#checkBtn").on("click", function () {
    checkAnswer(); // 정답 확인 함수 호출
  });

  // 마우스 이벤트
  $(document).on("mousemove", handleDrag); // 문서 전체 마우스 이동 이벤트
  $(document).on("mouseup", handleDragEnd); // 문서 전체 마우스 업 이벤트
  $(document).on("mousedown", ".puzzle-piece", startDrag); // 퍼즐 조각 마우스 다운 이벤트
}

// 드래그 앤 드롭 설정
function DragAndDrop() {
  const uploadArea = document.getElementById("uploadArea"); // 업로드 영역 요소 가져오기
  const canvasContainer = document.getElementById("canvasContainer"); // 캔버스 컨테이너 요소 가져오기

  // 업로드 영역 드래그 앤 드롭
  uploadArea.addEventListener("dragover", function (e) {
    // 드래그 오버 이벤트
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 이벤트 전파 방지
  });

  uploadArea.addEventListener("dragleave", function (e) {
    // 드래그 리브 이벤트
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 이벤트 전파 방지
  });

  uploadArea.addEventListener("drop", function (e) {
    // 드롭 이벤트
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 이벤트 전파 방지

    const files = e.dataTransfer.files; // 드롭된 파일들 가져오기
    if (files.length > 0) {
      // 파일이 있으면
      const file = files[0]; // 첫 번째 파일 가져오기
      if (file.type.startsWith("image/")) {
        // 이미지 파일인지 확인
        ImageUpload(file); // 이미지 업로드 처리 함수 호출
      } else {
        // 이미지 파일이 아니면
        alert("이미지 파일만 업로드 가능합니다."); // 경고 메시지 표시
      }
    }
  });

  // 캔버스 영역 드래그 앤 드롭
  if (canvasContainer) {
    // 캔버스 컨테이너가 있으면(이미 파일이 올라간 상태여도 바로 수정할 수 있게)
    canvasContainer.addEventListener("dragover", function (e) {
      // 드래그 오버 이벤트
      e.preventDefault(); // 기본 동작 방지
      e.stopPropagation(); // 이벤트 전파 방지
    });

    canvasContainer.addEventListener("dragleave", function (e) {
      // 드래그 리브 이벤트
      e.preventDefault(); // 기본 동작 방지
      e.stopPropagation(); // 이벤트 전파 방지
    });

    canvasContainer.addEventListener("drop", function (e) {
      // 드롭 이벤트
      e.preventDefault(); // 기본 동작 방지
      e.stopPropagation(); // 이벤트 전파 방지

      const files = e.dataTransfer.files; // 드롭된 파일들 가져오기
      if (files.length > 0) {
        // 파일이 있으면
        const file = files[0]; // 첫 번째 파일 가져오기
        if (file.type.startsWith("image/")) {
          // 이미지 파일인지 확인
          ImageUpload(file); // 이미지 업로드 처리 함수 호출
        } else {
          // 이미지 파일이 아니면
          alert("이미지 파일만 업로드 가능합니다."); // 경고 메시지 표시
        }
      }
    });
  }

  // 문서 전체 드래그 방지
  document.addEventListener("dragover", function (e) {
    // 문서 전체 드래그 오버 이벤트
    e.preventDefault(); // 기본 동작 방지
  });

  document.addEventListener("drop", function (e) {
    // 문서 전체 드롭 이벤트
    e.preventDefault(); // 기본 동작 방지
  });
}

// 이미지 업로드 처리
function ImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    // 이미지 파일이 아니면
    alert("이미지 파일만 업로드 가능합니다."); // 경고 메시지 표시
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    // 파일 크기가 5MB보다 크면
    alert("파일 크기는 5MB 이하여야 합니다."); // 경고 메시지 표시
    return;
  }

  const reader = new FileReader(); // 파일 리더 객체 생성
  reader.onload = function (e) {
    // 파일 로드 완료 시 실행
    const img = new Image(); // 이미지 객체 생성
    img.onload = function () {
      // 이미지 로드 완료 시 실행
      uploadedImage = img; // 업로드된 이미지 변수에 저장
      drawImageOnCanvas(img); // 캔버스에 이미지 그리기 함수 호출
      $("#startBtn").prop("disabled", false); // 게임 시작 버튼 활성화
      $("#uploadArea").hide(); // 업로드 영역 숨기기

      // 게임이 시작된 상태라면 게임 리셋
      if (gameStarted) {
        // 게임이 시작된 상태라면
        resetGame(); // 게임 리셋 함수 호출
      }
    };
    img.src = e.target.result; // 이미지 소스 설정
  };
  reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
}

// 캔버스에 이미지 그리기
function drawImageOnCanvas(img) {
  const canvas = document.getElementById("imageCanvas"); // 캔버스 요소 가져오기
  if (!canvas) {
    // 캔버스가 없으면
    console.error("캔버스를 찾을 수 없습니다"); // 에러 메시지 출력
    return;
  }

  const ctx = canvas.getContext("2d"); // 2D 컨텍스트 가져오기
  const canvasSize = 600; // 캔버스 크기 설정
  canvas.width = canvasSize; // 캔버스 너비 설정
  canvas.height = canvasSize; // 캔버스 높이 설정

  const cropInfo = calculateCropSize(img.width, img.height, canvasSize); // 이미지 크롭 정보 계산

  // 배경을 흰색으로 채우기
  ctx.fillStyle = "white"; // 배경색을 흰색으로 설정
  ctx.fillRect(0, 0, canvasSize, canvasSize); // 흰색 배경 그리기

  // 이미지를 정사각형으로 잘라서 캔버스에 그리기
  ctx.drawImage(
    img, // 그릴 이미지
    cropInfo.sourceX,
    cropInfo.sourceY,
    cropInfo.sourceWidth,
    cropInfo.sourceHeight, // 소스 영역
    0,
    0,
    cropInfo.destWidth,
    cropInfo.destHeight // 대상 영역
  );

  $("#canvasContainer").show(); // 캔버스 컨테이너 보이기
}

// 이미지 크롭 크기 계산
function calculateCropSize(imgWidth, imgHeight, canvasSize) {
  const imgRatio = imgWidth / imgHeight; // 이미지 비율 계산
  const canvasRatio = 1; // 캔버스 비율 (정사각형)

  let sourceX, sourceY, sourceWidth, sourceHeight; // 소스 영역 변수들

  if (imgRatio > canvasRatio) {
    // 이미지가 가로가 더 길면
    sourceHeight = imgHeight; // 소스 높이는 이미지 높이
    sourceWidth = imgHeight; // 소스 너비는 이미지 높이 (정사각형)
    sourceX = (imgWidth - sourceWidth) / 2; // 소스 X는 중앙 정렬
    sourceY = 0; // 소스 Y는 0
  } else {
    // 이미지가 세로가 더 길거나 정사각형이면
    sourceWidth = imgWidth; // 소스 너비는 이미지 너비
    sourceHeight = imgWidth; // 소스 높이는 이미지 너비 (정사각형)
    sourceX = 0; // 소스 X는 0
    sourceY = (imgHeight - sourceHeight) / 2; // 소스 Y는 중앙 정렬
  }

  return {
    // 크롭 정보 반환
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight, // 소스 영역
    destWidth: canvasSize,
    destHeight: canvasSize, // 대상 영역
  };
}

// 게임 시작
function startGame() {
  gameStarted = true; // 게임 시작 상태로 변경
  $("#canvasContainer").hide(); // 캔버스 컨테이너 숨기기
  $(".button-container").hide(); // 버튼 컨테이너 숨기기
  $("#gameButtonContainer").show(); // 게임 버튼 컨테이너 보이기

  createGameArea(); // 게임 영역 생성 함수 호출
  createPuzzlePieces(); // 퍼즐 조각 생성 함수 호출
  placePiecesRandomly(); // 조각들을 랜덤 위치에 배치 함수 호출

  // 타이머 시작
  startTimer(); // 타이머 시작 함수 호출
  $("#timerContainer").show(); // 타이머 컨테이너 보이기
}

// 게임 영역 생성
function createGameArea() {
  const gameArea = $('<div id="gameArea" class="game-area"></div>'); // 게임 영역 div 생성
  $(".gaem-container").append(gameArea); // 컨테이너에 게임 영역 추가
}

// 퍼즐 조각들 생성
function createPuzzlePieces() {
  puzzlePieces = []; // 퍼즐 조각 배열 초기화
  const pieceSize = 200; // 조각 크기 설정 (캔버스 크기가 600이니까 3등분하면 200)
  const originalCanvas = document.getElementById("imageCanvas"); // 원본 캔버스 가져오기

  for (let row = 0; row < 3; row++) {
    // 3행 반복
    for (let col = 0; col < 3; col++) {
      // 3열 반복 (9조각이니까)
      const canvas = document.createElement("canvas"); // 캔버스 요소 생성
      canvas.width = pieceSize; // 캔버스 너비 설정
      canvas.height = pieceSize; // 캔버스 높이 설정
      const ctx = canvas.getContext("2d"); // 2D 컨텍스트 가져오기

      const sourceSize = 600 / 3; // 소스 크기 계산 (600/3 = 200)
      ctx.drawImage(
        originalCanvas, // 원본 캔버스
        col * sourceSize,
        row * sourceSize,
        sourceSize,
        sourceSize, // 소스 영역
        0,
        0,
        pieceSize,
        pieceSize // 대상 영역
      ); //각 조각마다 자름

      canvas.className = "puzzle-piece"; // 퍼즐 조각 클래스 추가
      canvas.dataset.row = row; // 행 데이터 속성 설정
      canvas.dataset.col = col; // 열 데이터 속성 설정

      puzzlePieces.push({
        // 퍼즐 조각 객체를 배열에 추가
        element: canvas, // 캔버스 요소
        row: row, // 행 위치
        col: col, // 열 위치
        currentX: 0, // 현재 X 위치
        currentY: 0, // 현재 Y 위치
        isCorrect: false, // 올바른 위치에 있는지 여부
      });
    }
  }
}

// 조각들을 랜덤 위치에 배치
function placePiecesRandomly() {
  const gameArea = $("#gameArea"); // 게임 영역 요소 가져오기
  const sideAreaWidth = 300; // 측면 영역 너비
  const sideAreaHeight = 600; // 측면 영역 높이

  // 조각들을 섞기
  shuffleArray(puzzlePieces);

  puzzlePieces.forEach(function (piece) {
    // 각 퍼즐 조각에 대해 반복
    let randomX, randomY; // 랜덤 X, Y 위치 변수

    if (Math.random() < 0.5) {
      // 50% 확률로
      randomX = -sideAreaWidth + Math.random() * (sideAreaWidth - 200); // 왼쪽 측면 영역
      randomY = Math.random() * (sideAreaHeight - 200); // 랜덤 Y 위치
    } else {
      // 50% 확률로
      randomX = 600 + Math.random() * (sideAreaWidth - 200); // 오른쪽 측면 영역
      randomY = Math.random() * (sideAreaHeight - 200); // 랜덤 Y 위치
    }

    $(piece.element).css({
      // 조각 요소 스타일 설정
      position: "absolute", // 절대 위치
      left: randomX + "px", // 왼쪽 위치
      top: randomY + "px", // 위쪽 위치
      zIndex: 10, // z-index 설정
      cursor: "grab", // 커서 스타일
    });

    piece.currentX = randomX; // 현재 X 위치 저장
    piece.currentY = randomY; // 현재 Y 위치 저장
    piece.isCorrect = false; // 올바른 위치 여부 초기화

    gameArea.append(piece.element); // 게임 영역에 조각 추가
  });
}

// 배열을 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 배열 끝부터 시작해서
    const j = Math.floor(Math.random() * (i + 1)); // 랜덤 인덱스 생성
    [array[i], array[j]] = [array[j], array[i]]; // 두 요소 교환
  }
}

// 타이머 시작
function startTimer() {
  startTime = Date.now(); // 시작 시간 설정
  elapsedTime = 0; // 경과 시간 초기화

  gameTimer = setInterval(function () {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000); // 경과 시간 계산
    // Date.now()는 밀리초 단위로 주기 때문에 초 단위로 변환해야 해서 /1000을 해줌
    updateTimerDisplay(); // 타이머 표시 업데이트 함수 호출
  }, 1000); // 1초마다 실행
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
  const minutes = Math.floor(elapsedTime / 60); // 분 계산(소수점 버려서 분 단위만 남김)
  const seconds = elapsedTime % 60; // 초 계산 (60초로 나눈 나머지만 남김)
  const timeString =
    minutes.toString().padStart(2, "0") + // padStart() 문자열 메서드로 문자열 길이가 앞 숫자보다 짧으면 뒤에 적힌 문자로 앞쪽에 채워줌
    ":" +
    seconds.toString().padStart(2, "0"); // 시간 문자열 생성
  $("#timerDisplay").text(timeString); // 타이머 표시 업데이트
}

// 타이머 정지
function stopTimer() {
  if (gameTimer) {
    // 타이머가 있으면
    clearInterval(gameTimer); // 타이머 정지
    gameTimer = null; // 타이머 변수 초기화
  }
}

// 드래그 시작
function startDrag(e) {
  if (!gameStarted) return; // 게임이 시작되지 않았으면 종료

  const piece = puzzlePieces.find(p => p.element === e.target); // 클릭된 조각 찾기
  if (!piece || piece.isCorrect) return; // 조각이 없거나 이미 올바른 위치에 있으면 종료 (못 움직이게)

  draggedPiece = piece; // 드래그 중인 조각 설정

  const rect = e.target.getBoundingClientRect(); // 요소의 위치 정보 가져오기 getBoundingClientRect()는 브라우저에서 제공하는 메서드임
  console.log("rect: ", rect);
  piece.dragOffset = {
    // 드래그 오프셋 설정
    x: e.clientX - rect.left, // 마우스 X - 요소 왼쪽
    y: e.clientY - rect.top, // 마우스 Y - 요소 위쪽
  };

  $(piece.element)
    .css({
      // 조각 요소 스타일 설정
      cursor: "grabbing", // 커서 스타일 변경
      zIndex: 1000, // 다른 퍼즐 조각에 안 가려지게 젤 높게 설정함
    })
    .addClass("dragging"); // 드래그 중 클래스 추가

  e.preventDefault(); // 기본 동작 방지
}

// 드래그 처리
function handleDrag(e) {
  if (!draggedPiece) return; // 드래그 중인 조각이 없으면 종료

  const piece = $(draggedPiece.element); // 드래그 중인 조각 요소
  const gameArea = $("#gameArea"); // 게임 영역 요소
  const gameAreaRect = gameArea[0].getBoundingClientRect(); // 게임 영역 위치 정보

  let newX = e.clientX - gameAreaRect.left - draggedPiece.dragOffset.x; // 새로운 X 위치 계산 (화면 전체 마우스 위치 - 게임판 왼쪽 모서리 위치 - 퍼즐 조각 클릭한 지점)
  let newY = e.clientY - gameAreaRect.top - draggedPiece.dragOffset.y; // 새로운 Y 위치 계산

  const pieceSize = 200; // 조각 크기
  const gameAreaSize = 600; // 게임 영역 크기
  // 퍼즐 조각 못 나가게 제한
  newX = Math.max(0, Math.min(newX, gameAreaSize - pieceSize)); // X 위치 제한
  newY = Math.max(0, Math.min(newY, gameAreaSize - pieceSize)); // Y 위치 제한

  piece.css({
    // 조각 요소 스타일 설정
    left: newX + "px", // 왼쪽 위치
    top: newY + "px", // 위쪽 위치
  });

  draggedPiece.currentX = newX; // 현재 X 위치 저장
  draggedPiece.currentY = newY; // 현재 Y 위치 저장

  e.preventDefault(); // 기본 동작 방지
}

// 드래그 종료
function handleDragEnd(e) {
  if (!draggedPiece) return; // 드래그 중인 조각이 없으면 종료

  const piece = $(draggedPiece.element); // 드래그 중인 조각 요소
  piece.removeClass("dragging"); // 드래그 중 클래스 제거

  if (checkCorrectPosition(draggedPiece)) {
    // 올바른 위치에 있는지 확인
    snapToCorrectPosition(draggedPiece); // 올바른 위치로 스냅
    correctPieces++; // 올바른 조각 수 증가
  } else {
    // 올바른 위치가 아니면
    piece.css({
      // 조각 요소 스타일 설정
      cursor: "grab", // 커서 스타일 변경
      zIndex: 10, // z-index 복원
    });
  }

  draggedPiece = null; // 드래그 중인 조각 초기화
}

// 정확한 위치에 있는지 확인
function checkCorrectPosition(piece) {
  const correctX = piece.col * 200; // 올바른 X 위치 계산
  const correctY = piece.row * 200; // 올바른 Y 위치 계산
  const tolerance = 15; // 허용 오차 (15펙셀 이내면 착 달라붙게)

  const isXCorrect = Math.abs(piece.currentX - correctX) <= tolerance; // X 위치가 올바른지 확인
  const isYCorrect = Math.abs(piece.currentY - correctY) <= tolerance; // Y 위치가 올바른지 확인

  return isXCorrect && isYCorrect; // X, Y 모두 올바르면 true 반환
}

// 정확한 위치로 스냅
function snapToCorrectPosition(piece) {
  const correctX = piece.col * 200; // 올바른 X 위치 계산
  const correctY = piece.row * 200; // 올바른 Y 위치 계산

  // 스냅 사운드 재생
  const snapSound = document.getElementById("snapSound"); // 스냅 사운드 요소 가져오기
  if (snapSound) {
    // 스냅 사운드가 있으면
    snapSound.currentTime = 0; // 재생 시간 초기화
    snapSound.play().catch(e => console.log("사운드 재생 실패:", e)); // 사운드 재생
  }

  $(piece.element).css({
    // 조각 요소 스타일 설정
    left: correctX + "px", // 올바른 X 위치로 이동
    top: correctY + "px", // 올바른 Y 위치로 이동
    cursor: "default", // 커서 스타일 변경
    zIndex: 5, // z-index 설정
    transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)", // 애니메이션 효과
  });

  piece.currentX = correctX; // 현재 X 위치 저장
  piece.currentY = correctY; // 현재 Y 위치 저장
  piece.isCorrect = true; // 올바른 위치 여부 설정
}

// 힌트 보기
function showHint() {
  const canvas = document.getElementById("imageCanvas"); // 캔버스 요소 가져오기
  if (!canvas) return; // 캔버스가 없으면 종료

  const overlay = $('<div class="hint-overlay"></div>'); // 힌트 오버레이 생성
  const hintImg = $(
    '<img class="hint-image" src="' +
      canvas.toDataURL() +
      '" alt="힌트 이미지">'
  ); // 힌트 이미지 생성

  overlay.append(hintImg); // 오버레이에 힌트 이미지 추가
  $("body").append(overlay); // body에 오버레이 추가

  // 3초 후 자동으로 사라지기
  setTimeout(function () {
    // 3초 후 실행
    overlay.fadeOut(300, function () {
      // 페이드 아웃 애니메이션
      overlay.remove(); // 오버레이 제거
    });
  }, 3000); // 3초 대기

  // 클릭으로도 닫기 가능
  overlay.on("click", function () {
    // 오버레이 클릭 이벤트
    overlay.fadeOut(300, function () {
      // 페이드 아웃 애니메이션
      overlay.remove(); // 오버레이 제거
    });
  });
}

// 정답 확인
function checkAnswer() {
  const isComplete = correctPieces === totalPieces; // 모든 조각이 맞춰졌는지 확인

  if (isComplete) {
    // 완성되었으면
    completeGame(); // 게임 완료 함수 호출
  } else {
    // 완성되지 않았으면
    const remainingPieces = totalPieces - correctPieces; // 남은 조각 수 계산
    showCheckResultModal(false, remainingPieces); // 실패 모달 표시
  }
}

// 정답 확인 결과 모달 표시
function showCheckResultModal(isSuccess, remainingPieces = 0) {
  const overlay = $('<div class="modal-overlay"></div>'); // 모달 오버레이 생성
  const modal = $('<div class="check-result-modal"></div>'); // 모달 생성

  if (isSuccess) {
    // 성공이면
    modal.addClass("success"); // 성공 클래스 추가
    modal.html(`
            <h2>정답입니다!</h2>
            <p>퍼즐을 완성했습니다!</p>
            <button class="btn btn-primary" onclick="completeGame()">게임 완료</button>
        `); // 성공 모달 내용
  } else {
    // 실패면
    modal.addClass("failure"); // 실패 클래스 추가
    modal.html(`
            <h2>아직 완성되지 않았습니다</h2>
            <p>${remainingPieces}개의 조각이 더 필요합니다.<br>계속 도전해보세요!</p>
            <button class="btn btn-primary" onclick="closeCheckModal()">확인</button>
        `); // 실패 모달 내용
  }

  overlay.append(modal); // 오버레이에 모달 추가
  $("body").append(overlay); // body에 오버레이 추가
}

// 게임 완료 처리
function completeGame() {
  stopTimer(); // 타이머 정지
  const timeString = formatTime(elapsedTime); // 시간 문자열 생성

  // 현재 사용자 정보 가져오기
  const randomCode = localStorage.getItem("code"); // 로컬 스토리지에서 코드 가져오기
  const nickname = localStorage.getItem("userName"); // 로컬 스토리지에서 닉네임 가져오기

  // 기록 저장
  saveGameRecord(timeString, elapsedTime, randomCode, nickname); // 게임 기록 저장

  // 완성 메시지 표시
  showCompletionMessage(timeString); // 완성 메시지 표시
}

// 완성 메시지 표시
function showCompletionMessage(timeString) {
  const overlay = $('<div class="modal-overlay"></div>'); // 모달 오버레이 생성
  const modal = $('<div class="check-result-modal success"></div>'); // 성공 모달 생성

  let content = `
        <h2>퍼즐 완성!</h2>
        <p>축하합니다! 퍼즐을 성공적으로 완성했습니다!</p>
        <p class="completion-time">완성 시간: <strong>${timeString}</strong></p>
    `; // 완성 메시지 내용

  modal.html(content); // 모달에 내용 설정

  const restartBtn = $('<button class="btn btn-primary">다시 시작</button>'); // 다시 시작 버튼 생성
  restartBtn.on("click", function () {
    // 다시 시작 버튼 클릭 이벤트
    overlay.remove(); // 오버레이 제거
    resetGame(); // 게임 리셋 함수 호출
  });

  modal.append(restartBtn); // 모달에 다시 시작 버튼 추가
  overlay.append(modal); // 오버레이에 모달 추가
  $("body").append(overlay); // body에 오버레이 추가
}

// 게임 리셋
function resetGame() {
  gameStarted = false; // 게임 시작 상태 초기화
  correctPieces = 0; // 올바른 조각 수 초기화
  draggedPiece = null; // 드래그 중인 조각 초기화

  stopTimer(); // 타이머 정지
  $("#timerContainer").hide(); // 타이머 컨테이너 숨기기

  $("#gameArea").remove(); // 게임 영역 제거
  $(".modal-overlay").remove(); // 모달 오버레이 제거
  $(".hint-overlay").remove(); // 힌트 오버레이 제거
  $("#gameButtonContainer").hide(); // 게임 버튼 컨테이너 숨기기

  $("#canvasContainer").show(); // 캔버스 컨테이너 보이기
  $(".button-container").show(); // 버튼 컨테이너 보이기
  $("#startBtn").prop("disabled", false); // 게임 시작 버튼 활성화

  puzzlePieces = []; // 퍼즐 조각 배열 초기화
}

// 시간 포맷
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60); // 분 계산
  const remainingSeconds = seconds % 60; // 초 계산
  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    remainingSeconds.toString().padStart(2, "0")
  ); // 시간 문자열 반환
}

// 모달 닫기
function closeCheckModal() {
  $(".modal-overlay").remove(); // 모달 오버레이 제거
}
