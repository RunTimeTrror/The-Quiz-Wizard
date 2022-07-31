const email=document.getElementById("user");
const password=document.getElementById("pass");
const login=document.getElementById("login");
const register=document.getElementById("register");

var alladmins=JSON.parse(window.localStorage.getItem('allAdmins'));
var allusers=JSON.parse(window.localStorage.getItem("Login"));
login.addEventListener('click',()=>{
    var f=0;
    var usernamelist=Object.keys(allusers);
    usernamelist.forEach((elem)=>{
        if(elem===email.value)
        {
            localStorage.setItem('user is',email.value);
            f=1;
            if(allusers[elem]===password.value)
            {
                alert("Login Successful");
                window.localStorage.setItem("currentUser",email.value);
                window.open('main.html');
            }
            else
            alert("Wrong Password");
        }
    });
    if(f==0)
    alert("Please Register First");
});

register.addEventListener('click',()=>{
    var newuser=email.value;
    var newpass=password.value;
    if(newuser==='' && newpass==='')
    alert("Please enter something");
    else{
        var usernamelist=Object.keys(allusers);
        var f=0;
        usernamelist.forEach((elem)=>{
            if(elem===email.value)
            {
                f=1;
                alert("Already Registered");
            }
        })
        if(f==0)
        {
            allusers[newuser]=newpass;
            window.localStorage.setItem("Login",JSON.stringify(allusers));
            alladmins[newuser]=[];
            window.localStorage.setItem("allAdmins",JSON.stringify(alladmins));
            alert("Registration Successful");
        }
    }
})


