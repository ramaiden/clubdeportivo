const express = require('express')
const app = express();
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const LeerJSON = () => {
    const data = JSON.parse(fs.readFileSync('sport.json', 'utf-8'));
    return data;
}

const GuardarJSON = (data) => {
    fs.writeFileSync('sport.json', JSON.stringify({ deportes: data }));

}
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) { console.log(err) }
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' })
        res.end(data)
    })
})

app.get('/deportes', async (req, res) => {
    const { deportes } = LeerJSON();
    res.json({ deportes });
})

app.get('/agregar', async (req, res) => {
    const { nombre, precio } = req.query;
    const { deportes } = LeerJSON();
    const newSport = {
        nombre,
        precio,
    };
    console.log(nombre + ' ' + precio);
    deportes.push(newSport);
    GuardarJSON(deportes);
    res.json(JSON.stringify(newSport));
    })

app.delete(app.get('/eliminar', async (req, res) => {
    const { nombre, precio } = req.query;
    const { deportes } = LeerJSON();
    const deportesDelete = deportes.filter((deporte) => {
        return deporte.nombre !== nombre;
    });
    console.log(deportesDelete)
    GuardarJSON(deportesDelete);
    res.json(JSON.stringify({ nombre, precio }));
}))

app.get('/editar', async (req, res) => {
    const { nombre, precio } = req.query;
    const { deportes } = LeerJSON();
    console.log('hola2')
    const deportesUpdate = deportes.map((deporte) => {
        if (deporte.nombre === nombre) {
            deporte.precio = precio
        }
        return deporte;
    });
    GuardarJSON(deportesUpdate);
    res.json(JSON.stringify({ nombre, precio }));
})

app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'))