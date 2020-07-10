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
    if(id!==null && body!==null) {

       if(body.status==="closed") {
         writeToServices(id);
       }

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

/********************************************
 Handle writing to the other services
 ********************************************/
function writeToServices(id) {
  var pCompany, pAccount, pActivity;
  var p, item, coll;

  // start by getting the current onboarding rec
  p = component({name:'onboarding',action:'item',id:id});
  p.then(function(coll) {
    item = coll[0]||{};
    //console.log(item);
 
    // define company write
    pCompany = new Promise(function(resolve,reject) {
      var params = {
        host:   "localhost",
        port: 8484,
        method: "POST",
        path:   "/",
        headers: {"content-type" : "application/json"}
      };       
      var body = {
        id : item.companyId||"",
        companyName : item.companyName||"",
        email : item.email||"",
        streetAddress : item.streetAddress||"",
        city : item.city||"",
        stateProvince : item.stateProvince||"",
        postalCode : item.postalCode||"",
        country : item.country||"",
        telephone : item.telephone||"",
        status : "active"
      }
      // echo results for debugging
      utils.httpRequest(params,JSON.stringify(body)).then(function(results) {
        //console.log(JSON.stringify(results));
      });
    });

    // define account write 
    pAccount = new Promise(function(resolve,reject) {
      var params = {
        port: 8282,
        host:   "localhost",
        method: "POST",
        path:   "/",
        headers: {"content-type" : "application/json"}
      };       
      var body = {
        id : item.accountId||"",
        companyId : item.companyId||"",
        division : item.division||"",
        spendingLimit : item.spendingLimit||"",
        discountPercentage : item.discountPercentage||"",
        status : "active"
      };
      utils.httpRequest(params, JSON.stringify(body)).then(function(results) {
        //console.log(results);
      });
    });

    // define activity write
    pActivity = new Promise(function(resolve,reject) {
      var params = {
        port:  8686,
        host:   "localhost",
        method: "POST",
        path:   "/",
        headers: {"content-type" : "application/json"}
      };       
      var body = {
        companyId : item.companyId||"",
        accountId : item.accountId||"",
        activityType : item.activityType||"",
        dateScheduled : item.dateScheduled||"",
        notes : item.notes||"",
        status : "active"
      };

      utils.httpRequest(params, JSON.stringify(body)).then(function(results) {
        //console.log(results);
      });
    });

    // execute the requests in parallell
    return Promise.all([pCompany, pAccount, pActivity]);
  });

}
