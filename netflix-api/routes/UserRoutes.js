const { addToLikedMovies, getLikedMovies, removeMovieFromList } = require("../controllers/UserController")

const router = require("express").Router()

router.post("/add", addToLikedMovies)
router.post("/likedMovies", getLikedMovies)
router.post("/removeMovies", removeMovieFromList)

module.exports = router