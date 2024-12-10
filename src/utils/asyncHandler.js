const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        console.log("Async handler invoked");
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            console.error("Error caught in asyncHandler:", err);
            next(err);
        });
    };
};

//2nd approach
//its a wraper code
//fuction into function
//wraper function is a function that wraps around another function
// const asyncHandler = (fn) => async(req, res, next) =>{
//     try{
//         await fn(req, res, next);
//     }
//     catch(err){
//         res.status(err.code|| 500).json({
//             success:false,
//             message:err.message
//     })
// }}


export { asyncHandler};
