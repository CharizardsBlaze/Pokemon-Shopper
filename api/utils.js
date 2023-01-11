const requireUser = (req, res, next) => {
    if(req.user) {
        next()
    }else {
        res.send({
            error: "NoUser",
            message: "This is no user set"
        })
    }
}

module.exports =  requireUser