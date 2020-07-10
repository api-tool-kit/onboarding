/*****************************************
// bigco, inc 
// action elements
// onboarding
// 2020-02-01 : mamund
 *****************************************/

var component = require('./lib/component');
var data = require('./data');
var utils = require('./lib/utils');

/***************************************** 
// actions for the onboarding service
 *****************************************/

module.exports.home = function(req,res) {
  return new Promise(function(resolve,reject) {
    var body = []; 
    
    // hack to handle empty root for non-link types
    ctype = req.get("Accept")||"";
    if("application/json text/csv */*".indexOf(ctype)!==-1) {
      body = {
        id:"list",
        name:"onboarding",
        rel:"collection onboarding",
        href: "{fullhost}/wip/"
      };
    }
    
    if(body) {
      resolve(body);
    }
    else {
      reject({error:"invalid body"});
    }
  });
}

module.exports.createWIP = function(req,res) {
  return new Promise(function(resolve,reject) {
    var body = req.body||{};
    if(body) {
     resolve(
      component(
        { 
          name:'onboarding',
          action:'add',
          item:body,
          props:data.props,
          reqd:data.reqd, 
          enums:data.enums,
          defs:data.defs
        }
       )
     );
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

module.exports.listWIP = function(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:'onboarding',action:'list'}));
  });
}

module.exports.filterWIP = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.query && req.query.length!==0) {
      resolve(component({name:'onboarding',action:'filter',filter:req.query}));
    }
    else {
      reject({error:"invalid query string"});
    }
  })
}

module.exports.readWIP = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      resolve(component({name:'onboarding',action:'item',id:id}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.readCompany = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      var fields=`id, status, dateCreated, dateUpdated, companyId, companyName, 
        streetAddress, city, stateProvince, country, telephone, email`
      resolve(component({name:'onboarding',action:'item',id:id, fields:fields}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.writeCompany = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.id||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'onboarding',
          action:'update',
          id:id,
          item:body,
          props:data.props,
          reqd:data.reqd,
          enums:data.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.readAccount = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      var fields=`id, status, dateCreated, dateUpdated, 
        accountId, division, spendingLimit, discountPercentage`
      resolve(component({name:'onboarding',action:'item',id:id, fields:fields}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.writeAccount = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.id||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'onboarding',
          action:'update',
          id:id,
          item:body,
          props:data.props,
          reqd:data.reqd,
          enums:data.enums,
          fields:fields}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.readActivity = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      var fields=`id, status, dateCreated, dateUpdated, 
        activityId, activityType, dateScheduled, notes`
      resolve(component({name:'onboarding',action:'item',id:id, fields:fields}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.writeActivity = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.id||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'onboarding',
          action:'update',
          id:id,
          item:body,
          props:data.props,
          reqd:data.reqd,
          enums:data.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.readStatus = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      var fields="id, status, dateCreated, dateUpdated" 
      resolve(component({name:'onboarding',action:'item',id:id, fields:fields}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.writeStatus = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.id||null;
    body = req.body||nulli;
    console.log(body);
    if(id!==null && body!==null) {

       var params = {
         scheme: "https",
         host:   "jsonplaceholder.typicode.com",
         method: "GET",
         path:   "/todos/1"
       };       
       utils.httpRequest(params).then(function(body) {
         console.log(body);
       });

       resolve(component(
         {name:'onboarding',
          action:'update',
          id:id,
          item:body,
          props:data.props,
          reqd:data.data,
          enums:data.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.remove = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.id && req.params.id!==null) {
      var id = req.params.id;
      resolve(component(
        {name:'onboarding',action:'delete', id:id}));
    }
    else {
      reject({error:"invalid id"});
    }
  });
}
