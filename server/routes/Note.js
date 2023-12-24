const express = require('express');
const router = express.Router();
const {Note} = require('../models')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { log } = require('console');
const secret = process.env.SECRET_KEY;
router.get("/", async (req,res) => {
  const token = req.headers.authorization.split(' ')[1]
  log(token)
  log(secret)
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      res.status(403).json(" Authentificate first ")
    }else {
      //Token verification successful
      console.log(err)
      console.log('Token verified:', decoded);
      const listOfNotes = await Note.findAll();
      res.json({listOfNotes : listOfNotes , token : token});
      
         }
  });
  

})
router.post('/' , async (req,res) =>{
 const note = req.body;
 await Note.create(note);
 res.json(note);
});
router.delete('/:id', async (req,res) =>{
  const { id } = req.params;

  try {
    const noteToDelete = await Note.findOne({
      where:{
        id : id
      }
    });

    if (!noteToDelete) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Delete the note
    await noteToDelete.destroy();

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });}
})
module.exports = router;