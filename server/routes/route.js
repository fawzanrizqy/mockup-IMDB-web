const express = require("express");
const Controller = require("../controllers/controller");
const errorHandler = require("../middleware/errorHandler");
const { authUser } = require("../middleware/authCheck");
const router = express.Router();

router.post("/login", Controller.login);
//////////////CUSTOMER USERS///////////////////////////////////
router.get("/pub/movies", Controller.fetchMovies)
router.get("/pub/movies/:id", Controller.fetchMovieById);
router.get("/pub/genres", Controller.fetchGenres);
router.get("/pub/genres/:id", Controller.fetchGenreById);
///////////AUTHENTICATED USERS END POINTS///////////////////////
router.post("/register", Controller.register);
router.use(authUser);
/////////////MOVIES/////////////////////////////////////////
router.get("/movies", Controller.fetchMovies)
router.post("/movies", Controller.addMovie);
router.get("/movies/:id", Controller.fetchMovieById);
router.delete("/movies/:id", Controller.deleteMovie);
router.patch("/movies/:id", Controller.updateMovie);
///////////MOVIES END POINTS///////////////////////
/////////////GENRES///////////////////////////////////
router.get("/genres", Controller.fetchGenres);
router.get("/genres/:id", Controller.fetchGenreById);
router.post("/genres", Controller.addGenre);
router.delete("/genres/:id", Controller.deleteGenre);
router.patch("/genres/:id", Controller.updateGenre);
///////////////GENRES END POINTS///////////////////////
router.use(errorHandler);

module.exports = router