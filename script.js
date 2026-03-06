const dot=document.getElementById("cursorDot")
const ring=document.getElementById("cursorRing")

let mx=0
let my=0
let rx=0
let ry=0

document.addEventListener("mousemove",e=>{

mx=e.clientX
my=e.clientY

})

function animate(){

dot.style.left=mx+"px"
dot.style.top=my+"px"

rx+=(mx-rx)*0.18
ry+=(my-ry)*0.18

ring.style.left=rx+"px"
ring.style.top=ry+"px"

requestAnimationFrame(animate)

}

animate()


const progress=document.querySelector(".scroll-progress")

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight

progress.style.width=(scrollTop/height)*100+"%"

})


const terminalLines=[

"$ whoami",
"sparsh_gupta",

"",
"$ role",
"sysadmin @ deshaw",

"",
"$ skills",
"windows linux networking automation",

"",
"$ tickets_resolved",
"2500+",

"",
"$ philosophy",
"automate everything"

]

const terminal=document.getElementById("terminalOutput")

let lineIndex=0
let charIndex=0

function typeTerminal(){

if(lineIndex>=terminalLines.length)return

let line=terminalLines[lineIndex]

if(charIndex<line.length){

terminal.innerHTML+=line.charAt(charIndex)

charIndex++

setTimeout(typeTerminal,25)

}

else{

terminal.innerHTML+="\n"

charIndex=0
lineIndex++

setTimeout(typeTerminal,200)

}

}

typeTerminal()
