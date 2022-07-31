const quizname=document.getElementById("quizname");
const numofques=document.getElementById("numberofques");
const submitquiz=document.getElementById("submitquiz");
const nextques=document.getElementById("nextques");

const quest=document.getElementById("quest");
const opt1=document.getElementById("option1");
const opt2=document.getElementById("option2");
const opt3=document.getElementById("option3");
const opt4=document.getElementById("option4");
const ans=document.getElementById("answer");

//user details
var currentUser="";
var userQuizes;
var alladmins;
currentUser=window.localStorage.getItem('currentUser');//will give username of current user
if(currentUser==="")//not logged in
{
    while(currentUser==="")
    alert("Please login first");
}
else{
    alladmins=JSON.parse((JSON.stringify(window.localStorage.getItem('allAdmins'))));
    alladmins=JSON.parse(alladmins);
    userQuizes=alladmins[currentUser];
    //returned object has the currentuser as a key and value is te array of all quiz names
}
//get allquizes object
var allquizes=JSON.parse(window.localStorage.getItem("allQuizes"));
var currentnum=1;
var newquestion=[];
const inputquestion=()=>{
    newquestion.push({
        "q":quest.value,
        "opt1":opt1.value,
        "opt2":opt2.value,
        "opt3":opt3.value,
        "opt4":opt4.value,
        "ans":ans.value
    })
    currentnum++;
    if(currentnum>numofques.value)
    submitquiz.style.visibility="visible";
}
nextques.addEventListener("click",()=>{
    if(quest.value=="" || opt1.value==""|| opt2.value=="" || opt3.value=="" || opt4.value=="" || ans.value==""){
        alert("Please enter all the details");
    }
    else{
        if(currentnum<=numofques.value)
        {
            inputquestion();
            console.log(currentnum);
            console.log(newquestion);
            if(currentnum-1!=numofques.value)
            {
                quest.placeholder=`Enter the question number ${currentnum}`;
                quest.value="";
                opt1.value="";
                opt2.value="";
                opt3.value="";
                opt4.value="";
                ans.value="";
            }
        }
    }
})
submitquiz.addEventListener('click',()=>{
    if(quizname.value=='' || numofques.value=='')
    alert("Please enter all details");
    else{
        console.log(newquestion);
        var currentquiz=[];
        currentquiz.push({
            [quizname.value]:newquestion
        })
        console.log(currentquiz);
        // allquizes.push(quizname.value);
        allquizes[quizname.value]=newquestion;//a new quiz added in allquizes
        window.localStorage.setItem("allQuizes",JSON.stringify(allquizes));
        alladmins[currentUser].push(quizname.value);// a new quiz added in the admins array
        window.localStorage.setItem("allAdmins",JSON.stringify(alladmins));
        alert("Quiz successfully created");
    }
    console.log(allquizes);
    quest.value="";
    opt1.value="";
    opt2.value="";
    opt3.value="";
    opt4.value="";
    ans.value="";
    quizname.value="";
    numofques.value="";
    datetime.value="";
})
