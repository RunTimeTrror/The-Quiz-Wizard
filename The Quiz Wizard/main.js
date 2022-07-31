
logout.addEventListener('click',()=>{
    const logout=document.getElementById("logout");
    var curruser=localStorage.getItem("currentUser");
    if(curruser=="")
    alert("Please login first");
    else{
        curruser="";
        localStorage.setItem('currentUser',curruser);
        alert("Logged Out, Taking you back to the login page...");
    }
})