import { Api } from "../api.js"
import { Korisnik } from "../korisnik.js"
console.log("Ej")
var api= new Api();
var reg= document.getElementById("RegistrujSe");
reg.onclick=async function()
{
    var ime=document.getElementById("full_name").value;
    var prezime= document.getElementById("full_last").value;
    var email= document.getElementById("your_email").value;
    var pass=document.getElementById("password").value;
    var repass=document.getElementById("comfirm_password").value;
    if(pass===repass)
    {
        console.log(pass);
        var log = await api.dodajKorisnika(new Korisnik(null,ime,prezime,email,pass,null));
        if(log instanceof Korisnik && log!=null)
        {
            console.log("jeeeej")
            sessionStorage.setItem("logKorisnik",JSON.stringify(log));
            window.location.href = "index-korisnik.html";
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
    var log= await api.getKorisnikaPrijava(email,pass);
    console.log(log);
    if(log instanceof Korisnik && log!=null)
        {
            console.log("jeeeej")
            sessionStorage.setItem("logKorisnik",JSON.stringify(log));
            window.location.href = "index-korisnik.html";
        }
        else
            alert("Pogresan mail/lozinka!")
}