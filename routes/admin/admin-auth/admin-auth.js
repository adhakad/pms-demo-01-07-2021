var express = require('express');
var router = express.Router();
var adminUserModule=require('../../../modules/adminUser');

router.get('/', function(req, res, next) {
 if(req.session.auth_email){
  res.redirect('/dashboard');
 }else{
  res.render('admin/admin-auth/admin-auth', { title: 'Password Management System'});
 }
});

function checkKey(req,res,next){
  var key=req.body.key;
  var check=adminUserModule.findOne({key:key});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data==null){
      return res.send({redirectTo: 'Invalid Product Key'});
    }
   next();
  });
}

router.post('/post',checkKey,function(req, res, next) {
  var key=req.body.key;
  var check=adminUserModule.findOne({key:key});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      var email = data.email;
      req.session.auth_email = email;
      if(req.session.auth_email){
        res.send({redirect:'/dashboard'});
      }else{
        res.send({redirect:'/'});
      }
    }
  })
});

module.exports = router;