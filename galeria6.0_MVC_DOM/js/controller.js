"use strict";


class GalleryController {
  //Campos privados
    #modelGallery;
	#viewGallery;

	#loadGalleryObjects(){
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
          let category3 = new Category("Espacio", "Imagenes sobre el universo y las estrellas");
          let category4 = new Category("Ciudades", "Imagenes sobre Ciudades del Mundo");
          
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
          let au4 = new Author(
            "Jane Austen",
            "jane@gmail.es",
            "img/Jane Austen.jpg"
          );
          
          
          let gallery = Gallery.getInstance();
          
          gallery.addCategory(category2, category1, category4, category3);
          gallery.addImage(img1,img2,img3,img4,img5,img6,img7,img8);
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


  constructor(modelGallery, viewGallery){
    this.#modelGallery = modelGallery;
		this.#viewGallery = viewGallery;

		// Eventos iniciales del Controlador
		this.onLoad();
		this.onInit();

		// Enlazamos handlers con la vista
		this.#viewGallery.bindInit(this.handleInit);
		this.#viewGallery.bindImagesTypeList(this.handleImagesTypeList);

	}

	// Eventos del Controlador
	onLoad = () => {
		this.#loadGalleryObjects();
		this.#viewGallery.showImageTypes();
		this.#viewGallery.showCategoriesInMenu(this.#modelGallery.categories);
		this.#viewGallery.showAuthorsInMenu(this.#modelGallery.authors);
	}

	onInit = () => {
		this.#viewGallery.showCategories(this.#modelGallery.categories);
		this.#viewGallery.bindImagesCategoryList(this.handleImagesCategoryList);
		this.#viewGallery.showAuthors(this.#modelGallery.authors);
		this.#viewGallery.bindImagesAuthorList(this.handleImagesAuthorList);
	}

	// Manejadores para la gestión peticiones de la Vista
	handleInit = () => {
		this.onInit();
	}

	handleImagesCategoryList = (title) => {
		let category = this.#modelGallery.getCategory(title);
		this.#viewGallery.listImages(this.#modelGallery.getCategoryImage(category),category.title);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}
	handleImagesAuthorList = (nickname) => {
		let author = this.#modelGallery.getAuthor(nickname);
		this.#viewGallery.listImagesAuthor(this.#modelGallery.getAuthorImage(author),author.nickname);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleImagesTypeList = (type) => {
		let instance = {
			Landscape: Landscape,
			Portrait: Portrait
		}
		if (instance[type]){
			this.#viewGallery.listImages(this.#modelGallery.getTypeImages(instance[type]), type);
			this.#viewGallery.bindShowImage(this.handleShowImage);
		} else {
			throw new Error (`${type} isn't a type of Image.`)
		}
	}

	handleShowImage = (title) => {
		try { 
			let image = this.#modelGallery.getImage(title);
      
      let author = this.#modelGallery.getAuthorOfImage(image.title);
			this.#viewGallery.showImage(image,author);
		} catch (error){
			this.#viewGallery.showImage(null, 'No existe este Imageo en la página.');
		}
	}


}

$(function(){
  const GalleryApp = new GalleryController(
		Gallery.getInstance(), new GalleryView()
	);
});
