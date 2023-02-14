import { alertSuccessEdit, deleteProductAlert } from "./alerts.js";

const formProductEdit = document.querySelector(".add-product__from");
const modal = document.querySelector(".modal__form");
const pathName = window.location.pathname;

let idProduct;

const toggleModalEdit = (modal) => {
  modal.classList.add("active");

  document.addEventListener("click", (e) => {
    if (
      e.target.matches(".modal__form") ||
      e.target.matches(".modal__close") ||
      e.target.matches(".modal__close-edit")
    ) {
      modal.classList.remove("active");
    }
  });
};

const deleteProduct = async (id) => {
  try {
    const res = await fetch(
      `https://aluragreek-api.herokuapp.com/productos?id=${id}`
    );

    const data = await res.json();

    const { imagen } = data[0];
    deleteProductAlert(id, imagen);
  } catch (error) {
    console.warn(error);
  }
};

const editProduct = async (id) => {
  try {
    idProduct = id;
    const res = await fetch(
      `https://aluragreek-api.herokuapp.com/productos?id=${id}`
    );

    const data = await res.json();
    const { imagem, categoria, nome, preco, descricao } = data[0];

    formProductEdit.urlImg.value = imagem;
    formProductEdit.category.value = categoria;
    formProductEdit.name.value = nome;
    formProductEdit.price.value = preco;
    formProductEdit.description.value = descricao;
  } catch (error) {
    console.log(error);
  } finally {
    toggleModalEdit(modal);
 
  }
};

if (
  /E-commerce-AluraGreek\/administration-product.html/g.test(pathName) ||
  /administration-product.html/g.test(pathName)
) {
  formProductEdit.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(formProductEdit);

    const name = data.get("name");
    const price = data.get("price");
    const img = data.get("urlImg");
    const description = data.get("description");
    const category = data.get("category");
    getDataEdit(idProduct, name, price, img, description, category);
  });
}

const getDataEdit = async (id, name, price, img, description, category) => {
  try {
 
    if (
      name.trim().length <= 3 ||
      price.trim().length <= 0 ||
      /([A-Za-z-]+)/gm.test(price) ||
      description.trim().length <= 10 ||
      category.trim().length <= 0 ||
      !/https/g.test(img)
    ) {
      document.querySelector(".add-product__alert").textContent =
        "Campos Incompletos/Campos Incorrectos";

      return;
    } else {
      document.querySelector(".add-product__alert").textContent = "";

      const dataProduct = {
        nome: name,
        preco: price,
        descricao: description,
        imagem: img,
        categoria: category,
        id: new Date().getTime(),
      };

      await fetch(`https://aluragreek-api.herokuapp.com/productos/${id}`, {
        method: "PUT",
        body: JSON.stringify(dataProduct),

        headers: {
          "Content-Type": "application/json",
        },
      });

      
      alertSuccessEdit(img);
      console.log("atualizado");
    }
  } catch (error) {
    console.log(error);
  }
};

export { deleteProduct, editProduct };
