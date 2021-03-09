"use strict";

class GalleryView {
  constructor() {
    this.main = $("main");
    this.categories = $("#categories");
    this.tipo=$("#tipo");
    this.authors = $("#authors");
    this.menu = $(".navbar-nav");
    this.imageWindow = null;
  }

  // Métodos generadores de vistas

  showImageTypes() {
    // this.categories.empty();
    this.tipo.append(`
    <div id="type-list" class="row">
    <div class="col-lg-6 col-md-6">
          <div class="card "><a data-type="Landscape" href="#image-list">
            <img src="img/portrait.jpg" class="card-img-top" alt="img/portrait.jpg">
            <div class="card-img-overlay text-white d-flex flex-column justify-content-center">
            <h4 class="card-title text-center">LandScape</h4>
            </div>
            </a>
          </div>
          </div>
          <div class="col-lg-6 col-md-6">
          <div class="card "><a data-type="Portrait" href="#image-list">
            <img src="img/landscape.jpg" class="card-img-top" alt="img/landscape.jpg">
            <div class="card-img-overlay text-white d-flex flex-column justify-content-center">
            <h4 class="card-title text-center">Portrait</h4>
            </div>
            </a>
          </div>
          <br>
          </div>
          
		</div>
  
  `);
  }
  showCategories(categories) {
    // this.categories.empty();
    this.main.empty();
    
    if (this.categories.children().length > 1)
      this.categories.children()[1].remove();
    let container = $('<div id="category-list" class="row"></div>');
    let category = categories.next();
    while (!category.done) {
      container.append(`<div class="col-lg-3 col-md-6"><a data-category="${category.value.title}" href="#image-list">
					<div class="cat-list-image"><img alt="${category.value.title}" src="img/${category.value.title}.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>${category.value.title}</h3>
						<div>${category.value.description}</div>
					</div>
				</a>
			</div>`);
      category = categories.next();
    }
    this.categories.append(container);
  }
  showAuthors(authors) {
    this.main.empty();
    this.categories.empty();
    this.authors.empty();
    if (this.authors.children().length > 1) 
      this.authors.children()[1].remove();
    let container = $('<div id="author-list" class="row"></div>');
    let author = authors.next();
    while (!author.done) {
      container.append(`<div class="col-lg-3 col-md-6"><a data-author="${author.value.nickname}" href="#image-list">
					<div class="cat-list-image"><img alt="${author.value.nickname}" src="${author.value.avatar}" />
					</div>
					<div class="cat-list-text">
						<h3>${author.value.nickname}</h3>
						<div>${author.value.email}</div>
					</div>
				</a>
			</div>`);
      author = authors.next();
    }
    this.authors.append(container);
  }

  showCategoriesInMenu(categories) {
    let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Categorías
			</a>
		</li>`);
    let container = $(
      '<div class="dropdown-menu" aria-labelledby="navCats"></div>'
    );
    let category = categories.next();
    while (!category.done) {
      container.append(
        `<a data-category="${category.value.title}" class="dropdown-item" href="#image-list">${category.value.title}</a>`
      );
      category = categories.next();
    }
    li.append(container);
    this.menu.append(li);
  }
  showAuthorsInMenu(authors) {
    let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Authors
			</a>
		</li>`);
    let container = $(
      '<div class="dropdown-menu" aria-labelledby="navCats2"></div>'
    );
    let author = authors.next();
    while (!author.done) {
      container.append(
        `<a data-author="${author.value.nickname}" class="dropdown-item" href="#image-list">${author.value.nickname}</a>`
      );
      author = authors.next();
    }
    li.append(container);
    this.menu.append(li);
  }

  listImages(images, title) {
    // this.categories.empty();
    this.main.empty();
    this.authors.empty();
    this.tipo.empty();
    if (this.categories.children().length > 1)
      this.categories.children()[1].remove();

    let container = $(
      `<div id="image-list" class="container my-3"><div class="row"> </div></div>`
    );
    let image = images.next();

    while (!image.done) {
      let div = $(`<div class="col-md-4">
				<figure class="card card-image-grid card-lg border"> <a data-title="${image.value.title}" href="#single-image" class="img-wrap"><img class="${image.value.title}-style" src="${image.value.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-title="${image.value.title}" href="#single-image" class="title">${image.value.title} - ${image.value.description}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-title="${image.value.title}" class="btn btn-primary float-right"> Ver </a></div>
				</figure>
			</div>`);
      container.children().first().append(div);
      image = images.next();
    }

    if (title === "Portrait" || title === "Landscape") {
      container.prepend(`<h1>Formato de imagen: <b>${title}</b></h1>`);
    } else {
      container.prepend(`<h1>Categoria de: <b>${title}</b></h1>`);
    }
    this.main.append(container);
  }
  listImagesAuthor(images, title) {
    this.main.empty();
    this.categories.empty();
    this.tipo.empty();
    if (this.authors.children().length > 1) this.authors.children()[1].remove();
    let container = $(
      `<div id="image-list" class="container my-3"><div class="row"> </div></div>`
    );
    let image = images.next();
    while (!image.done) {
      let div = $(`<div class="col-md-4">
      
				<figure class="card card-image-grid card-lg border"> <a data-title="${image.value.title}" href="#single-image" class="img-wrap"><img class="${image.value.title}-style" src="${image.value.url}"></a>
					<figcaption class="info-wrap ">
						<div class="row ">
							<div class="col-md-8"> <a data-title="${image.value.title}" href="#single-image" class="title">${image.value.title} - ${image.value.description}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-title="1" class="btn btn-primary float-right"> Leer </a></div>
				
				</figure>
			</div>`);
      container.children().first().append(div);
      image = images.next();
    }
    container.prepend(`<h1>Imagenes de: <b>${title}</b></h1>`);
    this.main.append(container);
  }

  showImage(image, author, message) {
    this.main.empty();
    if (this.categories.children().length > 1)
      this.categories.children()[1].remove();
    let container;
    let tipo = "";
    if (image instanceof Portrait) {
      tipo = "Portrait";
    }
    if (image instanceof Landscape) {
      tipo = "Landscape";
    }
    if (image) {
      container = $(`
      
      <div id="single-image" class="${image.title}-style container mt-5 mb-5">
      <div class="card float-center border">
      <div class="row">
        <div class="col-sm-5">
          <img class="d-block w-100" src="${image.url}" alt="">
        </div>
        <div class="col-sm-7">
          <div class="card-block">
          <div class="card-custom-avatar">
          <img class="rounded-circle" src="/img/${author}.jpg" alt="Avatar" />
        </div>
        <br><br><br>
          <h4 class="card-title">${image.title}</h4> 
            <p><b>Description:</b> ${image.description}</p>
            <p><b>Tipo de Imagen: </b>${tipo}</p>
            <p><b>Author: </b>${author}</p>
            
            
            <br><br>
            <button id="b-open" data-title="${image.title}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
            <button id="b-close" data-title="${image.title}" class="btn btn-primary text-uppercase mr-2 px-4">Cerrar ventanas</button>
          </div>
        </div>
 
      </div>
    </div>
  </div>
  </div>`);
    } else {
      container = $(`	<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
    }

    this.main.append(container);
  }
  showImageAuthor(image, message) {
    this.main.empty();
    if (this.authors.children().length > 1) this.authors.children()[1].remove();
    let container;

    if (image) {
      container = $(`<div id="single-image" class="${image.title}-style container mt-5 mb-5">
      <div class="row justify-content-center h-100 ">
            <div class="card" style="width: 18rem; ">
            <img class="card-img-top " src="https://via.placeholder.com/258x172.jpg?text=${image.title}" alt="Card image cap"  >
            <div class="card-body border">
              <h5 class="card-title">${image.title}</h5>
              <p>Description:</p>
              <p class="card-text">${image.description}.</p>
              <a href="#" class="btn btn-primary">Leer</a>
            </div>
          </div>
          </div>
			</div>
            `);
    } else {
      container = $(`	<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
    }
    let div = $(
      ' <div class="bottom-wrap"> <a href="index.html"  class="btn btn-primary float-right"> Volver </a></div>'
    );
    container.children().first().append(div);
    this.main.append(container);
  }

  showImageInNewWindow(image, author, message) {
    let main = $(this.imageWindow.document).find("main");
    let header = $(this.imageWindow.document).find("header nav");
    main.empty();
    header.empty();
    let container;
    let tipo = "";
    if (image instanceof Portrait) {
      tipo = "Portrait";
    }
    if (image instanceof Landscape) {
      tipo = "Landscape";
    }
    if (image) {
      this.imageWindow.document.title = `${image.title}`;
      header.append(
        `<h1 data-title="${image.title}" class="display-5">${image.title} - ${image.title}</h1>`
      );
      container = $(`<div id="single-image" class="${image.title}-style container mt-5 mb-5">
      <div class="card float-center border">
      <div class="row">
        <div class="col-sm-5">
          <img class="d-block w-100" src="${image.url}" alt="">
        </div>
        <div class="col-sm-7">
          <div class="card-block">
          <div class="card-custom-avatar">
          <img class="rounded-circle" src="/img/${author}.jpg" alt="Avatar" />
        </div>
        <br><br><br>
          <h4 class="card-title">${image.title}</h4> 
            <p><b>Description:</b> ${image.description}</p>
            <p><b>Tipo de Imagen: </b>${tipo}</p>
            <p><b>Author: </b>${author}</p>
            
            <button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button> <button class="btn btn-primary text-uppercase m-2 px-4">Leer Más</button></div>
           

          </div>
          
        </div>
        
      </div>
    </div>
  </div>
  
	`);
      
    } else {
      container = $(`	<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
    }
    main.append(container);
    this.imageWindow.document.body.scrollIntoView();
  }

  // Métodos de enlace con Manejadores del Controlador
  bindInit(handler) {
    $("#init").click((event) => {
      this.#excecuteHandler(
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    $("#logo").click((event) => {
      this.#excecuteHandler(
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  bindImagesCategoryList(handler) {
    $("#category-list")
      .find("a")
      .click((event) => {
        let category = $(event.target).closest($("a")).get(0).dataset.category;

        this.#excecuteHandler(
          handler,
          [category],
          "#image-list",
          { action: "imagesCategoryList", category: category },
          "#category-list",
          event
        );
      });
  }
  bindImagesAuthorList(handler) {
    $("#author-list")
      .find("a")
      .click((event) => {
        let author = $(event.target).closest($("a")).get(0).dataset.author;

        this.#excecuteHandler(
          handler,
          [author],
          "#image-list",
          { action: "imagesAuthorList", author: author },
          "#author-list",
          event
        );
      });
  }

  bindImagesCategoryInMenuList(handler) {
    $("#navCats")
      .next()
      .children()
      .click((event) => {
        let category = $(event.target).closest($("a")).get(0).dataset.category;

        this.#excecuteHandler(
          handler,
          [category],
          "#image-list",
          { action: "imagesCategoryList", category: category },
          "#category-list",
          event
        );
      });
  }
  bindImagesAuthorInMenuList(handler) {
    $("#navCats2")
      .next()
      .children()
      .click((event) => {
        let author = $(event.target).closest($("a")).get(0).dataset.author;

        this.#excecuteHandler(
          handler,
          [author],
          "#image-list",
          { action: "imagesAuthorList", author: author },
          "#author-list",
          event
        );
      });
  }

  bindImagesTypeList(handler) {
    $("#type-list")
      .find("a")
      .click((event) => {
        let type = $(event.target).closest($("a")).get(0).dataset.type;
        console.log(type);
        this.#excecuteHandler(
          handler,
          [type],
          "#image-list",
          { action: "imagesTypeList", type: type },
          "#type-list",
          event
        );
      });
  }

  bindShowImage(handler) {
    $("#image-list")
      .find("a.img-wrap")
      .click((event) => {
        let title = $(event.target).closest($("a")).get(0).dataset.title;

        this.#excecuteHandler(
          handler,
          [title],
          "#single-image",
          { action: "showImage", title: title },
          "#single-image",
          event
        );
      });
    $("#image-list")
      .find("figcaption a")
      .click((event) => {
        this.#excecuteHandler(
          handler,
          [event.target.dataset.title],
          "#single-image",
          { action: "showImage", title: event.target.dataset.title },
          "#image-list",
          event
        );
      });
  }

  bindShowImageInNewWindow(handler) {
    $("#b-open").click((event) => {
      if (!this.imageWindow || this.imageWindow.closed) {
        this.imageWindow = window.open(
          "image.html",
          "ImageWindow",
          "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
        );
        this.imageWindow.addEventListener("DOMContentLoaded", () => {
          handler(event.target.dataset.title);
        });
      } else {
        if (
          $(this.imageWindow.document).find("header nav h1").get(0).dataset
            .title !== event.target.dataset.title
        ) {
          handler(event.target.dataset.title);
        }
        this.imageWindow.focus();
      }
    });
    $("#b-close").click((event) => {
      if (this.imageWindow && !this.imageWindow.closed) {
        this.imageWindow.close();
      }
    });
  }

  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }
}
