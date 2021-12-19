const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const usersJSON = fs.readFileSync(path.join(__dirname, "../data/users.json"));
const usersList = JSON.parse(usersJSON);
const usersFilePath = path.join(__dirname, "../data/users.json");

// funcion para devolver la lista completa de usuarios
function getUsers() {
    return usersList;
}

// funcion que genera el ID a utilizar a partir del ultimo de la lista
function generateId() {
    const userList = this.getUsers();
    const lastUser = userList[userList.length - 1];
    if (lastUser) {
        return lastUser.id + 1;
    }
    return 1;
}

function addUser(userData) {
    // agrega el nuevo usuario a la lista
    const userList = this.getUsers();
    // chequear que no exista el email en la base de datos
    if (userList.find((user) => user.email == userData.email)) {
        return false;
    }
    // devuelve el id a utilizar
    const newUserId = this.generateId();
    const newUser = {
        id: newUserId,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
        avatar: userData.avatar,
    };
    userList.push(newUser);

    // transforma la lista en formato JSON
    const updatedJSON = JSON.stringify(userList);
    // escribe el array actualizado al JSON
    fs.writeFileSync(usersFilePath, updatedJSON, null, " ");
    return newUser;
}

// funcion para buscar y devolver un usuario a partir de algun campo a determinar como parametro
function findUser(field, text) {
    const userList = this.getUsers();
    const user = userList.find((user) => user[field] === text);
    return user;
}

// funcion para buscar y devolver un usuario a partir de su ID
function findUserByPk(userID) {
    const userList = this.getUsers();
    const user = userList.find((user) => user.id === userID);
    return user;
}

// funcion para autenticar un usuario especifico y devolverlo
function authenticate(userData) {
    const userList = this.getUsers();
    user = userList.find(
        (user) =>
            user.email === userData.email &&
            bcrypt.compareSync(userData.password, user.password)
    );
    return user;
}

function editUser(userToEdit) {}

// funcion para borrar un usuario a partir de su ID
function deleteUser(userId) {
    const userList = this.getUsers();
    const filteredUserList = userList.filter((user) => user.id != userId);
    const updatedJSON = JSON.stringify(filteredUserList);
    // escribe el array actualizado al JSON
    fs.writeFileSync(usersFilePath, updatedJSON, null, " ");
}

module.exports = {
    getUsers,
    authenticate,
    addUser,
    findUser,
    findUserByPk,
    generateId,
};
