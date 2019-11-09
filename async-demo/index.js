 console.log('Before');
 getUser(1, (user)=>{
    console.log(user.id, user.gitName);
    getRepositories(user, (data)=>{
        console.log(data);
    })
 });
 console.log('After');
 
function getUser(id, callback){
    setTimeout(()=>{
        console.log('Db doing work');
        callback({id: id, gitName: 'Jonathan'});
    }, 2000)
}

function getRepositories(username, callback){
    setTimeout(()=>{
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000)
}