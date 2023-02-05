
data = [
    {
       id:2, name: "Juan", lastUpdated: "13-01-2019"
    }, 
    {
       id:3, name: "José", lastUpdated: "25-03-2014"
    },
    {
       id:1, name: "María", lastUpdated: "20-12-2016"
    }
 ]
 function Ejemplox()
{
 data.sort(function (a, b) {

   const as = a.lastUpdated.split("-");
   const ad = new Date(as[2], as[1] - 1, as[0]);
   const bs = b.lastUpdated.split("-");
   const bd = new Date(bs[2], bs[1] - 1, bs[0]);      
   return  bd-ad;
//  return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(); 
 
 })
 console.log(data.length)
data.map(()=>{
    
})

}

Ejemplox()