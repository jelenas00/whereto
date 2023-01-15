export class Lokal
{
    constructor(lokalID,name,lokacija,vlasnik,radnoVreme,opis,dogadjaji,tagovi,email,password)
    {
        this.lokalID= lokalID;
        this.name=name;
        this.lokacija=lokacija;
        this.vlasnik=vlasnik;
        this.radnoVreme=radnoVreme;
        this.opis=opis;
        this.email=email;
        this.password=password;
        this.dogadjaji=dogadjaji;
        this.tagovi=tagovi;
    }
}