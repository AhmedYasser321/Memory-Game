
let control = document.querySelector(".control span")

let gameBlock = document.querySelector(".game-block")

control.onclick = function(){
let yourName = window.prompt('please, Write Name')
if(yourName === null || yourName === ""){
    document.querySelector(".info .name span").innerHTML = "Unknown"
}else{
    document.querySelector(".info .name span").innerHTML = yourName
}
document.querySelector(".control").remove()
}

let memory = document.querySelector(".memory")

let blocks = Array.from(memory.children)
let blocksKeys = [...blocks.keys()]

shuffle(blocksKeys);

blocks.forEach((block,index)=>{
    block.style.order = blocksKeys[index]
    block.addEventListener("click", ()=>{
        flip(block) 
    })
})

let duration = 1000;
function flip(selected){
    selected.classList.add("is-flipped")
   let allflip = blocks.filter((block)=>block.classList.contains("is-flipped"))
   if(allflip.length === 2){
    memory.classList.add("no-click")
    setTimeout(()=>{
        memory.classList.remove("no-click")
    },duration)
    checkblocks(allflip[0],allflip[1]);
   }
  
}

let tries = document.querySelector(".tries span");

function checkblocks(first,second){
if(first.dataset.technology === second.dataset.technology){
   first.classList.remove("is-flipped");
   second.classList.remove("is-flipped");
   first.classList.add("identical");
   second.classList.add("identical");
   checkAllIdentical();
   document.querySelector(".success").play()
}else{
   tries.innerHTML = parseInt(tries.innerHTML) + 1;
  
   setTimeout(()=>{
    first.classList.remove("is-flipped");
   second.classList.remove("is-flipped");
},duration)
document.querySelector(".fail").play()
}
}

function shuffle(arr){
let current = arr.length
while(current > 0){
    let random = Math.floor(Math.random() * current);
    current--
    let value = arr[current];
    arr[current] = arr[random];
    arr[random] = value;
}
return arr
}



let message = document.createElement("div");

document.body.appendChild(message);

function checkAllIdentical() {
    const allHaveClass = blocks.every(element => element.classList.contains('identical'));
    if (allHaveClass) {
        message.innerHTML = "You Win!";
        message.className = "popup";
    }
}


let stop = document.querySelector(".info .stopwatch span");
let interval = true;

blocks.forEach((block)=>{
    block.addEventListener("click",()=>{
       if(interval === true){
       let counter = setInterval(()=>{
            stop.innerHTML-=1
            if(stop.innerHTML === "0" || message.innerHTML === "You Win!" || tries.innerHTML === "5"){
                clearInterval(counter)
               if(message.innerHTML !== "You Win!"){
                message.innerHTML = "Game over!";
                message.className = "popup";
                memory.classList.add("no-click")
                document.querySelector(".game-over").play()
               }
            }
        },1000);
        interval = false;
       };
    });
});









