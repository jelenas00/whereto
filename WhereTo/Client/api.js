import { Lokal } from "./lokal.js";
import { Dogadjaj } from "./dogadjaj.js";
import { Korisnik } from "./korisnik.js";

export class Api
{
    constructor(){}

    //DELETE////////////////////////////////////////////
   

    async deleteDogadjaj(id)
    {
        let response= await fetch("http://localhost:5089/api/Dogadjaj/DeleteDogadjaj/"+id,
        {
            method:"DELETE"
        });
        switch(response.status){
            case 200: {
                console.log(`Uspesno izbrisan dogadjaj`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async deleteDogadjajByDate(date)
    {
        let response= await fetch("http://localhost:5089/api/Dogadjaj/DeleteDogadjajByDate/"+date,
        {
            method:"DELETE"
        });
        switch(response.status){
            case 200: {
                console.log(`Uspesno izbrisan dogadjaj`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async deleteKorisnik(id)
    {
        let response= await fetch("http://localhost:5089/api/Korisnik/DeleteKorisnik/"+id,
        {
            method:"DELETE"
        });
        switch(response.status){
            case 200: {
                console.log(`Uspesno izbrisan korisnik`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async deleteLokal(id)
    {
        let response= await fetch("http://localhost:5089/api/Lokal/DeleteLokal/"+id,
        {
            method:"DELETE"
        });
        switch(response.status){
            case 200: {
                console.log(`Uspesno izbrisan lokal`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    //GET//////////////////////////////////////////////
    async getDogadjajeLokala(id)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Dogadjaj/GetDogadjajeLokala/"+id, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el=>{
                        const dog= new Dogadjaj(el.dogadjajID, el.name,el.organizator,el.korisnici,el.datum,el.listaTagova);
                        list.push(dog)
                    });
                    return list;
                }
            case 204:
                {
                    return "Sve ok";
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async getLokali()
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Lokal/GetAllLokali", 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(element => {
                        const lokal= new Lokal(element.lokalID,element.name,element.lokacija,element.vlasnik,element.radnoVreme,element.opis,element.dogadjaji,element.tagovi,element.email,element.password);
                        list.push(lokal);
                    });
                    return list;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async obavestiKorisnike(id,poruka)
    {
        let response= await fetch("http://localhost:5089/api/Dogadjaj/ObavestiKorisnike/"+id+"/"+poruka, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    console.log(`Korisnici su obavesteni  ${await response.text()}`)
                    return true;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async getLokalById(id)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Lokal/GetLokalById/"+id, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var element= await response.json();
                    const lokal= new Lokal(element.lokalID,element.name,element.lokacija,element.vlasnik,element.radnoVreme,element.opis,element.dogadjaji,element.tagovi,element.email,element.password);
                    return lokal;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getKorisnici()
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Korisnik/GetAllKorisnici", 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el => {
                        const korisnik= new Korisnik(el.korisnikID, el.name, el.lastName, el.email,el.password,el.inbox)
                        list.push(korisnik);
                    });
                    return list;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getKorisnikById(id)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Korisnik/id/"+id, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var el= await response.json();
                    const korisnik= new Korisnik(el.korisnikID, el.name, el.lastName, el.email,el.password,el.inbox)
                    return korisnik;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async getKorisnikaPrijava(email,password)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Korisnik/PrijavaKorisnika/"+email+"/"+password, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var el= await response.json();
                    const korisnik= new Korisnik(el.korisnikID, el.name, el.lastName, el.email,el.password,el.inbox)
                    return korisnik;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getLokalPrijava(email,password)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Lokal/PrijavaVlasnika/"+email+"/"+password, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var el= await response.json();
                    const korisnik= new Lokal(el.lokalID,el.name,el.lokacija,el.vlasnik,el.radnoVreme,el.opis,el.dogadjaji,el.tagovi,el.email,el.password);
                    return korisnik;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getLokalByTag(tag)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Lokal/VratiPoTagu/"+tag, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el => {
                        const korisnik= new Lokal(el.lokalID,el.name,el.lokacija,el.vlasnik,el.radnoVreme,el.opis,el.dogadjaji,el.tagovi,el.email,el.password);
                        list.push(korisnik);
                    });
                    return list;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getDogadjajByTag(tag)
    {
        let list=[]
        let response= await fetch("http://localhost:5089/api/Dogadjaj/GetAllDogadjajByTag/"+tag, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el=>{
                        const dog= new Dogadjaj(el.dogadjajID, el.name,el.organizator,el.korisnici,el.datum,el.listaTagova);
                        list.push(dog)
                    });
                    // if(data.length>1){
                        
                    // }
                    // else{
                    //     const dog= new Dogadjaj(data.dogadjajID, data.name,data.organizator,data.korisnici,data.datum,data.listaTagova);
                    //     list.push(dog)
                    // }
                    return list;
                }
            case 204:
                {
                    return "Server ne vraca podatke, jer nema podataka za zadati tag";
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getDogadjajById(id)
    {
        let response= await fetch("http://localhost:5089/api/Dogadjaj/GetDogadjajById/"+id, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var el= await response.json();
                    const dog= new Dogadjaj(el.dogadjajID, el.name,el.organizator,el.korisnici,el.datum,el.listaTagova);
                    return dog;
                }
                case 204:
                    {
                        return "Sve ok";
                    }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    //POST/////////////////////////////////////////////

    async dodajLokal(lokal){

        let response = await fetch("http://localhost:5089/api/Lokal/CreateLokal",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body: JSON.stringify(lokal)
        });

        switch(response.status){
            case 200: {
                // console.log(await response.json());
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    
    
    async dodajKorisnika(korisnik){

        let response = await fetch("http://localhost:5089/api/Korisnik/CreateKorisnik",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body: JSON.stringify(korisnik)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    } 

    async dodajDogadjaj(dogadjaj){
        console.log(dogadjaj.organizator)
        let response = await fetch("http://localhost:5089/api/Dogadjaj/CreateDogadjaj",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(dogadjaj)
            // body: JSON.stringify(dogadjaj,[ "name","organizator","korisnici","datum","listaTagova"])
        });

        switch(response.status){
            case 200: {
                console.log(await response.json());
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    //PUT//////////////////////////////////////////////
    async dodajTagDogadjaju(dog,tag){

        let response = await fetch("http://localhost:5089/api/Dogadjaj/DodajTagDogadjaju/"+dog+"/"+tag,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"
        });

        switch(response.status){
            case 200: {
                console.log(await response.json());
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async izmeniLokal(lokal){

        let response = await fetch("http://localhost:5089/api/Lokal/ChangeLokal",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(lokal)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async izmeniLokalLogInfo(lokal,mail,pass){

        let response = await fetch("http://localhost:5089/api/Lokal/ChangeLokalLogInfo/"+lokal+"/"+mail+"/"+pass,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"
        });

        switch(response.status){
            case 200: {
                console.log(await response.json());
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async izmeniKorisnika(korisnik){

        let response = await fetch("http://localhost:5089/api/Korisnik/ChangeKorisnik",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(korisnik)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async prijavaNaDogadjaj(idd,idk)
    {
        let response = await fetch("http://localhost:5089/api/Korisnik/PrijavaNaDogadjaj/"+idd+"/"+idk,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"
        });
        switch(response.status){
            case 200: {
                console.log(await response.json());
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async izmeniKorisnikaLogInfo(korisnik,mail,pass){

        let response = await fetch("http://localhost:5089/api/Korisnik/ChangeKorisnikLogInfo/"+korisnik+"/"+mail+"/"+pass,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"
        });

        switch(response.status){
            case 200: {
                console.log(await response.json());
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async deleteInbox(id)
    {
        let response= await fetch("http://localhost:5089/api/Korisnik/IsprazniInbox/"+id,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"
        });
        switch(response.status){
            case 200: {
                console.log(`Uspesno izbrisan dogadjaj`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
}