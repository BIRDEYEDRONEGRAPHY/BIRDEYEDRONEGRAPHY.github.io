// CONFIG
const username = "YOUR_GITHUB_USERNAME";
const repo = "YOUR_REPO_NAME";

// Get folder name from URL
const params = new URLSearchParams(window.location.search);
const folderName = params.get("name");

document.getElementById("category-title").textContent = `🎬 ${folderName}`;

const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${folderName}`;

async function fetchVideos() {
  try {
    const res = await fetch(apiUrl);
    const files = await res.json();

    const videosDiv = document.getElementById("videos");

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
        videosDiv.appendChild(videoDiv);
      }
    }
  } catch (err) {
    console.error("Error loading videos:", err);
  }
}

fetchVideos();
