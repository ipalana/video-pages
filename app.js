import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

const GITHUB_USER = "ipalana";
const REPO_NAME = "video-pages";
const VIDEO_FOLDER = "videos";

function checkPassword() {
document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Definição da senha correta
    const senhaCorreta = "catarina";

    // 🔹 Adiciona o evento de clique ao botão "Entrar"
    document.getElementById("loginButton").addEventListener("click", function () {
        var password = document.getElementById("password").value;
        if (password === senhaCorreta) {
            document.getElementById("login").style.display = "none";
            document.getElementById("content").style.display = "block";
            loadVideos(); // 🔹 Carrega os vídeos após login
        } else {
            alert("Senha incorreta! Tente novamente.");
        }
    });
});


async function loadVideos() {
    const videoContainer = document.getElementById("videoCarousel");
    videoContainer.innerHTML = "";

    try {
        const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${VIDEO_FOLDER}`;
        const response = await fetch(apiUrl);
        const files = await response.json();

        if (response.status !== 200) {
            throw new Error("Erro ao carregar vídeos. Verifique o repositório.");
        }

        files.forEach(file => {
            if (file.name.endsWith(".mp4") || file.name.endsWith(".webm")) {
                const videoCard = document.createElement("div");
                videoCard.classList.add("video-card");

                const video = document.createElement("video");
                video.src = file.download_url;
                video.controls = true;

                const title = document.createElement("div");
                title.classList.add("title");
                title.innerText = file.name;

                const subtitle = document.createElement("div");
                subtitle.classList.add("subtitle");
                subtitle.innerText = "Vídeo armazenado no GitHub";

                videoCard.appendChild(video);
                videoCard.appendChild(title);
                videoCard.appendChild(subtitle);
                videoContainer.appendChild(videoCard);
            }
        });

        $(".slick-carousel").slick("refresh");

    } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
        videoContainer.innerHTML = "<p>Não foi possível carregar os vídeos.</p>";
    }
}

