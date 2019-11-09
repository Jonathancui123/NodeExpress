function getUser(id){
    return new Promise((resolve, reject)=> {
        setTimeout(()=>{
            console.log('Db doing work');
            resolve({id: id, gitName: 'Jonathan'});
        }, 2000)
    })
}

function getRepositories(userinfo){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log(userinfo.gitName);
            // console.log(`Reading ${userinfo.gitName}'s repos...`);
            reject(new Error('big fat error'));
            // resolve(['repo1', 'repo2', 'repo3']);
        }, 2000)
    })
    }

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Looking for commits in: ${repo}`);
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    })
}

function displayCommits(commits){
    console.log('Displaying commits: ', commits);
}

//In this file, the functions are named to avoid callback hell
//Below, promises are used to avoid callback looping

getUser(1)
    .then(userInfo => getRepositories(userInfo))
    .then(repos => getCommits(repos))
    .then(commits => displayCommits(commits))
    .catch(err => console.log('This should be printed upon error'));
