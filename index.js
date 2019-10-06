const procedure = document.getElementById('procedure')
let  role = document.getElementById('role')
let  resource = document.getElementById('resource')
let  display = document.getElementById('display')

role.addEventListener("change" ,checkRole)
procedure.addEventListener('click',getProcedure)
function checkRole(){
if(role.value=="Prescriber"){
resource.innerHTML=`
<option value = "General-Supplies" selected>General Supplies</option>
<option value = "Technical-Supplies">Technical Supplies</option> 
<option value = "Investments">Investments– Fixed And Movable Assets </option>
<option value = "Intellectual"> Intellectual Services</option>
<option value = "Delegated-Purchasing"> Delegated Purchasing</option>
`
}else if(role.value=="Purchasing-Manager"){
    resource.innerHTML=`<option value = "General-Supplies" selected>General Supplies</option>
    <option value = "Technical-Supplies">Technical Supplies</option>
    <option value = "Insurances">Insurances</option>
    <option value = "Investments">Investments– Fixed And Movable Assets </option>
    <option value = "Intellectual"> Intellectual Services</option>
    `
}else if(role.value=="MD"){
    resource.innerHTML=`<option value = "General-Supplies" selected>General Supplies</option>
    <option value = "Technical-Supplies">Technical Supplies</option>
    <option value = "Insurances">Insurances</option>
    <option value = "Investments">Investments– Fixed And Movable Assets </option>
    <option value = "Intellectual"> Intellectual Services</option>
    `
}else if(role.value=="Production-Services-Manager"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>
    `
}else if(role.value=="Plants-and-Warehouses-Manager"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>`
}else if(role.value=="Specialities-Project-Manager"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>`
}else if(role.value=="GM"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>
    <option value = "Insurances">Insurances</option>`
}else if(role.value=="ED"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>
    <option value = "Insurances">Insurances</option>
    `
}else if(role.value=="TC"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>`
}else if(role.value=="store-keeper"){
    resource.innerHTML=` <option value = "receipts">Receipts Of Materials, Equipment And Goods Into Store</option>`
}else if(role.value=="LAM"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>
    <option value = "Insurances">Insurances</option>`
}else if(role.value=="MARD"){
    resource.innerHTML=` <option value = "Investments">Investments– Fixed And Movable Assets </option>`
}else if(role.value=="company-secretary"){
    resource.innerHTML=`<option value = "Technical-Supplies">Technical Supplies</option>`
}
}
function getProcedure(e){
e.preventDefault()
let loader = ` <div class= "col-md-12" id="loader-div" style="text-align:center"> <img class= "loader" src="giphy.gif" width="100%" height="50%"/> </div>`;
    display.innerHTML = loader; 
    
console.log(role.value)
console.log(resource.value)
fetch(`https://procurementbotapi.herokuapp.com/roles/${role.value.toUpperCase()}/${resource.value.toUpperCase()}`, {
        method: "GET",
        headers: {
            'Content-Type': 'multipart/form-data',
            'origin':'*',
            'Access-Control-Allow-Origin':'*',
           /* "Authorization": `Basic ${base64.encode(`${"steve"}:${"pass1234"}`)}`*/
        },
    
        'crossOrigin': true,
        'mode':'cors'
        
    }).catch(function error(){display.innerHTML=`<p>sorry, failed to load post, please check network`}).then((response) => response.json()).then(function(data){
        let output ="";
        console.log(data.Data)
        output+= `<p>The ${data.Data[0].role}</p>`
        data.Data.forEach( function(procedure){
             /*output+=`<p>The ${procedure.role}</p>`*/
            procedure.procedure.forEach( function(procedureli){
                if(procedureli.startsWith("*")==true){
                    output+=`<li style="color:#333333 !important; padding-bottom:10px; list-style:none";>${procedureli}</li>`
                }else{
                output+=`<li style="padding-bottom:10px;">${procedureli}</li>`     
                }
            })
          display.innerHTML = output;
         console.log(procedure.resource)
         console.log(procedure.role)
         console.log(procedure.procedure[0])
        })
    })
}
