import { Api } from "../api.js"
import { Korisnik } from "../korisnik.js";
import { Lokal } from "../lokal.js"
var api= new Api();
var kor=new Korisnik()
kor=JSON.parse(sessionStorage.getItem("logKorisnik"))
var dog=await api.getDogadjajByTag("Dogadjaj");
//dog.forEach(el=>console.log(el.datum))
var sekcija2= document.getElementById("dogadjaji");

var pregledSvih=document.getElementById("pregledSvih")
pregledSvih.onclick=(ev)=>{
  document.getElementById("searchinput").value=""
  document.getElementById("datesrch").value=""
  sekcija2.innerHTML=``
  dog.forEach((el,index) => {
    if(el.organizator!=null)
        var org=el.organizator
    var d=el.datum.split('-');
    var tags=el.listaTagova.filter(fun=>fun!=="Dogadjaj");
    var divdogkor=document.createElement("div");
    divdogkor.className="divdogkor";
    sekcija2.appendChild(divdogkor);
    var divdog=document.createElement("div");
    var divdogdug=document.createElement("div");
    var button=document.createElement("button")
    button.className="lepibutton"
    button.index=index
    button.innerHTML="Prijavi se"
    divdogkor.appendChild(divdog);
    divdogkor.appendChild(divdogdug)
    divdog.innerHTML+=`
    <li>
                <span  class="dropcap_1"> ${d[2]+"."+d[1]}<span></span></span>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"><strong> ${el.name} </strong> </span><br>
                    <br>
                    <strong> lokacija :</strong>  <em> ${org.lokacija} </em>
                    <br> 
                    <strong> organizator : </strong> <em> ${org.name} </em>
                    <br>
                    <strong> Tagovi : </strong> <em> ${tags} </em>
                    <br>
    </li>
    -----------------------------------------------------------------------------------------------------------------------------

    `
    divdogdug.appendChild(button)
    button.onclick=(ev)=>prijaviMe(button.index)
});
}

dog.forEach((el,index) => {
    if(el.organizator!=null)
        var org=el.organizator
    var d=el.datum.split('-');
    var tags=el.listaTagova.filter(fun=>fun!=="Dogadjaj");
    var divdogkor=document.createElement("div");
    divdogkor.className="divdogkor";
    sekcija2.appendChild(divdogkor);
    var divdog=document.createElement("div");
    var divdogdug=document.createElement("div");
    var button=document.createElement("button")
    button.className="lepibutton"
    button.index=index
    button.innerHTML="Prijavi se"
    divdogkor.appendChild(divdog);
    divdogkor.appendChild(divdogdug)
    divdog.innerHTML+=`
    <li>
                <span  class="dropcap_1"> ${d[2]+"."+d[1]+"."}<span></span></span>
                  <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"><strong> ${el.name} </strong> </span><br>
                    <br>
                    <strong> lokacija :</strong>  <em> ${org.lokacija} </em>
                    <br> 
                    <strong> organizator : </strong> <em> ${org.name} </em>
                    <br>
                    <strong> Tagovi : </strong> <em> ${tags} </em>
                    <br>
    </li>
    -----------------------------------------------------------------------------------------------------------------------------

    `
    divdogdug.appendChild(button)
    button.onclick=(ev)=>prijaviMe(button.index)
});
async function prijaviMe(idd){
    var iddog=dog[idd].dogadjajID
    var ch= await api.prijavaNaDogadjaj(iddog,kor.korisnikID)
    if(ch==true){
        alert("Uspesno ste prijavljeni na dogadjaj!");
    }
    else{
        console.log(ch)
    }
}

let search=document.getElementById("search")
search.onclick=(ev)=>{
    let tag=document.getElementById("searchinput").value
    console.log(tag)
    if(tag.length==0){
        alert("Niste uneli tag")
    }
    else{
        pretragaPoTagu(tag)
    }
}

let searchDate=document.getElementById("searchDate")
searchDate.onclick=(ev)=>{
    let tag=document.getElementById("datesrch").value
    console.log(tag)
    if(tag.length==0){
        alert("Niste uneli datum")
    }
    else{
        pretragaPoTagu(tag)
    }
}

async function pretragaPoTagu(tag){
    var find= await api.getDogadjajByTag(tag);
    if(Array.isArray(find)){
        prikaziPoTagu(find)
    }
    else if(find==false)
    {
        alert("Doslo je do greske")
    }
    else{
        alert(find)
    }
    //console.log(Array.isArray(find))
}

function prikaziPoTagu(tag){
    var poTagu=document.getElementById("dogadjaji");
    poTagu.innerHTML=``
    tag.forEach((el,index) => {
        if(el.organizator!=null)
            var org=el.organizator
        var d=el.datum.split('-');
        var tags=el.listaTagova.filter(fun=>fun!=="Dogadjaj");
        var divdogkor=document.createElement("div");
        divdogkor.className="divdogkor";
        poTagu.appendChild(divdogkor);
        var divdog=document.createElement("div");
        var divdogdug=document.createElement("div");
        var button=document.createElement("button")
        button.className="lepibutton"
        button.index=index
        button.innerHTML="Prijavi se"
        divdogkor.appendChild(divdog);
        divdogkor.appendChild(divdogdug)
        divdog.innerHTML+=`
        <li>
                    <span  class="dropcap_1"> ${d[2]+"."+d[1]}<span></span></span>
                      <p><span style="font-size: 30px;  color:rgb(212, 100, 237)" class="color1"><strong> ${el.name} </strong> </span><br>
                        <br>
                        <strong> lokacija :</strong>  <em> ${org.lokacija} </em>
                        <br> 
                        <strong> organizator : </strong> <em> ${org.name} </em>
                        <br>
                        <strong> Tagovi : </strong> <em> ${tags} </em>
                        <br>
        </li>
        -----------------------------------------------------------------------------------------------------------------------------
    
        `
        divdogdug.appendChild(button)
        //button.onclick=(ev)=>prijaviMe(button.index)
    });
}