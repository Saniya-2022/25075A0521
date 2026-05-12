/*const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');


// ➕ CREATE
router.post('/students', async (req, res) => {
    const { id, name, email, course } = req.body;

    try {
        const con = await getConnection();

        await con.execute(
            `INSERT INTO students2 (id, name, email, course)
             VALUES (:id, :name, :email, :course)`,
            [id, name, email, course]
        );

        await con.commit();
        await con.close();

        res.send("Student added successfully");
    } catch (err) {
    console.error("ERROR:", err);   // 👈 ADD THIS
    res.status(500).send(err.message);
}
});


// 📖 READ ALL
router.get('/students', async (req, res) => {
    try {
        const con = await getConnection();

        const result = await con.execute(
            `SELECT * FROM students2`
        );

        await con.close();

        res.json(result.rows);
    }catch (err) {
    console.error("ERROR:", err);   // 👈 ADD THIS
    res.status(500).send(err.message);
}
});


// 📖 READ ONE
router.get('/students/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const con = await getConnection();

        const result = await con.execute(
            `SELECT * FROM students2 WHERE id = :id`,
            [id]
        );

        await con.close();

        res.json(result.rows);
    } catch (err) {
    console.error("ERROR:", err);   // 👈 ADD THIS
    res.status(500).send(err.message);
}
});


// ✏️ UPDATE
router.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, course } = req.body;

    try {
        const con = await getConnection();

        await con.execute(
            `UPDATE students2
             SET name = :name,
                 email = :email,
                 course = :course
             WHERE id = :id`,
            [name, email, course, id]
        );

        await con.commit();
        await con.close();

        res.send("Student updated successfully");
    }catch (err) {
    console.error("ERROR:", err);   // 👈 ADD THIS
    res.status(500).send(err.message);
}
});


// ❌ DELETE
router.delete('/students/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const con = await getConnection();

        await con.execute(
            `DELETE FROM students2 WHERE id = :id`,
            [id]
        );

        await con.commit();
        await con.close();

        res.send("Student deleted successfully");
    } catch (err) {
    console.error("ERROR:", err);   // 👈 ADD THIS
    res.status(500).send(err.message);
}
});

module.exports = router;*/
const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');
const { authenticateToken } = require('../auth');


// ➕ CREATE
router.post('/students', authenticateToken, async (req, res) => {
    const { id, name, email, course } = req.body;

    try {
        const con = await getConnection();

        await con.execute(
            `INSERT INTO students2 (id, name, email, course)
             VALUES (:id, :name, :email, :course)`,
            [id, name, email, course]
        );

        await con.commit();
        await con.close();

        res.send("Student added successfully");
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send(err.message);
    }
});


// 📖 READ ALL
router.get('/students', authenticateToken, async (req, res) => {
    try {
        const con = await getConnection();

        const result = await con.execute(
            `SELECT * FROM students2`
        );

        await con.close();

        res.json(result.rows);
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send(err.message);
    }
});


// 📖 READ ONE
router.get('/students/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;

    try {
        const con = await getConnection();

        const result = await con.execute(
            `SELECT * FROM students2 WHERE id = :id`,
            [id]
        );

        await con.close();

        res.json(result.rows);
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send(err.message);
    }
});


// ✏️ UPDATE
router.put('/students/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const { name, email, course } = req.body;

    try {
        const con = await getConnection();

        await con.execute(
            `UPDATE students2
             SET name = :name,
                 email = :email,
                 course = :course
             WHERE id = :id`,
            [name, email, course, id]
        );

        await con.commit();
        
        await con.close();

        res.send("Student updated successfully");
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send(err.message);
    }
});


// ❌ DELETE
router.delete('/students/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;

    try {
        const con = await getConnection();

        await con.execute(
            `DELETE FROM students2 WHERE id = :id`,
            [id]
        );

        await con.commit();
        await con.close();

        res.send("Student deleted successfully");
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send(err.message);
    }
});

module.exports = router;