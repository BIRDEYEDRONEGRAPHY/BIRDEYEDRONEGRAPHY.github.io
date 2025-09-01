const pcloudCode = "kZQcjD5ZxfejsmbRkQB0mSJff39JQmGz7yty";
let allFiles = [];

async function loadFiles() {
  try {
    // Step 1: Get root folder ID
    const res = await fetch(`https://api.pcloud.com/showpublink?code=${pcloudCode}`);
    const data = await res.json();

    if (!data.metadata || !data.metadata.folderid) return;
    const folderId = data.metadata.folderid;

    // Step 2: Get files inside this folder
    const res2 = await fetch(`https://api.pcloud.com/listpublink?code=${pcloudCode}&folderid=${folderId}`);
    const folderData = await res2.json();

    if (!folderData.metadata || !folderData.metadata.contents) return;

    allFiles = folderData.metadata.contents.filter(f => !f.isfolder);
    renderFiles(allFiles);
  } catch (err) {
    console.error("Error loading files:", err);
  }
}

async function renderFiles(files) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  for (let item of files) {
    try {
      // Step 3: Get direct download/preview link
      const res = await fetch(`https://api.pcloud.com/getfilepublink?fileid=${item.fileid}`);
      const linkData = await res.json();
      const directLink = linkData.link;

      const div = document.createElement("div");
      div.className = "gallery-item";

      if (item.name.match(/\.(mp4|mov)$/i)) {
        div.dataset.type = "video";
        const video = document.createElement("video");
        video.src = directLink;
        video.controls = true;
        div.appendChild(video);
      } else if (item.name.match(/\.(jpg|jpeg|png)$/i)) {
        div.dataset.type = "image";
        const img = document.createElement("img");
        img.src = directLink;
        img.alt = item.name;
        div.appendChild(img);
      }

      const download = document.createElement("a");
      download.href = directLink;
      download.textContent = "⬇ Download";
      download.className = "download-btn";
      download.download = item.name;
      div.appendChild(download);

      gallery.appendChild(div);
    } catch (err) {
      console.error("Error rendering file:", err);
    }
  }
}

function filterFiles(type) {
  if (type === "all") {
    renderFiles(allFiles);
  } else if (type === "images") {
    renderFiles(allFiles.filter(f => f.name.match(/\.(jpg|jpeg|png)$/i)));
  } else if (type === "videos") {
    renderFiles(allFiles.filter(f => f.name.match(/\.(mp4|mov)$/i)));
  }
}

loadFiles();
