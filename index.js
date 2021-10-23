const express = require("express")
const app = express()
const cors = require("cors")
const hbs = require("express-handlebars")
const path = require("path")
const PORT = 8080

class Producto{
    constructor(nombre,precio,urlFoto){
        this.nombre = nombre
        this.precio = precio   
        this.urlFoto = urlFoto
    }
}

let productos = []

app.use(cors("*"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//HBS
app.engine("hbs", hbs({
    extname: ".hbs",
    layoutsDir: "./views/handlebars",
    defaultLayout: "index"
}))

app.set("views", path.join(__dirname,"views", "handlebars"))
app.set("view engine", "hbs")

//PUG
// app.set("views", path.join(__dirname,"views", "pug"))
// app.set("view engine", "pug")

//EJS
// app.set("views", path.join(__dirname,"views", "ejs"))
// app.set("view engine", "ejs")

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

app.get("/", (req,res,next) => {
    
    // Res.render para PUG y EJS
    // res.render("index")

    // Res.render para HBS
    res.render("ingresar")
})

app.post("/productos", (req,res,next) => {
    let data = req.body
    productos.push(new Producto(data.nombre, data.precio, data.urlFoto))
    
    // Res.render para PUG y EJS
    // res.render("productos", {productos})

    // Res.render y res.redirect para HBS
    res.render("ingresar")
    res.redirect("productos")
})

app.get("/productos", (req,res,next) => {
    let hayProductos
    productos.length > 0 ? hayProductos = true : hayProductos = false
    
    // Res.render para PUG y EJS
    // res.render("productos", {productos})

    // Res.render para HBS
    res.render("productos", {hayProductos: hayProductos, productos: productos})
})

