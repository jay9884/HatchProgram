//player들이 낸 숫자를 저장할 배열
let arr = [];

//player1
const playerOne = document.querySelector('.playerOne');
const playerOneButton = document.querySelectorAll('.numberOne');

//player2
const playerTwo = document.querySelector('.playerTwo');
const playerTwoButton = document.querySelectorAll('.numberTwo');

//Game field
const gameBody = document.querySelector('.gameBody');
const cardFromPOne = document.querySelector('.cardFromPOne');
const cardFromPTwo = document.querySelector('.cardFromPTwo');

//확정하고 턴 넘기기
const nextTurn = document.querySelector('.nextTurn');

//확정 후 turn 확인 1은 player1차례 -1은 player2차례 0은 결과 확인
let turnCheck = 1;
// 두번 플레이 한 경우 결과 확인
let playtimeCheck = 0;
let leftGame = 10;

//player1 카드 내는 차례
playerOneButton.forEach((v, i) => {
    v.addEventListener('click', () => {
        if (turnCheck === 1) {
            cardFromPOne.classList.remove('hide');
            cardFromPOne.textContent = v.textContent;

            //홀수 짝수에 따른 카드 색깔
            if(i % 2 === 1) {
                cardFromPOne.style.background = 'black';
                cardFromPOne.style.color = 'white';
            } else {
                cardFromPOne.style.background = 'white';
                cardFromPOne.style.color = 'black';
            }
        } else if (turnCheck === - 1) {
            alert('Player2의 차례입니다.');
        }
    });
});

//player2 카드 내는 차례
playerTwoButton.forEach((v, i) => {
    v.addEventListener('click', () => {
        if (turnCheck === -1) {
            cardFromPTwo.classList.remove('hide');
            cardFromPTwo.textContent = v.textContent;

            //홀수 짝수에 따른 카드 색깔
            if(i % 2 === 1) {
                cardFromPTwo.style.background = 'black';
                cardFromPTwo.style.color = 'white';
            } else {
                cardFromPTwo.style.background = 'white';
                cardFromPTwo.style.color = 'black';
            }
        } else if (turnCheck === 1) {
            alert('Player1의 차례입니다.')
        }
    });
});

//확정 후 턴 넘기기 -> 카드번호 저장 및 낸 카드, 카드 낸 player의 패가 가려짐
nextTurn.addEventListener('click', () => {
    turnCheck *= -1;
    if (turnCheck === 1) {
        arr[1] = cardFromPTwo.textContent;
        cardFromPTwo.textContent = '';
        playtimeCheck++;
        console.log(arr);
    } else {
        arr[0] = cardFromPOne.textContent;
        cardFromPOne.textContent = '';
        playtimeCheck++;
        console.log(arr);
    }
    playerTwoButton.forEach((v) => v.classList.toggle('hide'));
    playerOneButton.forEach((v) => v.classList.toggle('hide'));
    
    //두 명의 플레이어가 모두 카드 냈을 때 -> 결과 확인
    if(playtimeCheck === 2) {
        checkResult(arr);
    }
});

//결과 확인 및 게임 진행
function checkResult(arr) {
    const resultPage = document.createElement('div');
    const resultText = document.createElement('strong');
    const resultWinner = document.createElement('strong');
    const continueGame = document.createElement('button');

    resultText.textContent = `player1이 낸 숫자는 ${arr[0]}, player2가 낸 숫자는 ${arr[1]}입니다`;
    let temp = whoIsWinner(arr);
    resultWinner.textContent = `${temp}`;
    continueGame.textContent = '다음 게임 시작';
    continueGame.classList.add('nextTurn');

    //버튼 클릭 시 캔버스 닫기, player 전환
    continueGame.addEventListener('click', () => {
        gameBody.removeChild(resultPage);
        cardFromPOne.classList.add('hide')
        cardFromPTwo.classList.add('hide');
        turnCheck *= -1;
        playtimeCheck = 0;
        playerTwoButton.forEach((v) => v.classList.toggle('hide'));
        playerOneButton.forEach((v) => v.classList.toggle('hide'));
    })

    let gameOver = gameOverCheck();
    console.log(gameOver);
    if(gameOver || leftGame === 0) {
        gameFinish();
    } else {
        resultPage.classList.toggle('resultPage');
        resultPage.append(resultText, resultWinner, continueGame);
        gameBody.append(resultPage);
    }
}

//결과 return하는 함수, 카드 삭제
function whoIsWinner(arr) {
    const scoreOne = document.querySelector('.scoreOne strong');
    const scoreTwo = document.querySelector('.scoreTwo strong');
    let num2 = arr.pop();
    let num1 = arr.pop();
    let sum = parseInt(num1) + parseInt(num2);
    console.log(num1, num2);

    removeCard(num1, num2);

    //결과 return과 score관리
    if (num1 === num2) {
        return '두 수가 같으므로 각 플레이어의 숫자가 지워집니다.';
    } else if (sum > 10) {
        (num1 > num2) ? scoreOne.textContent++ : scoreTwo.textContent++;
        return `합이 10을 초과했으므로 큰 수 인 ${Math.max(num1, num2)}를 제시한 플레이가 이겼습니다.`
    } else if (sum <= 10) {
        (num1 < num2) ? scoreOne.textContent++ : scoreTwo.textContent++;
        return `합이 10 이하이므로 작은 수 인 ${Math.min(num1, num2)}를 제시한 플레이가 이겼습니다.`
    }
}

//카드 삭제
function removeCard(num1, num2) {
    let temp = [];
    playerOneButton.forEach((v, i) => {
        if(v.textContent === num1) {
            temp.push(i)
        }
    });
    playerTwoButton.forEach((v, i) => {
        if(v.textContent === num2) {
            temp.push(i)
        }
    });
    playerOne.removeChild(playerOneButton[temp[0]]);
    playerTwo.removeChild(playerTwoButton[temp[1]]);
}

function gameOverCheck() {
    const scoreOne = document.querySelector('.scoreOne strong');
    const scoreTwo = document.querySelector('.scoreTwo strong');
    const winner = Math.max(scoreOne.textContent, scoreTwo.textContent);
    const loser = Math.min(scoreOne.textContent, scoreTwo.textContent);
    leftGame--;
    const a = loser + leftGame;
    console.log(leftGame, winner, loser);
    return (winner >= a) ? true : false;
}

function gameFinish() {
    const scoreOne = document.querySelector('.scoreOne strong');
    const scoreTwo = document.querySelector('.scoreTwo strong');
    
    const resultPage = document.createElement('div');
    const resultText = document.createElement('strong');
    const resultWinner = document.createElement('strong');

    if(scoreOne.textContent > scoreTwo.textContent) {
        resultText.textContent = 'player1이 최종 승리하셨습니다!';
        resultWinner.textContent = '빰빠바바밤!';
    } else {
        resultText.textContent = 'player1이 최종 승리하셨습니다!';
        resultWinner.textContent = '빰빠바바밤!';
    }
    
    resultPage.classList.toggle('resultPage');
    resultPage.append(resultText, resultWinner);
    gameBody.append(resultPage);
}