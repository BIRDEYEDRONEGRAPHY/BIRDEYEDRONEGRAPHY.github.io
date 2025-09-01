// CONFIG: Update with your GitHub repo details
const username = "YOUR_GITHUB_USERNAME";
const repo = "YOUR_REPO_NAME";
const branch = "main"; // or "master"

// GitHub API to list repo contents
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/`;

async function fetchGallery() {
  try {
    const res = await fetch(apiUrl);
    const folders = await res.json();

    const gallery = document.getElementById("gallery");

    for (let folder of folders) {
      if (folder.type === "dir") {
        // Create category card
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const title = document.createElement("h2");
        title.textContent = folder.name;
        categoryDiv.appendChild(title);

        // Fetch videos inside folder
        const filesRes = await fetch(folder.url);
        const files = await filesRes.json();

        for (let file of files) {
          if (file.name.endsWith(".mp4") || file.name.endsWith(".mov")) {
            const videoDiv = document.createElement("div");
            videoDiv.classList.add("video-item");

            const video = document.createElement("video");
            video.src = file.download_url;
            video.controls = true;

            const download = document.createElement("a");
            download.href = file.download_url;
            download.textContent = "⬇ Download";
            download.classList.add("download-btn");
            download.download = file.name;

            videoDiv.appendChild(video);
            videoDiv.appendChild(download);
            categoryDiv.appendChild(videoDiv);
          }
        }

        gallery.appendChild(categoryDiv);
      }
    }
  } catch (err) {
    console.error("Error loading gallery:", err);
  }
}

fetchGallery();
