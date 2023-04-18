"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../firebase/collections/User");
//create a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address } = req.body;
        //user input validation
        if (name.trim() === "" ||
            email.trim() === "" ||
            phone.trim() === "" ||
            address.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please fill up name, email, phone and address",
            });
        }
        //check if user already exists
        const existingUser = yield User_1.User.where("email", "==", email).get();
        if (existingUser.docs.length > 0)
            return res.status(400).json({
                success: false,
                message: "This email is already registered",
            });
        const user = yield User_1.User.add({ name, email, phone, address });
        if (user) {
            return res.status(201).json({
                success: true,
                message: `User has been created`,
                data: (yield user.get()).data(),
            });
        }
        else {
            return res
                .status(400)
                .json({ success: false, message: "Something went wrong. Try again" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
});
exports.createUser = createUser;
//get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.get();
        const userList = users.docs.map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        if (userList.length === 0)
            return res
                .status(200)
                .json({ success: true, message: "No user is available", data: [] });
        if (userList) {
            return res.status(200).json({
                success: true,
                message: `${userList.length} users found`,
                userList,
            });
        }
        else {
            return res
                .status(400)
                .json({ success: false, message: "Something went wrong. Try again" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
});
exports.getUsers = getUsers;
//get single user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.doc(id).get();
        if (user.data()) {
            return res.status(200).json({
                success: true,
                message: `1 user found`,
                data: Object.assign({ id: user.id }, user.data()),
            });
        }
        else {
            return res
                .status(404)
                .json({ success: false, message: "No user is available" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
});
exports.getUser = getUser;
//update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, address } = req.body;
    const { id } = req.params;
    //check if user exists
    const exisitingUser = yield User_1.User.doc(id).get();
    if (!exisitingUser.data())
        return res.status(404).json({ success: false, message: "No user exists" });
    let data = {};
    if (name !== undefined) {
        if (name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name cannot be empty",
            });
        }
        data.name = name;
    }
    if (email !== undefined) {
        if (email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Email cannot be empty",
            });
        }
        data.email = email;
    }
    if (phone !== undefined) {
        if (phone.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Phone cannot be empty",
            });
        }
        data.phone = phone;
    }
    if (address !== undefined) {
        if (address.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Address cannot be empty",
            });
        }
        data.address = address;
    }
    try {
        const user = yield User_1.User.doc(id).update(data);
        if (user) {
            return res
                .status(200)
                .json({ success: true, message: `User has been updated`, data: user });
        }
        else {
            return res
                .status(404)
                .json({ success: false, message: "User has not been updated" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
});
exports.updateUser = updateUser;
//delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //check if user exists
        const exisitingUser = yield User_1.User.doc(id).get();
        if (!exisitingUser.data())
            return res
                .status(404)
                .json({ success: false, message: "No user exists" });
        const user = yield User_1.User.doc(id).delete();
        if (user) {
            return res
                .status(200)
                .json({ success: true, message: `User has been deleted`, data: user });
        }
        else {
            return res
                .status(404)
                .json({ success: false, message: "User has not been deleted" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map