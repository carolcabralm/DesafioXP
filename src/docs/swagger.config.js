const swaggerConfig = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Swagger DesafioXp",
      description: "Desafio XP de back-end documentado pelo Swagger"
    },
    servers: [{
      url: "http://localhost:3000",
      description: "servidor local"
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ["./src/routes/loginRoute.js", "./src/routes/ativosRoute.js", "./src/routes/contaRoute.js", "./src/routes/investimentosRoutes.js"]
}

module.exports = {
  swaggerConfig,
}