import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    host: process.env.DB_HOST,         
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

db.connect().then(()=>console.log("Connected to DB")).catch((err=> console.log("DB CONNECTION ERROR")));

app.get("/posts", async(req ,res)=> {
    try{
        const result = await db.query("SELECT * FROM posts ORDER BY created_at DESC")
        res.json(result.rows)
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Database error"})
    }
})
app.get("/posts/:id" , async(req,res)=>{
    const id = req.params.id;
    try{
        const result = await db.query("SELECT * FROM posts WHERE id = $1 ", [id]);
        if(result.rows.length === 0){
            return res.status(404).json({error: "POST NOT FOUND"})
        }
        res.json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Database error"})
    }
})

app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );
        console.log("Received data:", req.body);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id; 
    try {
        const result = await db.query(
            "DELETE FROM posts WHERE id=$1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Post deleted", post: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;

    try {
        const result = await db.query(
            "UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *",
            [title, content, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(result.rows[0]); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.listen(5000, () => console.log("Server running on port 5000"));
