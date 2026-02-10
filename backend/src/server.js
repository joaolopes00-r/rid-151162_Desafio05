require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`🔥 API rodando na porta ${process.env.PORT}`);
});
