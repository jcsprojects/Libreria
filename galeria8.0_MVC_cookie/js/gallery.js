"use strict";
// Excepciones

class GalleryException extends BaseException {
  constructor(message = "Error: Gallery Exception.", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "GalleryException";
  }
}

class ObjectGalleryException extends GalleryException {
  constructor(param, className, fileName, lineNumber) {
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = "ObjectGalleryException";
  }
}

class CategoryExistsException extends GalleryException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: The ${category.title} already exists in the gallery.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryExistsException";
  }
}

class CategoryNotExistException extends GalleryException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: The ${category.title} doesn't exist in the gallery.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryNotExistException";
  }
}
class AuthorNotExistException extends GalleryException {
  constructor(author, fileName, lineNumber) {
    super(
      `Error: The ${author.nickname} doesn't exist in the gallery.`,
      fileName,
      lineNumber
    );
    this.author = author;
    this.name = "AuthorNotExistException";
  }
}
class AuthorExistsException extends GalleryException {
  constructor(author, fileName, lineNumber) {
    super(
      `Error: The ${author.nickname} already exists in the gallery.`,
      fileName,
      lineNumber
    );
    this.author = author;
    this.name = "AuthorExistsException";
  }
}
class AuthorNotExistsException extends GalleryException {
  constructor(author, fileName, lineNumber) {
    super(
      `Error: The ${author.nickname} doesn´t exists in the gallery.`,
      fileName,
      lineNumber
    );
    this.author = author;
    this.name = "AuthorNotExistsException";
  }
}

class ImageExistsException extends GalleryException {
  constructor(image, fileName, lineNumber) {
    super(
      `Error: The ${image.title} already exists in the gallery.`,
      fileName,
      lineNumber
    );
    this.image = image;
    this.name = "ImageExistsException";
  }
}

class ImageExistInCategoryException extends GalleryException {
  constructor(image, category, fileName, lineNumber) {
    super(
      `Error: The ${image.title} already exist in ${category.title}.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.image = image;
    this.name = "ImageExistInCategoryException";
  }
}

class ImageNotExistInCategoryException extends GalleryException {
  constructor(image, category, fileName, lineNumber) {
    super(
      `Error: The ${image.title} doesn't exist in ${category.title}.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.image = image;
    this.name = "ImageNotExistInCategoryException";
  }
}

class ImageNotExistInGalleryException extends GalleryException {
  constructor(image, fileName, lineNumber) {
    super(
      `Error: The ${image.title} doesn't exist in the gallery.`,
      fileName,
      lineNumber
    );
    this.image = image;
    this.name = "ImageNotExistInGalleryException";
  }
}
class Category {
  #title;
  #description;

  constructor(title = "Default Category", description = "Una descripción") {
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!title) throw new EmptyValueException("title");
    if (!description) throw new EmptyValueException("description");

    this.#title = title;
    this.#description = description;
  }

  get title() {
    return this.#title;
  }
  set title(value = "Default Category") {
    if (!value) throw new EmptyValueException("title");
    this.#title = value;
  }
  get description() {
    return this.#description;
  }
  set description(value = "Una descripción") {
    if (!value) throw new EmptyValueException("description");
    this.#description = value;
  }
}

Object.defineProperty(Category.prototype, "title", { enumerable: true });
Object.defineProperty(Category.prototype, "description", { enumerable: true });

class Author {
  #nickname;
  #email;
  #avatar;

  constructor(nickname, email, avatar) {
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!nickname) throw new EmptyValueException("nickname");
    if (!email) throw new EmptyValueException("email");
    if (!avatar) throw new EmptyValueException("avatar");

    this.#nickname = nickname;
    this.#email = email;
    this.#avatar = avatar;
  }

  get nickname() {
    return this.#nickname;
  }
  set nickname(value = "autorDefault") {
    if (!value) throw new EmptyValueException("nickname");
    this.#nickname = value;
  }
  get email() {
    return this.#email;
  }
  set email(value) {
    if (!value) throw new EmptyValueException("email");
    this.#email = value;
  }
  get avatar() {
    return this.#avatar;
  }
  set avatar(value) {
    if (!value) throw new EmptyValueException("avatar");
    this.#avatar = value;
  }
  toString() {
    return "Nickname: " + this.nickname + " Email: " + this.email;
  }
}

Object.defineProperty(Author.prototype, "nickname", { enumerable: true });
Object.defineProperty(Author.prototype, "email", { enumerable: true });
Object.defineProperty(Author.prototype, "avatar", { enumerable: true });

let Gallery = (function () {
  let instantiated;

  function init() {
    //Inicialización del Singleton
    class Gallery {
      #galleryName = "MiGaleria";
      #categories = [];
      #images = [];
      #authors = [];
      #landscape = [];
      #portrait = [];

      #getCategoryPosition(category) {
        return this.#categories.findIndex(
          (x) => x.category.title === category.title
        );
      }
      #getImagePosition(image) {
        return this.#images.findIndex((x) => x.title === image.title);
      }

      #getAuthorPosition(author) {
        return this.#authors.findIndex(
          (x) => x.author.nickname === author.nickname
        );
      }

      #getImagePositionInCategory(image, category) {
        return category.images.findIndex((x) => x.title === image.title);
      }

      #getAuthorPositionInCategory(author, category) {
        return category.images.findIndex(
          (x) => x.author.nickname === author.nickname
        );
      }

      #order = {
        title: (imageA, imageB) => {
          return imageA.title < imageB.title ? -1 : 1;
        },
        description: (imageA, imageB) => {
          return imageA.description < imageB.description ? -1 : 1;
        },
        url: (imageA, imageB) => {
          return imageA.url < imageB.url ? -1 : 1;
        },
      };

      constructor() {
        if (!new.target) throw new InvalidAccessConstructorException();
      }

      get galleryName() {
        return this.#galleryName;
      }
      set galleryName(value) {
        if (!value) throw new EmptyValueException("galleryName");
        this.#galleryName = value;
      }

      get categories() {
        let nextIndex = 0;
        let array = this.#categories;
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++].category, done: false }
              : { done: true };
          },
        };
      }

      get images() {
        let nextIndex = 0;
        let array = this.#images;
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++], done: false }
              : { done: true };
          },
        };
      }
      get authors() {
        let nextIndex = 0;
        let array = this.#authors;
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++].author, done: false }
              : { done: true };
          },
        };
      }
      get landscape() {
        let nextIndex = 0;
        let array = this.#landscape;
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++], done: false }
              : { done: true };
          },
        };
      }
      get portrait() {
        let nextIndex = 0;
        let array = this.#portrait;
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++], done: false }
              : { done: true };
          },
        };
      }

      toString() {
        return "GalleryName: " + this.#galleryName;
      }

      addCategory() {
        for (let category of arguments) {
          if (!(category instanceof Category)) {
            throw new ObjectGalleryException("category", "Category");
          }
          let position = this.#getCategoryPosition(category);

          if (position === -1) {
            this.#categories.push({
              category: category,
              images: [],
            });
            this.#categories.sort((catA, catB) => {
              return catA.category.title.toLocaleLowerCase() <
                catB.category.title.toLocaleLowerCase()
                ? -1
                : 1;
            });
          } else {
            throw new CategoryExistsException(category);
          }
        }
        return this;
      }
      addAuthor() {
        for (let author of arguments) {
          if (!(author instanceof Author)) {
            throw new ObjectGalleryException("category", "Category");
          }
          let position = this.#getAuthorPosition(author);

          if (position === -1) {
            this.#authors.push({
              author: author,
              images: [],
            });
            this.#authors.sort((autA, autB) => {
              return autA.author.nickname.toLocaleLowerCase() <
                autB.author.nickname.toLocaleLowerCase()
                ? -1
                : 1;
            });
          } else {
            throw new AuthorExistsException(author);
          }
        }
        return this;
      }

      addImage() {
        for (let image of arguments) {
          if (!(image instanceof Image)) {
            throw new ObjectGalleryException("image", "Image");
          }
          let position = this.#getImagePosition(image);
          if (position === -1) {
            this.#images.push(image);
            this.#images.sort((imageA, imageB) => {
              if (
                imageA.title.toLocaleLowerCase() <
                imageB.title.toLocaleLowerCase()
              ) {
                return -1;
              }
            });
          } else {
            throw new ImageExistsException(image);
          }
        }
        return this;
      }

      removeCategory() {
        for (let category of arguments) {
          if (!(category instanceof Category)) {
            throw new ObjectGalleryException("category", "Category");
          }
          let position = this.#getCategoryPosition(category);
          if (position !== -1) {
            this.#categories.splice(position, 1);
          } else {
            throw new CategoryNotExistException(category);
          }
        }
        return this;
      }
      removeAuthor() {
        for (let author of arguments) {
          if (!(author instanceof Author)) {
            throw new ObjectGalleryException("author", "Author");
          }
          let position = this.#getAuthorPosition(author);
          if (position !== -1) {
            this.#authors.splice(position, 1);
          } else {
            throw new AuthorNotExistException(author);
          }
        }
        return this;
      }

      addImageInCategoryWithAuthor(category, author, image) {
        if (!(category instanceof Category)) {
          throw new ObjectGalleryException("category", "Category");
        }
        let pCategory = this.#getCategoryPosition(category);

        if (pCategory === -1) {
          this.addCategory(category);

          pCategory = this.#getCategoryPosition(category);
        }
        if (!(author instanceof Author)) {
          throw new ObjectGalleryException("author", "Author");
        }
        let pAuthor = this.#getAuthorPosition(author);
        if (pAuthor === -1) {
          this.addAuthor(author);
          pAuthor = this.#getAuthorPosition(author);
        }

        if (!(image instanceof Image)) {
          throw new ObjectGalleryException("image", "Image");
        }
        let pImage = this.#getImagePosition(image);
        if (pImage === -1) {
          this.addImage(image);
          pImage = this.#getImagePosition(image);
        }
        let position = this.#getImagePositionInCategory(
          image,
          this.#categories[pCategory]
        );

        if (position === -1) {
          this.#categories[pCategory].images.push(this.#images[pImage]);
          this.#authors[pAuthor].images.push(this.#images[pImage]);
          this.#categories[pCategory].images.sort((imageA, imageB) => {
            return imageA.title > imageB.title ? -1 : 1;
          });
          this.#authors[pAuthor].images.sort((authorA, authorB) => {
            return authorA.nickname > authorB.nickname ? -1 : 1;
          });
        } else {
          throw new ImageExistInCategoryException(image, category);
        }
        
        return this;
      }

      removeImage() {
        for (let image of arguments) {
          if (!(image instanceof Image)) {
            throw new ObjectGalleryException("image", "Image");
          }
          let position = this.#getImagePosition(image);
          if (position !== -1) {
            let storedImage = this.#images[position];

            for (let category of this.#categories) {
              let pImage = this.#getImagePositionInCategory(
                storedImage,
                category
              );
              if (pImage !== -1) {
                category.images.splice(pImage, 1);
              }
            }
            this.#images.splice(position, 1);
          } else {
            throw new ImageNotExistInGalleryException(image);
          }
        }
        return this;
      }
      // removeAuthor() {
      //   for (let author of arguments) {
      //     if (!(author instanceof Author)) {
      //       throw new ObjectGalleryException("author", "author");
      //     }
      //     let position = this.#getAuthorPosition(author);
      //     if (position !== -1) {
      //       let storedAuthor = this.#authors[position];

      //       for (let category of this.#categories) {
      //         let pAuthor = this.#getAuthorPositionInCategory(
      //           storedAuthor,
      //           category
      //         );

      //         if (pAuthor !== -1) {
      //           category.images.splice(pAuthor, 1);
      //         }
      //       }
      //       this.#authors.splice(position, 1);
      //     } else {
      //       throw new ImageNotExistInGalleryException(author);
      //     }
      //   }
      //   return this;
      // }

      removeImageInCategory(category) {
        if (!(category instanceof Category)) {
          throw new ObjectGalleryException("category", "Category");
        }
        let pCategory = this.#getCategoryPosition(category);
        if (pCategory !== -1) {
          for (let i = 1; i < arguments.length; i++) {
            let image = arguments[i];
            if (!(image instanceof Image)) {
              throw new ObjectGalleryException("image", "image");
            }
            let pImage = this.#getImagePositionInCategory(
              image,
              this.#categories[pCategory]
            );
            if (pImage !== -1) {
              this.#categories[pCategory].images.splice(pImage, 1);
            } else {
              throw new ImageNotExistInCategoryException(
                image,
                this.#categories[pCategory].category
              );
            }
          }
        } else {
          throw new CategoryNotExistException(category);
        }

        return this;
      }

      clean() {
        this.#categories.length = 0;
        this.#images.length = 0;
      }

      getCategoryImage(category) {
        if (!(category instanceof Category)) {
          throw new ObjectGalleryException("category", "Category");
        }
        let position = this.#getCategoryPosition(category);

        if (position !== -1) {
          let nextIndex = 0;
          let array = this.#categories[position].images;
          return {
            next: function () {
              return nextIndex < array.length
                ? { value: array[nextIndex++], done: false }
                : { done: true };
            },
          };
        } else {
          throw new CategoryNotExistException(category);
        }
      }
      getAuthorImage(author) {
        if (!(author instanceof Author)) {
          throw new ObjectGalleryException("author", "Author");
        }
        let position = this.#getAuthorPosition(author);

        if (position !== -1) {
          let nextIndex = 0;
          let array = this.#authors[position].images;
          return {
            next: function () {
              return nextIndex < array.length
                ? { value: array[nextIndex++], done: false }
                : { done: true };
            },
          };
        } else {
          throw new AuthorNotExistException(author);
        }
      }
      getAuthorOfImage(title) {
        for (let i = 0; i < this.#authors.length; i++) {
          for (let j = 0; j < this.#authors[i].images.length; j++) {
            if (this.#authors[i].images[j].title == title) {
              return this.#authors[i].author.nickname;
            }
          }
        }
      }

      getImage(title) {
        let position = this.#images.findIndex((x) => x.title === title);
        if (position === -1)
          throw new ImageNotExistInGalleryException(
            new Landscape(title, "desc", "url", "0")
          );

        return this.#images[position];
      }

      getCategory(title) {
        let position = this.#categories.findIndex(
          (x) => x.category.title === title
        );
        if (position === -1)
          throw new CategoryNotExistException(new Category(title));
        return this.#categories[position].category;
      }
      getAuthor(nickname) {
        let position = this.#authors.findIndex(
          (x) => x.author.nickname === nickname
        );
        if (position === -1)
          throw new AuthorNotExistException(new Author(nickname));
        return this.#authors[position].author;
      }
      getTypeImages(type, field) {
        let nextIndex = 0;
        let array = this.#images.filter(image => {
          return image instanceof type;
        });
        if (this.#order[field]) {
          array.sort(this.#order[field]);
        }
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++], done: false }
              : { done: true };
          },
        };
      }
    }
    Object.defineProperty(Gallery.prototype, "categories", {
      enumerable: true,
    });
    Object.defineProperty(Gallery.prototype, "images", { enumerable: true });
    Gallery.prototype.toString = function (separator = "\n") {
      let str = "";
      let categories = this.categories;
      let category = categories.next();
      while (!category.done) {
        str += category.value.title + separator;
        let images = this.getCategoryImage(category.value);
        let image = images.next();
        while (!image.done) {
          str += image.value.toString() + separator;
          image = images.next();
        }
        category = categories.next();
      }
      return str;
    };

    let gallery = new Gallery();
    Object.freeze(gallery);
    return gallery;
  }
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();
