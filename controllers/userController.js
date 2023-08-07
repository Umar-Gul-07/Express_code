// userController.js
import userModel from "../models/user.js";
import bcrypt from 'bcrypt';

class userController {
    static home = (req, res) => {
        res.render("index");
    }

    static registration = (req, res) => {
        res.render("registration");
    }

    static login = (req, res) => {
        res.render("login");
    }

    static dashboard = (req , res) =>{
      res.render("dashbaoard")
    }

    static createUserDoc = async (req, res) => {
      const hashPasswored= await bcrypt.hash (req.body.password, 10)
        try {
            const { name, email, password } = req.body;
            const doc = new userModel({
                name: name,
                email: email,
                password: hashPasswored ,
            });
            const result = await doc.save();
            // console.log(result);
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    // static verifyLogin = async (req, res) => {
    //     try {
    //       const { email, password } = req.body;
    //       // console.log(email);
    //       const user = await userModel.findOne({ email: email });
    //       console.log(user);
    
    //       if (!user) {
    //         return res.send("User not found"); // User not found
    //       }
    
    //       // Assuming the password is stored as plaintext in the database
    //       if (user.password == password || user.email == email) {
    //         res.send("<h1>Dashboard ------ </h1>" + user); // Correct password
    //       } else {
    //         res.send("incorrect credential");
    //       }
    //     } catch(error) {
    //       console.log(error);
    //       res.status(500).send("Internal Server Error");
    //     }
    //   };



    static verifyLogin = async (req, res) => {
      try {
        const { email, password } = req.body;
        // console.log(email);
        const user = await userModel.findOne({ email: email });
        console.log(user);
  
        if (!user) {
          return res.send("User not found"); // User not found
        }
  
        // Assuming the password is stored as plaintext in the database
        const isMatch = await bcrypt.compare(password, user.password)
        if ( isMatch || user.email == email) {
          res.send("<h1>Dashboard ------ </h1>" + user); // Correct password
        } else {
          res.send("incorrect credential");
        }
      } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    };

}

export default userController;
