const usuarios = [
  {
    cuenta: "emiliano",
    password: "336604",
    nombreCompleto: "Emiliano Esparza Ramirez",
    haPagado: true,
    intentoRealizado: false,
    aprobo: true 
  },
  {
    cuenta: "victoria",
    password: "abcd",
    nombreCompleto: "Victoria Esparza Ramirez",
    haPagado: false,
    intentoRealizado: false 
  },
  {
    cuenta: "alejandro",
    password: "alex",
    nombreCompleto: "Alejandro Garcia",
    haPagado: true,
    intentoRealizado: false 
  },
  {
    cuenta: "alondra",
    password: "3108",
    nombreCompleto: "Alondra Marin",
    haPagado: false,
    intentoRealizado: false,
    aprobo: true 
 
  },
  {
    cuenta: "cesar",
    password: "gazoo",
    nombreCompleto: "Cesar Esparza Lopez",
    haPagado: true,
    intentoRealizado: true // para probar el bloqueo
  },
  {
    cuenta: "victor",
    password: "abi",
    nombreCompleto: "Victor Ramirez",
    haPagado: false,
    intentoRealizado: false 
  }
];

module.exports = usuarios;