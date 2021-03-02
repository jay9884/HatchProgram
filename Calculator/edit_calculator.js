//1. 숫자와 연산자를 담을 배열 만들기
// 숫자와 연산자를 동시에 담을, 즉 연산할 때 쓸 배열
const temp_arr = [];
// 연산자 입력 전 숫자를 임시적으로 담을 배열
const temp_num = [];
// 입력된 값을 출력하기 위한 배열 temp_arr와 한 몸이지만 %만 다르게 표시
const temp_display = [];

//  result(연산 결과 출력 창), display(input 출력 창), input(모든 버튼 -> temp_display), 
//  num_input(0~9 버튼 -> temp_num), calculations(사칙연산 버튼 -> temp_arr)
const result = document.querySelectorAll('.result');
const display = document.querySelectorAll('.display');
const input = document.querySelectorAll('.input');
const num_input = document.querySelectorAll('.num_input');
const calculations = document.querySelectorAll('.calculations');


num_input.forEach(v => {
    v.addEventListener('click', function() {
        //9-1. = 버튼 클릭 후 새로운 숫자 입력했을 경우 allclear() -> result
        if(result[0].textContent.length !== 0) {
            allClear();
            result[0].textContent = '';
        }

        //7-2. % 다음 숫자를 눌렀을 때 자동으로 x 연산자 넣기
        if(temp_display[temp_display.length - 1] === '%'){
            temp_arr.push('x');
            temp_display.push('x');
            temp_num.push(this.textContent);
        } else {

            //1-1. (연산자 입력 전)0~9까지 숫자는 바로 temp_num에 저장
            //      ex) temp_num = [9, 8, 7]
            temp_num.push(this.textContent);

            //2. 0을 누르고 숫자를 누르면 0이 사라져야 한다
            //      ex) 입력 : 011  출력 : 11
            if(temp_num[0] === "0" && temp_num.length > 1) {
                temp_num.shift();
            }
        }
        console.log("temp_num : " + temp_num);
    })
})

calculations.forEach(v => {
    v.addEventListener('click', function() {
        //9-2. = 버튼 클릭 후 새로운 연산을 입력했을 경우 result + operator
        if(result[0].textContent.length !== 0) {
            allClear();
            for(let i = 0; i < result[0].textContent.length; i++) {
                temp_num.push(result[0].textContent[i]);
            }
            result[0].textContent = '';
            console.log(temp_num);
        }

        //3. 입력된 값이 없을 때, 연산자를 입력할 경우, 입력과 출력 x
        if(temp_num.length === 0 && temp_display.length === 0) {
            return 0;
        } else {
            //4. 연산자가 연속 입력 시 업데이트
            if(temp_num.length === 0 && isNaN(temp_arr[temp_arr.length - 1]) && temp_display[temp_display.length - 1] !== '%') {
                temp_arr.pop();
                temp_display.pop();
                temp_arr.push(this.textContent);
                temp_display.push(this.textContent);

            //1-2. 연산자 입력 시 temp_num -> temp_arr
            } else {
                if(temp_num.length !== 0) {
                    temp_arr.push(temp_num.join(''));
                    temp_display.push(temp_num.join(''));
                    temp_num.length = 0;
                }
                temp_arr.push(this.textContent);
                temp_display.push(this.textContent);
            }
        }
    })
})

//5. All Clear 모든 배열 초기화
function allClear() {
    temp_arr.length = 0;
    temp_display.length = 0;
    temp_num.length = 0;
    result[0].textContent = null;
}

//6. clear 백스페이스
function backspace() {
    //6-1.연산자 입력 전 숫자를 지울 때
    if(temp_num.length > 0) {
        temp_num.pop();
    //연산자 입력 후 지울 때
    } else {
        //6-2. %가 있을 경우 %와 x, 0.01 동시에 지움
        if(temp_display[temp_display.length - 1] === '%') {
            temp_arr.pop();
            temp_arr.pop();
            temp_display.pop();
        }

            //6-3. 연산자 지울 때
            if(isNaN(temp_arr[temp_arr.length - 1])) {
                temp_arr.pop();
                temp_display.pop();
            //6-4. 연산자 지운 후 숫자 지울 때
            } else {
                let temp = temp_arr[temp_arr.length - 1];
                temp_arr.pop();
                temp_display.pop();
                for(let i = 0; i < temp.length; i++) {
                    temp_num.push(temp[i]);
            }

        }
    }
}

//7. % 퍼센트
function percent() {
    //7-1. % 퍼센트 또는 연산자 바로 다음 %를 눌렀을 때
    if((temp_num.length === 0 && isNaN(temp_arr[temp_arr.length - 1]))
        || temp_display[temp_display.length - 1] === '%') {
        alert('완성되지 않은 수식입니다');
    } else {
        //%를 눌렀을 때 입력한 숫자에 0.01을 곱하고 temp_arr에 담고 출력
        if(temp_num.length !== 0) {
            temp_arr.push(temp_num.join(''));
            temp_display.push(temp_num.join(''));
            temp_num.length = 0;
        }
        temp_arr.push('x');
        temp_arr.push('0.01');
        temp_display.push('%');
        console.log("% temp_arr : " + temp_arr);
        console.log("% temp_display : " + temp_display);
    }
}

//1-3. 입력 출력 창
input.forEach(v => {
    v.addEventListener('click', function(){
        if(temp_display.length === 0){
            display[0].textContent = temp_num.join('');
        } else {
            display[0].textContent = temp_display.join('') + temp_num.join('');
        }
    })
})

//8. = 버튼
function equals() {
    //8-1. 입력하지 않았거나 숫자만 입력했을 경우 return 0
    if(temp_arr.length === 0){
        return 0;
    } else {
        //8-2. 연산자를 마지막으로 입력했을 경우 alert
        if(isNaN(temp_arr[temp_arr.length - 1]) && temp_num.length === 0) {
            alert('완성되지 않은 수식입니다');
        } else {
            //8-3. 연산이 들어 있고 숫자로 끝날 경우 정상 출력
            if(temp_num.length !== 0) {
                temp_arr.push(temp_num.join(''));
                temp_display.push(temp_num.join(''));
                temp_num.length = 0;
            }

            let expression = temp_arr;
            console.log("expression : " + expression);
            //8-4. 중위표기법 -> 후위표기법 함수, 연산
            //8-5. 연산
            let answer = calculate(postfix(expression));
            result[0].textContent = answer;
            //모든 배열 초기화
            stack.length = 0;
            expression.length = 0;
            temp_arr.length = 0;
            postfix_expression.length = 0;
        }
    }
}

let stack = [];
let postfix_expression = [];

//8-4. 중위표기법 -> 후위표기법 함수
function postfix(expression) {
    function operator(value) {
        switch(value) {
            case '+' :
            case '-' :
                return 1;
            case 'x' :
            case '÷' :
                return 2;
        }
        return 3;
    }

    for(let i = 0; i < expression.length; i++) {
        let value = expression[i];
        switch(value) {
            case '+' :
            case '-' :
            case 'x' :
            case '÷' :
                while(stack.length !== 0 && operator(value) <= operator(stack[stack.length - 1])) {
                    postfix_expression.push(stack.pop());
                    break;
                }
                stack.push(value);
                console.log("stack " + stack);
                break;
            
            default :
                postfix_expression.push(value);
                console.log("expression " + postfix_expression);
                break;
        }
    }
    while(stack.length !== 0) {
        postfix_expression.push(stack.pop());
    }

    expression.length = 0;
    console.log("fin_expression : " + postfix_expression);

    return postfix_expression;
}

//8-5. 연산 함수
function calculate(postfix_expression) {
    for(let i in postfix_expression) {
        // 숫자인 경우 스택에 푸쉬해준다.
        if(!isNaN(postfix_expression[i])) {
            stack.push(postfix_expression[i]);
        }
        // 숫자가 아닌(연산자인) 경우 스택에서 두 값을 pop한다.
        // 그리고 계산 결과를 다시 stack에 push한다.
        else {
            const num2 = parseFloat(stack.pop());
            const num1 = parseFloat(stack.pop());
            switch(postfix_expression[i]) {
                case '+':
                    stack.push(num1 + num2);
                    break;
                case '-':
                    stack.push(num1 - num2);
                    break;
                case 'x':
                    stack.push(num1 * num2);
                    break;
                case '÷':
                    stack.push(num1 / num2);
                    break;
            }
        }
    }
    let answer = stack;
    //수정

    //소수일 때 소수점 2자리 수까지 반올림 하여 표현
    if(/^(\-|\+)?([0-9]+)$/.test(answer ) && parseInt(answer ) > 0){
        return answer.join('');
    } else {
        return parseFloat(answer).toFixed(2);
    }
    
}