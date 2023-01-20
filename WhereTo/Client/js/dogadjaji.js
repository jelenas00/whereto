import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var dog=await api.getDogadjajByTag("Dogadjaj");
var sekcija2= document.getElementById("dogadjaji");
dog.forEach(el => {
    console.log(el.organizator)
    if(el.organizator!=null)
        var org=el.organizator
    var d=el.datum.split('-');
    sekcija2.innerHTML+=`
    <li>
                <span  class="dropcap_1"> ${d[2]+"."+d[1]} <!--30--><span><!--august--></span></span>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"><strong> ${el.name} </strong> </span><br>
                    <br>
                    <strong> lokacija :</strong>  <em> ${org.lokacija} </em>
                    <br> 
                    <strong> organizator : </strong> <em> ${org.name} </em>
                    <br>
                    <strong> organizator : </strong> <em> ${el.listaTagova} </em>
                    <br>
    </li>
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    `
});