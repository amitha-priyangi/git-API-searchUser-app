const searchName = document.getElementById("searchBox");
const resultDiv = document.getElementById('result');

document.getElementById('search').addEventListener('click', search);

function search() {
    const username = searchName.value;
    fetchUserDetails(username);
}

async function fetchUserDetails(username) {
    try {
        //   https://api.github.com/search/users?q=Q
      const response = await fetch(`https://api.github.com/users/${username}?q=Q`);
    
      if (response.ok) {
        const data = await response.json();
        displayUserDetails(data)
      } else {
        const resultError = document.getElementById("result");
        resultError.innerHTML=`<h2>User not found</h2>`
        //  throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  
  async function displayUserDetails(data) {
    const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
        <h3>Hi! ${data.login}</h3>
        <img src="${data.avatar_url}" alt="Profile picture">
        <ul>
            <li>Username: ${data.login}</li>
            <li>Followers: ${data.followers}</li>
            <li>Following: ${data.following}</li>
            <li>Public Repositories: ${data.public_repos}</li>
        </ul>
        `;
  }