const display = document.querySelector(".screen");
const keys = document.querySelector(".keys");

let displayValue = "0"; // ekran başlangıç değeri
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay(); 

function updateDisplay(){ // ekran değeri güncelleme fonksiyonu
    display.value = displayValue;
}


keys.addEventListener('click',function(e){
    var element = e.target;

    if(!element.matches("button")) return; // button değilse return et ve fonksiyonu sonlandır

    if(element.classList.contains('operator')){ // tıklanan elementin css class'ı "operator" içeriyorsa
        console.log(element.value)
        handleOperator(element.value);
        updateDisplay();
        return;
    }  
    if(element.classList.contains('decimal')){ // decimal class'ı olan elemente tıklandıysa 
        inputDecimal(); // ekrana ',' ekleme fonsiyonunu çağır.
        updateDisplay(); // ekranda bulunan değeri al
        return;
    } 
    if(element.classList.contains('clear')) {
        clearAll(); // displayValue'yu "0" yapar
        updateDisplay(); // gösterilen değeri update eder.
        
        return;
    }
        
    if(element.classList.contains('abs')){
        Abs();
        updateDisplay();
        return;
    } 

    if(element.classList.contains('delete')){
        deleteLast(); // son karakteri siler
        updateDisplay(); // gösterilen değeri update eder.
        return;
    } 

    inputNumber(element.value); /* tıklanan elementin value'sunu parametre olarak gönder. 
                                Diğer şartları kontrol ettiğim için artık sadece number olma ihtimali kalmıştır. */
    updateDisplay();            // gösterilen değeri update eder.

});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue); // ekranda virgüllü numara olabilir.
    
   
    
    if(firstValue == null){ // eğer daha önce atanmış bir first value yoksa
        firstValue = value; // ekrandakini first value yap
    }else if (operator){
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstValue = result;
    }
    

    waitingForSecondValue = true; // yeni değer bekliyorum
    operator = nextOperator;
    console.log(displayValue, firstValue, operator, waitingForSecondValue);


}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }else if(operator === '-'){
        return first - second;
    }else if(operator === "*"){
        return first * second;
    }else if(operator === "/"){
        return first / second;
    }
     return second; 
}

function inputNumber(num){
     if(waitingForSecondValue){ // true ise
        displayValue = num; // yeni girilen sayıyı displayValue'ya ata
        waitingForSecondValue = false; // yeni değer beklemiyorum
     }else{
        //displayValue = num; // gelen parametreyi ata
        displayValue = displayValue === "0" ? num : displayValue + num;

     }
     console.log(displayValue, firstValue, operator, waitingForSecondValue);
     
}

function inputDecimal(){
    if(!displayValue.includes(',')) // ekranda ',' yoksa (varsa ikinci bir ',' eklemez)
    displayValue += ","; // ekrandaki değere ',' ekle
}

function clearAll(){
    displayValue = "0";
}

function deleteLast(){
    if(displayValue.length > 1){ // ekranda tek sayı kalınca da silmesin diye
        displayValue = displayValue.slice(0,-1);
    }
    
}

function Abs(){
    displayValue = displayValue * (-1);
}
