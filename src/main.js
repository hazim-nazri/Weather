const { app, BrowserWindow } = require('electron'); 
const fs = require('fs') 
const path = require('path') 
 


var btnCreate = document.getElementById('btnCreate') 
var btnRead = document.getElementById('btnRead') 
var btnDelete = document.getElementById('btnDelete') 
var btnUpdate = document.getElementById('btnUpdate') 
var fileName = document.getElementById('fileName') 
var fileContents = document.getElementById('fileContents') 
 
let pathName = path.join(__dirname, 'Files') 
 
btnCreate.addEventListener('click', function(){  //creating text file when user click CREATE button 
  let file = path.join(pathName, fileName.value) 
  let contents = fileContents.value 
  fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file 
    if(err){ 
      return console.log(err) 
    } 
    var txtfile = document.getElementById("fileName").value 
    alert(txtfile + " text file was created")     
    console.log("The file was created") 
   
  }) 
   
}) 

// Update text file when user clicks the UPDATE button
btnUpdate.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  // Check if the file exists before updating
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      alert("File does not exist. Please create it first.");
      return;
    }

    // Update the file contents
    fs.writeFile(file, contents, function (err) {
      if (err) {
        return console.log(err);
      }
      var txtfile = document.getElementById("fileName").value;
      alert(txtfile + " has been updated successfully");
      console.log("The file was updated successfully");
    });
  });
});
 
btnRead.addEventListener('click', function(){  //read contents of the created text file 
  let file = path.join(pathName, fileName.value) 
  
  fs.readFile(file, function(err, data){  
    if(err){ 
      return console.log(err) 
    } 
    fileContents.value = data 
    console.log("The file was read!") 
  }) 
   
}) 
 
btnDelete.addEventListener('click', function(){   
  let file = path.join(pathName, fileName.value) 
  
  fs.unlink(file, function(err){  
    if(err){ 
return console.log(err) 
} 
fileName.value = "" 
fileContents.value = "" 
console.log("The file was deleted!") 
}) 
}) 

function gotohomepage(){
    window.location.href = 'page.html';
  }