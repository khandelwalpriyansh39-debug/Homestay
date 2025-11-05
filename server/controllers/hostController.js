
const Home=require('../models/Home');
const fs = require('fs');

exports.getHomeadd = ( req, res, next) => {
  res.render('host/edit-home', {pageTitle: 'Add Home to airbnb',editing :false,isLoggedIn:req.isLoggedIn,user:req.session.user});
  
};



exports.postHomeAdd =(req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const {housename,price,location,description}=req.body;
  console.log("contaroller" ,housename,price,location,description);
  console.log(req.file);
if(!req.file)
{
  res.redirect("host/edit-home");
}
const photo=req.file.path;
 const home=new Home({housename,price,location,photo,description}); // we add{ and write feilds into it becoz moongose schemea wants object of feild insteads of single feilds } and  new Home({housename,price,location,photo,description}); is basically 
 //new Home({housename:this.housename ,price,location,photo,description}); but here in db and here both name is same so we dont write like that
  // req.file is the file object uploaded by multer
 home.save().then(()=>
 {
  console.log("home added sucessfully");
 } ).catch((err)=>
{
    console.log("home addtion failed"+err);
})
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, housename, price, location, description ,contact} = req.body;
  let photo = req.body.photo;
  console.log("req body: ",req.body);
  
  Home.findById(id).then((home)=>
     {home.housename=housename;
  home.price=price;  
   home.location=location;
   home.contact=contact;
                                 //if file is uploaded, update the photo
                                          //if(req.file) is used to check if a new file is uploaded
                                       //if a new file is uploaded, delete the old photo from the server
  if(req.file)
      {  fs.unlink(home.photo,(err)=>  // Delete the old photo file from the server
      {
        if(err)
        {
          console.log("error while deleting old photo ",err);
        }
      })
        home.photo = req.file.path; // Update photo if a new file is uploaded
      } // Update photo if a new file is uploaded
    home.description=description;
    
    
  home.save().then((result)=>
  {
    console.log("home edit sucessfully ",result)
  }).catch((err)=>
  {
    console.log("their is error in updation ",err);
  })
res.redirect("/host/host-home-list");}

  ).catch((err)=>
  {
    console.log("err while finding home  ",err)
  })
  
};

exports.getHostHome= (req, res, next) => {

  const registeredHomes=Home.find().
  then((registeredHomes)=>
 res.render('host/host-home-list', {registeredHomes: registeredHomes, pageTitle: 'Host Home List',isLoggedIn:req.isLoggedIn, user:req.session.user})
 );
};

 exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then((homes) => {
    const home = homes;
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      editing: editing
      ,isLoggedIn:req.isLoggedIn,
      user:req.session.user
    });
  });
};
exports.postDeleteHome=(req,res,next)=>
{ console.log("Request params: delete ", req.params);
   const homeId=req.params.homeId;
   
   Home.findByIdAndDelete(homeId).then(()=>
   {
     console.log("welcome to deltee with id",homeId);
      res.redirect("/host/host-home-list"); }
   ).catch((error)=>
  console.log("error while deleting",error))

};


exports.errorhand =
  (req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found',isLoggedIn:req.isLoggedIn});
  };