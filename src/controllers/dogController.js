// uploadDogPic, deleteDogPic, updateDogPic, getDogPic, listDogPics
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
// const { ObjectId } = mongoose.Types;
const Dog = require("../models/dog");
const sharp = require('sharp')


exports.uploadDogPic = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const { compress } = req.query;
    const inputPath = req.file.path;
    const outputFilename = `${Date.now()}-compressed.jpg`;
    const outputPath = path.join("uploads", outputFilename);

    if (compress === "true") {
      console.log('47: ', outputPath, ':', inputPath)
      await sharp(inputPath)
        .resize(800)
        .jpeg({ quality: 70 })
        .toFile(outputPath);
      
      fs.unlinkSync(inputPath);
    } else {
      fs.renameSync(inputPath, outputPath);
    }

    const dog = new Dog({ 
        imagePath: outputPath,
        imageName: req.file.filename,
        size: req.file.size
    });
    await dog.save();

    res.status(201).json({ message: "Dog picture uploaded", dog });
  } catch (err) {
    res.status(500).json({ message: "Error processing image", error: err.message });
  }
};


exports.deleteDogPic = async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: "Dog picture not found" });
    
        fs.unlinkSync(dog.imagePath);
        await Dog.findByIdAndDelete(req.params.id);
        res.json({ message: "Dog picture deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting file", error: err.message });
    }
}

exports.updateDogPic = async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: "Dog picture not found" });
    
        fs.unlinkSync(dog.imagePath);
        dog.imagePath = req.file.path;
        dog.imageName = req.file.filename;
        dog.size = req.file.size;

        await dog.save();
    
        res.json({ message: "Dog picture updated", dog });
    } catch (err) {
        res.status(500).json({ message: "Error updating file", error: err.message });
    }
};

exports.getDogPic = async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: "Dog picture not found" });
        res.sendFile(path.resolve(dog.imagePath));
    } catch (err) {
        res.status(500).json({ message: "Error retrieving file", error: err.message });
    }
};

exports.listDogPics = async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving files", error: err.message });
    }
};