//moongo data base connection
const mongoose=require ('mongoose');
//var con=mongoose.connect("mongodb://127.0.0.1:27017",//local application connection

var mongoose_connect=mongoose.connect("mongodb+srv://deepankersharma06:9711731607mi@cluster0.q1roi6n.mongodb.net/nodeproject?retryWrites=true&w=majority",
//ye humara online wala hai jo drivers se code copy krke yha dala hai
{
    useNewUrlParser:true,
    useUnifiedTopology:true})
    
    .then(()=>console.log("connection Successfully.."))
    .catch((err)=>console.log (err));

    module.exports= mongoose_connect;
