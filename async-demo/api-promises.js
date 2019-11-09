const p1 = new Promise((resolve)=>{
    console.log('Accessing github API')
    setTimeout(() => {
        console.log('Github success')
        resolve(1);
    }, 2000)
})

const p2 = new Promise((resolve)=>{
    console.log('Accessing facebook API')
    setTimeout(() => {
        console.log('Facebook success');
        resolve(2);
    }, 2500)
})

Promise.race([p1, p2])
    .then(result => console.log('First operation is done:', result));