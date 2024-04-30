function openBar() {
  document.getElementById("sideBar").style.width = "250px";
  document.getElementById("sideBar").style.padding = "0.8rem 2rem";
}
function closeBar() {
  document.getElementById("sideBar").style.width = "0";
  document.getElementById("sideBar").style.padding = "0";
}

const formButton = document.getElementById("form-btn");
const urlValue = document.getElementById("url");
const errorMessage = document.getElementById("errors");
const successMessage = document.getElementById("success-message");
const copyBtn = document.getElementById("copy-btn");

function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

formButton.addEventListener("click", function (event) {
  event.preventDefault();
  checkErrors(urlValue, errorMessage);
});

function checkErrors(input, errors) {
  if (input.value.trim() === "" || input.value.length < 7) {
    errors.style.display = "block";
    input.classList.add("error");
  } else {
    errors.style.display = "none";
    input.classList.remove("error");
    let url = input.value;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`,
      {}
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.text();
      })
      .then((data) => {
        successMessage.style.display = "block";
        successMessage.innerHTML = data;
        copyBtn.style.display = "block";
        copyBtn.addEventListener("click", function () {
          copyToClipboard(data);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your link has been successfully copied!",
          });
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
}
