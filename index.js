const wheel = document.querySelector('#wheel')
const button = document.querySelector('#button')
const wheelSvg = wheel.querySelector('.sectors')

const SECTOR_COUNT = 50
const STEP = 360 / SECTOR_COUNT

const sectors = Array(SECTOR_COUNT).fill(0).map((_, idx) => ({
  color: `hsl(${idx * STEP}deg, 100%, 50%)`,
  value: Math.ceil(Math.random()*2000) + '$', 
  startDeg: idx * STEP,
  endDeg: (idx + 1) * STEP
}))

console.log(sectors)

const svgSectors = sectors.map((s, i) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
  path.setAttribute('d', createArc(50, 50, 50, s.startDeg, s.endDeg))
  path.setAttribute('stroke', s.color)
  path.setAttribute('stroke-width', '100')

  const text = document.createElementNS("http://www.w3.org/2000/svg", 'text')
  text.textContent = s.value
  const midAngle = (s.startDeg + s.endDeg) / 2 + 3
  const textX = 50 + Math.cos(midAngle * Math.PI / 180) * 34
  const textY = 50 + Math.sin(midAngle * Math.PI / 180) * 34
  text.setAttribute('x', textX)
  text.setAttribute('y', textY)
  text.style.fontSize = `${60 / sectors.length}px`
  text.style.fontFamily = 'Segoe UI'
  
  text.style.transformOrigin = `${textX}px ${textY}px`
  text.style.transform = `rotate(${midAngle}deg)`

  return [path, text]
})

wheelSvg.prepend(...svgSectors.flat().sort((a, b) => a.nodeName === 'text'))

let degree = 0
let timeout = null
wheelSvg.style.transform = `rotate(${degree}deg)`

function rotate() {
  if(timeout) clearTimeout(timeout)
  degree += Math.floor(Math.random() * (5000 - 1000)) + 1000

  const sector = Math.floor((360 - ((degree + 90) % 360))  / STEP)

  wheelSvg.style.transform = `rotate(${degree}deg)`

  timeout = setTimeout(() => {
    alert(sectors[sector].value)
  }, 10000)
}

button.addEventListener('click', rotate)

wheelSvg.style.transition = `10s cubic-bezier(0.075, 0.82, 0.165, 1)`
