const enteredInputs = new Set()

const handleInput = (e) => {
    let enteredData = document.querySelector('#inputField').value
    console.log(enteredData)

    //for removing whitespace
    enteredData = enteredData.replace(/\s/g, '')
    console.log('n', enteredData)

    //for checking alphanumeric characters
    if (!/^[0-9a-zA-Z]+$/.test(enteredData)) {
        showError('Please enter numbers or alphanumeric characters only.')
        return
    }

    //checking maximum length
    if (enteredData.length > 16) {
        showError('Maximum characters allowed is 16')
        return
    }

    //checking for duplicate entry
    if (enteredInputs.has(enteredData.toLowerCase())) {
        showError('Duplicate entry! This input already exists.')
        return
    }

    // checking for duplicate characters
    // const duplicateNums = [...new Set(enteredData)]
    // if ( duplicateNums.length !== enteredData.length) {
    //     alert('Duplicate Characters are not allowed')
    //     return
    // }

    addToTimeline(enteredData)
}

const showError = (message) => {
    const errorMsg = document.querySelector('.error')
    errorMsg.textContent = message
}

const addToTimeline = (input) => {
    const timeline = document.querySelector('#timeline')
    const postDetails = new Date().toLocaleString()
    const postElement = document.createElement('div')
    postElement.classList.add('postContainer')

    //formatting text input to uppercase
    const uppercaseFormat = input.charAt(0).toUpperCase() + input.slice(1)

    postElement.innerHTML = `<div class='a'>${uppercaseFormat}</div> <div class='b'> ${postDetails} </div>`
    // postElement.textContent = `${input} - ${postDetails}`
    timeline.appendChild(postElement)

    document.querySelector('#inputField').value = ''

    // Add input to the set of entered inputs
    enteredInputs.add(input.toLowerCase())

    // Clear the error message
    showError('');
}

//listening for the enter keypres in the inputField
document.querySelector('#inputField').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleInput()
    }
})

