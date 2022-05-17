const API = "999df265-c7a6-42fe-8877-7c269426b660"
const URL = "https://api.resrobot.se/v2.1/location.nearbystops?format=json&accessId="
const searchUrl = "https://api.resrobot.se/v2.1/location.name?input=brunnsparken?&format=json&accessId=999df265-c7a6-42fe-8877-7c269426b660"


const getLocation = document.getElementById("getLocation")
const list  =  document.getElementById("res-list")
const depar  =  document.getElementById("dep")
const backBtn = document.getElementById("back")
const from = document.querySelector("#from")
const to = document.querySelector("#to")
const searchBtn = document.getElementById("searchBtn")


//GEO Location
let lat = 0;
let lon = 0;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


  function success(pos) {
    var crd = pos.coords;
     lat = crd.latitude
     lon = crd.longitude
    
    reseFetch(lat,lon)
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  function getPos(){
    navigator.geolocation.getCurrentPosition(success, error, options);
   
  }

  getLocation.addEventListener("click",getPos)

  //GEO Location


  //Resebot


  async function reseFetch(){
      const res = await fetch(URL+`${API}&originCoordLat=${lat}&originCoordLong=${lon}`)
      const data =  await res.json()

      createData(data.stopLocationOrCoordLocation)
      const lis = document.querySelectorAll('li')
      clickel(lis)
  }


  //Resebot

  
function createData (data) {
  if(list.innerHTML.trim() == ""){

  data.forEach(stop => {
    const li = document.createElement("li")
    const name = stop.StopLocation.name
    li.setAttribute("data-id", stop.StopLocation.extId)
    li.textContent = name
    list.appendChild(li)
  });
}
}




function clickel(lis){
  
  lis.forEach(li =>{
    li.addEventListener("click", (e) => {
      id = e.target.getAttribute('data-id')
      
      getTable(id)
      
    })
  })
}


async function getTable(id){
  const res = await fetch(`https://api.resrobot.se/v2.1/departureBoard?id=${id}&format=json&accessId=${API}`)
  const data = await res.json()
  list.classList.add("hide")
  backBtn.classList.remove("hide")
  depar.classList.remove("hide")
  
 backBtn.addEventListener("click",e => {
   
   removeLi()
    depar.classList.add("hide")
    list.classList.remove("hide")
    backBtn.classList.add("hide")
    
  })
  if(data.Departure){

  data.Departure.forEach(dep => {
    const li = document.createElement("li")
    li.innerText = (dep.name.replace('Länstrafik - ', '')  + " mot " + dep.direction + " " +  dep.time)
    li.className = "dep-info"
    depar.appendChild(li)

  })
  
}else{
  const li = document.createElement("li")
  li.textContent = " No Avaiable DATA"
  li.className = "dep-info"
  depar.appendChild(li)
}
}




// search table


searchBtn.addEventListener("click", async() => {
  
  const res = await fetch(searchUrl)
  const data = await res.json()
  console.log(data);
  console.log(res);


})


function removeLi(){
  const li = document.getElementById("dep")
  li.innerHTML = ""
}