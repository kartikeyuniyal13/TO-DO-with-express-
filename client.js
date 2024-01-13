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

    console.log(data)
    display.innerHTML=""
    for (let i = 0; i < data.length; i++) {
        const dv=document.createElement('div')

        const pd = document.createElement('p');
        pd.innerText = data[i].title;
        const bt=document.createElement('button');
        bt.innerText='DELETE'
        bt.classList.add('del-but');
        bt.setAttribute("onclick", "deleteTodo(" + data[i].id + ")");

        dv.appendChild(pd);
        dv.appendChild(bt)
        display.appendChild(dv)
    }
};


const showIndex = (data) => {
    const display = document.getElementById('display');
    //const data1 = JSON.stringify(data);

    console.log(data)
    display.innerHTML=""
    const bt=document.createElement('button')
    bt.innerText='DELETE'
    bt.classList.add('del-but');
    bt.setAttribute("onclick", "deleteTodo(" + data.id + ")");
     const pd = document.createElement('p');
    pd.innerText = data.title;
        display.appendChild(pd);
        display.appendChild(bt)
    
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

function findTodo(id){
    fetch("http://localhost:3000/findlist/"+id,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(showIndex)
}


const find= document.getElementById('id-but');
find.addEventListener('click',()=>{
    const id=document.getElementById('id-input').value;
    findTodo(id);


})