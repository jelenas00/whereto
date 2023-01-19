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
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"> <strong> ${el.name} </strong> </span> <br>
                    <br>
                    <strong> lokacija : </strong> <em> ${el.lokacija} </em> 
                    <br> 
                    <strong> vlasnik : </strong> <em> ${el.vlasnik} </em>
                    <br>
                    <a href="#" class="link1">View Details</a></p>
                    
    </li>
    ----------------------------------------------------------------------------------
    
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
                <span  class="dropcap_1"> ${el.datum} <!--30--><span><!--august--></span></span>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"> Događaj 1 - <strong> ${el.name} </strong> </span><br>
                    <br>
                    <strong> lokacija :</strong>  <em> ${org.lokacija} </em>
                    <br> 
                    <strong> organizator : </strong> <em> ${org.name} </em>
                    <br>
                    <a href="#" class="link1">View Details</a></p>
    </li>
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
