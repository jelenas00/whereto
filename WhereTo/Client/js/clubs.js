import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var lok=await api.getLokali();
console.log(lok)
var sekcija= document.getElementById("lokali");
console.log(sekcija)

lok.forEach((el,index) => {
    sekcija.innerHTML+=`
    
    <li>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"> <strong> ${el.name} </strong> </span> <br>
                    <br>
                    <strong> lokacija : </strong> <em> ${el.lokacija} </em> 
                    <br> 
                    <strong> vlasnik : </strong> <em> ${el.vlasnik} </em>
                    <br>
                    <a onclick="toggle(this)" class="link1" id="${index}" >View details</a></p>
                    
    </li>
    ----------------------------------------------------------------------------------
    
    `

});
let ch=document.getElementById("proba2");
console.log(ch)
let toggle=document.querySelectorAll("a.link1");
console.log(toggle);
toggle.forEach(el=>{
  el.onclick=async function(){
    console.log(el.id)
    console.log(lok[el.id])
    var prikazi=document.getElementById("proba2")
    console.log(prikazi)
    prikazi.innerHTML=`
    <p id="welcom">${lok[el.id].name} </h2>
                <p style="font-size: 18px" class="color1">${lok[el.id].opis}</p>
                <p style="font-size: 18px" class="color1">  Lokacija: ${lok[el.id].lokacija} </p>
                <p style="font-size: 18px" class="color1">  vlasnik: ${lok[el.id].vlasnik} </p>
                <p style="font-size: 18px" class="color1">  radno vreme: ${lok[el.id].radnoVreme} </p>
                <p style="font-size: 18px" class="pad_bot1">Pronađite klub, kafanu, pivnicu, splav za vaš savršen provod.</p>
    `
  }
})

// $(document).ready(function () {
//     //gallery
//     $("#lokali").jCarouselLite({
//         btnNext: ".next",
//         btnPrev: ".prev",
//         mouseWheel: true,
//         vertical: true,
//         circular: true,
//         visible: 2,
//         speed: 600,
//         easing: 'easeOutCirc'
//     });
//     Cufon.now();
// })
