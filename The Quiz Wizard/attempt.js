const allquizesobject=JSON.parse(localStorage.getItem('allQuizes'));//for attempting we show all the quizes but in result we only show the quizes created by the logged in user
const allquizes=Object.keys(allquizesobject);//contains the names of all the available quizes
const list=document.getElementById("listofquiz")


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
 getcurrentquiz();//adds the events to the buttons of the quiz
//currentquiz has the quiz selected by the user
//there will be an array of objects with key=quizname and value=an array of object with key=q,op1,op2,op3,op4 and ans

// var arrayofallquizes={
//     "Quiz1":[
//         {
//         "q":"What is the capital of India",
//         "opt1":"Delhi",
//         "opt2":"Kolkata",
//         "opt3":"Chennai",
//         "opt4":"Kolkata",
//         "ans":"opt1"
//     },
//     {
//         "q":"What is the capital of UP",
//         "opt1":"Delhi",
//         "opt2":"Kolkata",
//         "opt3":"Lucknow",
//         "opt4":"Kolkata",
//         "ans":"opt3"
//     },
//     {
//         "q":"What is the capital of Italy",
//         "opt1":"New York",
//         "opt2":"Rome",
//         "opt3":"Venice",
//         "opt4":"Vatican City",
//         "ans":"opt1"
//     },
//     {
//         "q":"What is the capital of China",
//         "opt1":"Beijing",
//         "opt2":"Shanghai",
//         "opt3":"Xiaou",
//         "opt4":"Ghanxiao",
//         "ans":"opt1" 
//     },
//     {
//         "q":"What is the capital of Nepal",
//         "opt1":"Thimpu",
//         "opt2":"KoalaLumpur",
//         "opt3":"Mizoram",
//         "opt4":"Kathmandu",
//         "ans":"opt1"
//     }
// ],
//     "Quiz2":[{
//         "q":"What is the currency of France",
//         "opt1":"Dollars",
//         "opt2":"Riyadh",
//         "opt3":"Euros",
//         "opt4":"Yen",
//         "ans":"opt3"
//     }]
// }

var currentquestion=0;
var score=0;
var obj;//holds the object of the current quiz later in the code
const ques=document.getElementById("question");
const op1=document.getElementById("a");
const op2=document.getElementById("b");
const op3=document.getElementById("c");
const op4=document.getElementById("d");
const allanswer=document.querySelectorAll('.options');
const savenext=document.getElementById("savenext");
const finish=document.getElementById("finish");
const questinfo=document.querySelector(".currentquiz");
const stdinfo=document.querySelector(".studentinfo");
const stdname=document.getElementById("stdname");
const stdemail=document.getElementById("stdemail");
const start=document.getElementById('start');
const end=document.querySelector(".end");
const questhead=document.getElementById("questionhead");
const sidebar=document.querySelector(".quiz");
var totalques;
start.addEventListener('click',()=>{
    if(stdname.value=='' || stdemail.value=='')
    alert("Please enter all the information");
    else{
        console.log(currentquiz);
        if(currentquiz=="")
        alert("Please choose a Quiz to attempt");
        else{
            stdinfo.style.display="none";
            sidebar.style.visibility="hidden";
            questinfo.style.display="flex";
            questhead.innerText=`${currentquiz} 
            Question-${currentquestion+1}`;
            console.log(currentquiz);
            obj=allquizesobject[currentquiz]//will contain the arrau of oblects of the current quiz
            totalques=obj.length;
            loadQuestion(obj);
        } 
    }
});

const loadQuestion=(obj)=>{
    ques.innerText=obj[currentquestion].q;
    op1.innerText=obj[currentquestion].opt1;
    op2.innerText=obj[currentquestion].opt2;
    op3.innerText=obj[currentquestion].opt3;
    op4.innerText=obj[currentquestion].opt4;
}
const getmarkedanswer=()=>{
    let answer;
    allanswer.forEach((elem)=>{
        if(elem.checked)
        answer=elem.id;
    });
    return answer;
}

savenext.addEventListener('click',()=>{
    const checkedanswer=getmarkedanswer();
    console.log(checkedanswer);
    if(checkedanswer===obj[currentquestion].ans)
    score++;

    // questhead.innerText=`${currentquiz} Question-${currentquestion+1}`;
    console.log(currentquestion+1);
    currentquestion++;
    if(currentquestion!=obj.length)
    {
        questhead.innerText=`${currentquiz} 
        Question-${currentquestion+1}`;
    }
    allanswer.forEach((elem)=>{elem.checked=false});
    if(currentquestion<obj.length){
        loadQuestion(obj);
    }
    else
    finish.style.visibility="visible";
});

// var resultobj={
//     "Quiz1":[{"Name":"krishna","Email":"stary56@gmail.com","Score":"10"},{"Name":"Nikhil","Email":"Nik6@gmail.com","Score":"9"}],
//     "Quiz2":[{"Name":"krishna","Email":"stary56@gmail.com","Score":"10"},{"Name":"Nikhil","Email":"Nik6@gmail.com","Score":"9"}]
// };
var resultobj=JSON.parse(JSON.stringify(localStorage.getItem('allResults')));
resultobj=JSON.parse(resultobj);
finish.addEventListener('click',()=>{
    questinfo.style.display="none";
    sidebar.style.visibility="visible";
    end.style.display="flex";
    deselect("");
    // console.log("the score of "+stdname.value+" is "+score);
    var result={"Name":stdname.value,  "Email":stdemail.value, "Score":score};//to be pushed in curent quiz array of oblects

    var currentquizresult="";
    //check if the current quiz exists in the resultobj
    var temparr=Object.keys(resultobj);//will ahve all the quizes of reultobj
    temparr.forEach((quiz)=>{
        if(quiz===currentquiz)
        currentquizresult=resultobj[currentquiz];
    })
    if(currentquizresult=="")//means quiz not found in the keys
    resultobj[currentquiz]=[result];//create a new key(currentquiz) and value(am array of object result)
    else{
        currentquizresult.push(result);
        resultobj[currentquiz]=currentquizresult;
    }
    localStorage.setItem('allResults',JSON.stringify(resultobj));
    console.log(resultobj[currentquiz]);
})




