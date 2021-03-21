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
    console.log(this.#modelGallery.categories);
  }

  #loadGalleryObjects() {
    let img1 = new Landscape(
      "Perrito tranquilo",
      "Imagen muy bonita",
      "img/img1.jpg",
      new Coords(20, 20)
    );
    let img2 = new Landscape(
      "El bosque Retorcido",
      "Imagen ilustrativa",
      "img/img2.jpg",
      new Coords(10, 30)
    );
    let img3 = new Landscape(
      "La gran cascada",
      "Increible caida del agua",
      "img/img3.jpg",
      new Coords(50, 20)
    );
    let img4 = new Landscape(
      "Pajaritos",
      "Gran colorido",
      "img/img4.jpg",
      new Coords(50, 20)
    );
    let img5 = new Portrait(
      "Constelaciones",
      "Imagen astronomia brutal",
      "img/img5.jpg",
      new Coords(20, 20)
    );
    let img6 = new Portrait(
      "Nebulosa",
      "Una bonita nebulosa",
      "img/img6.jpg",
      new Coords(30, 50)
    );
    let img7 = new Portrait(
      "Paris",
      "La ciudad del Amor",
      "/img/img7.jpg",
      new Coords(50, 10)
    );
    let img8 = new Portrait(
      "Italia",
      "Castell Peralada increible",
      "img/img8.jpg",
      new Coords(60, 60)
    );

    let category1 = new Category("Naturaleza", "Imagenes sobre la Naturaleza");
    let category2 = new Category("Animales", "Imagenes sobre animales");
    let category3 = new Category(
      "Espacio",
      "Imagenes sobre el universo y las estrellas"
    );
    let category4 = new Category(
      "Ciudades",
      "Imagenes sobre Ciudades del Mundo"
    );

    let au1 = new Author(
      "Fiódor Dostoievski",
      "fiodor@gmail.es",
      "img/Fiódor Dostoievski.jpg"
    );
    let au2 = new Author(
      "Gabriel García Márquez",
      "gabriel@gmail.es",
      "img/Gabriel García Márquez.jpg"
    );
    let au3 = new Author(
      "Johann Wolfgang",
      "johann@gmail.es",
      "img/Johann Wolfgang.jpg"
    );
    let au4 = new Author("Jane Austen", "jane@gmail.es", "img/Jane Austen.jpg");

    let gallery = this.#modelGallery;

    gallery.addCategory(category2, category1, category4, category3);
    gallery.addImage(img1, img2, img3, img4, img5, img6, img7, img8);
    gallery.addAuthor(au1, au3, au2, au4);
    gallery.addImageInCategoryWithAuthor(category1, au1, img2);
    gallery.addImageInCategoryWithAuthor(category1, au1, img3);
    gallery.addImageInCategoryWithAuthor(category2, au1, img4);
    gallery.addImageInCategoryWithAuthor(category2, au2, img1);
    gallery.addImageInCategoryWithAuthor(category3, au3, img5);
    gallery.addImageInCategoryWithAuthor(category3, au4, img6);
    gallery.addImageInCategoryWithAuthor(category4, au2, img7);
    gallery.addImageInCategoryWithAuthor(category4, au4, img8);
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

        // this.setCookie("usuario", username.value, 30);
        location.href = "index.html";
      }
    });
  }
  closesesion() {
    if (this.getCookie("usuario") == "jero") {
      const closeS = document.getElementById("close");
      closeS.addEventListener("click", function () {
        document.cookie = "usuario=jero; expires=Thu, 31 Dec 2000 12:00:00 UTC; path=/;";
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
    // this.#viewGallery.showImageTypes();

    this.#viewGallery.showAuthors(this.#modelGallery.authors);
    this.#viewGallery.bindImagesAuthorList(this.handleImagesAuthorList);
    this.#viewGallery.showCategories(this.#modelGallery.categories);
    this.#viewGallery.bindImagesCategoryList(this.handleImagesCategoryList);
  };
  // Eventos del Controlador
  onLoad = () => {
    this.#loadGalleryObjects();

    this.#viewGallery.showImageTypes();
    this.onAddCategory();
    // Enlazamos handlers con la vista
    this.checkUser();
    let username1=this.getCookie("usuario");

    
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
