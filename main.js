const fs = require("fs");
const util = require("util");

class Container {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(object) {
        try {
            const fileExists = fs.existsSync(`${__dirname}/${this.fileName}`);

            if (!fileExists) {
                const objectWithId = {
                    ...object,
                    id: 1,
                };
                fs.writeFile(
                    `${__dirname}/${this.fileName}`,
                    `[${JSON.stringify(objectWithId)}]`,
                    (error) => {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log("archivo creado exitosamente");
                        }
                    }
                );
                console.log(objectWithId);
                return objectWithId.id;
            } else {
                const json = require("./products.json");

                let actualIds = [];
                json.forEach((product) => {
                    actualIds.push(product.id);
                });
                const sortedIds = actualIds.sort((a, b) => {
                    return a - b;
                });

                let isMissing = false;

                for (let i = 1; i <= sortedIds[sortedIds.length - 1]; i += 1) {
                    if (
                        (actualIds.indexOf(i) === -1 && !isMissing) ||
                        sortedIds[sortedIds.length - 1] === json.length + 1
                    ) {
                        isMissing = true;
                    }
                }

                if (isMissing) {
                    let missingId;
                    for (
                        let i = 1;
                        i <= sortedIds[sortedIds.length - 1];
                        i += 1
                    ) {
                        if (actualIds.indexOf(i) === -1) {
                            if (!missingId) {
                                missingId = i;
                            } else if (i < missingId) {
                                missingId = i;
                            }
                        }
                    }
                    const objectWithId = {
                        ...object,
                        id: missingId,
                    };

                    json.push(objectWithId);
                    const parsedJson = JSON.stringify(json);
                    fs.writeFile(
                        `${__dirname}/${this.fileName}`,
                        `${parsedJson}`,
                        (error) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log("Producto añadido exitosamente");
                            }
                        }
                    );
                    console.log(json);
                    return objectWithId.id;
                }

                const objectWithId = {
                    ...object,
                    id: json.length + 1,
                };

                json.push(objectWithId);
                const parsedJson = JSON.stringify(json);
                fs.writeFile(
                    `${__dirname}/${this.fileName}`,
                    `${parsedJson}`,
                    (error) => {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log("Producto añadido exitosamente");
                        }
                    }
                );
                console.log(json);
                return objectWithId.id;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            const json = require("./products.json");

            const filteredJson = json.filter((product) => product.id === id);

            if (!filteredJson.length) {
                return null;
            }

            return filteredJson[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllProducts() {
        try {
            const json = require("./products.json");

            if (!json.length) {
                const error = new Error();
                error.message =
                    "There aren't any products saved in our DataBase";
                throw error;
            }

            return json;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteById(id) {
        try {
            const json = require("./products.json");
            const filteredProduct = json.filter((product) => product.id === id);

            if (!filteredProduct.length) {
                const error = new Error();
                error.message =
                    "We couldn't find any product with that ID in our DataBase";
                throw error;
            }

            const filteredJson = json.filter((product) => product.id !== id);

            const parsedJson = JSON.stringify(filteredJson);

            await fs.writeFile(
                `${__dirname}/${this.fileName}`,
                `${parsedJson}`,
                (error) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log("Archivo eliminado exitosamente");
                    }
                }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAllProducts() {
        try {
            const json = require("./products.json");

            if (!json.length) {
                const error = new Error();
                error.message = "We couldn't find any products on our DataBase";
                throw error;
            }

            const wipedOutJson = [];

            const parsedJson = JSON.stringify(wipedOutJson);

            await fs.writeFile(
                `${__dirname}/${this.fileName}`,
                `${parsedJson}`,
                (error) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log("Archivos eliminados exitosamente");
                    }
                }
            );
            console.log(wipedOutJson);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const products = new Container("products.json");

const bike = {
    name: "Bici",
    price: 2000,
    thumbnail: "url://someUrl.com/fakeUrl.jpg",
};

// AGREGAR UN NUEVO ELEMENTO
// const biciId = products.save(bike);

// BUSCAR ELEMENTO POR ID
// const element = products.getProductById(13);
// console.log(element);

// BUSCAR TODOS LOS ELEMENTOS
// const allProducts = products.getAllProducts();
// console.log(allProducts);

// ELIMINAR ELEMENTOS POR ID
// products.deleteById(1);

// ELIMINAR TODOS LOS ELEMENTOS
// products.deleteAllProducts();
