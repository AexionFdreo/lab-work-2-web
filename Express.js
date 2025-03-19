app.set("view engine", "hbs"); // Використання шаблонізатора hbs
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.use(express.static(path.join(__dirname, "public")));