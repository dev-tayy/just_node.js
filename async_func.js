// $env:app_password="12345"

const c = require("config");

console.log("Before");
//CALLBACK
// getUser(1, (user) => {
//     user.getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// });

//PROMISES
// getUser(1).then((user) =>
//     getRepositories(user.getRepositories).then((repos) =>
//         getCommits(repos[0]).then((commits) => console.log('Commits', commits))
//     )
// ).catch(err => console.log('Error', err.message));

//ASYNC AND WAIT
async function love() {
  const user = await getUser(1);
  const repos = await getRepositories(user.getRepositories);
  const commits = await getCommits(repos[0]);
  console.log("Commits", commits);
}

love();
console.log("After");

function displayCommit(commits) {
  console.log(commits);
}

function getUserRepo(userRepo) {
  displayCommit(userRepo, displayCommit);
}

function getUsers(user) {
  getRepositories(user.gitHubUsername, getUserRepo);
}

function getUser(id) {
  //return a promise
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Reading a user from the Database...");
      resolve({
        id: id,
        gitHubUsername: "iloveteajay",
      });
    }, 2000)
  );
}

function getRepositories(username) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Fetching user repos...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000)
  );
}

function getCommits(repo) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve("commit");
    }, 2000)
  );
}
