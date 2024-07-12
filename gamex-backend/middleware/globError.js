function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
  // Usa il middleware dopo tutte le rotte
  app.use(errorHandler);
  