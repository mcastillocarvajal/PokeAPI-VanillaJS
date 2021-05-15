document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async () => {
    try {
        const res = await fetch ('https://pokeapi.co/api/v2/pokemon/' + `${randomInt(1, 151)}`)
        const data = await res.json()
        console.log(data)
        const pokemon = {
            img : data.sprites.other.dream_world.front_default,
            name : data.name,
            hp: data.stats[0].base_stat,
            experience: data.base_experience,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special: data.stats[3].base_stat
        }

        renderCard(pokemon)
    } catch (err) {
        console.log(err)
    }
}

const renderCard = (pokemon) => {

    const flex = document.querySelector('.flex')
    const template = document.getElementById('template').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name}
    <span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experience + ' Exp'
    clone.querySelectorAll('.card-footer-info h3')[0].textContent = pokemon.attack + 'K'
    clone.querySelectorAll('.card-footer-info h3')[1].textContent = pokemon.special + 'K'
    clone.querySelectorAll('.card-footer-info h3')[2].textContent = pokemon.defense + 'K'

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}
