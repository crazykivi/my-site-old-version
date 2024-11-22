const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('/usr/share/nginx/html/sqlite/database.sqlite', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к базе данных SQLite!');
    }
});

app.use(express.json());

app.get('/api/records', (req, res) => {
    db.all('SELECT * FROM records', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ records: rows });
    });
});

app.post('/api/records', (req, res) => {
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ error: 'Content is required' });
        return;
    }

    db.run('INSERT INTO records (content) VALUES (?)', [content], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
