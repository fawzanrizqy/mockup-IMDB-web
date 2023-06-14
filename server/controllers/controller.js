const { User, Movie, Cast, Genre } = require("../models")
const { checkPass } = require("../helpers/encryptor")
const { signToken } = require("../helpers/jwt")
const { sequelize } = require("../models/")
const { Op } = require("sequelize");

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw ({ name: 'validationErr', message: "Email required", code: 400 })
            }
            if (!password) {
                throw ({ name: 'validationErr', message: "Password required", code: 400 })
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw ({ name: 'AuthErr', message: "Invalid email/password", code: 401 })
            }

            const isValidPass = checkPass(password, user.password);

            if (!isValidPass) {
                throw ({ name: 'AuthErr', message: "Invalid email/password", code: 401 })
            }

            const access_token = signToken({ id: user.id, email: user.email })

            res.status(200).json({
                access_token, id: user.id, email: user.email, role: user.role
            })


        } catch (err) {
            next(err);
        }
    }

    static async register(req, res, next) {
        try {
            const { email, password, username, phoneNumber, address } = req.body

            const user = await User.create({
                email, password, username, phoneNumber, address, role: 'admin'
            });

            res.status(201).json(user);

        } catch (err) {
            next(err);
        }
    }

    ///////////////MOVIES/////////////
    static async fetchMovies(req, res, next) {
        try {
            let option = {};
            const { title } = req.query;

            if (title) {
                option.title = {
                    [Op.iLike]: `%${title}%`,
                };
            }

            const movies = await Movie.findAll({
                include: [{
                    model: Genre,
                },
                {
                    model: Cast,
                },
                {
                    model: User,
                }],
                where: option
            });

            res.status(200).json(movies);
        } catch (err) {
            next(err);
        }
    }

    static async fetchMovieById(req, res, next) {
        try {
            const id = +req.params.id;

            const movie = await Movie.findOne({
                where: {
                    id
                },
                include: [{
                    model: Genre,
                },
                {
                    model: Cast,
                }
                ]
            })
            if (!movie) {
                throw ({ name: "notFound", message: "Movie not found", code: 404 });
            }

            res.status(200).json(movie);
        } catch (err) {
            next(err);
        }
    }

    static async addMovie(req, res, next) {
        const t = await sequelize.transaction();
        try {

            const { title,
                synopsis,
                trailerUrl,
                imgUrl,
                genreId,
                authorId,
                rating,
                artist } = req.body;

            const slug = title.split(' ').join('-').toLowerCase();

            const movie = await Movie.create({
                title,
                synopsis,
                trailerUrl,
                imgUrl,
                genreId,
                authorId,
                rating,
                slug
            }, { transaction: t });

            const dataActor = artist.map(actor => {
                if (!actor) {
                    throw ({ name: "validationErr", message: "Actor Name required", code: 400 });
                }

                return {
                    name: actor,
                    movieId: movie.id
                }
            });

            const casts = await Cast.bulkCreate(dataActor, { transaction: t });
            t.commit();
            res.status(201).json(movie)
        } catch (err) {
            t.rollback();
            next(err);
        }
    }

    static async updateMovie(req, res, next) {
        const t = await sequelize.transaction();
        try {

            const {
                title,
                synopsis,
                trailerUrl,
                imgUrl,
                genreId,
            } = req.body;
            const slug = title.split(' ').join('-').toLowerCase();

            const movie = await Movie.update({ title, synopsis, trailerUrl, imgUrl, genreId, slug },
                { where: { id: +req.params.id } }, { transaction: t });
            t.commit();
            res.status(200).json(movie);
        } catch (err) {
            t.rollback();
            next(err);
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const id = +req.params.id;
            const movie = await Movie.destroy({ where: { id } });

            res.status(200).json(movie);
        } catch (err) {
            next(err);
        }
    }

    ////////////////////////////GENRE///////////////////////////

    static async fetchGenres(req, res, next) {
        try {
            const genres = await Genre.findAll();

            res.status(200).json(genres);
        } catch (err) {
            next(err);
        }
    }

    static async fetchGenreById(req, res, next) {
        try {
            const id = +req.params.id;
            const genre = await Genre.findByPk(id);
            if (!genre) {
                throw ({ name: "notFound", message: "Genre not found", code: 404 });
            }
            res.status(200).json(genre);
        } catch (err) {
            next(err);
        }
    }

    static async addGenre(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { name } = req.body;
            const genre = await Genre.create({ name }, { transaction: t });
            t.commit();
            res.status(201).json(genre);
        } catch (err) {
            t.rollback();
            next(err);
        }
    }

    static async updateGenre(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { name } = req.body;
            const id = +req.params.id;
            const genre = await Genre.update({ name }, { where: { id } }, { transaction: t });
            t.commit();
            res.status(200).json(genre);

        } catch (err) {
            t.rollback();
            next(err);
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            const id = +req.params.id;
            const genre = await Genre.destroy({ where: { id } });
            res.status(200).json(genre);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = Controller