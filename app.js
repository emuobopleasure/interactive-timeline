// Set to store entered inputs
const enteredInputs = new Set()

const handleInput = (e) => {
    let enteredData = document.querySelector('#inputField').value.trim()
    console.log('aa', enteredData)

    //for removing whitespace
    // enteredData = enteredData.replace(/\s/g, '')
    // console.log('bb', enteredData)

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

    // const containerDiv = document.createElement('div')
    // containerDiv.classList.add('containerDiv')

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>'

    const copyBtn = document.createElement('button')
    copyBtn.classList.add('copy')
    copyBtn.innerHTML = '<i class="fa fa-files-o" aria-hidden="true"></i>'

    //formatting text input to uppercase
    const uppercaseFormat = input.charAt(0).toUpperCase() + input.slice(1)

    // Create divs for input and date
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('a');
    inputDiv.textContent = uppercaseFormat;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('b');
    dateDiv.innerHTML = `<div> ${postDetails} </div>`

    // container for usernames
    const usernamesContainer = document.createElement('div');
    usernamesContainer.classList.add('usernameContainer')

    // Generating five random usernames
    const randomUsername = generateRandomUsername();
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('username');
    usernameDiv.textContent = `${randomUsername}`;
    // usernamesContainer.appendChild(usernameDiv);
    dateDiv.appendChild(usernameDiv)
    // console.log('ab')


    // Adding input, date, and usernames container to postElement
    postElement.appendChild(inputDiv);
    postElement.appendChild(dateDiv);
    postElement.appendChild(deleteBtn);
    postElement.appendChild(copyBtn);
    // dateDiv.appendChild(usernamesContainer);

    deleteBtn.addEventListener('click', (e) => {
        timeline.removeChild(postElement)
        alert(`${uppercaseFormat} successfully deleted!`)
    })

    copyBtn.addEventListener('click', (e) => {
        copyToClipboard(uppercaseFormat)
        
        //displaying notification on the screen
        const notificationEl = document.querySelector('#copyNotification')
        notificationEl.textContent = `${uppercaseFormat} copied Successfully!`

        //clearing the notification text after 2 seconds
        setTimeout(() => {
            notificationEl.textContent = ''
        }, 2000)
    })

    // add postElement to timeline
    timeline.appendChild(postElement);

    document.querySelector('#inputField').value = ''

    // Add input to the set of entered inputs
    enteredInputs.add(input.toLowerCase())

    // Clear the error message
    showError('');
}

const generateRandomUsername = () => {
    const userNames = ['Developer', 'Designer', 'Contributor', 'Engineer', 'Trainee']
    const randomIndex = Math.floor(Math.random() * userNames.length)
    // console.log(randomIndex)
    return userNames[randomIndex]
}

const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

//listening for the enter keypres in the inputField
document.querySelector('#inputField').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleInput()
    }
})

