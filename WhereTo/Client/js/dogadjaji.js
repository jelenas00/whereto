import { Api } from "../api.js"
import { Lokal } from "../lokal.js"
var api= new Api();
var dog=await api.getDogadjajByTag("Dogadjaj");
var sekcija2= document.getElementById("dogadjaji");
var pregledSvih=document.getElementById("pregledSvih")
pregledSvih.onclick=(ev)=>{
  document.getElementById("searchinput").value=""
  document.getElementById("datesrch").value=""
  sekcija2.innerHTML=``
  dog.forEach(el => {
    if(el.organizator!=null)
        var org=el.organizator
    var d=el.datum.split('-');
    var tags=el.listaTagova.filter(fun=>fun!=="Dogadjaj");
    sekcija2.innerHTML+=`
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
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    `
});
}

dog.forEach(el => {
    if(el.organizator!=null)
        var org=el.organizator
    var d=el.datum.split('-');
    var tags=el.listaTagova.filter(fun=>fun!=="Dogadjaj");
    sekcija2.innerHTML+=`
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
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    `
});

let search=document.getElementById("search")
search.onclick=(ev)=>{
    let tag=document.getElementById("searchinput").value
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
      poTagu.innerHTML+=`
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
      ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
      `
      //button.onclick=(ev)=>prijaviMe(button.index)
  });
}