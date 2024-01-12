const button = document.getElementById('but');

button.addEventListener('click', () => {
    const inputValue = document.getElementById('input').value;
    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
});

const show = (data) => {
    const display = document.getElementById('display');
    //const data1 = JSON.stringify(data);
    display.innerHTML=""
    for (let i = 0; i < data.length; i++) {
        const pd = document.createElement('p');
        pd.innerText = data[i];
        display.appendChild(pd);
    }
};


const showbutton = document.getElementById('show-but');

showbutton.addEventListener('click', () => {
    fetch('http://localhost:3000/todolist', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(show)
    .catch(error => console.error('Error:', error));
});
