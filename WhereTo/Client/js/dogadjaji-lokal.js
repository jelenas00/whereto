import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var lok= new Lokal();
lok=JSON.parse(sessionStorage.getItem("logLokal"));
var dog=await api.getDogadjajeLokala(lok.lokalID);
console.log(dog)
var sekcija= document.getElementById("dogadjaji");
console.log(sekcija)
dog.forEach((el,index) => {
    var d=el.datum.split('-');
    sekcija.innerHTML+=`
    <li>
                <span  class="dropcap_1"> ${d[2]+"."+d[1]} <!--30--><span><!--august--></span></span>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"><strong> ${el.name} </strong> </span><br>
                    <br>
                    <strong> lokacija :</strong>  <em> ${el.organizator.lokacija} </em>
                    <br> 
                    <strong> organizator : </strong> <em> ${el.organizator.name} </em>
                    <br></p>
                    <p style="text-align: end;" class="link1" id="${index}">View Details</p>
    </li>
    ------------------------------------------------------------------------------------------------

    `
});

let toggle=document.querySelectorAll("p.link1");
console.log(toggle);
toggle.forEach(el=>{
    el.onclick=async function(){
    var d=dog[el.id].datum.split('-')
    var tags=dog[el.id].listaTagova.filter(fun=>fun!=="Dogadjaj");
    console.log(tags)
      console.log(el.id)
      console.log(dog[el.id])
      let prikazi=document.getElementById("showdog");
      console.log(prikazi)
      prikazi.innerHTML=`
      <p id="welcom" style="text-align: center;">${dog[el.id].name} </h2>
                  <p style="font-size: 14px" class="color1">  Datum: ${d[2]+"."+d[1]+"."+d[0]} </p>
                  <p style="font-size: 14px" class="color1">  Tagovi: ${tags} </p>
      `
    }
  })