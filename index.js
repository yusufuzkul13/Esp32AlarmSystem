/*
* _______   ________  ________  ________    _______          ________  ___       ________  ________  _____ ______           ________       ___    ___ ________  _________  _______   _____ ______      
* |\  ___ \ |\   ____\|\   __  \|\_____  \  /  ___  \        |\   __  \|\  \     |\   __  \|\   __  \|\   _ \  _   \        |\   ____\     |\  \  /  /|\   ____\|\___   ___|\  ___ \ |\   _ \  _   \    
* \ \   __/|\ \  \___|\ \  \|\  \|____|\ /_/__/|_/  /|       \ \  \|\  \ \  \    \ \  \|\  \ \  \|\  \ \  \\\__\ \  \       \ \  \___|_    \ \  \/  / \ \  \___|\|___ \  \_\ \   __/|\ \  \\\__\ \  \   
*  \ \  \_|/_\ \_____  \ \   ____\    \|\  |__|//  / /        \ \   __  \ \  \    \ \   __  \ \   _  _\ \  \\|__| \  \       \ \_____  \    \ \    / / \ \_____  \   \ \  \ \ \  \_|/_\ \  \\|__| \  \  
*   \ \  \_|\ \|____|\  \ \  \___|   __\_\  \  /  /_/__        \ \  \ \  \ \  \____\ \  \ \  \ \  \\  \\ \  \    \ \  \       \|____|\  \    \/  /  /   \|____|\  \   \ \  \ \ \  \_|\ \ \  \    \ \  \ 
*    \ \_______\____\_\  \ \__\     |\_______\|\________\       \ \__\ \__\ \_______\ \__\ \__\ \__\\ _\\ \__\    \ \__\        ____\_\  \ __/  / /       ____\_\  \   \ \__\ \ \_______\ \__\    \ \__\
*     \|_______|\_________\|__|     \|_______| \|_______|        \|__|\|__|\|_______|\|__|\|__|\|__|\|__|\|__|     \|__|       |\_________|\___/ /       |\_________\   \|__|  \|_______|\|__|     \|__|
*              \|_________|                                                                                                    \|_________\|___|/        \|_________|                                   
*
*
*                                                                           Author: Yusuf Uzkul
*                                                                           Author: Uğur Duymuş
*                                                                           Github: https://github.com/yusufuzkul13
*
*
*/

const express = require('express');
const exphbs = require('express-handlebars').engine;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const sql = require('./mysql');
const path = require('path');
const u = require("./utils.js");
const crypto = require('crypto');

const app = express();
const port = process.env.PORT;

// View Engine Ayarlari
app.set("views", path.join(__dirname + "/views/"));
app.engine(process.env.EXT, exphbs({
    // helpers: hsbhelper,
    extname: process.env.EXT,
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/Layouts/',
    partialsDir: __dirname + '/views/Partials/'
}));

app.set("view engine", process.env.EXT);

// Statik Dosya Ayarı
app.use("/wwwroot", express.static(__dirname + "/wwwroot"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser({
    sameSite: "none",
    secure: true,
}));
// app.use(cors());

// Render Parametreleri Fonksiyonu

function renderParams(req, data, gridprop, layout = "mainLayout") {
    var renderedOBJ = {};

    if (data) {
        renderedOBJ.data = data;
        renderedOBJ.JSONdata = JSON.stringify(data);
    }

    if (gridprop) {
        renderedOBJ.gridprop = gridprop;
        renderedOBJ.JSONgridprop = JSON.stringify(gridprop);
    }

    renderedOBJ.user = req.user || {};
    renderedOBJ.menuData = req.menuData || [];
    renderedOBJ.layout = layout;
    renderedOBJ.settings = u.ExFrontEndParams("FE");
    renderedOBJ.JSONsettings = JSON.stringify(u.ExFrontEndParams("FE"));

    return renderedOBJ;
}


// Begin API

// Login Sayfası
app.get('/', (req, res) => {
    res.render("login", renderParams(req, null, null));
});

// alerts - post
app.post('/alerts', async (req, res) => {
    const { button, color } = req.body;

    if (!button || !color) {
        return res.status(400).send('Eksik veri!');
    }

    const query = `
        INSERT INTO alerts (button, color)
        VALUES (@button, @color)
    `;

    const params = [
        { name: "button", value: button },
        { name: "color", value: color }
    ];

    try {
        const result = await sql.runSQLWithPool(query, params);
        res.status(200).send({ _id: result.insertId || 0 }); // insertId ile id döndür
    } catch (err) {
        console.error("Veritabanı hatası:", err);
        res.status(500).send('Veritabanı hatası');
    }
});


// GET: Listeleme (ön yüzde gösterilecek)
app.get('/alerts', async (req, res) => {
    const query = `
        SELECT * FROM alerts
        ORDER BY created_at DESC
        LIMIT 10
    `;

    try {
        const alerts = await sql.runSQLWithPool(query);
        res.render('alerts', { alerts });
    } catch (err) {
        console.error("Veritabanı hatası:", err);
        res.status(500).send('Veritabanı hatası');
    }
});

// End API


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});