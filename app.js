const express = require('express');
const fs = require('fs');
const app = express()
const path = require('path');
const port = 3000;

// Настройка EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Настройка статики

app.use(express.static(path.join(__dirname, 'public')));

//Настройка работы с json

let projects = [];
const dataPath = path.join(__dirname, 'data', 'data.json');
fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) { 
    console.error('Ошибка чтения файла data.json:', err)
  }

  try {
      const jsonData = JSON.parse(data);
      projects = jsonData.projects;
  } catch (parseErr) {
      console.error('Ошибка парсинга JSON:', parseErr);
  }
});
  
//Маршруты

app.get('/', (req, res) => {
  res.render('index', { title: 'Главная' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Проекты', projects });
});


app.get('/contacts', (req, res) => {
  res.render('contacts', { title: 'Контакты' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})