import { Request, Response } from "express";
import { User } from "../firebase/collections/User";

interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
}

//create a user
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { name, email, phone, address } = req.body;

    //user input validation
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill up name, email, phone and address",
      });
    }

    //check if user already exists
    const existingUser: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await User.where("email", "==", email).get();

    if (existingUser.docs.length > 0)
      return res.status(400).json({
        success: false,
        message: "This email is already registered",
      });

    const user: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> =
      await User.add({ name, email, phone, address });

    if (user) {
      return res.status(201).json({
        success: true,
        message: `User has been created`,
        data: (await user.get()).data(),
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong. Try again" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

//get all users
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const users: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await User.get();

    const userList: IUser[] = users.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
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
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong. Try again" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

//get single user
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.params;
    const user: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> =
      await User.doc(id).get();

    if (user.data()) {
      return res.status(200).json({
        success: true,
        message: `1 user found`,
        data: { id: user.id, ...user.data() },
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No user is available" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

//update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { name, email, phone, address } = req.body;
  const { id } = req.params;

  //check if user exists
  const exisitingUser: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> =
    await User.doc(id).get();

  if (!exisitingUser.data())
    return res.status(404).json({ success: false, message: "No user exists" });

  let data: any = {};

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
    const user: FirebaseFirestore.WriteResult = await User.doc(id).update(data);

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: `User has been updated`, data: user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User has not been updated" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

//delete user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.params;

    //check if user exists
    const exisitingUser: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> =
      await User.doc(id).get();

    if (!exisitingUser.data())
      return res
        .status(404)
        .json({ success: false, message: "No user exists" });

    const user: FirebaseFirestore.WriteResult = await User.doc(id).delete();

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: `User has been deleted`, data: user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User has not been deleted" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};
