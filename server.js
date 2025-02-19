const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5500; // Новый порт

const users = [
    { email: "test@example.com", password: "password123" },
    { email: "user@example.com", password: "qwerty" }
];

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    res.json({ success: !!user });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});