document.getElementsByName("odjava").forEach(p=>
    {
      p.onclick=(ev)=>odjava();
    })
  
  
  function odjava(){
    sessionStorage.clear();
    window.location.href = "index.html";
  }