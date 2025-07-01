
// 1. 6월 24일 시간별 예보에서 '흐림' 시간만 출력
// 2. 6월 24일 시간별 예보에서 '구름 많음'을 흐림으로 변경 후 시간별 예보만 출력
// 3. 주간 예보에서 '흐림'이 몇 일 있는지 출력

document.addEventListener("DOMContentLoaded", function() {
    const json = JSON.parse(JSON.stringify(weather));

    document.getElementById("btn1").addEventListener('click', function() {
        const timeList = json["shortTermForecasts"];
        console.log("기존: ", timeList);

        //filter: 요소 걸러내기
        const newList = timeList.filter(list => list.weatherText === "흐림")
        console.log("흐림만: ", newList);
    });

    document.getElementById("btn2").addEventListener('click', function() {
        const timeList1 = json["shortTermForecasts"];
        console.log("기존: ", timeList1);

        //map: 요소 수정하기
        const newList1 = timeList1.map(list => {
            if(list.weatherText === "구름많음") {
                list.weatherText = "흐림";
                return list;
            } else {
                return list;
            }
        });

        console.log("변경된: " , newList1);
    });

    document.getElementById("btn3").addEventListener('click', function() {
        const weekList = json["weeklyForecast"].dailyForecasts;
        console.log(weekList);

        //reduce: 조건에 맞는 것을 하나의 조합 결과로 만들 때 사용(얘를 잘 쓰면 filter, map없이 하나로 가능)
        const sum = weekList.reduce((a, c) => {
                if (c.amWeatherText === "흐림") {
                    return a+1;
                } else {
                    return a;
                }
        }, 0);

        console.log(sum);
    });
});