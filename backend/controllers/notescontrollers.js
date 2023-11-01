
import newnotesmodel from '../models/newnotesmodel.js'
import slugify from 'slugify'
import fs from 'fs'


export const newnotesController = async (req, res) => {
    try {
      const { title,slug,discription } = req.fields;
        const {photo} = req.files;
      //validation
      switch (true) {
        case !title:
          return res.status(500).send({ error: "title is Required" });
        case !discription:
          return res.status(500).send({ error: "Description is Required" });
      }
  
      const newnotes = new newnotesmodel({...req.fields, slug:slugify(title)});
      if (photo) {
        newnotes.photo.data = fs.readFileSync(photo.path);
        newnotes.photo.contentType = photo.type;
      }
      await newnotes.save();
      res.status(201).send({
        success: true,
        message: "newnotes Created Successfully",
        newnotes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing notes",
      });
    }
  };

// export const newnotesController = async (req, res) => {
//   try {
//     const { title,slug,discription } =
//       req.body;
//     //validation
//     switch (true) {
//       case !title:
//         return res.status(500).send({ error: "title is Required" });
//       case !discription:
//         return res.status(500).send({ error: "Description is Required" });
//     }

//     const newnotes = await new newnotesmodel({...req.body, slug: slugify(title)}).save();
//     res.status(201).send({
//       success: true,
//       message: "newnotes Created Successfully",
//       newnotes,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in crearing notes",
//     });
//   }
// };



   // get all notes
   export const getnotesControlller = async (req, res) => {
    try {
      const notes = await newnotesmodel.find({})
      res.status(200).send({
        success: true,
        message: "All notes List",
        notes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all notes",
      });
    }
  };

  // get photo
export const notesPhotoController = async (req, res) => {
  try {
    const newnote = await newnotesmodel.findById(req.params.pid).select("photo");
    if (newnote.photo.data) {
      res.set("Content-type", newnote.photo.contentType);
      return res.status(200).send(newnote.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

  // get single notes
export const getSinglenoteController = async (req, res) => {
  try {
    
    const note = await newnotesmodel
      .findOne({ slug:req.params.slug })
    res.status(200).send({
      success: true,
      message: "Single note Fetched",
      note,
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single note",
      error,
    });
  }
};

  //delete controller
export const deletenoteController = async (req, res) => {
  try {
    const {id} = req.params;
    await newnotesmodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "note Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting note",
      error,
    });
  }
};


//update note
export const updateNoteController = async (req, res) => {
  try {
    const { title,discription,Color } = req.body;
    const { id } = req.params;
    const notee = await newnotesmodel.findByIdAndUpdate(
      id,
      { title, slug: slugify(title),discription,Color },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "note Updated Successfully",
      notee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating note",
    });
  }
};


// search product
export const searchnotesController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await newnotesmodel
      .find({
        $or: [
          { title:{ $regex: keyword, $options: "i" } },
        ],
      })
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search notes API",
       error,
      });
    }
};