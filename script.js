document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const postMedia = document.querySelector(".post-media");
    const likesCountSpan = document.querySelector(".likes-count");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn) return;

    let isLiked = false;
    // Define a contagem base inicial (1200)
    let baseLikes = 1200; 

    // Função para formatar números (ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza a exibição visual
    function updateLikesDisplay() {
        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(baseLikes);
        }
    }

    // Alterna o estado de curtida ao clicar no botão de coração
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

        // Animação do ícone
        const svg = likeBtn.querySelector("svg");
        if (svg) {
            svg.style.transform = "scale(1.3)";
            setTimeout(() => {
                svg.style.transform = "scale(1)";
            }, 150);
        }
    });

    // Clique duplo na imagem para curtir
    if (postMedia) {
        postMedia.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            if (!isLiked) {
                isLiked = true;
                baseLikes++;
                likeBtn.classList.add("liked");
                updateLikesDisplay();
            }
        });
    }

    // Ação do botão Salvar
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