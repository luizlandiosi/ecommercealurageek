const templateModal = document.querySelector("#templateModal")?.content;
const modal = document.querySelector("#modal");

const handleModalClose = (modal) => {
  const modalClose = document.querySelector(".modal__close-container");
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.textContent = "";
  });
};

const createModal = async (id) => {
  const fragment = document.createDocumentFragment();

  try {
    const res = await fetch(
      `https://aluragreek-api.herokuapp.com/productos?id=${id}`
    );

    const data = await res.json();

    data.forEach(({ nome, preco, descricao, imagem }) => {
      
      modal.textContent = "";

     
      const clone = templateModal.cloneNode(true);
      clone.querySelector(".modal__title").textContent = nome;
      clone.querySelector(".modal__price").textContent = `$${preco}`;
      clone.querySelector(".modal__description").textContent = descricao;

      clone.querySelector(".modal__img").setAttribute("src", imagem);

      fragment.appendChild(clone);
    });

    modal.appendChild(fragment);
  } catch (error) {
    console.log(error);
    console.warn("Erro no modal");
  } finally {
    handleModalClose(modal);
  }
};

export { handleModalClose, createModal };
