import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var lok=await api.getLokali();
var dog=await api.getDogadjajByTag("Dogadjaj");
console.log(lok)
console.log(dog)
console.log("De si bre")
var sekcija= document.getElementById("lokali");
console.log(sekcija)

lok.forEach(el => {
    sekcija.innerHTML+=`
    <li>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1">${el.name}</span>
                    <br>
                    lokacija : ${el.lokacija} 
                    <br> 
                    vlasnik : ${el.vlasnik}
                    <br>
                    <a href="#" class="link1">View Details</a></p>
                </li>
    `
});
var sekcija2= document.getElementById("dogadjaji");
dog.forEach(el => {
    console.log(el.organizator)
    if(el.organizator!=null)
        var org=el.organizator
    else var org=new Lokal(null,"nema","nema","nema","nema","nema",null,[],"nema","nema");
    sekcija2.innerHTML+=`
    <li>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1">${el.name}</span>
                    <br>
                    lokacija : ${org.lokacija} 
                    <br> 
                    Organizator : ${org.name}
                    <br>
                    <a href="#" class="link1">View Details</a></p>
                </li>
    `
});
