// middleware/authOptional.js
const jwt = require('jsonwebtoken');

const authOptional = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                // Se o token for válido, anexamos o usuário ao req
                req.user = decoded;
            }
            // Mesmo se o token for inválido, seguimos em frente
            next();
        });
    } else {
        // Sem cabeçalho de autorização? Sem problemas, segue o jogo.
        next();
    }
};

module.exports = authOptional;