import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var lok=await api.getLokali();
console.log(lok)
var sekcija= document.getElementById("lokali");
console.log(sekcija)

lok.forEach(el => {
    sekcija.innerHTML+=`
    
    <li>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"> <strong> ${el.name} </strong> </span> <br>
                    <br>
                    <strong> lokacija : </strong> <em> ${el.lokacija} </em> 
                    <br> 
                    <strong> vlasnik : </strong> <em> ${el.vlasnik} </em>
                    <br>
                    <a href="#" onclick="toggle(this)" class="link1">View Details</a></p>
                    
    </li>
    ----------------------------------------------------------------------------------
    
    `

});


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
