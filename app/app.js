function formatClasses() {
    let classData = ($("#classes").val());
    let classArray = classData.split(",")
    let cleanedClasses = [];
    classArray.forEach(element => {
        cleanedClasses.push({
            className: element.trim(),
            link: "#"
        });
    });
    return cleanedClasses;
}

function addUser() {
    let user = {
        fname: $("#fname").val(),
        lname: $("#lname").val(),
        age: $("#age").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        classes: formatClasses()
    }

    console.log(user);

    let allUsers = JSON.parse(localStorage.getItem("Students"));
    console.log("all users", allUsers);
    allUsers.push(user);
    localStorage.setItem("Students", JSON.stringify(allUsers));
    console.log(allUsers);

    // $("#fname").val(''),
    // $("#lname").val(''),
    // $("#age").val(''),
    // $("#email").val(''),
    // $("#phone").val(''),
    // $("#classes").val(''),
}

function displayUsers() {
    let allUsers = JSON.parse(localStorage.getItem("Students"));
    $("#students").html("");

    $.each(allUsers, (idx, user) => {
        let listedClasses = '';
        user.classes.forEach(element => {
            listedClasses = listedClasses + `<a href="${element.link}">${element.className}</a><br>`
        });
        $("#students").append(`<div class="student">
        <h3 id="s-name">${user.fname} ${user.lname}, <span id="s-age">${user.age}</span></h2>
        <div class="contact-info">
            <p><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#243142}</style><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg> <span id="info-email">${user.email}</span></p>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#243142}</style><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> <span id="info-phone">${user.phone}</span></p>
        </div>
        <div id="courses" class="courses">
            ${listedClasses}
        </div>
    </div>`)
    })
}

function connectToStorage() {
    if(localStorage) {
        let students = localStorage.getItem("Students")
        if(students) {
            console.log("has students")
        } else {
            localStorage.setItem("Students", JSON.stringify([]));
        }
    } else {
        alert("Error: No local storage detected");
        location.reload();
    }
}

function initListeners() {
    $("#form-submit").on("click", (e) => {
        e.preventDefault();
        console.log("click");
        if($("#fname") == "" || $("#lname") == "" || $("#email") == "") {
            alert("Please fill out required fields.")
        } else {
            addUser();
        }
    })
    $("#display-button").on("click", (e) => {
        e.preventDefault(); 
        console.log("click");
        displayUsers();
    })
}

$(document).ready(function () {
    initListeners();
    connectToStorage();
})