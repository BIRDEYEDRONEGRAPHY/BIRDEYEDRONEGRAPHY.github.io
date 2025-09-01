const pcloudCode = "kZQcjD5ZxfejsmbRkQB0mSJff39JQmGz7yty";

async function loadCategories() {
  try {
    const res = await fetch(`https://api.pcloud.com/showpublink?code=${pcloudCode}`);
    const data = await res.json();

    if (!data.metadata || !data.metadata.contents) return;

    const categoriesDiv = document.getElementById("categories");

    data.metadata.contents.forEach(item => {
      if (item.isfolder) {
        const div = document.createElement("div");
        div.className = "category-card";
        div.innerHTML = `
          <a href="category.html?folderid=${item.folderid}&name=${encodeURIComponent(item.name)}">
            <h3>${item.name}</h3>
          </a>
        `;
        categoriesDiv.appendChild(div);
      }
    });
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

loadCategories();
