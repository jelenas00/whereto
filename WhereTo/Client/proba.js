import { Api } from "./api.js";
import { Dogadjaj } from "./dogadjaj.js";
import { Korisnik } from "./korisnik.js";
import { Lokal } from "./lokal.js";

var api= new Api();
var lok=await api.getLokalByTag("Lokal");
console.log(lok)
// var lok= await api.getLokalById("lokal:f9a52ef7-2bc6-4b02-a835-82cc4749485a");
// lok.lokacija="izmenjeno";
// console.log(lok);
// var ch= await api.izmeniLokal(lok)
// console.log(ch)
// var lokali= await api.getLokali();
// console.log(lokali);
// var d= await api.dodajDogadjaj(new Dogadjaj("","proba",null,null,"dada",[]))
// console.log(d);
// console.log(await api.getDogadjajByTag("Dogadjaj"));
// var c=await api.dodajKorisnika(new Korisnik("","proba2","proba2","proba2","proba2",null));
// console.log(c)
// console.log(await api.getKorisnici())
// var korisnici= await api.getKorisnici();
// console.log(korisnici);
// var c=await api.dodajLokal(new Lokal("","nesto","nesto","nesto","nesto","nesto",null,null,"nesto","nesto"));
// console.log(c);
// var korisnik= await api.getKorisnikById("korisnik:29fda027-7823-497e-8c02-c34f25458ded");
// console.log(korisnik);
//  var lokal= await api.getLokali();
// console.log(lokal);
// var korisnik= await api.getKorisnikaPrijava("dad","adda");
// console.log(korisnik);
// var dogadjaji= await api.getDogadjajByTag("Dogadjaji");
// console.log(dogadjaji);
// var dog= await api.getDogadjajById("dogadjaj:8ef98c8c-32d3-4bd6-8013-09716e502be1");
// console.log(dog);
// var obr= await api.deleteKorisnik("korisnik:29fda027-7823-497e-8c02-c34f25458ded");
// console.log(obr);
//console.log(api.getLokali())