import express from "express";
import mangaRoute from "./routes/manga.route.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.use("/mangas", mangaRoute);

app.listen(port, () => {
    console.log(`Sistema rodando em http://localhost:${port}`);
});