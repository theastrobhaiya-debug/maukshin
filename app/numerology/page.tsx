"use client";

const html = String.raw`
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<title>Vedic Numerology Software</title>

<style>

.title{
background:#ff8c00;
color:white;
padding:10px;
font-weight:bold;
margin-top:25px;
position:relative;
overflow:hidden;
}

.title::after{
content:"mauksh.com";
position:absolute;
right:10px;
top:50%;
transform:translateY(-50%);
font-size:12px;
color:rgba(255,255,255,0.5);
font-weight:normal;
}

.container{
max-width:100%;
margin:auto;
background:white;
padding:20px;
border-radius:8px;
}

label{
display:block;
margin-top:10px;
font-weight:bold;
}

input{
padding:10px;
margin:5px;
width:100%;
font-size:16px;
box-sizing:border-box;
}

button{
padding:10px 20px;
font-size:16px;
cursor:pointer;
margin-top:10px;
}

.legend{
margin-top:10px;
font-size:14px;
}

.mulank{color:red;font-weight:bold}
.bhagyank{color:green;font-weight:bold}
.mahadasha{color:#ff1493;font-weight:bold}
.antardasha{color:#00aaff;font-weight:bold}
.pratyantar{color:blue;font-weight:bold}

/* ===== ISOLATED GRID (NO SHOPIFY CONFLICT) ===== */

.mgrid{
display:grid;
grid-template-columns:repeat(3, 1fr);
gap:2px;
background:#999;
width:100%;
}

.mgrid > div{
min-width:0;
}

.mcell{
background:white;
height:60px;

display:flex;
align-items:center;
justify-content:center;

font-size:18px;
font-weight:bold;

min-width:0;
overflow:hidden;
}

/* numbers */
.mcell span{
display:inline-block;
white-space:nowrap;
margin:0 2px;
}

.yearBlock{
cursor:pointer;
margin-top:15px;
}

.backButton{
background:#444;
color:white;
padding:10px;
margin-top:20px;
cursor:pointer;
}

</style>

</head>

<body>

<div class="container">

<h2>Vedic Numerology Software</h2>

<label>Date of Birth</label>
<input type="date" id="dob">

<label>From Year</label>
<input type="number" id="fromYear">

<label>To Year</label>
<input type="number" id="toYear">

<button onclick="generate()">Generate Report</button>

<div class="legend">
<span class="mulank">Mulank</span> |
<span class="bhagyank">Bhagyank</span> |
<span class="mahadasha">Mahadasha</span> |
<span class="antardasha">Antardasha</span> |
<span class="pratyantar">Pratyantar</span>
</div>

<div id="report"></div>

</div>

<script>

let yearHTML=""

function reduce(n){
while(n>9){
n=n.toString().split('').reduce((a,b)=>a+Number(b),0)
}
return n
}

function buildGrid(nums){

let count={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0}

nums.forEach(n=>{
if(n>=1 && n<=9) count[n]++
})

let order=[3,1,9,6,7,5,2,8,4]

let html='<div class="mgrid">'

order.forEach(n=>{

let cell=""

let usedMul=false
let usedBhag=false
let usedMaha=false
let usedAnt=false
let usedPraty=false

for(let i=0;i<count[n];i++){

let cls=""

if(n==window.mulank && !usedMul){
cls="mulank"
usedMul=true
}
else if(n==window.bhagyank && !usedBhag){
cls="bhagyank"
usedBhag=true
}
else if(n==window.mahadasha && !usedMaha){
cls="mahadasha"
usedMaha=true
}
else if(n==window.antardasha && !usedAnt){
cls="antardasha"
usedAnt=true
}
else if(n==window.pratyantarNum && !usedPraty){
cls="pratyantar"
usedPraty=true
}

cell+=\`<span class="\${cls}">\${n}</span>\`
}

html+=\`<div class="mcell">\${cell}</div>\`
})

html+='</div>'

return html
}

function calculateMahadasha(year,birthYear){

let seq=[1,2,3,4,5,6,7,8,9]
let index=seq.indexOf(window.mulank)

let age=year-birthYear

let passed=0

for(let i=0;i<50;i++){

let num=seq[(index+i)%9]

if(age>=passed && age<passed+num)
return num

passed+=num

}
}

function calculateAntardasha(day,month,year){

let dayDigits=day.toString().split('').reduce((a,b)=>a+Number(b),0)

let yearDigits=year.toString().slice(2)
.split('')
.reduce((a,b)=>a+Number(b),0)

let birthday=new Date(year,month-1,day)

let weekdayMap=[1,2,9,5,3,6,8]

let weekday=weekdayMap[birthday.getDay()]

return reduce(dayDigits+month+yearDigits+weekday)
}

function generate(){

let dob=document.getElementById("dob").value
let from=parseInt(document.getElementById("fromYear").value)
let to=parseInt(document.getElementById("toYear").value)

let date=new Date(dob)

let day=date.getDate()
let month=date.getMonth()+1
let birthYear=date.getFullYear()

window.mulank=reduce(day)

window.bhagyank=reduce(
day.toString().split('').reduce((a,b)=>a+Number(b),0)
+ month
+ birthYear.toString().split('').reduce((a,b)=>a+Number(b),0)
)

let natalDigits=[]

day.toString().split('').forEach(n=>natalDigits.push(Number(n)))
month.toString().split('').forEach(n=>natalDigits.push(Number(n)))
birthYear.toString().slice(2).split('').forEach(n=>natalDigits.push(Number(n)))

if(day > 9){
natalDigits.push(window.mulank)
}

natalDigits.push(window.bhagyank)

let output=\`<div class="title">Natal Grid</div>\`

let tempAntar=window.antardasha
window.antardasha=null

output+=buildGrid(natalDigits)

window.antardasha=tempAntar

yearHTML=""

for(let y=from;y<=to;y++){

window.mahadasha=calculateMahadasha(y,birthYear)
window.antardasha=calculateAntardasha(day,month,y)

let digits=[...natalDigits]

digits.push(window.mahadasha)
digits.push(window.antardasha)

yearHTML+=\`
<div class="yearBlock" onclick="openYear(\${y})">
<div class="title">\${y} - \${y+1}</div>
\${buildGrid(digits)}
</div>
\`
}

output+=yearHTML

document.getElementById("report").innerHTML=output

}

function openYear(year){

let dob=document.getElementById("dob").value
let date=new Date(dob)

let day=date.getDate()
let month=date.getMonth()+1
let birthYear=date.getFullYear()

window.mahadasha = calculateMahadasha(year, birthYear)

window.antardasha=calculateAntardasha(day,month,year)

let seq=[1,2,3,4,5,6,7,8,9]
let index=seq.indexOf(window.antardasha)

let current=new Date(year,month-1,day)

let output=\`<div class="backButton" onclick="generate()">⬅ Back to Year Grids</div>\`

for(let i=0;i<9;i++){

let num=seq[(index+i)%9]

window.pratyantarNum=num

let digits=[]

day.toString().split('').forEach(n=>digits.push(Number(n)))
month.toString().split('').forEach(n=>digits.push(Number(n)))
birthYear.toString().slice(2).split('').forEach(n=>digits.push(Number(n)))

digits.push(window.mulank)
digits.push(window.bhagyank)
digits.push(window.mahadasha)
digits.push(window.antardasha)
digits.push(num)

let days=num<=4?num*8:(num*8)+1

let start=new Date(current)

current.setDate(current.getDate()+days)

let end=new Date(current)

output+=\`
<div class="title">
\${start.toDateString()} - \${end.toDateString()}
</div>
\${buildGrid(digits)}
\`
}

document.getElementById("report").innerHTML=output

}

</script>

<br><br>

Generate your Vedic Numerology Grid on Mauksh using advanced calculation methods based on your date of birth. This tool helps you understand your number pattern, strengths, missing numbers, and overall life tendencies through a structured numerology grid.

The Vedic numerology grid reveals important insights about personality, behavior, decision-making style, and life direction. By analyzing number placement and combinations, you can identify opportunities for growth and areas that need balance.

Designed for accuracy and ease of use, this software gives clear and practical guidance to help you align your actions with your natural strengths and improve different aspects of your life.

</body>

</html>
`;

export default function NumerologyPage() {
  return (
    <iframe
      srcDoc={html}
      title="Vedic Numerology Software"
      style={{
        width: "100%",
        minHeight: "2000px",
        border: "none",
        display: "block",
      }}
    />
  );
}