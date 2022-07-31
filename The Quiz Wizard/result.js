
// const allquizes=["Quiz1","Quiz2","Quiz3","Quiz4","Quiz5","Quiz6","Quiz7","Quiz8","Quiz9","Quiz10","Quiz11","Quiz12"];
var alladmins=JSON.parse(JSON.stringify(localStorage.getItem("allAdmins")));
alladmins=JSON.parse(alladmins);
const currentuser=localStorage.getItem("currentUser");
const allquizes=alladmins[currentuser];
const list=document.getElementById("listofquiz");

const showallquizes=(arr)=>{
    var k=1;
    arr.forEach(element => {
        var newli=document.createElement("li");
        newli.setAttribute('id',`${k}`);
        var newbutton=document.createElement("button");
        newbutton.appendChild(document.createTextNode(element));
        newbutton.classList.add("allquizes");
        newli.appendChild(newbutton);
        list.appendChild(newli);
        k++;
    });
}
showallquizes(allquizes);

const deselect=(e)=>{
    var quizes=document.querySelectorAll('.allquizes');
    // console.log(quizes);
    quizes.forEach((elem)=>{
        if(elem!==e)
        elem.style.backgroundColor="rgba(0, 0, 255, 0.678)";
    })
}
let currentquiz="";
const getcurrentquiz=()=>{
    var quizes=document.querySelectorAll('.allquizes');
    console.log(quizes);
    quizes.forEach((elem)=>{
        elem.addEventListener('click',(e)=>{
            currentquiz=elem.innerText;
            elem.style.backgroundColor="green";
            deselect(elem);
        });
    })  
}
 getcurrentquiz();

//  var resultobj={
//     "Quiz1":[{"Name":"krishna","Email":"stary56@gmail.com","Score":"10"},{"Name":"Nikhil","Email":"Nik6@gmail.com","Score":"9"}],
//     "Quiz2":[{"Name":"krishna","Email":"stary56@gmail.com","Score":"10"},{"Name":"Nikhil","Email":"Nik6@gmail.com","Score":"9"}],
//     "Quiz3":[{"Name":"krishna","Email":"stary56@gmail.com","Score":"10"},{"Name":"Nikhil","Email":"Nik6@gmail.com","Score":"9"}]
// };

var allresults=JSON.parse(JSON.stringify(localStorage.getItem('allResults')));
allresults=JSON.parse(allresults);
var temparr=Object.keys(allresults);





const result=document.querySelector(".result")
const showres=document.getElementById("showres");
const showresult=document.querySelector(".showresult");
const resulthead=document.getElementById("resulthead");
const back=document.getElementById("back");
var numofrows=0;
const displayresult=(arr)=>{
    result.style.display="flex";
    arr.forEach((elem)=>{
        var newrow=document.createElement("div");
        var name=document.createElement("span");
        name.appendChild(document.createTextNode(`${elem.Name}`));
        var email=document.createElement("span");
        email.appendChild(document.createTextNode(`${elem.Email}`));
        var score=document.createElement("span");
        score.appendChild(document.createTextNode(`${elem.Score}`));
        newrow.appendChild(name);
        newrow.appendChild(email);
        newrow.appendChild(score);
        newrow.classList.add("resultrow")
        numofrows++;
        result.appendChild(newrow);
    })
}

showres.addEventListener('click',()=>{
    var resultobj="";
    if(currentquiz=="")
    alert("Please select a quiz first");
    else{
        resulthead.innerText=`Results of ${currentquiz}`;
        showresult.style.display="none";
        console.log(temparr);
        temparr.forEach((quiz)=>{
            if(currentquiz==quiz)//currentquiz is there in the allresult array of objects
            {
                resultobj=allresults[currentquiz];
            }
        });
        if(resultobj=="")//quiz is not there in the allresult array of objects
        {
            resultobj=[];//assign empty array
            console.log("Did not find");
        }
        console.log("The resutlrobj=="+resultobj);
        displayresult(resultobj);
        console.log(resultobj);
    }
})

back.addEventListener('click',()=>{
    result.style.display="none";
    showresult.style.display="flex";
    // while (result.firstChild) {
    //     if(result.lastChild.classList.contains("heading"))
    //     break;
    //     console.log(result.lastChild)
    //     result.removeChild(result.lastChild);
    //   }
    while (numofrows>0) {
        // console.log(result.lastChild)
        result.removeChild(result.lastChild);
        // console.log('removed')
        numofrows--;
      }
})