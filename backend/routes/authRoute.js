import express from 'express'

import { loginController, registerController, testController} from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController) 
  
//LOGIN || POST 
router.post('/login', loginController)


//test route
router.get('/test',requireSignIn,testController) 

// protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});


export default router;