
const cardsWrapper = document.querySelector('.cards')
const optionWrapper = document.querySelector('select')
const input = document.querySelector('input')
const select = document.querySelector('select')
const newData = await getData()
const spec = searchSpecies(newData)

 async function getData () { 
  let request = await fetch('https://rickandmortyapi.com/api/character')
  let data = await request.json()
  return data.results
}  


function creatCards(elem) {
 
  const card = document.createElement('div')
  const photo = document.createElement('img')
  const heroName = document.createElement('p')
  const heroInfo1 = document.createElement('p')
  const heroInfo2 = document.createElement('p')
 
  card.className = 'heroCard'
  photo.className = 'heroPhoto'
  heroName.className = 'heroTitle'
  heroInfo1.className = 'aboutHero'
  heroInfo2.className = 'aboutHero'

  photo.setAttribute('src', elem.image)
  
  heroName.textContent = "Name: " + elem.name
  heroInfo1.textContent = "Gender: " + elem.gender
  heroInfo2.textContent = "Pecies: " + elem.species
  
  card.append(photo)
  card.append(heroName)
  card.append(heroInfo1)
  card.append(heroInfo2)
  
  return card
  
}

newData.forEach((elem) => { cardsWrapper.append(creatCards(elem)) })

function searchData() { 
  const heroCards = newData
    .filter((elem) => elem.species.includes(select.value))
    .filter((elem) => elem.name.toLowerCase().includes(input.value.trim().toLowerCase()))
  cardsWrapper.innerHTML = ''

  heroCards.forEach(e => cardsWrapper.append(creatCards(e)))
}

function searchSpecies(arr) { 
  const spec = arr.map((elem) => elem.species).filter((elem) => elem != "")
  const spec1 = [...new Set (spec)]
  return spec1
}



function creatOption(el) {
  const opt = document.createElement('option')
  opt.value = el
  opt.textContent = el
  opt.className = 'option'
  
  optionWrapper.append(opt)
}


function getSpec(arr) {
  arr.forEach(el => creatOption(el))
}
getSpec(spec)


select.addEventListener('change', searchData)
input.addEventListener('input', searchData)