//==========================
//PORT
//==========================

//configuration port
process.env.PORT=process.env.PORT||3000;


//==========================
//ENV
//==========================

process.env.NODE_ENV=process.env.NODE_ENV||'DEV';

//==========================
//CADUCIDAD
//==========================

process.env.DATELIMIT='48h';

//==========================
//CADUCIDAD
//==========================

process.env.SEED=process.env.SEED||'joel-chan-tec';

//google sing in

process.env.CLIENT_ID=process.env.CLIENT_ID||'934858367491-tqjhfv07upvsoh5emn7h5a3tkbic6msf.apps.googleusercontent.com';

//==========================
//databases
//==========================

let urlDB;

if(process.env.NODE_ENV==='DEV'){
    urlDB="mongodb://localhost:27017/cafe";
}else{
    urlDB=process.env.MONGO_URL;
}
//here i created a variable in the envirioment
process.env.URLenv=urlDB;