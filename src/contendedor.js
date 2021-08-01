const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    try {
      //Si el archivo existe, comprobamos que tenga el formato adecuado, y si no lo dejamos como un array vacío para poder trabajar con el
      if (fs.existsSync(this.fileName)) {
        const data = fs.readFileSync(this.fileName, "utf-8");
        if (!(data[0] === "[" && data[data.length - 1] === "]")) {
          console.log("Formateando archivo...");
          fs.writeFileSync(this.fileName, "[]");
        }
        //Si no existe, lo creamos
      } else fs.writeFileSync(this.fileName, "[]");
    } catch (err) {
      console.log("Error:", err);
    }
  }

  async save(object) {
    let id;
    try {
      const fileData = await fs.promises.readFile(this.fileName, "utf-8");
      const parsedData = JSON.parse(fileData);
      // Si todavía no hay ningún elemento asignamos el id 1
      if (!parsedData.length) id = 1;
      else {
        //Si no toma el id del ultimo elemento y le sumamos 1
        id = parsedData[parsedData.length - 1].id + 1;
      }
      parsedData.push({ ...object, id });
      await fs.promises.writeFile(this.fileName, JSON.stringify(parsedData));
      return id;
    } catch (error) {
      console.log("Ha ocurrido un error escribiendo los datos: " + error);
    }
  }

  async getById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const object = JSON.parse(fileData).filter((obj) => obj.id === id);
      if (object.length) return object[0];
      // Si el array que obtenemos con el filter está vacío, devolvemos el error
      throw new Error("No se encuentra el id especificado");
    } catch (error) {
      console.log("Ha ocurrido un error obteniendo los datos: " + error);
    }
  }

  async getAll() {
    try {
      const fileData = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(fileData);
    } catch (error) {
      console.log("Ha ocurrido un error obteniendo los datos: " + error);
    }
  }

  async deleteById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const parsedData = JSON.parse(fileData);
      const newData = parsedData.filter((obj) => obj.id !== id);
      await fs.promises.writeFile(this.fileName, JSON.stringify(newData));
    } catch (error) {
      console.log("Ha ocurrido un error borrando el elemento: " + error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileName, "[]");
    } catch (error) {
      console.log("Ha ocurrido un error borrando los datos: " + error);
    }
  }
}

module.exports = Contenedor;
