import express from "express";
import {
  newContact,
  getAllContact,
  getContactById,
  updateContactById,
  deleteContactById,
} from "../Controllers/contact.js";
import { isAuthenticated } from "../Midlewares/Auth.js";
const router = express.Router();

router.post("/new", isAuthenticated, newContact);

//get All Contact
router.get("/contactlist", getAllContact);

router.get("/:id", getContactById);

router.put("/:id",isAuthenticated, updateContactById);

router.delete("/:id", isAuthenticated, deleteContactById);

export default router;
