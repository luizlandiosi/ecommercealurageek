import { authentication } from "./auth.js";

const form = document.querySelector(".contact__from");
const fieldValidateName = document.querySelector(".name__validate");
const fieldValidateMessage = document.querySelector(".message__validate");

const formLogin = document.querySelector(".login__from");
const fieldValidate = document.querySelector(".field__validate");

const loadingContainer = document.querySelector(".loading__container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const name = data.get("name");
  const message = data.get("message");

 
  if (name.trim().length < 3) {
    fieldValidateName.classList.add("active");
  } else {
    fieldValidateName.classList.remove("active");
  }


  if (message.trim().length < 20) {
    fieldValidateMessage.classList.add("active");
  } else {
    fieldValidateMessage.classList.remove("active");
  }

  if (name.trim().length >= 3 && message.trim().length >= 20) {
    console.log("enviando mensagem");
    return;
  }

  fieldValidateMessage.textContent = "Mensagem maior que 20 caracteres";
  fieldValidateName.textContent = "Nome maior que 2 caracteres";
});


const loading = () => {
  setTimeout(() => {
    loadingContainer.classList.remove("active");
  }, 2000);
};

const loadPageAdmin = () => {
  setTimeout(() => {
   
    window.location = "./administration-product.html";
  }, 2200);
};

const fetchData = async (email, pass) => {
  try {
    const res = await fetch("https://aluragreek-api.herokuapp.com/perfil");

    const data = await res.json();

    data.forEach((user) => {
      const { email: userEmail, password: userPass } = user;
      if (userEmail === email && userPass === pass) {
        fieldValidate.textContent = "";

        
        loadingContainer.classList.add("active");

        authentication();
        loadPageAdmin();
      } else {
        throw "Contraseña Incorrecta/Correo Incorrecto";
      }
    });
  } catch (error) {
    throw new Error(error);
  } finally {
  
    loading();
  }
};

formLogin?.addEventListener("submit", (e) => {
  e.preventDefault();

  
  const reg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    "g"
  );

  const data = new FormData(formLogin);

  const email = data.get("email");
  const password = data.get("password");

  if (reg.test(email) && password.trim().length >= 5) {
    fetchData(email, password)
      .catch((err) => {
        console.log(err);
        fieldValidate.textContent = err;
      })
      .then((msg) => {
        console.log(msg);
      });
  }

  
  fieldValidate.classList.add("active");
  fieldValidate.classList.remove("activeValid");

  fieldValidate.textContent =
    "informações invalidas";
});

export { loadPageAdmin };