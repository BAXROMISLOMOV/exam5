document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000";
    const portfolioContainer = document.querySelector(".portfolio");
  
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch(`${baseURL}/portfolio`);
        if (!response.ok) throw new Error("Failed to fetch portfolio items");
        const portfolios = await response.json();
  
        portfolioContainer.innerHTML = ""; 
        portfolios.forEach((item) => {
          const portfolioHTML = `
            <section class="portfolio-item">
              <div class="image">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="content">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p><strong>Technologies:</strong> ${item.technologies.join(", ")}</p>
                <div class="buttons">
                  <a href="${item.link}" class="demo" target="_blank">Demo</a>
                  <button class="delete-btn" data-id="${item.id}">Delete</button>
                </div>
              </div>
            </section>
          `;
          portfolioContainer.insertAdjacentHTML("beforeend", portfolioHTML);
        });
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      }
    };
  
    const addPortfolioItem = async () => {
      const title = prompt("Enter portfolio title:");
      const description = prompt("Enter portfolio description:");
      const technologies = prompt("Enter technologies (comma-separated):").split(",");
      const image = prompt("Enter image URL:");
      const link = prompt("Enter project demo URL:");
  
      const newItem = { title, description, technologies, image, link };
  
      try {
        const response = await fetch(`${baseURL}/portfolio`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
  
        if (response.ok) {
          fetchPortfolioItems();
          alert("Portfolio item added successfully!");
        } else {
          throw new Error("Failed to add portfolio item");
        }
      } catch (error) {
        console.error("Error adding portfolio item:", error);
      }
    };
  
    const deletePortfolioItem = async (id) => {
      try {
        const response = await fetch(`${baseURL}/portfolio/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          fetchPortfolioItems(); 
          alert("Portfolio item deleted successfully!");
        } else {
          throw new Error("Failed to delete portfolio item");
        }
      } catch (error) {
        console.error("Error deleting portfolio item:", error);
      }
    };
  
    portfolioContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        if (confirm("Are you sure you want to delete this portfolio item?")) {
          deletePortfolioItem(id);
        }
      }
    });
  
    const addPortfolioButton = document.createElement("button");
    addPortfolioButton.textContent = "Add Portfolio Item";
    addPortfolioButton.classList.add("add-portfolio-btn");
    addPortfolioButton.style.margin = "20px 0";
    addPortfolioButton.addEventListener("click", addPortfolioItem);
    document.body.insertBefore(addPortfolioButton, portfolioContainer);
  
    fetchPortfolioItems();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000"; // JSON Server base URL
    const portfolioContainer = document.querySelector(".portfolio");
    const postPortfolioBtn = document.querySelector(".post-btn");
  
    // Fetch and display portfolio items
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch(`${baseURL}/portfolio`);
        if (!response.ok) throw new Error("Failed to fetch portfolio items");
        const portfolios = await response.json();
  
        // Clear the container and re-render items
        portfolioContainer.innerHTML = "";
        portfolios.forEach((item) => {
          const portfolioHTML = `
            <section class="portfolio-item">
              <div class="image">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="content">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p><strong>Technologies:</strong> ${item.technologies.join(", ")}</p>
                <div class="buttons">
                  <a href="${item.link}" class="demo" target="_blank">Demo</a>
                  <button class="delete-btn" data-id="${item.id}">Delete</button>
                </div>
              </div>
            </section>
          `;
          portfolioContainer.insertAdjacentHTML("beforeend", portfolioHTML);
        });
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      }
    };
  
    // Add a new portfolio item
    const addPortfolioItem = async () => {
      const title = prompt("Enter portfolio title:");
      const description = prompt("Enter portfolio description:");
      const technologies = prompt("Enter technologies (comma-separated):").split(",");
      const image = prompt("Enter image URL:");
      const link = prompt("Enter project demo URL:");
  
      // Ensure required fields are filled
      if (!title || !description || !image || !link) {
        alert("All fields are required!");
        return;
      }
  
      const newItem = { title, description, technologies, image, link };
  
      try {
        const response = await fetch(`${baseURL}/portfolio`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
  
        if (response.ok) {
          alert("Portfolio item added successfully!");
          fetchPortfolioItems(); // Refresh the portfolio list
        } else {
          throw new Error("Failed to add portfolio item");
        }
      } catch (error) {
        console.error("Error adding portfolio item:", error);
      }
    };
  
    // Delete a portfolio item
    const deletePortfolioItem = async (id) => {
      try {
        const response = await fetch(`${baseURL}/portfolio/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("Portfolio item deleted successfully!");
          fetchPortfolioItems(); // Refresh the portfolio list
        } else {
          throw new Error("Failed to delete portfolio item");
        }
      } catch (error) {
        console.error("Error deleting portfolio item:", error);
      }
    };
  
    // Event delegation for delete buttons
    portfolioContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        if (confirm("Are you sure you want to delete this portfolio item?")) {
          deletePortfolioItem(id);
        }
      }
    });
  
    // Handle Post Portfolio button click
    postPortfolioBtn.addEventListener("click", addPortfolioItem);
  
    // Initial fetch of portfolio items
    fetchPortfolioItems();
  });
  