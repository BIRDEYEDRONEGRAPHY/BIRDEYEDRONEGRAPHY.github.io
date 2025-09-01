// CONFIG: Update with your GitHub repo details
const username = "YOUR_GITHUB_USERNAME";
const repo = "YOUR_REPO_NAME";

const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/`;

async function fetchCategories() {
  try {
    const res = await fetch(apiUrl);
    const folders = await res.json();

    const categoriesDiv = document.getElementById("categories");

    for (let folder of folders) {
      if (folder.type === "dir") {
        const card = document.createElement("div");
        card.classList.add("category-card");

        const title = document.createElement("h2");
        title.textContent = folder.name;

        card.appendChild(title);

        // When clicked → go to category.html with ?name=folder.name
        card.addEventListener("click", () => {
          window.location.href = `category.html?name=${folder.name}`;
        });

        categoriesDiv.appendChild(card);
      }
    }
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

fetchCategories();
