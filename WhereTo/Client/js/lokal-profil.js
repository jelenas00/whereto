import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
console.log("Ej")
var api= new Api();
var lok=new Lokal()
lok=JSON.parse(sessionStorage.getItem("logLokal"));

let izmenalokala=document.getElementById("izmenaLokalForma")
izmenalokala[0].value=lok.name
izmenalokala[1].value=lok.lokacija
izmenalokala[2].value=lok.vlasnik
izmenalokala[3].value=lok.radnoVreme
izmenalokala[4].value=lok.opis
izmenalokala[5].value=lok.tagovi
let potvrdizmeneLokala=document.getElementById("lokalIzmena")
potvrdizmeneLokala.onclick=(ev)=>{
    
    var naziv=izmenalokala[0].value;
    var lokacija=izmenalokala[1].value;
    var vlasnik=izmenalokala[2].value;
    var radnoVreme=izmenalokala[3].value;
    var opis=izmenalokala[4].value;
    var tagovi=izmenalokala[5].value;
    console.log(naziv,lokacija,vlasnik,opis,tagovi)
    var lok=new Lokal()
    lok=JSON.parse(sessionStorage.getItem("logLokal"));
    var l={"lokalID":lok.lokalID,"name":naziv,"lokacija":lokacija,"vlasnik":vlasnik,"radnoVreme":radnoVreme,
    "opis":opis,"email":lok.email,"password":lok.password,"dogadjaji":lok.dogadjaji,"tagovi":lok.tagovi}
    console.log(l)
    ch(l);
}
async function ch(lok)
{
    var can= await api.izmeniLokal(lok);
    console.log(can)
    if(can!=null)
    {
        sessionStorage.setItem("logLokal",JSON.stringify(can));
        alert("Uspeno izmenjeno!");
        window.location.reload();
    }
}

let izmenaKredencijala=document.getElementById("izmenaKredencijalaForma")
izmenaKredencijala[0].value=lok.email;
let potvrdaizmenkredencijala=document.getElementById("lokalPassIzmena");
potvrdaizmenkredencijala.onclick=(ev)=>{
    console.log(izmenaKredencijala[0].value,izmenaKredencijala[1].value)
    var email=izmenaKredencijala[0].value
    var pass=izmenaKredencijala[1].value
    izKred(email,pass)

}
async function izKred(email,pass)
{
    var ch= await api.izmeniLokalLogInfo(lok.lokalID,email,pass)
    if(ch==true)
    {
        lok.email=email;
        lok.password=pass;
        sessionStorage.setItem("logLokal",JSON.stringify(lok));
        alert("Uspesno izmenjeno")
        window.location.reload()
    }
}
let obrisiLokal=document.getElementById("obrisiLokal");
obrisiLokal.onclick=(ev)=>{
    delLokal()
}
async function delLokal(){
    var ch= await api.deleteLokal(lok.lokalID);
    if(ch==true){
        alert("Lokal je obrisan, hvala sto ste koristili nasu aplikaciju!");
        sessionStorage.clear()
        window.location.href="index.html";
    }
}