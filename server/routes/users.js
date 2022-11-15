const router = require('express').Router();
const { User, validate } = require("../models/user");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exist" })
    
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" })
    } catch(error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
});

router.get("/", async function(req, res) {
    try {
        const users = await User.find().select("_id fullName gender age email password imgURL __v");
        res.status(200).send(users);

    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });        
    }
});

router.delete("/:userId", async function(req, res){
    try {
        const user = await User.findById(req.params.userId);
        if (user == null){
            return res.status(404).send({ message: "User not found" });

        } else {
            await user.remove();
            res.status(200).send({data: user, message: "User deleted" });
        }

        
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        
    }
});

router.put("/:userId", async function (req, res) {
    const user = await User.findById(req.params.userId).select("_id fullName gender age email password imgURL __v");
        if (user == null){
            return res.status(404).send({ message: "User not found" });

        } else {
            user.imgURL = req.body.imgURL;
            user.fullName = req.body.fullName;
            user.gender = req.body.gender;
            user.age = req.body.age;
            user.email = req.body.email;
            await user.save();
            res.status(200).send({data: user, message: "User updated" });
        }
});

module.exports = router;