const renderPet = (data) => {
    const { id, name, picture, species, friendly } = data

    const newPet = document.createElement('li')
    const petName = document.createElement('h3')
    const petImg = document.createElement('img')
    const isFriendly = document.createElement('p')
    const speciesNode = document.createElement('p')
    const removeButton = document.createElement('button')

    petName.textContent = name
    petImg.src = picture
    petImg.alt = `picture of ${name}`
    isFriendly.textContent = friendly ? `Friendly!` : `Not so friendly...`
    speciesNode.textContent = `Species: ${species}`
    removeButton.textContent = 'remove'

    removeButton.onclick = () => {
        fetch(`/deletePet/${id}`, {
            method: 'delete'
        })
        newPet.remove()
    }

    newPet.append(petName, petImg, isFriendly, species, removeButton)

    document.querySelector('#pet-list').append(newPet)
}

const listPets = async () => {
    let res = await fetch('/getPets')
    let data = await res.json()
    data.forEach(pet => renderPet(pet))
}

listPets()

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const petObj = Object.fromEntries(formData);
    e.target.reset()

    fetch('/addPet', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(petObj)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            renderPet(data)
        })
        .catch(error => {
            // Handle any errors that occur during the fetch or JSON parsing
            console.error('Error:', error);
        });
})