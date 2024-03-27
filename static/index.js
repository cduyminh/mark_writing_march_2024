console.log("script connected")

document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display votes for each row
  document.querySelectorAll(".vote-btn").forEach(button => {
      const rowId = button.getAttribute("data-id");
      fetchAndDisplayVotes(rowId);

      button.addEventListener("click", function() {
          const voteType = this.getAttribute("data-vote");
          
          fetch('/vote', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ vote: voteType, id: rowId }),
          })
          .then(response => response.json())
          .then(data => {
              console.log("Vote registered:", data);
              // Update vote counts after a vote is registered
              fetchAndDisplayVotes(rowId);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      });
  });
});

function fetchAndDisplayVotes(rowId) {
  fetch(`/votes/${rowId}`)
  .then(response => response.json())
  .then(data => {
      document.querySelector(`.vote-count-up[data-id="${rowId}"]`).textContent = data.up;
      document.querySelector(`.vote-count-down[data-id="${rowId}"]`).textContent = data.down;
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}