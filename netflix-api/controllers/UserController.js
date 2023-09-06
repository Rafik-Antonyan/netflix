const User = require('../models/UserModel')

const addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const movieAlreadyLiked = user.likedMovies.find(({ id }) => id === data.id)
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the liked list." })
        } else await User.create({ email, likedMovies: [data] })
        return res.json({ msg: "Movie added successfully." })
    } catch (err) {
        res.json({ msg: "Error adding movie" })
    }
}

const getLikedMovies = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (user) {
            res.json({ msg: "Fetching was done successfully", movies: user.likedMovies })
        } else return res.json({ msg: "User with given email not found." });
    } catch (err) {
        res.json({ msg: "Error fetching movies" })
    }
}

const removeMovieFromList = async (req, res) => {
    try {
        const { email, id } = req.body
        const user = await User.findOneAndUpdate({ email }, {
            $pull: { likedMovies: { id } }
        },
            { new: true }
        )
        res.json(user)
    } catch (err) {
        res.json({ msg: "Something went wrong." })
    }
}

module.exports = {
    addToLikedMovies,
    getLikedMovies,
    removeMovieFromList
}