
//Variables
var submitBtn=document.querySelector("#submitBtn");
var bookmarkNameInput=document.querySelector("#bookmarkName");
var bookmarkURLInput=document.querySelector("#bookmarkURL");
var alertValid=document.querySelector("#alertValid");
var alertValidName=document.querySelector("#alertValidName");
var alertValidUrl=document.querySelector("#alertValidUrl");
var alertRefill=document.querySelector("#alertRefill");
var alertRefillName=document.querySelector("#alertRefillName");
var alertRefillUrl=document.querySelector("#alertRefillUrl");
var closeBtnValid=document.querySelector("#closeBtnValid");
var closeBtnValidName=document.querySelector("#closeBtnValidName");
var closeBtnValidUrl=document.querySelector("#closeBtnValidUrl");
var closeBtnRefill=document.querySelector("#closeBtnRefill");
var closeBtnRefillName=document.querySelector("#closeBtnRefillName");
var closeBtnRefillUrl=document.querySelector("#closeBtnRefillUrl");
var nameInput = /^[a-zA-Z]{3,}/;
var urlInput = /^(https:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([a-zA-Z0-9#-_]*)$/;
var bookmarkContainer=[];

//local Storage
if (localStorage.getItem("bookmark")!==null){
    bookmarkContainer=JSON.parse(localStorage.getItem("bookmark"))
    display()
}

//Add Input
submitBtn.addEventListener("click", function(){
    var name = bookmarkNameInput.value;
    var url = bookmarkURLInput.value;

    //alertValid
    if ((!nameInput.test(name)) && (!urlInput.test(url))) {
        bookmarkNameInput.classList.add("is-invalid")
        bookmarkNameInput.classList.remove("is-valid")
        bookmarkURLInput.classList.add("is-invalid")
        bookmarkURLInput.classList.remove("is-valid")
        alertValid.classList.remove("d-none")
        return;
    }

    //alertValidName
    if (!nameInput.test(name)){
        bookmarkNameInput.classList.add("is-invalid")
        bookmarkNameInput.classList.remove("is-valid")
        alertValidName.classList.remove("d-none")
        return;
    }
    else{
        bookmarkNameInput.classList.add("is-valid")
        bookmarkNameInput.classList.remove("is-invalid")
    }

    //alertValidUrl
    if (!urlInput.test(url)){
        bookmarkURLInput.classList.add("is-invalid")
        bookmarkURLInput.classList.remove("is-valid")
        alertValidUrl.classList.remove("d-none")
        return;
    }
    else{
        bookmarkURLInput.classList.add("is-valid")
        bookmarkURLInput.classList.remove("is-invalid")
    }


    //alertRefill
    var refill = bookmarkContainer.some(function (bookmark) {
        return bookmark.name.toLowerCase() === name.toLowerCase() && bookmark.url.toLowerCase() === url.toLowerCase();
    });

    if (refill) {
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid")
        bookmarkURLInput.classList.add("is-invalid");
        bookmarkURLInput.classList.remove("is-valid")
        alertRefill.classList.remove("d-none")
        return;
    }

    //alertRefillName
    if (bookmarkContainer.some(bookmark => bookmark.name.toLowerCase() === name.toLowerCase())) {
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid")
        alertRefillName.classList.remove("d-none")
        return;
    }
    else{
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid")
    }
    
    //alertRefillUrl
    if (bookmarkContainer.some(bookmark => bookmark.url.toLowerCase() === url.toLowerCase())) {
        bookmarkURLInput.classList.add("is-invalid");
        bookmarkURLInput.classList.remove("is-valid")
        alertRefillUrl.classList.remove("d-none")
        return;
    }
    else{
        bookmarkURLInput.classList.add("is-valid");
        bookmarkURLInput.classList.remove("is-invalid")
    }

    var bookmark = {
        name: name,
        url: url
    };

    bookmarkContainer.push(bookmark);
    console.log(bookmarkContainer);
    display();
    bookmarkNameInput.classList.remove("is-valid","is-invalid")
    bookmarkURLInput.classList.remove("is-valid","is-invalid")
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    clear();
})

//closeBtnValid
closeBtnValid.addEventListener("click", function () {
    alertValid.classList.add("d-none");
});
closeBtnValidName.addEventListener("click", function(){
    alertValidName.classList.add("d-none");
})
closeBtnValidUrl.addEventListener("click", function(){
    alertValidUrl.classList.add("d-none");
})

//closeBtnRefill
closeBtnRefill.addEventListener("click", function (){
    alertRefill.classList.add("d-none");
})
closeBtnRefillName.addEventListener("click", function(){
    alertRefillName.classList.add("d-none");
})
closeBtnRefillUrl.addEventListener("click", function(){
    alertRefillUrl.classList.add("d-none");
})

//Clear
function clear() {
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;
}

//Display
function display() {
    var details='';
    for(var i=0;i<bookmarkContainer.length;i++){
    details+=`
    <tr>
        <td>${i + 1}</td>
        <td>${bookmarkContainer[i].name}</td>
        <td><button onclick="VisitBookmark(${i})" class="btn btn-info"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>
    `
}
document.getElementById("tableContent").innerHTML=details;
}

//Delete
function deleteBookmark(deleteInput){
    bookmarkContainer.splice(deleteInput,1);
    console.log(bookmarkContainer);
    display()
    localStorage.setItem("bookmark",JSON.stringify(bookmarkContainer))
}

//Visit
function VisitBookmark(visitInput) {
    var url = bookmarkContainer[visitInput].url;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    window.open(url, '_blank');
}


//Name Test
function nameTest (nameValue){
    if (nameInput.test(nameValue)) {
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid")
        
    }
    else{
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid")
    }
}


//Url Test
function urlTest (urlValue){
    if (urlInput.test(urlValue)) {
        bookmarkURLInput.classList.add("is-valid");
        bookmarkURLInput.classList.remove("is-invalid")
        
    }
    else{
        bookmarkURLInput.classList.add("is-invalid");
        bookmarkURLInput.classList.remove("is-valid")
    }
}
