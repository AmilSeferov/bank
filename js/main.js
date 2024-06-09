const body = document.querySelector('body');
const ul = document.querySelector('ul');
const add = document.querySelector('.div-add')
const main = document.querySelector('main')
const addContain = document.querySelector('.add_container')
let getData = () => {
    fetch('https://acb-api.algoritmika.org/api/transaction')
        .then(r => r.json())
        .then(data => {
            data.forEach(item => {
                const left = document.createElement('div');
                const right = document.createElement('div');
                const li = document.createElement('li');
                const info = document.createElement('button');
                const remove = document.createElement('button');
                const from = document.createElement('span');
                const to = document.createElement('span');
                const amount = document.createElement('span');
                ul.append(li);
                li.append(left);
                li.append(right);
                left.append(from);
                from.textContent = `From:${item.from}`;
                left.append(to);
                to.textContent = ` To:${item.to}`;
                left.append(amount);
                amount.textContent = ` Amount:${item.amount}`;
                right.append(info);
                info.textContent = 'i';
                right.append(remove);
                remove.textContent = 'x';
                info.setAttribute('class', 'btn');
                info.addEventListener('click', (e) => {
                    main.style.display = 'none';
                    addContain.style.display = 'block';
                    addContain.querySelectorAll('input')[0].value = item.from;
                    addContain.querySelectorAll('input')[1].value = item.to;
                    addContain.querySelectorAll('input')[2].value = item.amount;

                    document.querySelector('.div-add1').addEventListener('click', () => {
                        const info = {
                            from: addContain.querySelectorAll('input')[0].value,
                            to: addContain.querySelectorAll('input')[1].value,
                            amount: addContain.querySelectorAll('input')[2].value,
                        }
                        console.log(info)
                        fetch(`https://acb-api.algoritmika.org/api/transaction/${item.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(info)
                        }).then(data=>{
                            console.log(data)
                            window.location.reload()
                        })
                        
                    })
                })
                remove.setAttribute('class', 'btn');
                remove.addEventListener('click', () => {
                    fetch(`https://acb-api.algoritmika.org/api/transaction/${item.id}`, {
                        method: 'DELETE',

                    }).then(data=>{
                        console.log(data)
                        window.location.reload()
                    })
                    
                });
            });
        })
}
getData()
add.addEventListener('click', () => {
    main.style.display = 'none';
    addContain.style.display = 'block';

    document.querySelector('.div-add1').addEventListener('click', () => {
        const info = {
            from: addContain.querySelectorAll('input')[0].value,
            to: addContain.querySelectorAll('input')[1].value,
            amount: addContain.querySelectorAll('input')[2].value,
        }
        console.log(info)
        fetch('https://acb-api.algoritmika.org/api/transaction', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(data=>{
            console.log(data)
            window.location.reload()
        })
    })


})

