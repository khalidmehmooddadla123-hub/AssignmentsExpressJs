module.exports = (req, res, next) => {
  const start = process.hrtime.bigint(); 
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;

    console.log(
      `[RequestLogger] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs.toFixed(2)} ms`
    );
  });

  next();
};