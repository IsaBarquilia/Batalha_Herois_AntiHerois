const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'herois_vs_antiherois',
    password: 'ds564',
    port: 7007,
});

app.get('/personagem', async (req, res) => {
    const result = await pool.query('SELECT * FROM personagem');
    try{
        res.json({
            status: 'success',
            total: result.rowCount,
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
    }
});

app.get('/personagem/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM personagem WHERE id = $1', [id]);
    res.json(result.rows);
});

app.post('/personagem', async (req, res) => {
    try {
        const { nome, pontoVida, pontoPoder, poder} = req.body;
    await pool.query('INSERT INTO personagem (nome, pontoVida, pontoPoder, poder) VALUES ($1, $2, $3, $4)', [nome, pontoVida, pontoPoder, poder]);
    if (!nome || !pontoVida
        || !pontoPoder || !poder) {
        return res.status(400).send('Preencha todos os campos');
    }

    const query = `INSERT INTO personagem (nome, pontoVida, pontoPoder, poder) VALUES ($1, $2, $3, $4)`;
    const values = [nome, pontoVida, pontoPoder, poder];
    const results = await pool.query(query, values);
    res.status(201).send(`Personagem adicionado com sucesso!`);
    } catch (e) {
        console.error(e);
    }
});

app.put('/personagem/:id', async (req, res) => {
    try {
        const { id } = req.params;
    const { nome, pontoVida, pontoPoder, poder} = req.body;
    await pool.query('UPDATE personagem SET nome = $1, pontoVida = $2, pontoPoder = $3, poder = $4 WHERE id = $5', [nome, pontoVida, pontoPoder, poder, id]);
    res.json(res.rows);
  
    if(!nome && !pontoVida
        && !pontoPoder && !poder) {
        return res.status(400).send('Preencha todos os campos');
    } 
    res.status(201).send(`Personagem editado com sucesso!`);
    } catch (error) {
        console.error(error);
        
    }
    
});

app.delete('/personagem/:id', async (req, res) => {
    try {
         const { id } = req.params;
    await pool.query('DELETE FROM personagem WHERE id = $1', [id]);
    res.json('Personagem deletado com sucesso!');
    res.json(res.rows);
    } catch (e) {
        console.error(e);  
    }
   
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
