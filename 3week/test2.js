const javascriptArray = [
{name: '윤인성', region: ['서울']},
{name: '윤명월', region: ['도쿄']},
];

document.addEventListener("DOMContentLoaded", function() { 
    document.getElementById("btn1").addEventListener('click', function() {
        console.log(javascriptArray[0].region[0]);
    });
    
    document.getElementById("btn2").addEventListener('click', function() {    
        const yoon = javascriptArray[1];
        for(let key in yoon) {
            if(key === "region") {
                console.log(yoon[key][0]);
            } else {
                console.log(yoon[key]);
            }
        }
    });

    document.getElementById("btn3").addEventListener('click', function() {    
        const name = [];
        const region = [];
        for (let i=0; i<javascriptArray.length; i++) {
            const people = javascriptArray[i];

            for(let key in people) {
                if(key === "region") {
                    region.push(people[key][0]);
                } else {
                    name.push(people[key]);
                }
            }
        }
        const obj = {
            name: name,
            region: region
        }
        console.log(obj);
    });

    document.getElementById("btn4").addEventListener('click', function() {    
        let obj = {};
        for(let key in javascriptArray[0]) {
            for (let i=0; i<javascriptArray.length; i++) {
                const people = javascriptArray[i];
                for(let value in people) {
                    if(key === value) {
                        obj = {
                            key: people[value]
                        }
                    }
                }
            }
        }
        console.log(obj);
    });    

});