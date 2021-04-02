//getting all required resources
const startBtn = document.querySelector('.start-btn');
const infoBox = document.querySelector('.info-box');
const exitBtn = document.querySelector('.quit');
const continueBtn = document.querySelector('.continue');
const quizBox = document.querySelector('.quiz-box');
const optionList = document.querySelector('.option-list');
const timerCount = document.querySelector('.time-sec');
const timeLine = document.querySelector('.time-line')
const timeOff = document.querySelector('.time-text');

//if start Quiz btn click
startBtn.addEventListener('click', () => {
    infoBox.classList.add('activeInfo'); 
});  //show the info box

//if exit Quiz btn click
exitBtn.addEventListener('click', () => {
    infoBox.classList.remove('activeInfo');
}); //hide the info box


//if continue Quiz btn click
continueBtn.addEventListener('click', () => {
    infoBox.classList.remove('activeInfo');
    quizBox.classList.add('activeQuiz');
    showQuestions(0);  //show the quiz box
    queCounter(1);
    startTimer(30);
    timerLine(0)
});

//setting questions and option
let queCount = 0; //we initiat the count from 0 wich is 1 item
let queNumb = 1; //we initiat the numb from 1 wich is 2 item
let counter;      //we run js counter for our countdown 
let timeValue = 30;  //we set value for constant
let widthValue = 0;  //countdown line total width;
let userScore = 0;    //total score of user
// let timerLine;

function showQuestions(index) {
    const queText = document.querySelector('.que-text');
    const optionList = document.querySelector('.option-list');
    let queTag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>'+ questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>'+ questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>'+ questions[index].options[3] + '</span></div>';  //the array we created we pass it in all line with numb
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
       option[i].setAttribute("onclick", "optionSelected(this)");
    }
    nextBtn.style.display = 'none'
};

//we bring our correct or incorrect icons
let tickIcon = ' <div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

 //let user answer selection = correct answer
function optionSelected(answer) {
    clearInterval(counter)    //when the user selects the answer then we clear the countdown
     clearInterval(counterLine);
        let userAns = answer.textContent;
        let correctAns = questions[queCount].answer;
        let allOption = optionList.children.length;
    if (userAns == correctAns) {
        userScore++;
        console.log(userScore)
            console.log('anwser is correct');
            answer.classList.add('correct');
            answer.insertAdjacentHTML('beforeend', tickIcon); //we pass in our tickIcon to our correct answer option
        } else {
            console.log('wrong answer')
            answer.classList.add('incorrect');
            answer.insertAdjacentHTML('beforeend', crossIcon); //we pass in our tickIcon to our incorrect answer option

            //if answers is incorrect then automatically selected the correct answer
            for (let i = 0; i < allOption; i++){
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute('class', 'option correct');
                     optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);  //we pass in our tickIcon to our correct answer option so it automatically select it even tho user selects wrong answer
                }
            }
        }

        //once user select can't select again
        for (let i = 0; i < allOption; i++) {
            optionList.children[i].classList.add('disabled')
            
    }
    
    nextBtn.style.display = 'block'
        
}

//if clicked on next button
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', () => {
    if (queCount < questions.length -1) {
        queCount++; //if we click next btn we move to the 2 question by increment
        queNumb++; //if we click next btn we move to the 1 to 2 by increment
        showQuestions(queCount); //the test we created above we let the increment goes in it
        queCounter(queNumb);  //the test number we created below we let the increment goes in it
        clearInterval(counter);  //when the user clicks next we clear the old time
        startTimer(timeValue);   //when the user clicks next we set new time countdown
        clearInterval(counterLine);
        timerLine(widthValue);
        timeOff.textContent = 'Time Left'
    } else {
        console.log('you have completed you text')
        showResultBox();
   }

})

//incresing the number as next button is clicked
function queCounter(index) {
    const queTotal = document.querySelector('.total-que');
    let queTotalTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>'; //we let the index be 1 then go to the total item
    queTotal.innerHTML = queTotalTag;
}

//we initiate time countdown
function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timerCount.textContent;
            timerCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = "0:0:0"

              //change the time left to time off
            timeOff.textContent = 'Time Off';

            //if timer runs down then automatically selects answer
            let correctAns = questions[queCount].answer;
             let allOption = optionList.children.length;
            for (let i = 0; i < allOption; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute('class', 'option correct');
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);  //we pass in our tickIcon to our correct answer option so it automatically select it even tho user selects wrong answer
                }

            }
            nextBtn.style.display = 'block';

            //if timer runs down without user selection
            for( let i = 0; i < allOption; i++) {
                optionList.children[i].classList.add('disabled');
            }

        }
    }
}

//time line countdown
function timerLine(time) {
    counterLine = setInterval(timer, 56);
    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}


//show result after finished playing
const resultBox = document.querySelector('.result-box');
const playAgain = document.querySelector('.play-again');
const dontPlayAgain = document.querySelector('.dont-play-again');

function showResultBox() {
    //    infoBox.classList.remove('activeInfo');  //hide the info box
       quizBox.classList.remove('activeQuiz');  //hide the quizBox
       resultBox.classList.add('activeResult'); //show the result box
    dontPlayAgain.addEventListener('click', () => {
        window.location.reload(); //reload the entire box
    })

    const scoreText = document.querySelector('.score-text');
    if (userScore > 3) {
        let scoreTag = '<span>and congrats! You got <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 2) {
         let scoreTag = '<span>and not bad! You got <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }else{
         let scoreTag = '<span>oh! You failed this test try again <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}

 //if user click try again restart the quiz immediately
 playAgain.addEventListener('click', () => {
     window.location.reload();
    nextBtn.style.display = 'none';
 })

