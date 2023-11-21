const express = require("express");
const router = express.Router();
const userSchema = require("../schema/Users");

router.get("/", (req, res, next) => {
  console.log(req);
  userSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router.post("/create-user", async (req, res, next) => {
  try {
    const createdUser = await userSchema.create(req.body);
    res.json(createdUser);
  } catch (error) {
    next(error); 
  }
});

router.get('/check-email', async (req, res, next) => {
  try {
    const email = req.query.email;
    const user = await userSchema.findOne({ email: email });
    if (user) {
      // Email already exists
      res.json({ exists: true });
    } else {
      // Email doesn't exist
      res.json({ exists: false });
    }
  } catch (error) {
    // Handle errors appropriately (send a 500 Internal Server Error response)
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/login', async (req, res, next) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const user = await userSchema.findOne({ email: email });
    if (user) {
      if(password === user.password)
      {
        res.json({ exists: true, match: true, user: user})
      } else {
        res.json({ exists: true, match: false})
      }
    } else {
      // Email doesn't exist
      res.json({ exists: false, match: false });
    }
  } catch (error) {
    // Handle errors appropriately (send a 500 Internal Server Error response)
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/update-password', async (req, res, next) => {
  try {
    const userId = req.body.userId; // Assuming you have a user ID in your request body
    const newPassword = req.body.newPassword;

    // Find the user by ID and update the password
    const updatedUser = await userSchema.findByIdAndUpdate(userId, { password: newPassword }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.delete('/delete-user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and delete
    const deletedUser = await userSchema.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


module.exports = router;