const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory storage
let students = [];
let id = 1;

/* =========================
   CREATE Student
========================= */
app.post('/students', (req, res) => {
    const { name, age, marks } = req.body;

    // Validation
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const student = {
        id: id++,
        name,
        age,
        marks
    };

    students.push(student);
    res.status(201).json(student);
});

/* =========================
   READ All Students
========================= */
app.get('/students', (req, res) => {
    res.json(students);
});

/* =========================
   READ Student by ID
========================= */
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

/* =========================
   UPDATE Student
========================= */
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age, marks } = req.body;

    if (name) student.name = name;
    if (age) student.age = age;
    if (marks) student.marks = marks;

    res.json(student);
});

/* =========================
   DELETE Student
========================= */
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    // Optional: reset ID if all deleted (for lab demo)
    if (students.length === 0) {
        id = 1;
    }

    res.json({ message: "Student deleted successfully" });
});

/* =========================
   SERVER START
========================= */
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});