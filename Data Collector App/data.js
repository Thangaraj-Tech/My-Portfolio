const box1=document.querySelector("#empname");
const box2=document.querySelector("#empid");
const box3=document.querySelector("#role");
const box4=document.querySelector("#exp");
const box5=document.querySelector("#join");
const button=document.querySelector("#btn");
const tblbody=document.querySelector("#tblbody");
var uname;
var uid,urole,uexp,ujoin;
const getdata=()=>{
     uname=box1.value;
     uid=box2.value;
     urole=box3.value;
     uexp=box4.value;
     ujoin=box5.value;
};
const cleardata=()=>{
    box1.value="";
    box2.value="";
    box3.value="";
    box4.value="";
    box5.value="";
};
const addtotable=(emp)=>{
    var r=document.createElement("tr");
    var c1=document.createElement("td");
    c1.textContent=emp.name;
    var c2=document.createElement("td");
    c2.textContent=emp.empid;
    var c3=document.createElement("td");
    c3.textContent=emp.emprole;
    var c4=document.createElement("td");
    c4.textContent=emp.empexp;
    var c5=document.createElement("td");
    c5.textContent=emp.empjoin;
    var del=document.createElement("button");
    del.textContent="delete";
    del.type="button";
    var c6=document.createElement("td");
    c6.appendChild(del);
    del.addEventListener("click",()=>{
        var c=confirm("Are you Sure??");
        if(c==true){
            r.remove();
            fetch(`http://localhost:3001/employees/${emp.id}`,
                {method:"DELETE"}
            );
        }
    })
    r.appendChild(c1);
    r.appendChild(c2);
    r.appendChild(c3);
    r.appendChild(c4);
    r.appendChild(c5);
    r.appendChild(c6);
    tblbody.appendChild(r);
    box1.focus();
};
const submitbutton=(e)=>{
    e.preventDefault();
    if(box1.value==""||box2.value==""||box3.value==""||box4.value==""||box5.value==""){
        alert("Plz Enter value");
    }
    else{
        getdata();
    const newEmp={name:uname,
        empid:uid,
        emprole:urole,
        empexp:uexp,
        empjoin:ujoin
    };
    const jdata=JSON.stringify(newEmp);
    fetch("http://localhost:3001/employees",
        {
            method:"POST",
            body:jdata,
            headers:{"Content-Type":"application/json"}

        })
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            addtotable(data);
            cleardata();
            alert("Employee Added Successfully");
        })
        .catch((err)=>console.log("Error Occured "+err))
    };

  
    
    
};


const reload=()=>{
    fetch("http://localhost:3001/employees")
    .then((resp)=>{return resp.json()})
    .then((data)=>{data.forEach(emp => {
            addtotable(emp)
    });})
    .catch((err)=>{
        alert("Something went Wrong");
    })
    
}
button.addEventListener("click",submitbutton);
window.addEventListener("load",reload)