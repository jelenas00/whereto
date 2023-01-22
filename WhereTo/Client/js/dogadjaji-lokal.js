import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var lok= new Lokal();
lok=JSON.parse(sessionStorage.getItem("logLokal"));
var dog=await api.getDogadjajeLokala(lok.lokalID);
var sekcija= document.getElementById("dogadjaji");
if(dog.length==0){
    sekcija.innerHTML=`
    <h1>Trenutno nemate dogadjaje za prikazivanje</h1>
    `
}
dog.forEach((el,index) => {
    var d=el.datum.split('-');
    var tags=el.listaTagova.filter(fun=>fun!=="Dogadjaj");
    var divdogkor=document.createElement("div");
    divdogkor.className="divdogkor";
    sekcija.appendChild(divdogkor);
    var divdog=document.createElement("div");
    var divdogdug=document.createElement("div");
    var button=document.createElement("button")
    button.className="lepibutton"
    button.index=index
    button.innerHTML="Obavesti korisnike"
    divdogkor.appendChild(divdog);
    divdogkor.appendChild(divdogdug)
    divdog.innerHTML+=`
    <li>
                <span  class="dropcap_1"> ${d[2]+"."+d[1]} <!--30--><span><!--august--></span></span>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"><strong> ${el.name} </strong> </span><br>
                    <br>
                    <strong> Broj prijavljenih korisnika :</strong>  <em> ${el.korisnici.length} </em>
                    <br> 
                    <strong> lokacija :</strong>  <em> ${el.organizator.lokacija} </em>
                    <br> 
                    <strong> organizator : </strong> <em> ${el.organizator.name} </em>
                    <br>
                    <strong> Tagovi : </strong> <em> ${tags} </em>
                    <br></p>
    </li>
    ------------------------------------------------------------------------------------------------

    `
    divdogdug.appendChild(button)
    button.onclick=(ev)=>obavestiKorisnike(button.index)
});

function obavestiKorisnike(i){
    var m=document.getElementById("divdoglok")
    m.innerHTML=``
    m.innerHTML=`
          <div class="form-group">
            <label for="message-text" class="col-form-label">Poruka:</label>
            <textarea class="form-control" id="message-text" style="height: 110px; width: 470px; margin:5px;"></textarea>
          </div>

    `
    var button=document.createElement("button")
    button.className="lepibutton"
    button.innerHTML="Posalji poruku"
    m.appendChild(button)
    button.onclick=(ev)=>posaljiPoruku(dog[i].dogadjajID)
}
async function posaljiPoruku(dog){
    console.log(dog)
    var por=document.getElementById("message-text").value
    if(por.length==0){
        alert("Unesite poruku!")
    }
    var ch= await api.obavestiKorisnike(dog,por)
    if(ch==true){
        alert("Korisnici su obavesteni!")
    }
    else if(ch==false){
        alert("Neuspesno slanje poruke, molimo pokusajte kasnije!")
    }
    else{
        alert("Doslo je do greske, molimo pokusajte kasnije!")
    }
}

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
