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
    urlDB="mongodb+srv://joel:eCvsK3gPk0Pksmbn@cluster0.bcvnj.mongodb.net/cafe?retryWrites=true&w=majority";
}
//here i created a variable in the envirioment
process.env.URLenv=urlDB;