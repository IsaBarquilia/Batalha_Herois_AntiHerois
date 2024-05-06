CREATE DATABASE herois_vs_antiherois;
\c herois_vs_antiherois;

CREATE TABLE personagem (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    pontoVida VARCHAR(100) NOT NULL,
    pontoPoder VARCHAR(100) NOT NULL,
    poder VARCHAR(255) NOT NULL
);
INSERT INTO personagem (nome, pontoVida, pontoPoder, poder) VALUES 
('Superman', '100', '100', 'Superforça, supervelocidade, voo, visão de calor, sopro congelante, invulnerabilidade');

CREATE TABLE batalha (
    id SERIAL PRIMARY KEY,
    lutador1 INT NOT NULL,
    lutador2 INT NOT NULL,
    vencedor INT NOT NULL,
    perdedor INT NOT NULL,
    FOREIGN KEY (lutador1) REFERENCES personagem (id),
    FOREIGN KEY (lutador2) REFERENCES personagem (id),
    FOREIGN KEY (vencedor) REFERENCES personagem (id)
);

