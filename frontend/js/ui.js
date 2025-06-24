// js/ui.js

// A função displayResponse e displayError continuam EXATAMENTE as mesmas.

// ... (código anterior de displayResponse e displayError)
export function displayResponse(element, data, successMessage = "") {
    element.className = "response-area success";
    const { status, ...displayData } = data;
    const message = successMessage ? `<strong>${successMessage} (Status: ${status})</strong>\n\n` : '';
    element.innerHTML = `${message}<pre><code>${JSON.stringify(displayData, null, 2)}</code></pre>`;
}

export function displayError(element, error) {
    element.className = "response-area error";
    element.innerHTML = `<strong>Erro:</strong> ${error.message}`;
}


/**
 * Controla a navegação principal, trocando o conteúdo exibido.
 */
export function setupNavigation() {
    const navLinks = document.querySelectorAll(".sidebar-link");
    const formContainers = document.querySelectorAll(".form-container");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Impede que o link mude a URL

            // Desativa todos
            navLinks.forEach(l => l.classList.remove("active"));
            formContainers.forEach(container => container.classList.remove("active"));

            // Ativa o clicado
            link.classList.add("active");
            const targetId = link.dataset.target;
            document.getElementById(targetId)?.classList.add("active");
        });
    });
}