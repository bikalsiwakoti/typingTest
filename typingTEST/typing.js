const typePara = document.querySelector('.para p')
const button = document.querySelector('.btn button')
const inputBox = document.querySelector('#inputBox')
const mistakeTag = document.querySelector('.mistake span')
const time = document.querySelector('.time span')
const wpm = document.querySelector('.wpm span')


let timer,
minTime = 0;
maxTime = 60;
timeleft = maxTime;

isTyping=0

characterList = 0;
mistake = 0;
function randomNumber(){
    let randomNumber = Math.floor((Math.random())*paraArray.length);
    paraArray[randomNumber].split("").forEach(element => {
        let spanTag= `<span>${element}</span>`
        typePara.innerHTML += spanTag;
    });

    typePara.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown', () =>{
        inputBox.focus()
    })
    typePara.addEventListener('click', () =>{
        inputBox.focus()
    })
}
 const inputTyping = () => {
     const data = typePara.querySelectorAll('span')
     const dataInput = inputBox.value.split("")[characterList]
     if(characterList < data.length - 1 && timeleft > 0){

         if(!isTyping){
             timer = setInterval(timeFunc, 1000);
             isTyping = true;
         }
         if (dataInput == null){
            characterList--;
             if(data[characterList].classList.contains('incorrect')){
                mistake--;
             }
           
            data[characterList].classList.remove('correct', 'incorrect')
    
         }else {
            if(data[characterList].innerText === dataInput){
                data[characterList].classList.add('correct')
             }else {
                mistake++;
                data[characterList].classList.add('incorrect')
             }
             characterList++;
         }
         data.forEach(span => span.classList.remove('active'))
         data[characterList].classList.add('active')
         let wpmText = Math.round((((characterList-mistake)/5)/(maxTime - timeleft))*60)
         if(wpmText < 0 || wpmText == Infinity || !wpmText){
            wpm.innerText = 0;
         }else{
            wpm.innerText = wpmText;
         }
         mistakeTag.innerText = mistake;
     }else {
        clearInterval(timer)
     }

 }

function timeFunc(){
    if(timeleft > 0){
        timeleft--;
        time.innerText = timeleft;

    }else {
        inputBox.value = "";
        clearInterval(timer)

    }
}
function reloadPage(){
    location.reload();
}

randomNumber()
inputBox.addEventListener('input', inputTyping)
button.addEventListener('click', reloadPage)