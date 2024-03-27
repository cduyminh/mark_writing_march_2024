console.log("script connected");

document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display votes for all rows at once
  fetchAndDisplayVotesForAll();

  document.querySelectorAll(".vote-btn").forEach(button => {
      button.addEventListener("click", function() {
          const rowId = this.getAttribute("data-id");
          const voteType = this.getAttribute("data-vote");
          
          fetch('api/vote', {
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
              fetchAndDisplayVotesForAll();
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      });
  });
});

function fetchAndDisplayVotesForAll() {
  // Assuming the API is updated to accept a query parameter `ids` and return votes for those ids
  const ids = Array.from({ length: 362 }, (_, i) => i).join(',');
  fetch(`api/votes?ids=${ids}`)
  .then(response => response.json())
  .then(data => {
      data.forEach(voteData => {
          document.querySelector(`.vote-count-up[data-id="${voteData.id}"]`).textContent = voteData.up;
          document.querySelector(`.vote-count-down[data-id="${voteData.id}"]`).textContent = voteData.down;
      });
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}
