const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();


app.use(cors()); // unblocking cors policy
app.use(express.json()); 

const dbadduser = require("./dbconn");

app.post("/add", async (req, res) => {
  try {
    const input = req.body; 

    await dbadduser.addUser(input);
    res.json({ message: "success post" });
  } catch (err) {
    res.json({ message: "failure post" });
  }
});


app.post("/checkuser", async (req, res) => {
  try {
    const input = req.body; 

   let result = await dbadduser.checkUser(input);
    res.json(result);
  } catch (err) {
    res.json({ opr:false });
  }
});

app.post("/checkmail", async (req, res) => {
  try {
    const input = req.body; 
console.log(input)
    await dbadduser.checkmail(input);
    res.json({ opr:true });
  } catch (err) {
    res.json({ opr:false });
  }
});

app.post("/addtocart", async (req, res) => {
  try {
    const input = req.body; 

    await dbadduser.addtocart(input);
    res.json({ message: "success post" });
  } catch (err) {
    res.json({ message: "failure post" });
  }
});

app.post("/getproduct", async (req, res) => {
  try {
    const input = req.body; 
    console.log(input)
   let result = await dbadduser.getproduct(input);
    res.json(result);
  } catch (err) {
    res.json({ opr:false });
  }
});

app.post("/addcomment", async (req, res) => {
  try {
    const input = req.body; 

    await dbadduser.addcomment(input);
    res.json({ message: "success post" });
  } catch (err) {
    res.json({ message: "failure post" });
  }
});

app.post("/delete", async (req, res) => {
  try {
    const input = req.body; 

    await dbadduser.deletecart(input);
    res.json({ message: "success post" });
  } catch (err) {
    res.json({ message: "failure post" });
  }
});
app.post("/checkForgotuser", async (req, res) => {
  try {
    const input = req.body;
console.log("ffff")
    let result = await dbadduser.checkForgotUser(input);
    res.json(result);
  } catch (err) {
    res.json({ opr: false });
  }
});
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abhi.sherekar16@gmail.com",
    pass: "8698698841",
  },
});

app.post("/sendPass", async (req, res) => {
  try {
    const user = req.body;
    console.log(user[0].email);
    var mailOptions = {
      from: "garudritesh@gmail.com",
      to: user[0].email,
      subject: "no-replay this is auto generated mail",
      text: "User Password is " + user[0].pwd,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent to : " + EMAIL + " " + info.response);
      }
    });

    //await forgotPassword.updatePass(user);

    res.json({ message: "success post" });
  } catch (err) {
    res.json({ message: "failure post" });
  }
});

// started teh server.
app.listen(3000);