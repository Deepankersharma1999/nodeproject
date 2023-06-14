var express = require("express")
var app = express();
var router = express.Router();
const bodyParser = require('body-parser');

//import model files>>>>>>>>>>>>>>>>>>>>>>>>>
const applynow = require("./model/applynowschema")
const Userlogin = require("./model/loginschema")
const register = require("./model/registerschema")
const contactus = require("./model/contactschema");
const { then } = require("./connection");

var path=require("path")
//import model files>>>>>>>>>>>>>>>>>>>>>>>>>



//backend file import model files>>>>>>>>>>>>>>>>>>>>>>>>>
const Addjobdata = require("./model/Addjobschema");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//backend file import model files>>>>>>>>>>>>>>>>>>>>>>>>>



//multer importing//////////////////
const multer = require('multer');
//multer importing//////////////////


//ye connection bnaya hai humne mongoose se start>>>>>>>>>>>>>>>>
require("./connection")//for online Atlas account
//ye connection bnaya hai humne mongoose se End>>>>>>>>>>>>>>>>


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));




// imge saari file chalany k kaam ata hai
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'/upload')));

// imge saari file chalany k kaam ata hai end




//ye time rokne k liye hota hai jab koi user login karta hai to usko kitni der tk login rkhna hai vo hmare upr depend hai//

app.use(cookieParser());

app.use(
    session({
        key: "user_sid",
        secret: "somerandonstuffs",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
        },
    })
);


app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("user_sid");
    }
    next();
});



// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard/ind");
    } else {
        next();
    }
};

///* api In login dashboard sessionChecker Start */////////////---------------------->

router.get('/login', sessionChecker, (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    var email = req.body.email,
        password = req.body.pass;

    try {
        var user = await register.findOne({ email: email })
            .exec();
        if (!user) {
            res.redirect('/login');
        }

        // user.comparePassword(pass, (err, match) => {
        //     if (!match) {
        //         res.redirect('/login')
        //     }
        // });

        req.session.user = user;
        res.redirect('/dashboard/ind');
    } catch (error) {
        console.log(error);
    }
});
///* api In login dashboard sessionChecker End */////////////------------------------->






// frontend page api  start
// router.get("/", function (req, res) {
//     res.render('index')
// });




// ye vo api hai jisey hum get karege data websiteb k main page pe/////

router.get("/", async (req, res) =>{
    try{
        const data = await Addjobdata.find({});
        res.render('index',{data: data});
        console.log(data)
       }
    catch(err){
        console.log(err)
    }
})

// ye vo api hai jisey hum get karege data websiteb k main page pe/////





// contact us api start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get("/contact", function (req, res) {
    res.render('Contact')
})

router.post('/contact', (req, res) => {
    var contactdata = new contactus({
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        subject: req.body.subject,
    });
    contactdata.save().then(() => {
        console.log("saved data");
        // res.redirect('/login'); 
    })
        .catch((err) => {
            console.log(err);
            // res.redirect('/display');
        })
});

// contact us api End>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//apply now page api start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/applynow", function (req, res) {
    res.render('applynow')
})
router.post('/applynow', (req, res) => {
    // console.log(req)

    var data = new applynow({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        number: req.body.number,
        address: req.body.address,
        file: req.body.file,
        r1: req.body.r1,
        r2: req.body.r2,
        education: req.body.education,
    });
    data.save().then(() => {
        console.log("saved data");
        // res.redirect('/login'); 
    })
        .catch((err) => {
            console.log(err);
            // res.redirect('/display');
        })
});

//apply now page api end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


router.get("/jobs", function (req, res) {
    res.render('jobs')
})

//login api form start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get("/login", sessionChecker, async (req, res) => {
    res.render('login')
})
router.post('/login', async (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;


    try {
        var user = await register.findOne({ email: email })
            .exec()
        if (!user) {
            res.redirect("/login");


            req.session.user = user;
            res.redirect('/ind');
        }
    }
    catch (err) {
        console.log(err);
    }
});
//login form api end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




router.get("/about", function (req, res) {
    res.render('about')
})


router.get("/applynow", function (req, res) {
    res.render('applynow')
})
//  frontend api end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// ///////////////////////////////////////dashbord api pages start////////////////////////////////////////////////////

router.get('/dashboard/ind', function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard/ind')

    }
    else {
        res.redirect('/login')
    }
});


///////////////------------------------------------Add products api start--------//////////////////////////


router.get("/addjobs", function (req, res) {
    res.render('dashboard/addjobs')
})

//upload gallary ////////////////////////////////
const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./upload')
    },

    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})


const fileFilter = (req,file,cb)=>{
    const allowedFileTypes= ['image/jpeg', 'image/jpg','image/png','image/webp'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

let upload = multer({storage,fileFilter})


//upload gallary ////////////////////////////////



router.post('/addjobs',upload.single('products'),(req, res) => {


    var addjobdata = new Addjobdata
        ({
            location: req.body.location,
            post: req.body.post,
            details: req.body.details,
            quelification: req.body.quelification,
            products:req.file.filename,
            description: req.body.description

        });
    addjobdata.save().then(() => {
        console.log("your backend addjobs data saved ");
        // res.redirect('/login'); 
    })
        .catch((err) => {
            console.log(err);
            // res.redirect('/display');
        })
});
/////////////////////Add products end///////////////////////////





//Addjobs or viewjobs and edit get data api in our dash///////////////////////////////////////////////////

// router.get("/viewjobs", function (req, res) {
//     res.render('dashboard/Viewjobs')
// })

router.get("/Viewjobs", async (req, res) => {
    try {
        const data = await Addjobdata.find({});
        res.render('dashboard/Viewjobs', { data: data });
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/delete_viewjob/:id', async (req, res) => {
    try {
        const deleted = await Addjobdata.findByIdAndRemove(req.params.id);
        res.redirect('../Viewjobs')
        console.log(deleted);
    }
    catch (err) {
        console.log(err);
    }
});


router.get('/edit_4/:id', async (req, res) => {
    try {
        const data = await Addjobdata.findById(req.params.id);
        res.render('dashboard/viewjobedit', ({ data: data }))
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
});

//ye niche wali edit ki hai or isme form k andr action hta dena hai
router.post('/edit_4/:id', async (req, res) => {
    var updateviewjob =
    {
        location: req.body.location,
        post: req.body.post,
        details: req.body.details,
        quelification: req.body.quelification,
        products: req.filename,
        description: req.body.description
    }

    try {
        var updateviewjob = await Addjobdata.findByIdAndUpdate(req.params.id, updateviewjob)
        res.redirect('/Viewjobs')
    }
    // console.log(updatedatacontactus)
    catch (err) { console.log(err); }

})


//Addjobs or viewjobs and edit get data api in our dash end///////////////////////////////////////////////////











// //viewreg get data api in our dash>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//api signup form start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/signup", function (req, res) {
    res.render('signup')
})

router.post('/signup', (req, res) => {

    var user = new register
        ({
            uname: req.body.uname,
            email: req.body.email,
            pass: req.body.pass,
            pnumber: req.body.pnumber,
            pincode: req.body.pincode
        });
    user.save().then(() => {
        console.log("saved data");
        // res.redirect('/login'); 
    })
        .catch((err) => {
            console.log(err);
            // res.redirect('/display');
        })
});

//signup data get form end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/viewreg ", function (req, res) {
    res.render('dashboard/viewreg')
})

router.get("/viewreg", async (req, res) => {
    try {
        const data = await register.find({});
        res.render('dashboard/viewreg', { data: data });
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const deleted = await register.findByIdAndRemove(req.params.id);
        res.redirect('../viewreg')
        console.log(deleted);
    }
    catch (err) {
        console.log(err);
    }
});


router.get('/edit_3/:id', async (req, res) => {
    try {
        const data = await register.findById(req.params.id);
        res.render('dashboard/signupedit', ({ data: data }))
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
});

//ye niche wali edit ki hai or isme form k andr action hta dena hai
router.post('/edit_3/:id', async (req, res) => {
    var updatesignup =
    {
        uname: req.body.uname,
        email: req.body.email,
        pass: req.body.pass,
        pnumber: req.body.pnumber,
        pincode: req.body.pincode
    }

    try {
        var updatesignup = await register.findByIdAndUpdate(req.params.id, updatesignup)
        res.redirect('/viewreg')
    }
    // console.log(updatedatacontactus)
    catch (err) { console.log(err); }

})

//viewreg get data api in our dash///////////////////////////////////////





//apply table backend>>>>>>>>>>>>>>>>>>>///////////////////////////
router.get("/applytable", async (req, res) => {
    try {
        const data = await applynow.find({});
        res.render('dashboard/applytable', { data: data });
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
})


router.get('/delete_apply/:id', async (req, res) => {
    try {
        const deleted = await applynow.findByIdAndRemove(req.params.id);
        res.redirect('../applytable')
        console.log(deleted);
    }
    catch (err) {
        console.log(err);
    }
});


router.get('/edit_2/:id', async (req, res) => {
    try {
        const data = await applynow.findById(req.params.id);
        res.render('dashboard/applytableedit', ({ data: data }))
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
});

//ye niche wali edit ki hai or isme form k andr action hta dena hai
router.post('/edit_2/:id', async (req, res) => {
    var updateapplynow =
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        number: req.body.number,
        address: req.body.address,
        file: req.body.file,
        r1: req.body.r1,
        education: req.body.education
    }

    try {
        var updateapplynow = await applynow.findByIdAndUpdate(req.params.id, updateapplynow)
        res.redirect('/applytable')
    }
    // console.log(updatedatacontactus)
    catch (err) { console.log(err); }

})

//apply table end ///////////////////////////////////////////////////






//show contact data table apis///////////////////////////////////////
router.get("/showcontact", async (req, res) => {
    try {
        const data = await contactus.find({});
        res.render('dashboard/Showcontact', { data: data });
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/delete_contact/:id', async (req, res) => {
    try {
        const deleted = await contactus.findByIdAndRemove(req.params.id);
        res.redirect('../Showcontact')
        console.log(deleted);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/edit_1/:id', async (req, res) => {
    try {
        const data = await contactus.findById(req.params.id);
        res.render('dashboard/Showcontactedit', ({ data: data }))
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
});




//ye niche wali edit ki hai or isme form k andr action hta dena hai
router.post('/edit_1/:id', async (req, res) => {
    var updatecontactus =
    {
        email: req.body.email,
        subject: req.body.subject
    }

    try {
        var updatecontactus = await contactus.findByIdAndUpdate(req.params.id, updatecontactus)
        res.redirect('/Showcontact')
    }
    // console.log(updatedatacontactus)}
    catch (err) { console.log(err); }

})
//show contact data table apis/////////////////////////////////////////










//login data table apis///////////////////////////////////////
router.get("/logintable", async (req, res) => {
    try {
        const data = await Userlogin.find({});
        res.render('dashboard/logintable', { data: data });
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/delete_login/:id', async (req, res) => {
    try {
        const deleted = await Userlogin.findByIdAndRemove(req.params.id);
        res.redirect('../logintable')
        console.log(deleted);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/edit_5/:id', async (req, res) => {
    try {
        const data = await Userlogin.findById(req.params.id);
        res.render('dashboard/logintableedit', ({ data: data }))
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
});


//ye niche wali edit ki hai or isme form k andr action hta dena hai
router.post('/edit_5/:id', async (req, res) => {
    var updatelogintable =
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try {
        var updatelogintable = await Userlogin.findByIdAndUpdate(req.params.id, updatelogintable)
        res.redirect('/logintable')
    }
    // console.log(updatelogintable)}
    catch (err) { console.log(err); }

})




//login contact data table apis/////////////////////////////////////////




app.use('/', router)

app.listen(2003, function () {
    console.log('server started');
});
