const searchName=document.getElementById("searchBox");
const suggestionList=document.getElementById('suggestions');
const resultDiv=document.getElementById('result');

document.getElementById('search').addEventListener('click',search);

function search() {
    const username = searchName.value;
    fetch(`https://api.github.com/users/${username}`).then(response => response.json()).then(data => {
        const resultDiv = document.getElementById("result");

        resultDiv.innerHTML = `
          <h2>${data.login}</h2>
          <img src="${data.avatar_url}" alt="Profile picture">
          <ul>
            <li>Username: ${data.login}</li>
            <li>Followers: ${data.followers}</li>
            <li>Following: ${data.following}</li>
            <li>Public Repositories: ${data.public_repos}</li>
          </ul>
        `;
      })
      .catch(error => {console.log(error);
        });
  }



// fetch user details from GitHub API
// const fetchUserDetails = async (username)=>{
//     try{
//         const response= await fetch(`https://api.github.com/users/${username}`);
//         console.log(response);
//         if(response.ok){
//             const data=await response.json(); //returns a promise resolved to a JSON object
//             return data;
//         }else{
//             throw new Error('User not found');
//         }
//     }catch(error){
//         console.error(error);
//         return null;
//     }

// }

// display user details and repositories in resultDiv

