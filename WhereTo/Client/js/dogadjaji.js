import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var dog=await api.getDogadjajByTag("Dogadjaj");
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