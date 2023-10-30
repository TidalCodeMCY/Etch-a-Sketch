function userChoices(){
    const size = document.querySelector('.sizechoice');
    const color = document.querySelector('.colorchoice');
    const sizesplit = size.value.split(',');

    if(color.value === '') {
        const errorCode = document.querySelector('.error');
        errorCode.textContent = 'Please enter a valid color!';
        makeCanvas(16,16);
        return null;
    }

    draw(color.value);
    makeCanvas(sizesplit[0],sizesplit[1]);
}

(function eventListen(){
    const submit = document.querySelector('.submit-btn');

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        resetBoard();
        userChoices();
    })
})();

function makeCanvas(val1,val2) {
    const container = document.querySelector('.sketchcontainer');
    const Canvas = document.querySelector('.sketchcontainer');
    Canvas.style.gridTemplateColumns = `repeat(${val1},auto)`;
    const errorCode = document.querySelector('.error');

    if(val1 !== val2){
        errorCode.textContent = 'Please enter the proper values!';
        errorCode.setAttribute('color', 'red');
        return makeCanvas(16,16);
    }

    if(val1 > 128 || val2 > 128) {
        errorCode.textContent = 'Please enter values less than or equal to 128,128!';
        errorCode.setAttribute('color', 'red');
        return makeCanvas(16,16);
    }

    for(let x = 0; x < val1*val2; x++){
        const div = document.createElement('div');
        div.classList.add('boarddiv');
        div.classList.add(`div${x}`);
        container.appendChild(div);
    }
}

function draw(color) {
    const board = document.querySelector('.sketchcontainer');
    const colors = color;

    board.addEventListener('mousedown', (e) => {
        applyColor(e.target,colors);  
    },true);

    const applyColor = (value,color) => {
        if(color === undefined){
            color = 'rgba(0,0,0,0.4)';
        }
        value.style.backgroundColor = `${color}`;
    };
}

function resetBoard() {
    const board = document.querySelectorAll('.boarddiv');
    const errorCode = document.querySelector('.error');
    errorCode.textContent = '';
    if(board){
        board.forEach(node => {
            node.remove();
        });
    }else{
        return;
    }
}
makeCanvas(16,16);