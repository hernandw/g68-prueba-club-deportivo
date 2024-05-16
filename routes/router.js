import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
}); // con esta ruta mostramos el html en la consola

router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query; //  nos traemos los datos del formulario
  const objectDeport = {
    nombre,
    precio,
  }; // guardamos los datos de la query en un objeto

  const { deportes } = JSON.parse(
    fs.readFileSync(__dirname + "/data/deportes.json", "utf-8")
  ); // leemos el archivo json y lo guardamos en una variable
  deportes.push(objectDeport); // agregamos el objeto al array
  fs.writeFileSync(__dirname + "/data/deportes.json", JSON.stringify({deportes})); // reescribimos el archivo json con el nuevo array
  res.send("deporte agregado con éxito");
});

router.get("/deportes", (req, res) => {
  res.sendFile(__dirname + "/data/deportes.json");
}); // con esta ruta mostramos el json en la consola que servirá cpmp api rest desde el frontend para cargar los deportes

router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query; //  nos traemos los datos del formulario
  const deportJSON = fs.readFileSync(__dirname + "/data/deportes.json", "utf-8")
  const { deportes } = JSON.parse(deportJSON); // leemos el archivo json y lo guardamos en una variable
  const index = deportes.findIndex((d) => d.nombre === nombre); //buscamos el indice del deporte que queremos editar
  deportes[index].precio = precio; // editamos el precio del deporte
  fs.writeFileSync(__dirname + "/data/deportes.json", JSON.stringify({deportes})); // reescribimos el archivo json con el nuevo array
  res.send("deporte editado con éxito");
  

})

router.get("/eliminar", (req, res) => {
  const { nombre } = req.query; //  nos traemos los datos del formulario
  const deportJSON = fs.readFileSync(__dirname + "/data/deportes.json", "utf-8")
  const { deportes } = JSON.parse(deportJSON); // leemos el archivo json y lo guardamos en una variable
  const index = deportes.findIndex((d) => d.nombre === nombre); //buscamos el indice del deporte que queremos editar
  deportes.splice(index, 1); // eliminamos el deporte
  fs.writeFileSync(__dirname + "/data/deportes.json", JSON.stringify({deportes})); // reescribimos el archivo json con el nuevo array
  res.send("deporte eliminado con válido");
})
export default router;


