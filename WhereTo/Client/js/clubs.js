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
    <p class="welcom2">${lok[el.id].name} </h2>
                <p style="font-size: 18px" class="color1-izmena">${lok[el.id].opis}</p>
                <div style="font-size: 15px" class="color1-izmena">  <strong> lokacija: </strong> <em> ${lok[el.id].lokacija} </em> </div>
                <div style="font-size: 15px" class="color1-izmena"> <strong> vlasnik: </strong> <em> ${lok[el.id].vlasnik} </em></div>
                <div style="font-size: 15px" class="color1-izmena">  <strong>radno vreme:</strong> ${lok[el.id].radnoVreme} </div>
                <br>
                
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
