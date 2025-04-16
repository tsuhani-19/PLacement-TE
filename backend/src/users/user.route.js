const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Ensure jwt is imported
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');

router.post('/register', async (req, res) => {
  try {
    const { Name, email, password, Year, Branch } = req.body;
    const user = new User({ Name, email, password, Year, Branch });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Error: Unable to register" });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(404).send({ message: "Password does not match" });

    const token = await generateToken(user._id);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
    

    res.status(200).send({
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        Name: user.Name,
        email: user.email,
        Year: user.Year,
        Branch: user.Branch,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Error: Unable to login" });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: "Logged out successfully" });
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Error deleting user' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users' });
  }
});

router.patch('/edit-profile', async (req, res) => {
  try {
    const { Name, userId, profileImage, bio, profession } = req.body;
    if (!userId) return res.status(400).send({ message: "Please provide user ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (Name !== undefined) user.Name = Name;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    await user.save();
    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        email: user.email,
        Name: user.Name,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        
        
      }
    });
  } catch (error) {
    console.error('Error editing profile:', error);
    res.status(500).send({ message: 'Error editing profile' });
  }
});
router.get('/me', async (req, res) => {
  try {
      const token = req.cookies.token; // Get token from cookies
      if (!token) return res.status(401).send({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
      const user = await User.findById(decoded.id); // Fetch user by ID
      if (!user) return res.status(404).send({ message: "User not found" });

      res.status(200).send({
          _id: user._id,
          Name: user.Name,
          email: user.email,
          Year: user.Year,
          Branch: user.Branch,
          role: user.role,
          profileImage: user.profileImage,
          bio: user.bio,
          profession: user.profession,
          skills: user.skills, // Include skills
          cgpa: user.cgpa, // Include CGPA
          preferedcompany:user.preferedcompany,
      });
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send({ message: "Error fetching user data" });
  }
});
router.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send(user);
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send({ message: "Error fetching user data" });
  }
});
// Update user profile
router.post("/update-profile", async (req, res) => {
  console.log("Request body:", req.body);

  const { userId, Name, skills, cgpa ,preferedcompany} = req.body;

  if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
  }

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      if(preferedcompany) user.preferedcompany= preferedcompany;

      if (Name) user.Name = Name;
      if (skills) user.skills = skills;
      if (cgpa) {
          if (isNaN(cgpa)) {
              return res.status(400).json({ message: "CGPA must be a number" });
          }
          user.cgpa = cgpa;
      }

      await user.save();
      console.log("Updated user:", user);

      res.status(200).json({
          message: "Profile updated successfully",
          user: {
              _id: user._id,
              Name: user.Name,
              email: user.email,
              skills: user.skills,
              cgpa: user.cgpa,
              Year: user.Year,
              Branch: user.Branch,
              role: user.role,
              profileImage: user.profileImage,
              bio: user.bio,
              profession: user.profession,
              preferedcompany:user.preferedcompany,
          },
      });
  } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/create-admin', async (req, res) => {
  try {
    const { name, email, password, year, branch } = req.body;
    const adminUser = new User({ name, email, password, year, branch, isAdmin: true });
    await adminUser.save();
    res.status(201).send({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).send({ message: 'Error: Unable to create admin' });
  }
});





module.exports = router;
