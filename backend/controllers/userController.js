const userSchema = require("../collections/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require('../middleware/userValidation')
const Signup = async (req, res) => {
  //Existing User
  //Hashed Password
  //Creating User
  //generate token

  const { Username, Email, Password, Confirm_Password, Phone , DOB ,token } = req.body;
  try {
    //Checking existing user or not

    const existingUser = await userSchema.findOne({ Email: Email });
    if (existingUser) {
      res.status(400).json({ message: "User is already exist" });
    }

    if (Password === Confirm_Password) {
      // encrypt or hash password

      const hashedPassword = await bcrypt.hash(Password, 12);
      const hashedConfirmPassword = await bcrypt.hash(Confirm_Password, 12);
     
      //user creation
      const valid = await validate.validateAsync(req.body)
      
      if(valid){

        const data = await userSchema.create({
            Username: Username,
            Email: Email,
            Password: hashedPassword,
            Confirm_Password: hashedConfirmPassword,
            Phone: Phone,
            DOB: DOB,
            
          });
          await data.save();
    
          // generating token
    
          const token = jwt.sign(
            { Email: data.Email, id: data._id },
            process.env.SECRET_KEY ,{expiredIn : '60s'}
          );
          // token is save in database 
          if(token){
            const data = await userSchema.create({
                Username: Username,
                Email: Email,
                Password: hashedPassword,
                Confirm_Password: hashedConfirmPassword,
                Phone: Phone,
                DOB: DOB,
                token : token
                
              });
              await data.save();
            
          }
        
          res
            .status(201)
            .json({
              message: "register successfully ",
              result: data,
              token: token,
            });

      }
      else {
        res.status(400).json({message : "data is not valid"})
      }
      
    } else {
      res
        .status(400)
        .json({ message: "password and confirm password is not matched" });
    }
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = { Signup };
