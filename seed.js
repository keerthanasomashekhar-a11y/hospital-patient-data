const mongoose = require('mongoose');
const Patient = require('./patientModel');

const mongoURI = "mongodb://127.0.0.1:27017/hospitalDB";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const patients = [
  { name: "John Doe", age: 30, gender: "Male", disease: "Flu" },
  { name: "Alice Smith", age: 25, gender: "Female", disease: "Covid-19" },
  { name: "Robert Johnson", age: 45, gender: "Male", disease: "Diabetes" },
  { name: "Mary Williams", age: 32, gender: "Female", disease: "Asthma" },
  { name: "James Brown", age: 50, gender: "Male", disease: "Hypertension" }
];

// Clear existing data first (optional)
Patient.deleteMany({})
  .then(() => Patient.insertMany(patients))
  .then(() => {
    console.log("Sample patients inserted!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });
