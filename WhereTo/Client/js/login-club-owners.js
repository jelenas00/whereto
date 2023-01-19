import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
console.log("Ej")
var api= new Api();
var reg= document.getElementById("RegistrujSe");
reg.onclick=async function()
{
    var ime=document.getElementById("full_name").value;
    var lokacija=document.getElementById("lokacija").value;
    var vlasnik=document.getElementById("vlasnik").value;
    var radnoVreme=document.getElementById("radnoVreme").value;
    var opis=document.getElementById("opis").value;
    var email= document.getElementById("your_email").value;
    var pass=document.getElementById("password").value;
    var repass=document.getElementById("comfirm_password").value;
    if(pass===repass&&ime!=null&&lokacija!=null&&vlasnik!=null&&radnoVreme!=null&&opis!=null&&email!=null&&pass!=null&&repass!=null)
    {
        var list=[]
        console.log(ime,lokacija,vlasnik,radnoVreme,opis,email,pass);
        var log = await api.dodajLokal(new Lokal(null,ime,lokacija,vlasnik,radnoVreme,opis,null,list,email,pass));
        if(log instanceof Lokal && log!=null)
        {
            console.log("jeeeej")
            window.location.href = "index-club.html";
        }
        else
            alert("Neuspesna prijava!")
    }
    else
        alert("Lozinke se ne poklapaju!");
    
}
var pri= document.getElementById("PrijaviSe");
pri.onclick=async function (){
    var email=document.getElementById("your_email_1").value;
    var pass= document.getElementById("password_1").value;
    console.log(email,pass)
    var log= await api.getLokalPrijava(email,pass);
    console.log(log);
    if(log instanceof Lokal && log!=null)
        {
            console.log("jeeeej")
            window.location.href = "index-club.html";
        }
        else
            alert("Pogresnan mail/lozinka!")
}