//express-async-errors is the replacement for custom error middleware or we can use this
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await  handler(req, res);
          } catch (error) {
              next(error)
          }
    };   
};