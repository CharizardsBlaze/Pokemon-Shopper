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
// remember the stuff kiavash said.
const verifyUser = (checkAdmin) => {
  return requireUser
}
module.exports =  requireUser