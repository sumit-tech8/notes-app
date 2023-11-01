import express from "express";
import { deletenoteController, getSinglenoteController, getnotesControlller, newnotesController, notesPhotoController, searchnotesController, updateNoteController } from "../controllers/notescontrollers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable'



const router = express.Router();

//routes
//create new notes
router.post(
  "/New-notes",formidable(), newnotesController
);

// //get photo
router.get("/notes-photo/:pid", notesPhotoController);

// get all notes
router.get(
  "/get-notes", getnotesControlller
);

//single note
router.get("/get-note/:slug", getSinglenoteController);

//delete notes
router.delete("/delete-note/:id", deletenoteController);

//update category
router.put('/update-note/:id', requireSignIn, updateNoteController)

//search product
router.get("/search/:keyword", searchnotesController);


export default router; 