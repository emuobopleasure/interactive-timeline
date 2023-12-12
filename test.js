const addToTimeline = (input) => {
    const timeline = document.querySelector('#timeline');
    const postDetails = new Date().toLocaleString();
    const postElement = document.createElement('div');
    postElement.classList.add('postContainer');

    // Generate five random usernames
    for (let i = 1; i <= 5; i++) {
        const randomUsername = generateRandomUsername();
        const usernameDiv = document.createElement('div');
        usernameDiv.classList.add('username');
        usernameDiv.textContent = `User ${i}: ${randomUsername}`;
        postElement.appendChild(usernameDiv);
    }

    // Create divs for input and date
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('a');
    inputDiv.textContent = input;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('b');
    dateDiv.textContent = postDetails;

    // Append input and date divs to postElement
    postElement.appendChild(inputDiv);
    postElement.appendChild(dateDiv);

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', (e) => {
        timeline.removeChild(postElement);
        alert(`${input} successfully deleted!`);
    });

    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.classList.add('copy');
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', (e) => {
        copyToClipboard(input);
        alert(`${input} Successfully Copied to Clipboard`);
    });

    // Append delete and copy buttons to postElement
    postElement.appendChild(deleteBtn);
    postElement.appendChild(copyBtn);

    // Append postElement to timeline
    timeline.appendChild(postElement);

    // Clear input field
    document.querySelector('#inputField').value = '';
};

const generateRandomUsername = () => {
    const userNames = ['Developer', 'Designer', 'Project Manager', 'Engineer'];
    const randomUsername = userNames[Math.floor(Math.random() * userNames.length)];
    return randomUsername;
};
