const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static HTML file
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// Handle form submission
app.post("/", function (req, res) {

    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);

    // Convert height from cm to meters
    height = height / 100;

    // BMI Formula
    let bmi = weight / (height * height);

    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    res.send(`
        <h1>BMI Result</h1>
        <p>Your BMI is: ${bmi.toFixed(2)}</p>
        <p>Category: ${category}</p>
        <a href="/">Go Back</a>
    `);
});

// Start server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});