let control = document.querySelector('.control'); 
let start = document.querySelector('.control span'); 
let stopWatch = document.querySelector('.stopwatch span'); 
let tries = document.querySelector('.tries span'); 
let gameBlock = document.querySelector('.game-block'); 
let memoryContainer = document.querySelector('.memory'); 
let memory = document.querySelectorAll('.memory .game-block');

control.onclick = function(){
let yourName = window.prompt('please, Write Name')
if(yourName === null || yourName === ""){
    document.querySelector(".info .name span").innerHTML = "Sir"
}else{
    document.querySelector(".info .name span").innerHTML = yourName
}
document.querySelector(".control").remove()
}

let blocks = [...memory];
let range = [...Array(memory.length).keys()];
let check;

shuffle(range);

let interval = true;

let message = document.createElement("div");

document.body.appendChild(message);

blocks.forEach((block, index)=>{
    block.style.order = range[index];
    block.addEventListener("click",()=>{
        flipblock(block);
       if(interval){
       let counter = setInterval(()=>{
            stopWatch.innerHTML-=1
            if(stopWatch.innerHTML === "0" || message.innerHTML === "You Win!" || tries.innerHTML === "5"){
                clearInterval(counter)
               if(message.innerHTML !== "You Win!"){
                   message.className = "popup";
                message.innerHTML = "Game over!";
                memoryContainer.classList.add("no-click")
                document.querySelector(".game-over").play()
               }
            }
        },1000);
        interval = false;
       };
    });
});

function shuffle(arr) {
    let current = arr.length,
    temp,
    random;
    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
}
function flipblock(block) {
    block.classList.add('is-flipped');
    let filterblock = blocks.filter(block => block.classList.contains('is-flipped'));
    console.log(filterblock[0], filterblock[1]);
    
    if(filterblock.length === 2) {
        stopClik();
        identical(filterblock[0], filterblock[1]);
    }
}
function stopClik() {
    memoryContainer.classList.add("no-click");
    setTimeout(()=> {
        memoryContainer.classList.remove("no-click");
    },2000)
}
function identical(blockOne, blockTwo) {
    if(blockOne.dataset.technology === blockTwo.dataset.technology) {
        blockOne.classList.remove('is-flipped');
        blockTwo.classList.remove('is-flipped');
        blockOne.classList.add('identical');
        blockTwo.classList.add('identical');
        checkAllIdentical ()
        document.querySelector(".success").play();
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        console.log('no');
        
        setTimeout(()=> {
            blockOne.classList.remove('is-flipped');
            blockTwo.classList.remove('is-flipped');
        },2000);
        document.querySelector(".fail").play()
    }
}
function checkAllIdentical () {
    let all = blocks.every(block => block.classList.contains('identical'));
    if(all) {
        message.className = "popup";
        message.innerHTML = "You Win!";
    }
}










