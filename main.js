// Setting Variables
let theInput = document.querySelector(".header input");
let theButton = document.querySelector(".get-button");
let theShowData = document.querySelector(".show-data");

theButton.onclick = function () {
  getRepos();
};

// Function to Get Repos
function getRepos() {
  if (theInput.value == "") {
    theShowData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        // Empty The Container
        theShowData.innerHTML = "";
        // Loop On Repos
        repos.forEach((repo) => {
          // create The Main Div
          let theMainDiv = document.createElement("div");
          // create The Text
          let theText = document.createTextNode(repo.name);
          // Append The text Inside The Main Div
          theMainDiv.appendChild(theText);
          // Create Url link Anchor Tag
          let theUrl = document.createElement("a");
          // Create Url Text
          let theUrlText = document.createTextNode("Visit");
          // Append The Text To Url Link
          theUrl.appendChild(theUrlText);
          // The Hyper Text Referance (href)
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank");
          // Append The Url To The Main Div
          theMainDiv.appendChild(theUrl);
          // Create The Stars Span
          const theStarsSpan = document.createElement("span");
          // Create The Text Stars Span
          const theTextStarsSpan = document.createTextNode(`Stars ${repo.stargazers_count}`);
          // Append The Text To The Stars Span
          theStarsSpan.appendChild(theTextStarsSpan);
          // Append The Stars Span To The  Main Div
          theMainDiv.appendChild(theStarsSpan);
          // Add Class On Main Div
          theMainDiv.className = "repo-box";
          // Append The Main Div To The Container
          theShowData.appendChild(theMainDiv);
        });
      });
  }
}
