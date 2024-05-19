const display = document.getElementById("display");
const list = document.getElementById('history_list');
const localStorageKey = 'history'
let calc;
let result;

function appendD(input){
    if(display.value=="Error"||display.value=="0"){
        display.value = "";
    }
    display.value += input;
}

function clearD(){
    display.value="0";
}

function addToHistory(input){
    let val = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    val.push({
        name: input
    });
    localStorage.setItem(localStorageKey,JSON.stringify(val));
}

function showHistory(){
    let val = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    list.innerHTML = ' ';
    for(let i=0;i<val.length; i++){
        list.innerHTML += `<li>${val[i]['name']}</li>`;
    }
}

function clearL(){
    localStorage.clear();
    showHistory();
}

function calculateD(){
    if(display.value.includes("+") || display.value.includes("-") || display.value.includes("*") || display.value.includes("/")){
        try{
            calc=display.value;
            display.value=eval(display.value);
            result=`${calc} = ${display.value}`;

            addToHistory(result);
            showHistory();
        }
        catch(error){
            display.value = "Error";
        }
    }
    
}

window.onload=showHistory();