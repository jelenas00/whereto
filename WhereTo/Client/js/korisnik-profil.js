import { Api } from "../api.js"
import { Korisnik } from "../korisnik.js"
console.log("Ej")
var api= new Api();
var kor=new Korisnik()
kor=JSON.parse(sessionStorage.getItem("logKorisnik"))
console.log(kor)
var izmene=document.getElementById("korisnikForma");
izmene[0].value=kor.name
izmene[1].value=kor.lastName
izmene[2].value=kor.email
var potvrda=document.getElementById("potvrdaIzmene")
potvrda.onclick=(ev)=>{
    var name=izmene[0].value;
    var last=izmene[1].value;
    var email=izmene[2].value;
    var pass=izmene[3].value;
    if(String(pass).length<1){
        alert("Password cannot be empty!")
    }
    console.log(name,last,email,pass)
    var newKor={ "korisnikID":kor.korisnikID,"name": name, "lastName": last,"email": email,"password": pass, "inbox": kor.inbox }
    var val1=changeKor(newKor)
    var val2=changeKred(kor.korisnikID,email,pass)
    if(val1&&val2){
        
        window.location.reload();
    }
}
async function changeKor(newKor){
    var ch= await api.izmeniKorisnika(newKor);
    if(ch!=false){
        sessionStorage.setItem("logKorisnik",JSON.stringify(ch));
    }
}

async function changeKred(id,email,pass){
    var ch= await api.izmeniKorisnikaLogInfo(id,email,pass);
    if(ch==true){
        kor.email=email
        kor.password=pass
        sessionStorage.setItem("logKorisnik",JSON.stringify(kor));
        return true;
    }
}

let obrisiLokal=document.getElementById("obrisiNalog");
obrisiLokal.onclick=(ev)=>{
    delLokal()
}
async function delLokal(){
    var ch= await api.deleteKorisnik(kor.korisnikID);
    if(ch==true){
        alert("Nalog je obrisan, hvala sto ste koristili nasu aplikaciju!");
        sessionStorage.clear()
        window.location.href="index.html";
    }
}