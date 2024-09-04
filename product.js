// server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.static('public')); // Serve static files (CSS, JS)

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique filename
    }
});
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));

app.post('/admin/products/add', upload.array('images', 10), [
    body('productName').notEmpty().withMessage('Product Name is required'),
    body('price').isNumeric().withMessage('Price must be a valid number'),
    body('description').notEmpty().withMessage('Description is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Validation failed: ' + JSON.stringify(errors.array()));
    }

    // Handle product saving here (e.g., saving to a database)
    // For simplicity, we're just returning a success message
    res.send('Product added successfully');
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
