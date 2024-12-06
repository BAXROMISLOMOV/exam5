// Select the buttons and the text-section
const deleteBtn = document.getElementById('deleteBtn');
const setupBtn = document.getElementById('setupBtn');
const textSection = document.querySelector('.text-section');

const baseUrl = 'http://localhost:3000/about';

function fetchAboutData() {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const aboutData = data[0]; 
        textSection.querySelector('#bio').textContent = aboutData.bio;
        textSection.querySelector('#bios').textContent = aboutData.name;
      }
    })
    .catch(err => console.log('Error fetching data:', err));
}

fetchAboutData();

deleteBtn.addEventListener('click', () => {
  fetch(baseUrl + '/1', {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(() => {
    textSection.style.display = 'none'; 
    alert('Data deleted successfully!');
  })
  .catch(err => console.log('Error deleting data:', err));
});

setupBtn.addEventListener('click', () => {
  const newName = prompt('Enter new name:');
  const newBio = prompt('Enter new bio:');

  if (newName && newBio) {
    const updatedData = {
      name: newName,
      bio: newBio
    };

    fetch(baseUrl + '/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(() => {
      textSection.style.display = 'block'; 
      textSection.querySelector('h3').textContent = newName;
      textSection.querySelector('p').textContent = newBio;
      alert('Data updated successfully!');
    })
    .catch(err => console.log('Error updating data:', err));
  } else {
    alert('Both name and bio are required!');
  }
});
