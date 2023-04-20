// form control

var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector('#add-btn');
var model = document.querySelector('.model');
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function () {
    model.classList.add("active");
}
closeBtn.addEventListener("click", () => {
    model.classList.remove("active");
    var i;
    for (i = 0; i < allInput.length; i++) {
        allInput[i].value = "";
    }
})


// start global variable
var employeeData = [];
var profile_pic = document.querySelector("#profile-pic");
var uploadpic = document.querySelector("#upload-field");
var UserNameEl = document.getElementById("UserName");
var FirstNameEl = document.getElementById("FirstName");
var LastNameEl = document.getElementById("LastName");
var EmailEl = document.getElementById("Email");
var Contact_NoEl = document.getElementById("Contact-No");
var IndustriesEl = document.getElementById("Industries");
var DesgnationEl = document.getElementById("Desgnation");
var SkillEl = document.getElementById("Skill");

var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var imgUrl;

//end global variable
//start register
registerBtn.onclick = function (e) {
    if (validation() == true) {
        e.preventDefault();
        registrationData();
        getDataFromLocal();
        registerForm.reset('');
        closeBtn.click();
    }

}

if (localStorage.getItem("EmployeeData") != null) {
    employeeData = JSON.parse(localStorage.getItem("EmployeeData"));
}

function registrationData() {
    employeeData.push({
        UserName: UserNameEl.value,
        FirstName: FirstNameEl.value,
        LastName: LastNameEl.value,
        Email: EmailEl.value,
        Contact_No: Contact_NoEl.value,
        Industries: IndustriesEl.value,
        Desgnation: DesgnationEl.value,
        Skill: SkillEl.value,
        profilePic: imgUrl == undefined ? "img/images.jpg" : imgUrl
    });
    var userString = JSON.stringify(employeeData);
    localStorage.setItem("EmployeeData", userString);
    swal("Good job!", "Registration Success!", "success");
}

//START Returning Data on page from localstorage

var tableData = document.querySelector("#table-data");

const getDataFromLocal = () => {
    tableData.innerHTML = "";
    employeeData.forEach((data, index) => {
        tableData.innerHTML += `
      <tr index='${index}'>
      <td>${index + 1}</td>
      <td><img src="${data.profilePic}" width="45"></td>
      <td>${data.UserName}</td>
      <td>${data.FirstName}</td>
      <td>${data.LastName}</td>
      <td>${data.Email}</td>
      <td>${data.Contact_No}</td>
      <td>${data.Industries}</td>
      <td>${data.Desgnation}</td>
      <td>${data.Skill}</td> 
      <td>
          <button class="edit-btn" style="border-radius: 5px; cursor:pointer"><i class="fa fa-eye"></i></button>
          <button class="del-btn" style="background-color: darkorange; border-radius: 5px;cursor:pointer"><i class="fa fa-trash"></i></button>
      </td>
  </tr>
      `;
    })

    /*Start delete coding */
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn");
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        employeeData.splice(id, 1);
                        localStorage.setItem("EmployeeData", JSON.stringify(employeeData));
                        tr.remove();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });

        }
    }

    /*Start Update coding */
    var allEdit = document.querySelectorAll(".edit-btn");
    for (i = 0; i < allEdit.length; i++) {
        allEdit[i].onclick = function () {
            addBtn.click();
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var imgTag = tr.getElementsByTagName("IMG");
            var profilepic = imgTag[0].src;
            var UserName = td[2].innerHTML;
            var FirstName = td[3].innerHTML;
            var LastName = td[4].innerHTML;
            var Email = td[5].innerHTML;
            var Contact_No = td[6].innerHTML;
            var Industries = td[7].innerHTML;
            var Desgnation = td[8].innerHTML;
            var Skill = td[9].innerHTML;
           
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            UserNameEl.value = UserName;
            FirstNameEl.value = FirstName;
            LastNameEl.value = LastName;
            EmailEl.value = Email;
            Contact_NoEl.value = Contact_No;
            IndustriesEl.value = Industries;
            DesgnationEl.value = Desgnation;
            SkillEl.value = Skill;
            profile_pic.src = profilepic;
            updateBtn.onclick = function (e) {
                employeeData[index] = {
                    UserName: UserNameEl.value,
                    FirstName: FirstNameEl.value,
                    LastName: LastNameEl.value,
                    Email: EmailEl.value,
                    Contact_No: Contact_NoEl.value,
                    Industries: IndustriesEl.value,
                    Desgnation: DesgnationEl.value,
                    Skill: SkillEl.value,
                    profilePic: uploadpic.value == "" ? profile_pic.src : imgUrl
                }
                localStorage.setItem("EmployeeData", JSON.stringify(employeeData));
            }
        }
    }
}
getDataFromLocal();

//image Procesing

uploadpic.onchange = function () {
    if (uploadpic.files[0].size < 1000000) {
        var fReader = new FileReader();
        fReader.onload = function (e) {
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadpic.files[0]);
    }
    else {
        alert("File Size is to Long");
    }
}


//Start validation Coding

function validation() {
    //  var validateusername = document.getElementById('UserName').value;
    if (UserNameEl.value == "") {
        alert("Please Enter UserName");
        return false;
    }
    if (FirstNameEl.value == "") {
        alert("Please Enter FirstName");
        return false;
    }
    if (LastNameEl.value == "") {
        alert("Please Enter LastName");
        return false;
    }
    if (EmailEl.value == "") {
        alert("Please Enter Email");
        return false;
    }
    if (Contact_NoEl.value == "") {
        alert("Please Enter Contact Number");
        return false;
    }
    if (IndustriesEl.value == "") {
        alert("Please Enter Industries");
        return false;
    }
    if (DesgnationEl.value == "") {
        alert("Please Enter Desgnation");
        return false;
    }
    if(SkillEl.value == "")
    {
        alert("Please Enter Skill");
        return false;
    }
    return true;
}

//Start Search Coding

// var seachEL = document.querySelector("#empID");
// seachEL.oninput = function(){
//     searchFun();
// }

// function searchFun(){
//     var tr = tableData.querySelectorAll("TR");
//     var filter = seachEL.value.toLowerCase();
//     var i;
//     for(i=0;i<tr.length;i++){
//         var userName = tr[i].getElementsByTagName("TD")[2].innerHTML;
//         var firstName = tr[i].getElementsByTagName("TD")[3].innerHTML;
//         var lastName = tr[i].getElementsByTagName("TD")[4].innerHTML;
//         var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
//         var contactno = tr[i].getElementsByTagName("TD")[6].innerHTML;
//         var industries = tr[i].getElementsByTagName("TD")[7].innerHTML;
//         var desgnation = tr[i].getElementsByTagName("TD")[8].innerHTML;
//         var skill = tr[i].getElementsByTagName("TD")[9].innerHTML;


//         // var UserName = td.innerHTML;
//         if(userName.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(firstName.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(lastName.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(email.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(contactno.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(industries.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(desgnation.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else if(skill.toLowerCase().indexOf(filter) > -1){
//             tr[i].style.display = "";
//         }
//         else{
//             tr[i].style.display = "none";
//         }
//     }
// }