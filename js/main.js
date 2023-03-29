const searchName = document.getElementById("searchBox");
const suggestionList = document.getElementById('suggestions');
const resultDiv = document.getElementById('result');
const repoCol = document.getElementById("repo");

document.getElementById('search').addEventListener('click', search);

function search() {
  const username = searchName.value;
  fetchUserDetails(username);
}


async function searchUsers() {
  const searchText = searchName.value.trim();
  if (searchText.length < 3) {
    suggestionList.innerHTML = '';
    return;
  }
  try {
    const resSugges = await fetch(`https://api.github.com/search/users?q=${searchText}`);
    if (resSugges.ok) {
      const suggesData = await resSugges.json();
      displaySuggestions(suggesData.items);
    } else {
      throw new Error('Failed to fetch suggestions');
    }
  } catch (error) {
    console.error(error);
    suggestionList.innerHTML = '';
    repoCol.innerHTML = '';
    resultDiv.innerHTML = '';
  }
}
// add event listener to searchInput to trigger searchUsers on input
searchName.addEventListener('input', searchUsers);




async function fetchUserDetails(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}?q=Q`);
    if (response.ok) {
      const data = await response.json();
      displayUserDetails(data)
    } else {
      const resultError = document.getElementById("result");
      resultError.innerHTML = `<h2>User not found</h2>`
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function displayUserDetails(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
            <div class="clo-md-12 search-col">
                <div class="details">
                    <img src="${data.avatar_url}" alt="Profile picture">
                    <h3>Hi! ${data.login}</h3>
                    <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
                </div>
            </div>
            <div class="row">
              <div class="col-md-4 de-1">
                  <h6>${data.followers}</h6>
                  <h5>Followers</h5>
              </div>
              <div class="col-md-4 de-1">
                  <h6>${data.following}</h6>
                  <h5>Following</h5>
              </div>
              <div class="col-md-4 de-1">
                  <h6>${data.public_repos}</h6>
                  <h5>Public Repositories</h5>
              </div>
            </div>
        `;

  displayRepos(data)

}

async function displayRepos(data) {
  try {
    const responseRepo = await fetch(`https://api.github.com/users/${data.login}/repos`);
    if (responseRepo.ok) {
      const repos = await responseRepo.json();
      repoCol.innerHTML = `
          <h2>Repositories</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Url</th>
                      <th>Language</th>
                      <th>Stars</th>
                      <th>Forks</th>
                    </tr>
                  </thead>
                  <tbody id="repos"></tbody>
                </table>
          `;

      const reposTable = document.getElementById("repos");
      const rows = repos.map(data => {
        return `
          <tr>
            <td><a href="${data.name}" target="_blank">${data.name}</a></td>
            <td>${data.url || 'No description provided.'}</td>
            <td>${data.language || 'N/A'}</td>
            <td>${data.stargazers_count}</td>
            <td>${data.forks_count}</td>
          </tr>
        `;
      });

      reposTable.innerHTML = rows.join('');
    } else {
      throw new Error('Failed to fetch repositories');
    }
  } catch (error) {
    console.error(error);
  }
}

function displaySuggestions(suggesData) {
  suggestionList.innerHTML = '';
  suggesData.map(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}">
      <span>${user.login}</span>
    `;
    li.addEventListener('click', async () => {
      const userDetails = await fetchUserDetails(user.login);
      if (userDetails) {
        search();
      }
    });
    suggestionList.appendChild(li);
  });
}




