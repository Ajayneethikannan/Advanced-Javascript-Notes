
function a(){
    function b()
    {
        console.log(myVar);
    }

    b();
}
myVar = myVar || 1;//this does not raise an error as first the variables are hoisted in the execution context

var myVar ;
a();



// to prove that event queues are checked only after the execution 
// stack is empty

function wait()

{
    var ms = 3000 + new Date().getTime();
    while(new Date() < ms){}
    console.log('finished function - execution context of the function');
}

function clickHandler()
{
    wait();
    console.log('I was clicked - event queue');
    

}

//document.addEventListener('click', clickHandler);
console.log('finished execution - global execution context');



function greet()
{
    console.log("greet");

}

greet.name = "Greet_function";
console.log(greet); //prints the CODE attribute     

//passing by reference
var x = 3;
var y;
y = x;

var  c = {
    greeting: "hi"
};
var d = c;
c.greeting = "hello there";
console.log(c);
console.log(d);

function a()
{
    console.log(this);
}

a();


var c = {
    name:'Ajay',
    log: function()
    {
        console.log(this);
    }
}

c.log();

var d = {
    name:'Ajay',
    log: function()
    {
        this.name = 'updated d object';
        console.log(this);

        var setName = function(newName)
        {
            this.name = newName;
        }
        setName('updated again! The d object');
        console.log(this);

    }
}
// this does not produce the desired effect, as we expect this to be same inside the nested function.
// Instead to achieve the desired effect(getting the value of this as the same in the first function, in the second )
// we use var self = this;this works through passing by reference

var e = {
    name:'Ajay',
    log: function()
    {
        this.name = 'updated e object';
        console.log(this);
        var self = this;
        console.log(arguments);
        var setName = function(newName)
        {
            self.name = newName;
        }
        setName('updated again! The e object');
        console.log(self);

    }
}

e.log();

function greet(whattosay)
{
 return function(name)
 {
     console.log(whattosay+ " " + name);
     console.log(x);
 }   
}

greet('hi')('Tony');

function buildFunctions()
{
    var arr = [];
    for(var i=0; i<3; i++) //each function has the same reference to the outer environment, so all the functions return the same output.
    {
        arr.push(function()
        {
            console.log(i);
        });

    }
    return  arr;
    
}


var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();


//interesting question,why is the answer so different when let is used??

function buildFunctionsUsingLet()
{
    var arr = [];
    for(let i=0; i<3; i++) //each function has the same reference to the outer environment, so all the functions return the same output.
    {
        arr.push(function()
        {
            console.log(i);
        });

    }
    return  arr;
    
}


var fs1 = buildFunctionsUsingLet();
fs1[0]();
fs1[1]();
fs1[2]();

function buildFunctionsUsingIIFE()
{
    var arr = [];
    for(var i=0; i<3; i++) //each function has the same reference to the outer environment, so all the functions return the same output.
    {
        arr.push((function(j){
            return function()
        {
            console.log(j);
        }
    }(i)));

    }
    return  arr;
    
}

var fs2 = buildFunctionsUsingIIFE();
fs2[0]();
fs2[1]();
fs2[2]();




function makeGreeting(language)
{
    return function(firstname, lastname)
    {
        if(language == 'en'){
            console.log('Hello ' + firstname + ' ' + lastname);
        }
        if(language == 'en'){
            console.log('Hola ' + firstname + ' ' + lastname);
        }
    }
}


function sayHiLater()
{
    var greeting = 'Hi';

    setTimeout(function()
    
    {
        console.log(greeting);
    }, 3000);

}

sayHiLater();


function functionMaker()
{
   
    var arr = [];
    console.log(this);
    for(let number = 0; number < 3; number++)
    {
        var a = function()
    {
        console.log(number);
    }
    arr.push(a);

    }
    return arr;
}

var functions = functionMaker();
functions[0]();
functions[1]();
functions[2]();


function recurse()
{
    console.log(this);
    recurse();
}

function check(func)
{
    var functions = 'hello';//checking the reference to the outer environment for function expressions as arguments. 
    console.log('hello');
    func();
}


check(function(){
    console.log(functions);
})



function tellMeWhenDone(callback)
{
    callback();
}



var arr1 = [1, 2, 3];
console.log(arr1);

function mapForEachArray(arr, fn)
{
    let newArray = [];
    for(let i=0; i<arr.length;i++)
    {
        newArray.push(fn(arr[i]));
    }
    return newArray;
}



var arr2  = mapForEachArray(arr1, function(item)
{
    return item > 2;
});
console.log(arr2);

var checkPastLimit = function(limit, item)
{
    return limit>item;

}

var arr3 = mapForEachArray(arr1, checkPastLimit.bind(this, 1));
// this allows the function to work even with two arguments

var easyCheckPastLimit = function(limit)
{
    return function(limit, item)
    {
        return limit> item;
    }.bind(this, limit);
}
//functional programming using bind function

var easyCheckPastLimit2 = function(limit)
{
    return function(item)
    {
        return limit>item;
    }
}
//functional programming using closure

var arr4 = mapForEachArray(arr1, easyCheckPastLimit(1));
var arr5 = mapForEachArray(arr1, easyCheckPastLimit2(1));
console.log(arr4);
console.log(arr5);


// (function()
// {
//     var insideTheFunction = 'hello';
//     console.log('hello');
// }('hello'))

// console.log(insideTheFunction);




let person = {
    firstname:  'Default',
    lastname: 'Default',
    getFullName: function()
    {
        return this.firstname + ' ' + this.lastname
    }
}


var john = {
    firstname: 'John',
    lastname: 'Doe'
}

john.__proto__ = person;

console.log(john.getFullName());

var Jane = {
    firstname: 'Jane',
}

Jane.__proto__ = person;
console.log(Jane.getFullName());


let rectangle = {
    length:0,
    breadth:0,
    area: function()
    {
        return this.length * this.breadth;
    }
}

let square = {
    length: 4,
    breadth: 4
}

for(var prop in john)
{
    if(john.hasOwnProperty(prop))
    console.log(prop+ ' : '+ john[prop])
}
square.__proto__ = rectangle;
console.log(square.area());

function Person()
{
    var a = "am i the reference to the outer environment?";
    console.log(this);
    this.firstname = 'John';
    console.log(this);
    this.lastname = 'Doe';
    this.getTheReference = function()
    {
        console.log(a);
        console.log('The answer is yes by the way');
    }
}

let John = new Person();
John.getTheReference();
console.log(John);


class Ajau{

    constructor(name, location)
    {
        this.name  = name;
        this.location = location;
    }

    getName()
    {
        console.log(this.name);

    }
    getLocation()
    {
        console.log(this.location);

    }
    render()
    {
        
        console.log(this.name+ ' ' + this.location);
    }

    
}

class Ma extends Ajau{

    constructor(name, location, parents)
    {
        super(name, location);
        this.parents = parents;
    }

    
}

function objmaker()
{
    this.name = 'ajay';
    this.location = 'IITR';
}
objmaker.prototype.getName = function(){
    console.log(this.name);
}
let obj = new objmaker();
for(var prop in obj)
{
    console.log(prop);
}