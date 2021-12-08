
const socket = io("http://localhost:3000");

socket.on("message", data =>{
    console.log(data);
})

const forPlaying = document.querySelector('.play')
const ia = document.querySelector('.ia');
const player2 = document.querySelector('.player2');
const playButtons = document.querySelector('.choice-buttons');
const choiceLevel = document.querySelector('.choice-level');
let boxes = document.querySelectorAll('.box');
let times = `<i class="fas fa-7x fa-times"></i>`;
let circle = `<i class="far fa-7x fa-circle"></i> `;
let boolean = false;
let hard = false;
let solutions  = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [7,5,3],
]


// FOR PLAYING

forPlaying.addEventListener('click',function () {
    playButtons.style.display = "block";
    forPlaying.style.display = "none";

})



// VERSUS IA

ia.addEventListener('click',function(){

    player2.parentNode.style.display = "none";
    
    choiceLevel.childNodes.forEach(e=>{
        e.parentElement.style.display = "inline"
        e.addEventListener('click',function(){
            e.textContent === "Facile" ? hard = false : hard = true ;
            boxes[0].parentNode.style.display = "grid";
            vsIa()
            choiceLevel.style.display = "none";
        })
    })

    
})





// VERSUS PLAYER 2

player2.addEventListener('click',function(){
   
    ia.parentNode.style.display = "none";
    boxes[0].parentNode.style.display = "grid";

    vsPlayer2()
})





const tableCirlce = [];
const tableTimes = [];
let filter;




function checkingResult(tableplay) {
    
    let tabId = tableplay.map(e=> e.id)
    let success;
    for (let i = 0; i < solutions.length; i++) {      
        success = solutions[i].every(function(val) {
            return tabId.indexOf(val) !== -1;
        });
        if (success){
            solutions[i].forEach(e=>{
                boxes[e-1].style.color = "red"
            })
            return
        }
    }
}

function vsIa (){
    boxes.forEach((element)=>{
        element.addEventListener('click',function(){
            if (Array.from(element.children).length === 0) {
                    element.innerHTML = times
                    tableTimes.push({
                        id : parseFloat(element.dataset.num),
                        times
                    })
                    checkingResult(tableTimes)

                    if (!hard) {     
                        setTimeout(() => {
                                     filter =  Array.from(boxes).filter((e)=> e.children.length == 0)
                                    let item = filter[Math.floor(Math.random()*filter.length)];
                                    item.innerHTML = circle ;
                                    tableCirlce.push({
                                        id : parseFloat(item.dataset.num),
                                        circle
                                    })
    
                        checkingResult(tableCirlce)
                        }, 2000);
                    }else{
                      let valueIndexHard = hardPLay(tableTimes);
                      console.log("valueIndexHard",valueIndexHard);

                      if(valueIndexHard == null){
                        setTimeout(() => {
                            filter =  Array.from(boxes).filter((e)=> e.children.length == 0)
                           let item = filter[Math.floor(Math.random()*filter.length)];
                           item.innerHTML = circle ;
                           tableCirlce.push({
                               id : parseFloat(item.dataset.num),
                               circle
                           })
                
                            checkingResult(tableCirlce)
                            }, 2000);
                    }else{
                        setTimeout(() => {
                            let item = boxes[valueIndexHard - 1]
                            item.innerHTML = circle ;
                            tableCirlce.push({
                                id : valueIndexHard,
                                circle
                            })
                             checkingResult(tableCirlce)
                        }, 2000);
                    }

                    }cd 
                
            } 

        })
    })


    
}

function vsPlayer2 (){
    
    boxes.forEach((element)=>{
        element.addEventListener('click',function(){
            if (Array.from(element.children).length === 0) {
                if (boolean) {
                    element.innerHTML = times
                    boolean = false;
                    tableTimes.push({
                        id : parseFloat(element.dataset.num),
                        times
                    })
                    checkingResult(tableTimes)
                }else{
                    element.innerHTML = circle
                    boolean = true;
                    tableCirlce.push({
                        id : parseFloat(element.dataset.num),
                        circle
                    })
                    checkingResult(tableCirlce)
                }
            } 

        })
    })

}

function hardPLay(tableplay) {
    var valuePlayIa;
let newArray = Array.from({length: solutions.length}, (v,i)=>[]);

    let tabId = tableplay.map(e=> e.id)

    for (let i = 0; i < solutions.length; i++) {      
        solutions[i].every(function(val) {
            newArray[i].push(val)

            return tabId.indexOf(val) !== -1;
        });

    }

  let tabFiltered =  newArray.filter((tab)=>{
        return tab.length > 2
    })

    if (tabFiltered.length > 0) {
        console.log(tabFiltered[tabFiltered.length - 1][tabFiltered[tabFiltered.length - 1].length -1])
        valuePlayIa = tabFiltered[tabFiltered.length - 1][tabFiltered[tabFiltered.length - 1].length -1];
    }else{
        valuePlayIa = null
    }

    return valuePlayIa;


}