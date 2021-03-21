"use strict";
(function () {
  let abstractCreateLock = true; //Definición del cerrojo.
  //Constructor de Product. Permite definir propiedades comunes para todos los productos de la tienda.
  //Obligatorio serían serial, name y price.
  class Image {
    //Campos privados
    #title;
    #description;
    #url;
    #coords;
    constructor(title, description, url, coords) {
      //La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();
      if (abstractCreateLock) throw new AbstractClassException("Image");
      abstractCreateLock = true; //Reactivamos el cerrojo.

      //Validación de parámetros obligatorios
      if (!title) throw new EmptyValueException("title");
      if (!description) throw new EmptyValueException("description");
      if (!url) throw new EmptyValueException("url");
      if (!coords) throw new EmptyValueException("coords");

      //Definición de atributos privados del objeto
      this.#title = title;
      this.#description = description;
      this.#url = url;
      this.#coords = coords;
    }

    get title() {
      return this.#title;
    }
    set title(value) {
      this.#title = value;
    }
    get description() {
      return this.#description;
    }
    set description(value) {
      this.#description = value;
    }
    get url() {
      return this.#url;
    }
    set url(value) {
      this.#url = value;
    }
    get coords() {
      return this.#coords;
    }
    set coords(value) {
      this.#coords = value;
    }
    toString(){
			return "Title: " + this.title + " Description: " + this.description + " Url: " + this.url;
		}
  }
  
  Object.defineProperty(Image.prototype, "title", { enumerable: true });
  Object.defineProperty(Image.prototype, "description", { enumerable: true });
  Object.defineProperty(Image.prototype, "url", { enumerable: true });
  Object.defineProperty(Image.prototype, "coords", { enumerable: true });

  class Landscape extends Image {
    constructor(title, description, url, coords) {
      if (!new.target) throw new InvalidAccessConstructorException();
      //Llamada al superconstructor.
      abstractCreateLock = false; //Desactivamos el cerrojo.
      super(title, description, url, coords);
    }
  }
  
  class Portrait extends Image {
    constructor(title, description, url, coords) {
      if (!new.target) throw new InvalidAccessConstructorException();
      //Llamada al superconstructor.
      abstractCreateLock = false; //Desactivamos el cerrojo.
      super(title, description, url, coords);
    }
  }

  window.Image = Image;
  window.Landscape = Landscape;
  window.Portrait = Portrait;
})(); //Invocamos la función global.
