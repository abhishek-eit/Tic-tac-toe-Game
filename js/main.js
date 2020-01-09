let boxes = document.querySelectorAll('.box');
let wrapper = document.querySelector(".wrapper");
let popup = document.querySelector('.popup');
let status = document.querySelector('.status');
let i=1;
let arrayX = [];
let arrayO = [];
let winArray = [123,147,159,258,357,369,456,789]
let player1;
let player2;

let btn = document.querySelector(".btn");
btn.addEventListener('click', func);

function func(){
    wrapper.style.cursor = 'pointer';
    btn.style.display = 'none';
    popupDiv();
    startGame();
}

function popupDiv() {
    popup.style.display = 'block';
    popup.style.transform = 'rotate(0deg) scale(1.1) translate(-240%,130%)';
}

function getNames() {
    if (document.querySelector('.player1').value == "" || document.querySelector('.player2').value == ""){
        document.querySelector('.error').innerHTML  = '<span style="color:red"> (Please enter your names !!!) </span>';
    }
    else{
        player1 = document.querySelector('.player1').value;
        player2 = document.querySelector('.player2').value;

        popup.style.display = 'none';
        popup.style.transform = 'rotate(-180deg) scale(0) translate(240%,-130%)';
        status.style.visibility = 'visible';
        status.innerHTML = player1.toUpperCase() + "'s <br>Turn"
    }
}

function startGame() {

    wrapper.addEventListener('click', myFunction);

}

function myFunction(e) {
    box = e.target;
    if(box.className === ""){
        return;
    }else{

        box.className += " clicked";
        if(i%2==0){
            box.innerHTML = " <img src='images/x.png'> " ;
            arrayX.push(box.id);
            status.innerHTML = player1.toUpperCase() + "'s <br>Turn";
            if(i>=5) {check(arrayX);}
        } else{
            box.innerHTML = " <img src='images/o.png'> " ;
            arrayO.push(box.id);
            status.innerHTML = player2.toUpperCase() + "'s <br>Turn";
            if(i>=5) {check(arrayO);}
        }
        i++;
        
    }

}

function check(array1) {
    
    array1 = sort(array1);

    let number;
    for(x=0;x<array1.length-2;x++)
    {
        for(y=x+1;y<array1.length-1;y++)
        {
            for(z=y+1;z<array1.length;z++)
            {
                number = (array1[x]*100) + (array1[y]*10) + (array1[z]*1) ;
                if(winArray.includes(number))
                {
                    displayResults(number);
                    playAgain();   
                }
            }
        }
    }
    
}

function sort(array2) {

    for(a=0; a < array2.length-1; a++)
    {
        for(b=a+1; b < array2.length; b++)
        {
            if(array2[b]<array2[a])
            {
                let temp = array2[a];
                array2[a]=array2[b];
                array2[b]=temp;
            }
        }
    }
    return array2;
}









function displayResults(num) {
    status.style.color = 'yellow';
    if(i%2 == 0){
        status.innerHTML = player2.toUpperCase() + " <br>WON";
    }
    else{
        status.innerHTML = player1.toUpperCase() + " <br>WON";
    }
    
    let highlightArray = [];
    highlightArray.push(Math.floor(num/100));
    num = num%100;
    highlightArray.push(Math.floor(num/10));
    num = num%10;
    highlightArray.push(num);


    highlightArray.forEach(function(boxNum){
        boxes.forEach(function(box){
            wrapper.removeEventListener('click',myFunction);
            wrapper.style.cursor = 'default';
            if(box.id == boxNum)
            {
                box.className += " highlight";
            }
        });
    });
}

function playAgain() {
    btn.innerHTML = 'PLAY AGAIN';
    btn.style.display = 'block';
    btn.removeEventListener('click', func);
    btn.addEventListener('click', restart);
}

function restart() {
    status.style.color = 'white';
    status.style.visibility = 'hidden';
    wrapper.style.cursor = 'pointer';
    btn.style.display = 'none';
    popup.style.display = 'block';
    popup.style.transform = 'rotate(0deg) scale(1.1) translate(-240%,130%)';
    boxes.forEach(function(box){
        box.className = "box";
        box.innerHTML = "";
    });
    arrayX= [];
    arrayO= [];
    i=1;
    highlightArray= [];
    wrapper.addEventListener('click', myFunction);
    
}



