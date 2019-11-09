 console.log('Before');
 getUser(1, getRepositories);
 console.log('After');
 
function getRepositories(user){
    getRepositories(user.gitHubUsername)
}

function getUser(id, getRepo){
    setTimeout(()=>{
        console.log('Db doing work');
        var gitInfo = 
        getRepo({id: id, gitName: 'Jonathan'}, getCommits);
    }, 2000)
}

// function getRepositories(gitInfo, getCommits){
//     setTimeout(()=>{
//         console.log(gitInfo.gitName);
//         // console.log(`Reading ${gitinfo.gitName}'s repos...`);
//         getCommits(['repo1', 'repo2', 'repo3'], displayCommits());
//     }, 2000)
// }

// function getCommits(repo, displayCommits){
//     setTimeout(() => {
//         console.log(`Looking for commits in: ${repo}`);
//         displayCommits(['commit1', 'commit2', 'commit3']);
//     }, 2000);
// }

function displayCommits(commits){
    console.log('Displaying commits: ', commits);
}