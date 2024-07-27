const ch = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','~','!','@','#','$','%','^','&','*','_','+','=','`','|','(',')','{','}','[',']',':',';','"',"'",'<','>',',','.','?','/','\\'];
let min = 0;
let max = 0;  
let s = "";
let arr = [];
let n = 0;
let sorted = false;
let twoDime = false;
let col = 0;
let isChar = false;
let allCap = false;
let allSmall = false;
let isString = false;
let special = false;
let remDuplicates = false;

function setSize(){
    arr = [];
    let c  = Number(document.getElementById('size').value);
    if(c<0)
        alert('Size >=0');
    n= c;
    if(n>=100000000){
        alert('Higher the Size, Longer the Wait.')
    }
}

function setMin(){
    var x = Number(document.getElementById('min').value);
    min = x;
    setMax();
}

function setMax(){
    max = Number(document.getElementById('max').value);
    if(max<min){
        max = min;
        alert("max >= min")
    }
}

function setString(){
    isString = !isString;
    var ele = document.getElementById('string');
    if(isString){
        ele.style.backgroundColor = '#eb8383';
        isChar = false;
        document.getElementById('duplicates').style.backgroundColor = 'transparent';
        document.getElementById('char').style.backgroundColor = 'transparent'; 
    }
    else
    ele.style.backgroundColor = 'transparent';
    if(col<=0 && isString){
        alert("Enter size of String in col Box : ")
    }
}

function charSetter(){
    isChar = !isChar;
    var ele = document.getElementById('char');
    if(isChar){
        ele.style.backgroundColor = '#eb8383';
        isString = false;
        document.getElementById('string').style.backgroundColor = 'transparent';
        document.getElementById('duplicates').style.backgroundColor = 'transparent';
    }
    else
    ele.style.backgroundColor = 'transparent';
}

function setCap(){
    allCap = !allCap;
    var ele = document.getElementById('allCap');
    if(allCap)
        ele.style.backgroundColor = '#eb8383';
    else
    ele.style.backgroundColor = 'transparent';
}
function setSmall(){
    allSmall = !allSmall;
    var ele = document.getElementById('allSmall');
    if(allSmall)
        ele.style.backgroundColor = '#eb8383';
    else
    ele.style.backgroundColor = 'transparent';
}

function setSpecial(){
    special = !special;
    var ele  = document.getElementById('special');
    if(special)
        ele.style.backgroundColor = '#eb8383';
    else
    ele.style.backgroundColor = 'transparent';
}

function set2DimeArray(){
    twoDime = !twoDime;
    var ele = document.getElementById('twoDbutton');
    if(twoDime)
        ele.style.backgroundColor = '#eb8383';
    else
    ele.style.backgroundColor = 'transparent';

    if( twoDime && col<=0){
        alert("Enter column's in col Box")
    }

    TwoDimensionalArray();
}

function sorttedArray(){
    sorted = !sorted;
    var ele = document.getElementById('sorted');
    if(sorted)
        ele.style.backgroundColor = '#eb8383';
    else
    ele.style.backgroundColor = 'transparent';
    
}

function dupliatesSetter(){
    if(isChar || isString){
        document.getElementById('duplicates').style = 'transparent';
        return;
    }
    if(!isChar && !isString)
    remDuplicates = !remDuplicates;

    var ele = document.getElementById('duplicates');
    if(remDuplicates){
        ele.style.backgroundColor = '#eb8383';
    }
    else{
        ele.style.backgroundColor = 'transparent';
    }
}

function TwoDimensionalArray(){
    col = Number(document.getElementById('twoDim').value);
    if(col<=0 && twoDime)
        alert('Col > 0 ');
    if(twoDime && isString){
        alert("Use 1-D as 2-D array for String's ");
    }
}

let textarea = document.getElementById('OutPut');
function generator(){
    arr = [];
    s="";
    textarea.value="";
    if(n<0){
        alert('n>=0');
        return;
    }
    if(twoDime && col<=0){
        alert('col>0');
        return;
    }

    if(remDuplicates && size < (max-min)){
        alert(" size >= (max-min) ")
        return;
    }
    
    else if(isString && col>=0){
        twoDCharArrayGenerator();
    }
    else if(isChar && twoDime && col>0){
        twoDCharArrayGenerator();
    }
    else if(!twoDime && !isChar){
    RandomArrayGenerator();
    }
    else if(twoDime && col>0){
    twoDimensionalArrayGenerator();
    }
    else if(isChar && !twoDime){
        charGenerator();
    }

}

//---------------------------------------------------------------
//1-d generator
function RandomArrayGenerator(){
    if(remDuplicates){
        let set = new Set();
        n = Math.min(Number(document.getElementById('size').value),max-min+1);
        while(set.size != n){
            set.add(Math.floor((Math.random() * (1+max-min) ) + min));
        }
        let i = 0;
        for(const value of set){
            arr[i++] = value;
        }    
        
    }

    else if(!remDuplicates){
        arr = [];
        n = Number(document.getElementById('size').value);
        for(let i=0;i<n;i++){
                arr[i] = Math.floor((Math.random() * (1+max-min) ) + min);
        }
    }
    
    if(sorted)
    arr.sort((a,b)=>a-b);

    textarea.value = "["+arr+"]"; 
}
//------------------------------------------------------------------

//2d generator
function twoDimensionalArrayGenerator(){

    if(remDuplicates){
        let set = new Set();
        let r = Math.min(Number(document.getElementById('size').value)*col, max - min + 1);
        let arr = new Array(n);
    
        while(set.size != r){
            set.add(Math.floor((Math.random() * (1 + max - min)) + min));
        }
    
        let setIterator = set.values();
        for(let i = 0; i < n; i++){
            arr[i] = []; 
            for(let j = 0; j < col; j++){
                let o = setIterator.next();
                if(!o.done)
                arr[i][j] = o.value;
                else
                arr[i][j] = '-';
            }
        }
        appender2(arr);
        return;
    }
        
    else if(!remDuplicates){
        for(let i=0;i<n;i++){
            arr[i] = [];
            for(let j=0;j<col;j++){
                arr[i][j] = Math.floor((Math.random() * (1+max-min) ) + min);
            }
        }
        appender2(arr);
    return;
    }
}

//2d appender
function appender2(arr){
    s+='[';
    if(!sorted){
    for (let i = 0; i < n; i++) {
        s += '[' + arr[i].join(',') + ']';
        if (i < arr.length - 1) {
            s += ',';
        }
    }
    }
    else{
        for (let i = 0; i < n; i++) {
            s += '[' + arr[i].sort((a,b)=>a-b).join(',') + ']';
            if (i < arr.length - 1) {
                s += ',';
            }
        }
    }

    s+=']';
    textarea.value = s; 
}
//---------------------------------------------------------------

//---------------------------------------------------------------
//char Generator
function charGenerator(){

    if(allCap && special && !allSmall){
        min = 26;
        max = 82;
    }
    else if(allCap && allSmall && !special){
    min = 0;
    max = 51;
    }
    else if(allSmall && allCap && special){
        min = 0;
        max = 82;
    }
    else if(allSmall){
        min = 0;
        max = 25;
    }
    else if(allCap){
        min = 26;
        max = 51;
    }
    else if(special){
        min = 52;
        max = 82;
    }
    else{
        min = 0;
        max = 82;
    }
    
    for(let i=0;i<n;i++){
        arr[i] = ch[Math.floor((Math.random() * (1+max-min) ) + min)];
    }

        if(sorted)
        arr.sort();  

        max = Number(document.getElementById('max').value);
        min = Number(document.getElementById('min').value);
        
        if(isChar){
            s="";
            s+="['";
            s+=arr.join("','");
            s+="']";
            textarea.value = s; 
        }
}
//------------------------------------------------------------------

//------------------------------------------------------------------
function twoDCharArrayGenerator(){

    
    if(allCap && special && !allSmall){
        min = 26;
        max = 82;
    }
    else if(allCap && allSmall && !special){
    min = 0;
    max = 51;
    }
    else if(allSmall && allCap && special){
        min = 0;
        max = 82;
    }
    else if(allSmall){
        min = 0;
        max = 25;
    }
    else if(allCap){
        min = 26;
        max = 51;
    }
    else if(special){
        min = 52;
        max = 82;
    }
    else{
        min = 0;
        max = 82;
    }

    for(let i=0;i<n;i++){
        arr[i] = [] ;
        for(let j=0;j<col;j++){
            arr[i][j] = ch[ Math.floor((Math.random()*(1+max-min) ) + min) ];
        }
    }

    if(!sorted){
        if(isChar)
        for (let i = 0; i < n; i++) {
            s += "['" + arr[i].join("','") + "']";
            if (i < arr.length - 1) {
                s += ',';
            }
        }
        else if(isString){
            s+='['
            for (let i = 0; i < n; i++) {
                s += '"' + arr[i].join('') + '"'; 
                if (i < arr.length - 1) {
                    s += ',';
                }
            }
        }
    }
    else{
        if(isChar)
        for (let i = 0; i < n; i++) {
            s += '["' + arr[i].sort().join("','") + '"]';
            if (i < arr.length - 1) {
                s += ',';
            }
        }
        else if(isString){
            s+='['
            for (let i = 0; i < n; i++) {
                s += '"' + arr[i].sort().join('') + '"'; 
                if (i < arr.length - 1) {
                    s += ',';
                }
            }
        }
    
    }
    max = Number(document.getElementById('max').value);
    min = Number(document.getElementById('min').value);

    s+=']';
    textarea.value = s; 
}

//-----------------------------------------------------------------

//write copy code
function copyText(){
    var ele = document.getElementById('OutPut');
    navigator.clipboard.writeText(ele.value);
}
