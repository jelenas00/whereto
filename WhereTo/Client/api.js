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
                        const lokal= new Lokal(element.lokalID,element.name,element.lokacija,element.vlasnik,element.radnoVreme,element.opis,element.dogadjaji,element.tagovi);
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
                    const lokal= new Lokal(element.lokalID,element.name,element.lokacija,element.vlasnik,element.radnoVreme,element.opis,element.dogadjaji,element.tagovi);
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


    //PUT//////////////////////////////////////////////
}