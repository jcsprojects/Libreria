"use strict";

class GalleryController {
  //Campos privados
  #modelGallery;
  #viewGallery;

  constructor(modelGallery, viewGallery) {
    this.#modelGallery = modelGallery;
    this.#viewGallery = viewGallery;

    // Eventos iniciales del Controlador

    this.onLoad();
    this.onInit();
  }

  traerDatos() {
    let gallery = this.#modelGallery;
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "datos.json", true);
    xhttp.setRequestHeader("content-type", "application/json");

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let json = JSON.parse(this.responseText);
        let img = json.Landscape;
        let img2 = json.Portrait;
        let cat = json.Categories;
        let aut = json.Author;

        for (let i in img) {
          let imagen = new Landscape(
            img[i].title,
            img[i].description,
            img[i].url,
            new Coords(img[i].coord.Latitude, img[i].coord.Longitude)
          );
          let imagen2 = new Portrait(
            img2[i].title,
            img2[i].description,
            img2[i].url,
            new Coords(img2[i].coord.Latitude, img2[i].coord.Longitude)
          );
          gallery.addImage(imagen);
          gallery.addImage(imagen2);

          let categoria = new Category(cat[i].title, cat[i].description);
          gallery.addCategory(categoria);

          let author = new Author(aut[i].nickname, aut[i].email, aut[i].avatar);
          gallery.addAuthor(author);
          gallery.addImageInCategoryWithAuthor(categoria, author, imagen);
          gallery.addImageInCategoryWithAuthor(categoria, author, imagen2);
        }
      }
    };
    xhttp.send(null);
  }



  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  checkUser() {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    form.addEventListener("submit", function (event) {
      if (username.value == "jero" && password.value == "jero") {
        let expires = "";
        var date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
        document.cookie = "usuario=" + username.value + expires + "; path=/";
        location.href = "index.html";
      }
    });
  }
  closesesion() {
    if (this.getCookie("usuario") == "jero") {
      const closeS = document.getElementById("close");
      closeS.addEventListener("click", function () {
        document.cookie =
          "usuario=jero; expires=Thu, 31 Dec 2000 12:00:00 UTC; path=/;";
        location.href = "index.html";
      });
    }
  }

  mostrar = () => {
    let favoritos = document.getElementById("favorites");
    favoritos.addEventListener("click", () => {
      this.#viewGallery.showFavorites();
    });
  };

  onInit = () => {
    this.#viewGallery.showAuthors(this.#modelGallery.authors);
    this.#viewGallery.bindImagesAuthorList(this.handleImagesAuthorList);

    this.#viewGallery.showCategories(this.#modelGallery.categories);
    this.#viewGallery.bindImagesCategoryList(this.handleImagesCategoryList);
  };
  // Eventos del Controlador
  onLoad = () => {
    // this.backup();
    this.traerDatos();
    this.#viewGallery.showImageTypes();

    this.onAddCategory();
    // Enlazamos handlers con la vista
    this.checkUser();
    let username1 = this.getCookie("usuario");

    this.#viewGallery.bindInit(this.handleInit);
    this.#viewGallery.bindImagesTypeList(this.handleImagesTypeList);

    if (username1 == "jero") {
      this.add();
      this.#viewGallery.showLogin();
      this.#viewGallery.showAdminMenu();
      this.#viewGallery.bindAdminMenu(
        this.handleNewCategoryForm,
        this.handleRemoveCategoryForm,
        this.handleNewAuthorForm,
        this.handleRemoveAuthorForm,
        this.handleNewImageForm,
        this.handleRemoveImageForm
      );
      this.#viewGallery.showFavoritesInMenu();
      this.mostrar();
      // this.#viewGallery.bindFavourites(this.handleFavourites);
      this.closesesion();
    }

    // this.#viewGallery.bindNewCategoryForm(this.handleCreateCategory);
  };

  onAddCategory = () => {
    this.#viewGallery.showCategoriesInMenu(this.#modelGallery.categories);

    this.#viewGallery.bindImagesCategoryInMenuList(
      this.handleImagesCategoryList
    );

    this.#viewGallery.showAuthorsInMenu(this.#modelGallery.authors);
    this.#viewGallery.bindImagesAuthorInMenuList(this.handleImagesAuthorList);
  };
  // Manejadores para la gestión peticiones de la Vista
  handleInit = () => {
    this.onInit();
    this.#viewGallery.showImageTypes();
  };

  // handleFavourites(){
  //   this.#viewGallery.showFavorites();
  // }

  handleImagesCategoryList = (title) => {
    let category = this.#modelGallery.getCategory(title);
    this.#viewGallery.listImages(
      this.#modelGallery.getCategoryImage(category),
      category.title
    );

    this.#viewGallery.bindAddFav(this.handleAddFav);
    this.#viewGallery.bindShowImage(this.handleShowImage);
  };

  handleImagesAuthorList = (nickname) => {
    let author = this.#modelGallery.getAuthor(nickname);
    this.#viewGallery.listImagesAuthor(
      this.#modelGallery.getAuthorImage(author),
      author.nickname
    );
    this.#viewGallery.bindAddFav(this.handleAddFav);
    this.#viewGallery.bindShowImage(this.handleShowImage);
  };

  handleImagesTypeList = (type) => {
    let instance = {
      Landscape: Landscape,
      Portrait: Portrait,
    };
    if (instance[type]) {
      this.#viewGallery.listImages(
        this.#modelGallery.getTypeImages(instance[type]),
        type
      );
      this.#viewGallery.bindAddFav(this.handleAddFav);
      this.#viewGallery.bindShowImage(this.handleShowImage);
    } else {
      throw new Error(`${type} isn't a type of Image.`);
    }
  };

  handleShowImage = (title) => {
    try {
      let image = this.#modelGallery.getImage(title);

      let author = this.#modelGallery.getAuthorOfImage(image.title);

      this.#viewGallery.showImage(image, author);
      this.#viewGallery.bindShowImageInNewWindow(
        this.handleShowImageInNewWindow
      );
    } catch (error) {
      this.#viewGallery.showImage(null, "No existe esta imagen en la página.");
    }
  };

  handleShowImageInNewWindow = (title) => {
    try {
      let image = this.#modelGallery.getImage(title);
      let author = this.#modelGallery.getAuthorOfImage(image.title);
      this.#viewGallery.showImageInNewWindow(image, author);
    } catch (error) {
      this.#viewGallery.showImageInNewWindow(
        null,
        "No existe esta imagen en la página."
      );
    }
  };

  handleNewCategoryForm = () => {
    this.#viewGallery.showNewCategoryForm();
    this.#viewGallery.bindNewCategoryForm(this.handleCreateCategory);
  };

  handleNewAuthorForm = () => {
    this.#viewGallery.showNewAuthorForm();
    this.#viewGallery.bindNewAuthorForm(this.handleCreateAuthor);
  };

  handleNewImageForm = () => {
    this.#viewGallery.showNewImageForm(
      this.#modelGallery.categories,
      this.#modelGallery.authors
    );
    this.#viewGallery.bindNewImageForm(this.handleCreateImage);
  };

  handleCreateCategory = (title, url, desc) => {
    let cat = new Category(title, url, desc);
    let done, error;
    try {
      this.#modelGallery.addCategory(cat);
      this.onAddCategory();
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#viewGallery.showNewCategoryModal(done, cat, error);
  };

  handleRemoveCategory = (title, position) => {
    let done, error, cat;
    try {
      cat = this.#modelGallery.getCategory(title);
      this.#modelGallery.removeCategory(cat);
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#viewGallery.showRemoveCategoryModal(done, cat, position, error);
  };

  handleCreateAuthor = (nickname, email, avatar) => {
    let aut = new Author(nickname, email, avatar);
    let done, error;

    try {
      this.#modelGallery.addAuthor(aut);
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#viewGallery.showNewAuthorModal(done, aut, error);
  };

  handleCreateImage = (
    title,
    type,
    description,
    url,
    coords,
    authors,
    categories
  ) => {
    let instance = {
      Landscape: Landscape,
      Portrait: Portrait,
    };
    let done, error, image;

    try {
      image = new instance[type](title, description, url, coords);

      this.#modelGallery.addImage(image);
      categories.forEach((title2) => {
        authors.forEach((nickname) => {
          let author = this.#modelGallery.getAuthor(nickname);
          let category = this.#modelGallery.getCategory(title2);
          this.#modelGallery.addImageInCategoryWithAuthor(
            category,
            author,
            image
          );
        });
      });
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    this.#viewGallery.showNewImageModal(done, image, error);
  };
  handleRemoveAuthor = (nickname, position) => {
    let done, error, aut;
    try {
      aut = this.#modelGallery.getAuthor(nickname);
      this.#modelGallery.removeAuthor(aut);
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#viewGallery.showRemoveAuthorModal(done, aut, position, error);
  };

  handleRemoveImage = (title, position) => {
    let done, error, image;
    try {
      image = this.#modelGallery.getImage(title);
      this.#modelGallery.removeImage(image);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#viewGallery.showRemoveImageModal(done, image, position, error);
  };

  handleRemoveCategoryForm = () => {
    this.#viewGallery.showRemoveCategoryForm(this.#modelGallery.categories);
    this.#viewGallery.bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleRemoveAuthorForm = () => {
    this.#viewGallery.showRemoveAuthorForm(this.#modelGallery.authors);
    this.#viewGallery.bindRemoveAuthorForm(this.handleRemoveAuthor);
  };

  handleRemoveImageForm = () => {
    this.#viewGallery.showRemoveImageForm(
      this.#modelGallery.categories,
      this.#modelGallery.authors
    );
    this.#viewGallery.bindRemoveImageSelects(
      this.handleRemoveImageListByType,
      this.handleRemoveImageListByCategory,
      this.handleRemoveImageListByAuthor
    );
  };
  handleRemoveImageListByType = (type) => {
    let instance = {
      Landscape: Landscape,
      Portrait: Portrait,
    };
    this.#viewGallery.showRemoveImageList(
      this.#modelGallery.getTypeImages(instance[type])
    );
    this.#viewGallery.bindRemoveImage(this.handleRemoveImage);
    this.#viewGallery.bindShowImage(this.handleShowImage);
  };

  handleRemoveImageListByCategory = (category) => {
    let cat = this.#modelGallery.getCategory(category);
    this.#viewGallery.showRemoveImageList(
      this.#modelGallery.getCategoryImage(cat)
    );
    this.#viewGallery.bindRemoveImage(this.handleRemoveImage);
    this.#viewGallery.bindShowImage(this.handleShowImage);
  };
  handleRemoveImageListByAuthor = (author) => {
    let aut = this.#modelGallery.getAuthor(author);
    this.#viewGallery.showRemoveImageList(
      this.#modelGallery.getAuthorImage(aut)
    );
    this.#viewGallery.bindRemoveImage(this.handleRemoveImage);
    this.#viewGallery.bindShowImage(this.handleShowImage);
  };

  handleRemoveImage = (title, position) => {
    let done, error, image;
    try {
      image = this.#modelGallery.getImage(title);
      this.#modelGallery.removeImage(image);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#viewGallery.showRemoveImageModal(done, image, position, error);
  };

  add = () => {
    if (JSON.parse(localStorage.getItem("miAlmacen")) == null) {
      let almacen = Array();
      localStorage.setItem("miAlmacen", JSON.stringify(almacen));
    }
  };
  add2 = (obj) => {
    let mialmacen = JSON.parse(localStorage.getItem("miAlmacen"));

    console.log(Array.isArray(mialmacen));
    mialmacen.push(obj);
    localStorage.setItem("miAlmacen", JSON.stringify(mialmacen));
  };
  handleAddFav = (title) => {
    let image;
    let tipo = "";

    try {
      image = this.#modelGallery.getImage(title);
      if (image instanceof Landscape) {
        tipo = "Landscape";
      } else if (image instanceof Portrait) {
        tipo = "Portrait";
      } else {
        tipo = "Sin formato";
      }
      image = {
        tipo: tipo,
        title: image.title,
        description: image.description,
        url: image.url,
        coord: image.coords,
      };
      this.add2(image);
    } catch (exception) {
      console.log("error" + exception);
    }
  };
}

$(function () {
  const GalleryApp = new GalleryController(
    Gallery.getInstance(),
    new GalleryView()
  );
  history.replaceState({ action: "init" }, null);
  window.addEventListener("popstate", function (event) {
    if (event.state) {
      switch (event.state.action) {
        case "init":
          GalleryApp.handleInit();
          break;
        case "imagesCategoryList":
          GalleryApp.handleImagesCategoryList(event.state.category);
          break;
        case "imagesAuthorList":
          GalleryApp.handleImagesAuthorList(event.state.author);

          break;
        case "imagesTypeList":
          GalleryApp.handleImagesTypeList(event.state.type);
          break;
        case "showImage":
          GalleryApp.handleShowImage(event.state.title);
          break;
        case "newCategory":
          GalleryApp.handleNewCategoryForm();
          break;
        case "newAuthor":
          GalleryApp.handleNewAuthorForm();
          break;
        case "removeCategory":
          GalleryApp.handleRemoveCategoryForm();
          break;
        case "removeAuthor":
          GalleryApp.handleRemoveAuthorForm();
          break;
        case "newImage":
          GalleryApp.handleNewImageForm();
          break;
        case "removeImage":
          GalleryApp.handleRemoveImageForm();
          break;
        case "removeImageByType":
          GalleryApp.handleRemoveImageForm();
          GalleryApp.handleRemoveImageListByType(event.state.type);
          break;
        case "removeImageByCategory":
          GalleryApp.handleRemoveImageForm();
          GalleryApp.handleRemoveImageListByCategory(event.state.category);
          break;
      }
    }
  });
});


(async ()=> {
  try {
    let obj = [
      {
        jero: "jero",
      },
    ];
    const cosas = JSON.stringify(obj);
    $.ajax({
      url: "create.php",
      data: { "almacenImg": cosas },
      type: "POST",
    });
  }catch(e){
    console.log("Error: " . e.message);
  }
})();