import { Api } from "../api.js"
import { Dogadjaj } from "../dogadjaj.js";
import { Lokal } from "../lokal.js";

var api= new Api();
var lok= new Lokal();
lok=JSON.parse(sessionStorage.getItem("logLokal"));
// console.log(lok);
var send=document.getElementById("send");
send.onclick=async function(){
    var name= document.getElementById("name").value;
    var date=document.getElementById("date").value;
    var tags= document.getElementById("tags").value;
    // console.log(name,date,tags);
    // console.log( tags.split(' ').join('').split(','));
    
    // if(name!=null&&date!=null&&tags!=null)
    // {   var dog=new Dogadjaj(null,name,lok,null,date,tags.split(' ').join('').split(','))
    //     var l=JSON.stringify(dog,[ "name",
    //     console.log(l)
    //     // console.log(dog);
    //     //var create= await api.dodajDogadjaj(new Dogadjaj(null,name,lok,null,date,tags.split(' ').join('').split(',')))
    //     // if(create==true){
    //     //     alert("Uspesno kreiran dogadjaj!");
    //     // }
    //     // else{
    //     //     console.log(create);
    //     // }
    // }
    //     var create= await api.dodajDogadjaj(new Dogadjaj(null,name,lok,null,date,tags.split(' ').join('').split(',')))
    //     if(create){
    //         alert("Uspesno kreiran dogadjaj!");
    //     }
    //     else{
    //         console.log(create);
    //     }
    // }
}