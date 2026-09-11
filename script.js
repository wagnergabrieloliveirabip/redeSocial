document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos do DOM
    const likeBtn = document.querySelector(".like-btn");
    const postMedia = document.querySelector(".post-media");
    const likesCountSpan = document.querySelector(".likes-count");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn || !likesCountSpan) return;

    // Estado inicial
    let isLiked = false;
    let baseLikes = 0; // Sempre inicia zerado

    // Garante exibição inicial em 0
    likesCountSpan.textContent = "0";

    // Formatação visual para números maiores
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza o valor no DOM
    function updateLikesDisplay() {
        likesCountSpan.textContent = formatLikes(baseLikes);
    }

    // Animação do Ícone SVG (Efeito Bounce)
    function animateIcon(button) {
        const svg = button.querySelector("svg");
        if (svg) {
            svg.style.transform = "scale(1.3)";
            setTimeout(() => {
                svg.style.transform = "scale(1)";
            }, 150);
        }
    }

    // Ação ao Clicar no Botão de Curtida (Curte / Descurte)
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
        animateIcon(likeBtn);
    });

    // Ação ao Dar Duplo Clique na Foto (Curte o post)
    if (postMedia) {
        postMedia.addEventListener("dblclick", (e) => {
            e.stopPropagation();

            if (!isLiked) {
                isLiked = true;
                baseLikes++;
                likeBtn.classList.add("liked");
                updateLikesDisplay();
                animateIcon(likeBtn);
            }
        });
    }

    // Ação do Botão de Salvar (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
            animateIcon(bookmarkBtn);
        });
    }
});