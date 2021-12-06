const fs = require("fs");
const path = require("path");
const usersJSON = fs.readFileSync(
    path.join(__dirname, "../data/users.json")
);
const userList = JSON.parse(usersJSON);
const usersFilePath = path.join(__dirname, "../data/users.json")

// funcion para devolver la lista completa de usuarios
function getUsers() {
    return userList
}

function addUser(newUser) {
    // agrega el nuevo usuario a la lista
    const userList = this.getUsers();
    userList.push(newUser);

    // transforma la lista en formato JSON
    const updatedJSON = JSON.stringify(userList);
    // escribe el array actualizado al JSON
    fs.writeFileSync(usersFilePath, updatedJSON, "utf-8");
}

// funcion para autenticar un usuario especifico y devolverlo
function authenticate(userToAuthenticate) {
    for (const user of userList) {
        if (user.email == userToAuthenticate.email) {
            if (user.password == userToAuthenticate.password) {
                return user;
            }
        }
    }
}

module.exports = {
    getUsers,
    authenticate,
    addUser,
}