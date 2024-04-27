function openBar(){
    document.getElementById('sideBar').style.width = "250px";
    document.getElementById('sideBar').style.padding = "0.8rem 2rem";
}
function closeBar(){
    document.getElementById('sideBar').style.width = "0";
    document.getElementById('sideBar').style.padding = "0";
}

const formButton = document.getElementById('form-btn');
const urlValue = document.getElementById('url');
const errorMessage = document.getElementById('errors');

formButton.addEventListener("click", function(event){
    event.preventDefault();
    checkErrors(urlValue, errorMessage);
  });
  
  function checkErrors(input, errors){
  if(input.value.trim() === "" || input.value.length < 7){
    errors.style.display = "block";
    input.classList.add("error");
  } else {
    errors.style.display = "none";
    input.classList.remove("error");
  }
  }