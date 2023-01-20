import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var lok= new Lokal();
lok=JSON.parse(sessionStorage.getItem("logLokal"));
var dog=await api.getDogadjajeLokala(lok.lokalID);
var sekcija= document.getElementById("dogadjaji");
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
      let prikazi=document.getElementById("showdog");
      prikazi.innerHTML=`
      <p id="welcom" style="text-align: center;">${dog[el.id].name} </h2>
                  <p style="font-size: 14px" class="color1">  Datum: ${d[2]+"."+d[1]+"."+d[0]} </p>
                  <p style="font-size: 14px" class="color1">  Tagovi: ${tags} </p>

                  <p style="text-align: end;"><a href="#" class="izmeni">Dodaj tagove</a><br><a href="#" class="obrisi">Obrisi dogadjaj</a></p>
      `
      let izmeni=document.querySelector("a.izmeni");
        izmeni.onclick=(ev)=>{
            prikazi.innerHTML=`
            <p id="welcom" style="text-align: center;">${dog[el.id].name} </h2>
            <p style="font-size: 14px" class="color1">  Datum: ${d[2]+"."+d[1]+"."+d[0]} </p>
            <input type="text" class="chdog" style="width:380px;" id="name" name="Name" value=${tags}>
      
                        <p style="text-align: end;"><a href="#" class="posalji">Izmeni</a></p>
            `
            let posaljiizm=document.querySelector("a.posalji").onclick=(ev)=>{
                var tagovi=document.querySelectorAll("input.chdog")[0].value.split(' ').join('').split(',');
                var id=dog[el.id].dogadjajID;
                // menjamo(tagovi,id)
                menjamo(tagovi,id)
                alert("Uspesno dodat tag!");
                window.location.reload()
                // if(ch){
                //     alert("Uspesna izmena dogadjaja")
                //     window.location.reload();
                // }
            }
            async function menjamo(tag,id){
                for(el in tag){
                    console.log()
                    var i=await api.dodajTagDogadjaju(id, tag[el]);
                }
            }
        }

        let obrisi=document.querySelector("a.obrisi");
        console.log(obrisi)
        obrisi.onclick=(ev)=>{
            console.log(dog[el.id])
            var id=dog[el.id].dogadjajID;
            obrisidog(id);
            alert("Dogadjaj obrisan!");
            window.location.reload();
        }
        async function obrisidog(id){
            var ch=await api.deleteDogadjaj(id);
            console.log(ch)
        }
    }
    
})
