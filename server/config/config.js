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
//databases
//==========================

let urlDB;

if(process.env.NODE_ENV==='oDEV'){
    urlDB="mongodb://localhost:27017/cafe";
}else{
    urlDB=process.env.MONGO_URL;
}
//here i created a variable in the envirioment
process.env.URLenv=urlDB;