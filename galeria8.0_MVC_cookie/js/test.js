let img1 = new Landscape(
  "Cien años de soledad",
  "Libro muy bonito",
  "https://via.placeholder.com/258x172.jpg?text=Cien+años+de+soledad",
  new Coords(20, 20)
);
let img2 = new Landscape(
  "Crimen y castigo",
  "Libro muy cruel",
  "https://via.placeholder.com/258x172.jpg?text=Crimen+y+castigo",
  new Coords(10, 30)
);
let img3 = new Landscape(
  "El idiota",
  "Libro con nombre Peculiar",
  "https://via.placeholder.com/258x172.jpg?text=El+idiota",
  new Coords(50, 20)
);
let img4 = new Landscape(
  "Los endemoniados",
  "Libro de miedo",
  "https://via.placeholder.com/258x172.jpg?text=Los+Endemoniados",
  new Coords(50, 20)
);
let img5 = new Portrait(
  "Fausto",
  "Libro de un tal Fausto",
  "https://via.placeholder.com/258x172.jpg?text=Fausto",
  new Coords(20, 20)
);
let img6 = new Portrait(
  "Orgullo y prejuicio",
  "Libro increible",
  "https://via.placeholder.com/258x172.jpg?text=Orgullo+y+prejuicio",
  new Coords(30, 50)
);
let img7 = new Portrait(
  "Ficciones",
  "Libro de Ciencia Ficcion",
  "https://via.placeholder.com/258x172.jpg?text=Ficcion",
  new Coords(50, 10)
);
let img8 = new Portrait(
  "Odisea",
  "Libro que es una odisea",
  "https://via.placeholder.com/258x172.jpg?text=Odisea",
  new Coords(60, 60)
);

let category1 = new Category("Novelas", "Buenas novelas");
let category2 = new Category("Amorosas", "Buenos amores");
let category3 = new Category("Terror", "Que miedo");
let category4 = new Category("Policiacas", "Te va ha detener la policia");

let au1 = new Author(
  "Fiódor Dostoievski",
  "fiodor@gmail.es",
  "https://via.placeholder.com/258x172.jpg?text=Avatar+1"
);
let au2 = new Author(
  "Gabriel García Márquez",
  "gabriel@gmail.es",
  "https://via.placeholder.com/258x172.jpg?text=Avatar+2"
);
let au3 = new Author(
  "Johann Wolfgang",
  "johann@gmail.es",
  "https://via.placeholder.com/258x172.jpg?text=Avatar+3"
);
let au4 = new Author(
  "Jane Austen",
  "jane@gmail.es",
  "https://via.placeholder.com/258x172.jpg?text=Avatar+4"
);
let au5 = new Author(
  "Jorge Luis Borges",
  "eljorge@gmail.es",
  "https://via.placeholder.com/258x172.jpg?text=Avatar+5"
);
let au6 = new Author(
  "Homero",
  "homer@gmail.es",
  "https://via.placeholder.com/258x172.jpg?text=Avatar+6"
);

let gallery = Gallery.getInstance();

gallery.addCategory(category2, category1, category4, category3);
gallery.addImage(img1,img2,img3,img4,img5,img6,img7,img8);
gallery.addAuthor(au1, au3, au2, au4,au5,au6);
gallery.addImageInCategoryWithAuthor(category1, au1, img2);
gallery.addImageInCategoryWithAuthor(category1, au1, img3);
gallery.addImageInCategoryWithAuthor(category2, au1, img4);
gallery.addImageInCategoryWithAuthor(category2, au2, img1);
gallery.addImageInCategoryWithAuthor(category3, au3, img5);
gallery.addImageInCategoryWithAuthor(category3, au4, img6);
gallery.addImageInCategoryWithAuthor(category4, au5, img7);
gallery.addImageInCategoryWithAuthor(category4, au6, img8);
gallery.getAuthorOfImage(img1.title);
// console.log(gallery.categories);

// gallery.removeImage(i1);
// console.log(gallery.images);
// gallery.removeAuthor(au1);
// console.log(gallery.authors);
// gallery.removeImageInCategory(category2,i2);
// try{
//   gallery.removeImageInCategory(category1, i2);
// } catch(error){
//   console.log(error.toString());
// }
// console.log(gallery.getAuthorImage(au1));

// let images = gallery.getTypeImages(Portrait, "title");
// let image = images.next();
// while (!image.done) {
//   console.log(image.value.toString());
//   image = images.next();
// }
// let images = gallery.getTypeImages(Landscape, "title");
// let image = images.next();
// while (!image.done) {
//   console.log(image.value.toString());
//   image = images.next();
// }

// Crimen y castigo       --> Fiódor Dostoievski
// El idiota              --> Fiódor Dostoievski
// Los endemoniados       --> Fiódor Dostoievski
// Cien años de soledad	  --> Gabriel García Márquez
// Fausto	                --> Johann Wolfgang
// Orgullo y prejuicio    --> Jane Austen
// Ficciones              --> Jorge Luis Borges
// Odisea                 --> Homero
