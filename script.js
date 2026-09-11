document.addEventListener("DOMContentLoaded", () => {
    // Busca o botão com a classe 'like-btn' ou pega o primeiro botão dentro de .left-actions
    const likeBtn = document.querySelector(".like-btn") || document.querySelector(".left-actions .action-btn");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn) return;

    // Busca o span do texto ou cria um tratamento se ele não existir
    let likesCountSpan = likeBtn.querySelector(".likes-count");
    
    // Se o span não existia no HTML, o JS ajusta a estrutura internamente
    if (!likesCountSpan) {
        const svg = likeBtn.querySelector("svg");
        likeBtn.innerHTML = "";
        if (svg) likeBtn.appendChild(svg);
        
        likesCountSpan = document.createElement("span");
        likesCountSpan.className = "likes-count";
        likeBtn.appendChild(likesCountSpan);
    }

    let isLiked = false;
    let baseLikes = 0; // Sempre inicia zerado (0)

    // Atualiza o texto na tela para 0 na inicialização
    likesCountSpan.textContent = "0";

    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    function updateLikesDisplay() {
        likesCountSpan.textContent = formatLikes(baseLikes);
    }

    // Ação ao clicar no Botão de Curtir
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        isLiked = !isLiked;

        if (isLiked) {
            baseLikes++;
            likeBtn.classList.add("liked");
        } else {
            baseLikes = Math.max(0, baseLikes - 1);
            likeBtn.classList.remove("liked");
        }

        updateLikesDisplay();

        // Animação do coração ao clicar
        const svg = likeBtn.querySelector("svg");
        if (svg) {
            svg.style.transform = "scale(1.3)";
            setTimeout(() => {
                svg.style.transform = "scale(1)";
            }, 150);
        }
    });

    // Ação ao dar duplo clique na Imagem
    if (postMedia) {
        postMedia.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            if (!isLiked) {
                isLiked = true;
                baseLikes++;
                likeBtn.classList.add("liked");
                updateLikesDisplay();

                const svg = likeBtn.querySelector("svg");
                if (svg) {
                    svg.style.transform = "scale(1.3)";
                    setTimeout(() => {
                        svg.style.transform = "scale(1)";
                    }, 150);
                }
            }
        });
    }

    // Botão Salvar (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});