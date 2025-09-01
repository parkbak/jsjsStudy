//  ======================== 기록 관련 함수들 ========================

// 게임 기록 저장
function saveGameRecord(timeString, seconds, randomCode, nickname) {
    const currentCode = localStorage.getItem('code'); // 현재 사용자의 랜덤 코드 가져오기
    const records = getGameRecords(); // 기존 기록 가져오기
    
    // 현재 캔버스의 이미지 데이터를 가져오기
    const canvas = document.getElementById('imageCanvas');
    const imageData = canvas ? canvas.toDataURL() : null;
    
    const newRecord = { // 새로운 기록 객체 생성
        time: timeString, // 시간 문자열
        seconds: seconds, // 초 단위 시간
        nickname: nickname, // 사용자 닉네임
        imageData: imageData, // 게임에 사용된 이미지 데이터
        date: new Date().toLocaleDateString('ko-KR'), // 현재 날짜
        timestamp: Date.now() // 타임스탬프
    };
    
    records.push(newRecord); // 기존 기록에 새 기록 추가
    
    // 시간 순으로 정렬 (빠른 시간이 위로)
    records.sort(function(a, b) { // 기록 정렬 함수
        return a.seconds - b.seconds; // 초 단위로 오름차순 정렬
    });
    
    // 현재 사용자의 코드로 저장
    localStorage.setItem('puzzleRecords_' + currentCode, JSON.stringify(records));
}

// 게임 기록 가져오기
function getGameRecords() {
    const currentCode = localStorage.getItem('code'); // 현재 사용자의 코드 가져오기
    const records = localStorage.getItem('puzzleRecords_' + currentCode); // 사용자별 기록 가져오기
    return records ? JSON.parse(records) : []; // 기록이 있으면 파싱, 없으면 빈 배열 반환
}

// 게임 기록 표시
function showGameRecords() {
    const records = getGameRecords(); // 게임 기록 가져오기
    
    const overlay = $('<div class="modal-overlay"></div>'); // 모달 오버레이 생성
    const modal = $('<div class="modal-content"></div>'); // 모달 컨텐츠 생성
    
    let content = '<h2>🏆 게임 기록</h2>'; // 제목 추가
    
    if (records.length === 0) { // 기록이 없으면
        content += '<p>아직 기록이 없습니다. 게임을 플레이해보세요!</p>';
    } else { // 기록이 있으면
        content += '<div class="records-list">'; // 기록 목록 div 시작
        records.forEach(function(record, index) { // 각 기록에 대해 반복
            const imageHtml = record.imageData ? 
                `<img src="${record.imageData}" alt="게임 이미지" class="record-image">` : 
                '<div class="no-image">이미지 없음</div>';
            
            content += `
                <div class="record-item">
                    <span class="rank">#${index + 1}</span>
                    <span class="time">${record.time}</span>
                    <span class="nickname">${record.nickname || '익명'}</span>
                    <span class="record-image-container">${imageHtml}</span>
                    <span class="date">${record.date}</span>
                </div>
            `;
        });
        content += '</div>';
    }
    
    modal.html(content); // 모달에 내용 넣기
    
    const closeBtn = $('<button class="btn btn-primary">닫기</button>'); // 닫기 버튼 생성
    closeBtn.on('click', function() { // 닫기 버튼 클릭 이벤트
        overlay.remove(); // 오버레이 제거
    });
    
    modal.append(closeBtn); // 모달에 닫기 버튼 추가
    overlay.append(modal); // 오버레이에 모달 추가
    $('body').append(overlay); // body에 오버레이 추가
}

// 새 기록인지 확인
// function isNewRecord(seconds) {
//     const records = getGameRecords(); // 게임 기록 가져오기
    
//     // 기록이 없거나 최대 기록 수보다 적으면 새 기록
//     if (records.length < 10) { // 기록이 10개보다 적으면
//         return true; // 새 기록으로 간주
//     }
    
//     // 가장 느린 기록보다 빠르면 새 기록
//     const slowestRecord = records[records.length - 1]; // 가장 느린 기록 가져오기
//     return slowestRecord && seconds < slowestRecord.seconds; // 현재 시간이 더 빠르면 새 기록
// }

// 기록 순위 가져오기
function getRank(seconds) {
    const records = getGameRecords(); // 게임 기록 가져오기
    
    for (let i = 0; i < records.length; i++) { // 각 기록에 대해 반복
        if (seconds <= records[i].seconds) { // 현재 시간이 기록 시간보다 빠르거나 같으면
            return i + 1; // 순위 반환 (1부터 시작)
        }
    }
    
    // // 기록에 포함되지 않는 경우
    // return records.length < 10 ? records.length + 1 : 0; // 기록이 10개보다 적으면 다음 순위, 아니면 0
}
