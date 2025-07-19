const adminmodel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
exports.RegisterAdmin = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password)
    return res.status(400).json({ message: "Empty fields are not allowed" });

  try {
    // Optional: check if admin with the same email already exists
    const existingAdmin = await adminmodel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    await adminmodel.create({
      fullname,
      email,
      password: hashpassword,
    });

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    res.status(500).json({ message: "Server error while registering admin" });
  }
};
exports.Login=async(req,res)=>{
    const{email,password}=req.body
    if(!email||!password) return res.json("can't be empty!")
       const admin=await adminmodel.findOne({email})
    if(!admin) return res.status(401).json("invalid email or password")
const ismatch=bcrypt.compare(password,admin.password)
    if(!ismatch) return res.status(401).json("invalid password")
     const token =jwt.sign({
    id: admin._id,
     email: admin.email

},"SECRETKEY");
res.status(200).json({
    token,
    email:admin.email,
    fullname:admin.fullname
})

    
}