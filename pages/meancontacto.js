document.addEventListener('DOMContentLoaded', function() {
    fetch('https://fakestoreapi.com/users?limit=5')
      .then(res => res.json())
      .then(users => {
        const carouselContainer = document.getElementById('carousel-container');

        users.forEach(user => {
         
          const card = document.createElement('div');
          card.classList.add('card');

        
          const content = `
            <h3>${user.name.firstname} ${user.name.lastname}</h3>
            <p>Email: ${user.email}</p>
            <p>Username: ${user.username}</p>
            <p>Phone: ${user.phone}</p>
          `;

        
          card.innerHTML = content;

          
          carouselContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });