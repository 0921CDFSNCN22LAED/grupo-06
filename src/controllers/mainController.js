const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator");
const assetService = require("../services/assets");
const userService = require("../services/users");

const mainController = {
    index: function (req, res) {
        res.render("home/index", {
            pageTitle: "UniFi - Home",
            cryptoList: assetService.getCrypto(),
            stockList: assetService.getStock(),
        });
    },
    login: function (req, res) {
        res.render("users/login", {
            pageTitle: "Log in",
        });
    },
    register: function (req, res) {
        res.render("users/register", {
            pageTitle: "Register",
        });
    },
    store: (req, res) => {
        // guardamos los datos del formulario en una variable newUser
        const newUser = {
            id: 11,            
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };
        // guardamos los errores en una variable
        const errors = validationResult(req);
        // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errorMessages: errors.mapped(),
                old: req.body,
                pageTitle: "Register",
            });
        }
        // si no hubo errores, añadir el usuario a la lista
        userService.addUser(newUser);
        res.redirect("/login");
    },
    // función para procesar autenticacion de usuarios
    processLogin: function (req, res) {
        // se guarda el usuario a autenticar
        const userToAuthenticate = {
            email: req.body.email,
            password: req.body.password,
        };
        const errors = validationResult(req);
        // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            return res.render("users/login", {
                errorMessages: errors.mapped(),
                old: req.body,
                pageTitle: "Login",
            });
        }
        // busca al usuario y lo guarda en la variable
        const user = userService.authenticate(userToAuthenticate);
        // si no se encontró ningun usuario que coincida, devolver el sitio de login con mensaje de error
        if (!user) {
            return res.render("users/login", {
                errorMessages: [{ msg: "Invalid Credentials" }],
            });
        }
        // si no hubo problems, guardar al usuario autenticado con session y redirigir a home
        req.session.authenticatedUser = user;
        // si está tildado el campo de remember me, guardarlo con cookie
        if (req.body.remember) {
            res.cookie('rememberMe', user.id, { maxAge: 60000})
        }
        res.redirect("/");
    },
};

module.exports = mainController;
