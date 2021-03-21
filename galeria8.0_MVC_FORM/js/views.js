"use strict";

class GalleryView {
  constructor() {
    this.main = $("main");
    this.categories = $("#categories");
    this.tipo = $("#tipo");
    this.authors = $("#authors");
    this.menu = $(".navbar-nav");
    this.imageWindow = null;
  }

  // Métodos generadores de vistas

  showImageTypes() {
    // this.categories.empty();
    this.tipo.empty();
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
      container.append(`<div class="col-lg-3 col-md-6 border"><a data-category="${category.value.title}" href="#image-list">
					<div class="cat-list-image "><img alt="${category.value.title}" src="img/${category.value.title}.jpg" />
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
    if (this.authors.children().length > 1) this.authors.children()[1].remove();
    let container = $('<div id="author-list" class="row"></div>');
    let author = authors.next();
    while (!author.done) {
      container.append(`<div class="col-lg-3 col-md-6 border"><a data-author="${author.value.nickname}" href="#image-list">
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
    let link = $("#navCats");
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
      // alert(category.value.title);
      container.append(
        `<a data-category="${category.value.title}" class="dropdown-item" href="#image-list">${category.value.title}</a>`
      );
      category = categories.next();
    }
    if (link.length === 1) {
      link.next().remove();
      link.parent().append(container);
    } else {
      li.append(container);
      this.menu.append(li);
    }
  }
  showAuthorsInMenu(authors) {
    let link = $("#navCats2");
    let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Autores
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

    if (link.length === 1) {
      link.next().remove();
      link.parent().append(container);
    } else {
      li.append(container);
      this.menu.append(li);
    }
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

  showAdminMenu() {
    let li = $(`<li class="nav-item dropdown">
    <a class = "nav-link dropdown-toggle" href="#" id="navAdmin" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Administración</a></li>`);

    let container = $(`<div class="dropdown-menu" aria-labelledby="navAdmin"> 
      <a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a>
      <a id="ldelCategory" class="dropdown-item" href="#new-category">Eliminar categoría</a>
      <a id="lnewAuthor" class="dropdown-item" href="#new-author">Crear autor</a>
      <a id="ldelAuthor" class="dropdown-item" href="#new-author">Eliminar autor</a>
      <a id="lnewImage" class="dropdown-item" href="#new-image">Crear imagen</a>
      <a id="ldelImage" class="dropdown-item" href="#new-image">Eliminar imagen</a>
      </div>`);
    li.append(container);
    this.menu.append(li);
  }

  showNewCategoryForm() {
    this.main.empty();
    if (this.categories.children().length > 1)
      this.categories.children()[1].remove();
    let container = $(`
          <div id="new-category" class="container my-3">
            <h1 class="display-5">Nueva categoría</h1>
            <form name="fNewCategory" role="form" novalidate>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                      <label for="ncTitle">Título *</label> 
                      <div class="input-group">
                        <div class="input-group-prepend"> <span class="input-group-text" id="titlePrepend"><i class="bi bi-file-earmark-font"></i></i></span> </div>
                        <input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría" aria-describedby="titlePrepend" value="" required> 
                        <div class="invalid-feedback">El título es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="ncUrl">URL *</label> 
                      <div class="input-group">
                        <div class="input-group-prepend"> <span class="input-group-text" id="urlPrepend"><i class="bi bi-terminal"></i></i></span> </div>
                        <input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="http://www.test.es" aria-describedby="urlPrepend" value="" required> 
                        <div class="invalid-feedback">La URL no es válida.</div>
                        <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-8 mb-3">
                      <label for="ncDescription">Descripción</label> 
                      <div class="input-group">
                        <div class="input-group-prepend"> <span class="input-group-text" id="descPrepend"><i class="bi bi-textarea-resize"></i></i></span> </div>
                        <input type="text" class="form-control" id="ncDescription" name="ncDescription" aria-describedby="descPrepend" value="" required> 
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div>
                     
                </div>
                <button class="btn btn-primary" type="submit">Enviar</button> <button class="btn btn-primary" type="reset">Cancelar</button>
            </form>
          </div>
          </div>`);
    this.main.append(container);
  }
  showNewAuthorForm() {
    this.main.empty();
    if (this.authors.children().length > 1) this.authors.children()[1].remove();
    let container = $(`
          <div id="new-author" class="container my-3">
            <h1 class="display-5">Nuevo Autor</h1>
            <form name="fNewAuthor" role="form" novalidate>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                      <label for="naNickname">Nombre de Autor *</label> 
                      <div class="input-group">
                        <div class="input-group-prepend"> <span class="input-group-text" id="nicknamePrepend"><i class="bi bi-file-earmark-font"></i></i></span> </div>
                        <input type="text" class="form-control" id="naNickname" name="naNickname" placeholder="Nombre del Autor" aria-describedby="nicknamePrepend" value="" required> 
                        <div class="invalid-feedback">El Autor es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="naEmail">Email *</label> 
                      <div class="input-group">
                        <div class="input-group-prepend"> <span class="input-group-text" id="emailPrepend"><i class="bi bi-terminal"></i></i></span> </div>
                        <input type="email" class="form-control" id="naEmail" name="naEmail" placeholder="user@user.com" aria-describedby="emailPrepend" value="" required> 
                        <div class="invalid-feedback">El correo electrónico no es valido.</div>
                        <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 mb-3">
                      <label for="naAvatar">ImgAvatar</label> 
                      <div class="input-group">
                        <div class="input-group-prepend"> <span class="input-group-text" id="avatarPrepend"><i class="bi bi-textarea-resize"></i></i></span> </div>
                        <input type="text" class="form-control" id="naAvatar" name="naAvatar" aria-describedby="avatarPrepend" value="" > 
                        <div class="invalid-feedback">Imagen NO válida</div>
                        <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div>   
                </div>
                <button class="btn btn-primary" type="submit">Enviar</button> <button class="btn btn-primary" type="reset">Cancelar</button>
            </form>
          </div>
          </div>`);
    this.main.append(container);
  }

  // showNewImage(authors) {
  //   this.main.empty();
  //   let link = $("#navCats2");
  //   let li = $(`<li class="nav-item dropdown">
  // 		<a class="nav-link dropdown-toggle" href="#" id="navCats3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  // 			Autores
  // 		</a>
  // 	</li>`);
  //   let container = $(
  //     '<div class="dropdown-menu" aria-labelledby="navCats2"></div>'
  //   );
  //   let author = authors.next();
  //   while (!author.done) {

  //     container.append(
  //       `<a data-author="${author.value.nickname}" class="dropdown-item" href="#image-list">${author.value.nickname}</a>`
  //     );
  //     author = authors.next();
  //   }

  //   if (link.length === 1) {
  //     link.next().remove();
  //     link.parent().append(container);
  //   } else {
  //       li.append(container);
  //       this.menu.append(li);

  //   }
  // }

  showNewCategoryModal(done, cat, error) {
    $(document.fNewCategory).find("div.error").remove();
    if (done) {
      let modal = $(
        `<div class="modal fade" id="newCategoryModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
           <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title" id="newCategoryModalLabel">Categoría creada</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> 
              </div>
              <div class="modal-body"> La categoría <strong>${cat.title}</strong> ha sido creada correctamente. </div>
              <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button> </div>
           </div>
        </div>
     </div>`
      );
      $("body").append(modal);
      let newCategoryModal = $("#newCategoryModal");
      newCategoryModal.modal("show");
      newCategoryModal.find("button").click(() => {
        newCategoryModal.on("hidden.bs.modal", function (event) {
          document.fNewCategory.reset();
          document.fNewCategory.ncTitle.focus();
          this.remove();
        });
        newCategoryModal.modal("hide");
      });
    } else {
      $(document.fNewCategory).prepend(
        `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`
      );
    }
  }
  showNewAuthorModal(done, aut, error) {
    $(document.fNewAuthor).find("div.error").remove();
    if (done) {
      let modal = $(
        `<div class="modal fade" id="newAuthorModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newAuthorModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
           <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title" id="newAuthorModalLabel">Autor Creado</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> 
              </div>
              <div class="modal-body"> El autor <strong>${aut.nickname}</strong> ha sido creado correctamente. </div>
              <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button> </div>
           </div>
        </div>
     </div>`
      );
      $("body").append(modal);
      let newAuthorModal = $("#newAuthorModal");
      newAuthorModal.modal("show");
      newAuthorModal.find("button").click(() => {
        newAuthorModal.on("hidden.bs.modal", function (event) {
          document.fNewAuthor.reset();
          document.fNewAuthor.naNickname.focus();
          this.remove();
        });
        newAuthorModal.modal("hide");
      });
    } else {
      $(document.fNewAuthor).prepend(
        `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El autor <strong>${aut.nickname}</strong> ya está creado.</div>`
      );
    }
  }

  showRemoveCategoryForm(categories) {
    this.main.empty();
    this.categories.empty();
    if (this.categories.children().length > 1)
      this.categories.children()[1].remove();
    let container = $(
      `<div id="remove-category" class="container my-3"> <h1 class="display-5">Eliminar una categoría</h1> <div id="category-list" class="row"></div> </div>`
    );
    let category = categories.next();
    while (!category.done) {
      container
        .children()
        .nextAll("div")
        .append(
          `<div class="cat col-lg-3 col-md-6"><a data-category="${category.value.title}" href="#image-list"> <div class="cat-list-image"><img alt="${category.value.title}" src="img/${category.value.title}.jpg" /> </div> <div class="cat-list-text"> <h3>${category.value.title}</h3> <div><button class="btn btn-primary" data-category="${category.value.title}" type='button'>Eliminar</button></div> </div> </a> </div>`
        );
      category = categories.next();
    }
    this.categories.append(container);
    this.main.append(container);
  }
  showRemoveAuthorForm(authors) {
    this.main.empty();
    this.authors.empty();
    if (this.authors.children().length > 1) this.authors.children()[1].remove();
    let container = $(
      `<div id="remove-author" class="container my-3"> <h1 class="display-5">Eliminar un autor</h1> <div id="author-list" class="row"></div> </div>`
    );
    let author = authors.next();
    while (!author.done) {
      container
        .children()
        .nextAll("div")
        .append(
          `<div class="aut col-lg-3 col-md-6"><a data-author="${author.value.nickname}" href="#image-list"> <div class="cat-list-image"><img alt="${author.value.nickname}" src="img/${author.value.nickname}.jpg" /> </div> <div class="cat-list-text"> <h3>${author.value.nickname}</h3> <div><button class="btn btn-primary" data-author="${author.value.nickname}" type='button'>Eliminar</button></div> </div> </a> </div>`
        );
      author = authors.next();
    }
    this.authors.append(container);
    this.main.append(container);
  }

  showRemoveCategoryModal(done, cat, position, error) {
    $("remove-category").find("div.error").remove();
    if (done) {
      let modal = $(
        `<div class="modal fade" id="removeCategoryModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
           <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title" id="removeCategoryModalLabel">Categoría eliminada</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> 
              </div>
              <div class="modal-body"> La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente. </div>
              <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button> </div>
           </div>
        </div>
     </div>`
      );
      $("body").append(modal);
      let removeCategoryModal = $("#removeCategoryModal");
      removeCategoryModal.modal("show");
      removeCategoryModal.find("button").click(() => {
        removeCategoryModal.on("hidden.bs.modal", function (event) {
          this.remove();
        });
        removeCategoryModal.modal("hide");
        let divCat = $("#remove-category").find(
          `div > div:nth-child(${position + 1})`
        );
        divCat.remove();
      });
    } else {
      $("#removeCategoryModal").prepend(
        `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> no exite en la Galeria.</div>`
      );
    }
  }
  showRemoveAuthorModal(done, aut, position, error) {
    console.log(position);
    $("remove-author").find("div.error").remove();
    if (done) {
      let modal = $(
        `<div class="modal fade" id="removeAuthorModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeAuthorModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
           <div class="modal-content">
              <div class="modal-header">
                 <h5 class="modal-title" id="removeAuthorModalLabel">Autor eliminado</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> 
              </div>
              <div class="modal-body"> El autor <strong>${aut.nickname}</strong> ha sido eliminado correctamente. </div>
              <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button> </div>
           </div>
        </div>
     </div>`
      );

      $("body").append(modal);
      let removeAuthorModal = $("#removeAuthorModal");
      removeAuthorModal.modal("show");
      removeAuthorModal.find("button").click(() => {
        removeAuthorModal.on("hidden.bs.modal", function (event) {
          this.remove();
        });
        removeAuthorModal.modal("hide");
        let divAut = $("#remove-author").find(
          `div > div:nth-child(${position + 1})`
        );

        divAut.remove();
      });
    } else {
      $("#removeAuthorModal").prepend(
        `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El autor <strong>${aut.nickname}</strong> no exite en la Galeria.</div>`
      );
    }
  }
  showNewImageForm(categories, authors) {
    this.main.empty();
    if (this.categories.children().length > 1)
      this.categories.children()[1].remove();

    let container = $(`<div id="new-image" class="container my-3">
			<h1 class="display-5">Nueva Imagen</h1>
		</div>`);
    let form = $(`<form name="fNewImage" role="form" novalidate><form>`);
    form.append(`<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="ncTitle">Titulo de la imagen *</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="titlePrepend"><i class="fas fa-key"></i></span>
					</div>
					<input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Titulo de la imagen" aria-describedby="titlePrepend" value="" required>
					<div class="invalid-feedback">El titulo de la imagen es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);
    form.append(`<div class="form-row mb-2">
			* Tipo de Imagen
		</div>
		<div class="form-row" id="cType">
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npLandscapeType" value="Landscape" required>
					</div>
				</div>
				<label class="form-control" for="npLandscapeType">Landscape</label>
			</div>
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npPortraitType" value="Portrait" required>
					</div>
				</div>
				<label class="form-control" for="npPortraitType">Portrait</label>
			</div>
			
			<div class="col-md-3 mb-3 mt-1 input-group">
				<div class="invalid-feedback"><i class="fas fa-times"></i> El tipo de Imagen es obligatorio.</div>
				<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>
			</div>
		</div>`);
    form.append(`<div class="form-row">
			
			<div class="col-md-6 mb-3">
				<label for="npUrl">URL *</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="urlPrepend"><i class="fas fa-image"></i></span>
					</div>
					<input type="url" class="form-control" id="npUrl" name="npUrl" placeholder="http://www.miImagen.es" aria-describedby="urlPrepend" value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);

    let selectCat = $(
      `<select class="custom-select" id="npCategories" name="npCategories" aria-describedby="categoryPrepend" required multiple></select>`
    );
    let category = categories.next();
    while (!category.done) {
      selectCat.append(
        `<option value="${category.value.title}">${category.value.title}</option>`
      );
      category = categories.next();
    }
    let selectContainerCat = $(`<div class="form-row">
			<div class="col-md-3 mb-3">
				<label for="npCategories">Categorías *</label>
				<div class="input-group">
					<div class="input-group mb-3" id="categoriesContainer">
						<div class="input-group-prepend">
							<span class="input-group-text" id="categoryPrepend"><i class="fas fa-list-alt"></i></span>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-9 mb-3">
				<label for="ncDescription">Descripción</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="descPrepend"><i class="fas fa-align-left"></i></span>
					</div>
					<textarea class="form-control" id="ncDescription" name="ncDescription" aria-describedby="descPrepend" >
					</textarea>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);
    let selectAut = $(
      `<select class="custom-select" id="npAuthors" name="npAuthors" aria-describedby="authorPrepend" required multiple></select>`
    );
    let author = authors.next();
    while (!author.done) {
      selectAut.append(
        `<option value="${author.value.nickname}">${author.value.nickname}</option>`
      );
      author = authors.next();
    }
    let selectContainerAut = $(`<div class="form-row">
			<div class="col-md-3 mb-3">
				<label for="npAuthors">Autores *</label>
				<div class="input-group">
					<div class="input-group mb-3" id="authorsContainer">
						<div class="input-group-prepend">
							<span class="input-group-text" id="authorPrepend"><i class="fas fa-list-alt"></i></span>
						</div>
            
					</div>
          
				</div>
        <div class="col-md-9 mb-9">
        <label for="ncCoordenadas">Coordenadas</label> 
        <div class="input-group">
          <div class="input-group-prepend"> <span class="input-group-text" id="coordPrepend"><i class="bi bi-map"></i></i></i></span> </div>
          <input type="text" class="form-control" id="ncCoordenadas" name="ncCoordenadas" aria-describedby="coordPrepend" value="" placeholder="[-]deg.dddddd , [-]deg.dddddd" "> 
          <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
        </div>
    </div> 
			</div>
		</div>`);
    // pattern="^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$
    selectContainerCat.find("#categoriesContainer").first().append(selectCat);
    selectContainerCat
      .find("#categoriesContainer")
      .first()
      .append(
        `<div class="invalid-feedback"><i class="fas fa-times"></i> El tipo de Imagen es obligatorio.</div>`
      );
    selectContainerCat
      .find("#categoriesContainer")
      .first()
      .append(
        `<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>`
      );
    form.append(selectContainerCat);
    selectContainerAut.find("#authorsContainer").first().append(selectAut);
    selectContainerAut
      .find("#authorsContainer")
      .first()
      .append(
        `<div class="invalid-feedback"><i class="fas fa-times"></i> El author es obligatorio.</div>`
      );
    selectContainerAut
      .find("#authorsContainer")
      .first()
      .append(
        `<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>`
      );
    form.append(selectContainerAut);
    form.append(
      `<button class="btn btn-primary m-1" type="submit">Enviar</button>`
    );
    form.append(
      `<button class="btn btn-primary m-1" type="reset">Cancelar</button>`
    );
    container.append(form);
    this.main.append(container);
  }

  showNewImageModal(done, image, error) {
    $(document.fNewImage).find("div.error").remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newImageModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Imagen Creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La imagen <strong>${image.title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
      $("body").append(modal);
      let newImageModal = $("#newImageModal");
      newImageModal.modal("show");
      newImageModal.find("button").click(() => {
        newImageModal.on("hidden.bs.modal", function (event) {
          document.fNewImage.reset();
          document.fNewImage.ncTitle.focus();
          this.remove();
        });
        newImageModal.modal("hide");
      });
    } else {
      $(document.fNewImage).prepend(
        `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> 	La imagen <strong>${image.title}</strong> no ha podido crearse correctamente.</div>`
      );
    }
  }

  showRemoveImageForm(categories,authors) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="remove-image" class="container my-3">
			<h1 class="display-5">Eliminar una Imagen</h1>
				<div class="form-row">
					<div class="col-md-6 mb-3">
						<label for="ncTitle">Tipos de Imagenes</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="typePrepend"><i class="fas fa-list-alt"></i></span>
							</div>
							<select class="custom-select" id="rpType" name="rpType" aria-describedby="typePrepend">
								<option disabled selected>Selecciona un tipo</option>
								<option value="Landscape">LandScape</option>
								<option value="Portrait">Portrait</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncUrl">Categorías</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="categoryPrepend"><i
										class="fas fa-list-alt"></i></span>
							</div>
							<select class="custom-select" id="rpCategories" name="rpCategories" aria-describedby="categoryPrepend">
								<option disabled selected>Selecciona una categoría</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncUrl">Autores</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="authorPrepend"><i
										class="fas fa-list-alt"></i></span>
							</div>
							<select class="custom-select" id="rpAuthors" name="rpAuthors" aria-describedby="authorPrepend">
								<option disabled selected>Selecciona un autor</option>
							</select>
						</div>
					</div>
				</div>
				<div id="image-list" class="container my-3"><div class="row"></div></div>
		</div>`);

		let categoriesSelect = container.find('#rpCategories');
		let category = categories.next();
		while (!category.done){
			categoriesSelect.append(`<option value="${category.value.title}">${category.value.title}</option>`);
			category = categories.next();
		}
		this.categories.append(container);

		let authorsSelect = container.find('#rpAuthors');
		let author = authors.next();
		while (!author.done){
			authorsSelect.append(`<option value="${author.value.nickname}">${author.value.nickname}</option>`);
			author = authors.next();
		}
		this.authors.append(container);

		this.main.append(container);
	}

  showRemoveImageList(images) {
		let listContainer = $('#image-list div.row');
		listContainer.empty();

		let image = images.next();
		while (!image.done){
			let div = $(`<div class="col-md-4 rImage">
      <figure class="card card-image-grid card-lg border"> <a data-title="${image.value.title}" href="#single-image" class="img-wrap"><img class="${image.value.title}-style" src="${image.value.url}"></a>
        <figcaption class="info-wrap">
          <div class="row">
            <div class="col-md-8"> <a data-title="${image.value.title}" href="#single-image" class="title">${image.value.title} - ${image.value.description}</a> </div>
            <div class="col-md-4">
              <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
            </div>
          </div>
        </figcaption>
        <div class="bottom-wrap"> <a href="#" data-title="${image.value.title}" class="btn btn-primary float-right"> Eliminar </a></div>
      </figure>
    </div>`);
			listContainer.append(div);
			image = images.next();
		}
	}
  showRemoveImageModal(done, image, position, error) {
		$('#remove-image').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeImageModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeImageModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeImageModalLabel">Imagen eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La imagen <strong>${image.title}</strong> ha sido eliminado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeCategoryModal = $('#removeImageModal');
				removeCategoryModal.modal('show');
				removeCategoryModal.find('button').click(() => {
					removeCategoryModal.on('hidden.bs.modal', function (event) {
						this.remove();
				});
				removeCategoryModal.modal('hide');
				let divCat = $('#image-list').find(`div > div:nth-child(${position + 1})`);
				divCat.remove();
			})
		} else {
			$('#remove-image').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La imagen <strong>${image.title}</strong> no exite en la galeria.</div>`);
		}
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
  bindAdminMenu(
    hNewCategory,
    hRemoveCategory,
    hNewAuthor,
    hRemoveAuthor,
    hNewImage,
    hRemoveImage
  ) {
    $("#lnewCategory").click((event) => {
      this.#excecuteHandler(
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    $("#ldelCategory").click((event) => {
      this.#excecuteHandler(
        hRemoveCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });

    $("#lnewAuthor").click((event) => {
      this.#excecuteHandler(
        hNewAuthor,
        [],
        "#new-author",
        { action: "newAuthor" },
        "#",
        event
      );
    });
    $("#ldelAuthor").click((event) => {
      this.#excecuteHandler(
        hRemoveAuthor,
        [],
        "#remove-author",
        { action: "removeAuthor" },
        "#",
        event
      );
    });
    $("#lnewImage").click((event) => {
      this.#excecuteHandler(
        hNewImage,
        [],
        "#new-image",
        { action: "newImage" },
        "#",
        event
      );
    });
    $("#ldelImage").click((event) => {
      this.#excecuteHandler(
        hRemoveImage,
        [],
        "#remove-image",
        { action: "removeImage" },
        "#",
        event
      );
    });
  }

  bindRemoveCategoryForm(handler) {
    $("#remove-category")
      .find("button")
      .click(function (event) {
        handler(this.dataset.category, $(this).closest("div.cat").index());
      });
  }
  bindRemoveAuthorForm(handler) {
    $("#remove-author")
      .find("button")
      .click(function (event) {
        handler(this.dataset.author, $(this).closest("div.aut").index());
      });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }
  bindNewAuthorForm(handler) {
    newAuthorValidation(handler);
  }

  bindNewImageForm(handler) {
    newImageValidation(handler);
  }

  bindRemoveImageSelects(hTypes, hCategories, hAuthors){
		$('#rpType').change((event) => {
			this.#excecuteHandler(
				hTypes, [event.target.value],
				'#remove-image',
				{action: 'removeImageByType', type: event.target.value},
				'#remove-image', event
			);
		});
		$('#rpCategories').change((event) => {
			this.#excecuteHandler(
				hCategories, [event.target.value],
				'#remove-image',
				{action: 'removeImageByCategory', category: event.target.value},
				'#remove-image', event
			);
		});
		$('#rpAuthors').change((event) => {
			this.#excecuteHandler(
				hAuthors, [event.target.value],
				'#remove-image',
				{action: 'removeImageByAuthor', author: event.target.value},
				'#remove-image', event
			);
		});
	}

	bindRemoveImage(handler){
		$('#image-list a.btn').click(function (event){
			handler(this.dataset.title, $(this).closest('div.rImage').index());
			event.preventDefault();
		});
	}

  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }
}
