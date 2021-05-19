// app.js
const canvas = document.getElementById("jsCanvas"); // id를 가져올때는 getElementById!! Class를 가져올 때는 get
const ctx = canvas.getContext("2d") // context 불러오기 (mdn 참고)

// canvas는 2개의 사이즈를 가져야한다. 우리가 보고 있는 CSS size와 pixel manipulating size를 알아야한다
// 아래는 pixel을 관리하기 위해서 알아야하는 size를 canvas에 제공한 것이다.
canvas.width = canvas.offsetWidth; // 강의에서는 700, 700을 넣었지만 실제로는 이렇게 해야 관리가 편하다!
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "black"; // 사용하려는 사람이 검정색으로 시작하도록 설정
ctx.lineWidth = "2.5"; // 아까 만들었던 range를 이용해 선의 굵기를 결정, 초기값 2.5!

let painting = false; // 클릭중인지 여부를 나타내는 변수


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){ // 마우스가 캔버스 위에 있는지를 나타내는 함수
    // 여기서 관심있는 부분은 캔버스 내 위치인 offset에 대한 부분!
    // client X Y는 윈도우 전체에서 마우스의 위치
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // painting(클릭) 상태가 아니라면
        ctx.beginPath(); // path를 만든다 (path를 현 위치로 초기화한다)
        ctx.moveTo(x, y); // path를 x,y로 옮긴다 - 클릭하면 그 path의 최종 지점이 x와 y로 남는다
    } else { // painting(클릭) 상태라면
        // CanvasRenderingContext2D.lineTo()는 현재 sub-path의 마지막 점을 특정 좌표와 '직선'으로 연결한다
        ctx.lineTo(x, y); // 실시간으로 계속해서 클릭한 상태로 이동한 좌표를 따라가서 path를 만든다
        ctx.stroke(); // 그렇게 생성된 path를 이어서 선을 만든다
    }
}

function onMouseDown(event){ // 캔버스 안을 클릭했을 때를 나타내는 함수
    painting = true; // 누르면 true
}

/* 우리가 만들 로직은 onMouseDown에 들어가면 되기 때문에 이 부분도 생략 후 stopPainting으로 대체
function onMouseUp(event)
    stopPainting(); // 떼면 false - 다른 문장이 필요하므로 stopPainting()을 가져와서 여기서 사용한다!
}
*/

/*
이 부분은 stopPainting()을 만들면서 만들지 않을 수 있다!
function onMouseLeave(event){
    painting = false;
}
*/


if(canvas){ // 사실상 init와 같은 역할이다 - eventListener들은 한번 작동하면 계속 작동!
    canvas.addEventListener("mousemove", onMouseMove); // 캔버스 위 움직임 감지
    canvas.addEventListener("mousedown", startPainting); // 클릭했을 때 감지
    canvas.addEventListener("mouseup", stopPainting); // 클릭을 멈췄을 때 감지
    canvas.addEventListener("mouseleave", stopPainting); // 클릭하다가 캔버스를 벗어났을 때 감지
}