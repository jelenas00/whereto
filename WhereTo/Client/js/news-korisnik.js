import { Api } from "../api.js"
import { Korisnik } from "../korisnik.js"
var api= new Api();

var kor= JSON.parse(sessionStorage.getItem("logKorisnik"))
console.log(kor)
let prikaz=document.getElementById("inboxprikaz")
console.log(kor.inbox.length)
if(kor.inbox.length==0){
    prikaz.innerHTML=`
    <div><h1>Inboks je prazan, nemate obavestenja!</h1></div>
    `
}
else{
    kor.inbox.forEach(el => {
        prikaz.innerHTML+=`
        <li>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"> <strong> ${el} </strong> </span> <br>
                    <br>
                    
    </li>
    ----------------------------------------------------------------------------------
        `
    });
}

var isprazniInbox= document.getElementById("isprazniInbox")
isprazniInbox.onclick=async (ev)=>{
    var ch= await api.deleteInbox(kor.korisnikID)
    if(ch==true){
        alert("Inbox ispraznjen!");
        kor.inbox=[]
        sessionStorage.setItem("logKorisnik",JSON.stringify(kor));
        window.location.reload()
    }
    else{
        alert("Something went wrong,try again later! :(")
    }
}