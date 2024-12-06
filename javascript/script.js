  const aboutBtn = document.getElementById("aboutBtn");
  const portfolioBtn = document.getElementById("portfolioBtn");
  const textInput = document.getElementById("textInput");
  const changeText = document.getElementById("chnageText");
  const apiUrl = "http://localhost:3000/text"; 
 

  aboutBtn.addEventListener("click", () => {
    if (changeText.textContent.trim()) {
      changeText.dataset.originalText = changeText.textContent.trim();
      changeText.textContent = ""; 
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    fetch(apiUrl)
      .then(response => response.json( ))
      .then(data => {
        if (data && data.text) {
          changeText.textContent = data.text;
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  });
  portfolioBtn.addEventListener("click", () => {
    const newText = textInput.value.trim();
    if (newText) {
      changeText.textContent = newText; 
      textInput.value = ""; 
    } else {
      alert("Please enter some text before submitting."); 
    }
  });

  const socials = document.querySelectorAll(".socials a");
  socials.forEach((social) => {
    social.addEventListener("mouseover", () => {
      social.style.opacity = "0.8";
    });
    social.addEventListener("mouseout", () => {
      social.style.opacity = "1";
    });
  });

  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const aboutBtn = document.getElementById("aboutBtn");
    const portfolioBtn = document.getElementById("portfolioBtn");
    const textInput = document.getElementById("textInput");
    const changeText = document.getElementById("chnageText");
  
    aboutBtn.addEventListener("click", () => {
      if (changeText.textContent.trim()) {
        changeText.textContent = ""; 
      }
    });
  
    portfolioBtn.addEventListener("click", () => {
      const newText = textInput.value.trim(); 
      if (newText) {
        if (!changeText.firstElementChild) {
          const newParagraph = document.createElement("p");
          newParagraph.textContent = newText;
          newParagraph.className = "styled-text"; 
          changeText.appendChild(newParagraph);
        } else {
          changeText.firstElementChild.textContent = newText;
        }
        textInput.value = ""; 
      } else {
        alert("Please enter some text before submitting.");
      }
    });
  
    const socials = document.querySelectorAll(".socials a");
    socials.forEach((social) => {
      social.addEventListener("mouseover", () => {
        social.style.opacity = "0.8";
      });
      social.addEventListener("mouseout", () => {
        social.style.opacity = "1";
      });
    });
  
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  });
 




portfolioBtn.addEventListener("click", () => {
  const newText = textInput.value.trim();
  if (newText) {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: newText })
    })
      .then(response => response.json())
      .then(data => {
        changeText.textContent = data.text;
        textInput.value = ""; 
      })
      .catch(error => console.error("Error updating data:", error));
  } else {
    alert("Please enter some text before submitting.");
  }
});

aboutBtn.addEventListener("click", () => {
  if (changeText.textContent.trim()) {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: "" }) 
    })
      .then(response => response.json())
      .then(() => {
        changeText.textContent = "";
      })
      .catch(error => console.error("Error clearing data:", error));
  }
});




