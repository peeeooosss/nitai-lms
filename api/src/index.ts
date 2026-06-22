import app from "./app.js";

const PORT = parseInt(process.env.PORT || "3001");

app.listen(PORT, () => {
  console.log(`NITAI API running on port ${PORT}`);
});
