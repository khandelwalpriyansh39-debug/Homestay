
// const Favourite = require('../models/favourite');
const User= require('../models/user');
const Home=require('../models/Home');


exports.registeredhome= (req, res, next) => {
   console.log("hello form registerdhome controller");
  const registeredHomes=Home.find().
  then((registeredHomes)=>
    res.render('store/home-list', {registeredHomes: registeredHomes, pageTitle: ' Home List',isLoggedIn:req.isLoggedIn, user:req.session.user}))
  
};

exports.getIndex= (req, res, next) => {
  console.log("hello form registerdhome controller");
  console.log(" session values "+req.session+req.session.isLoggedIn);
  const registeredHomes=Home.find().
  then((registeredHomes)=>
 res.render('store/index', {registeredHomes: registeredHomes, pageTitle: ' Index',isLoggedIn:req.isLoggedIn, user:req.session.user})
 );
};

exports.getBooking=(req, res, next) => {
  
 res.render('store/booking', {pageTitle: 'my Bookings',isLoggedIn:req.isLoggedIn, user:req.session.user})
 
};




//m1

// first done this in moongose then update this ussing populate
// exports.getFavouriteList=(req, res, next) => {
// Favourite.find().then(favourites=>
// {
//    favourites=favourites.map(fav=>fav.houseId.toString());
//   Home.find()
// .then(registeredHomes =>{
//   console.log(registeredHomes, favourites);
//   const  favouriteHomes= registeredHomes.filter((home)=>
  
//     favourites.includes(home._id.toString())
//   );

//     res.render("store/favourite-list",{
//       favouriteHomes:  favouriteHomes,
//       pageTitle:"My favourites"
    //  ,isLoggedIn:req.isLoggedIn
    
//     });
// })
// })
// }
 

 
 
    
 



 exports.getHomeDetails= (req, res, next) => {
 console.log("Request params:", req.params);

   const homeId=req.params.homeid;
   console.log("at home detalis",homeId);
   Home.findById(homeId).then((homes)=>
   {  const home=homes;
     if(!home)
     {
      console.log("home not found");
        res.redirect("/homes");
     } 
     else{
    console.log("home detalis found",home);
    res.render('store/home-details', { home:home,pageTitle: ' homes Detalis',isLoggedIn:req.isLoggedIn, user:req.session.user})
     }
   } 
   )
  
};
 

///m2 relations 
exports.getFavouriteList= async  (req, res, next) => {
  const userid=req.session.user._id;
  const user= await User.findById(userid).populate('favourites')

   res.render("store/favourite-list",{
      favouriteHomes:  user.favourites,
      pageTitle:"My favourites",
    isLoggedIn:req.isLoggedIn,
     user:req.session.user
   }); 
  }



exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userid= req.session.user._id;
  const user= await User.findById(userid);
  console.log("Welcome to favourite with id", homeId, "and user id", userid)
  // Check if the home is already in favourites
    if(!user.favourites.includes(homeId)){
            await user.favourites.push(homeId);
            await user.save();
    }
    else
    {
      console.log("This home is already in your favourites");
      // Optionally, you can handle the case where the home is already a favourite
    }
    
     
      res.redirect("/favourite");
    
};




  
exports.postRemoveFormFavourite =async  (req, res, next) => {
  console.log(" body requested in delete : " ,req.body);
  const homeId = req.params.homeid;
  const userid= req.session.user._id;
  const user= await User.findById(userid);
  user.favourites = user.favourites.filter(fav => fav.toString() !== homeId);

  await user.save();
      res.redirect("/favourite");
  
};

exports.errorhand =
  (req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found',isLoggedIn:req.isLoggedIn, user:req.session.user});
  };