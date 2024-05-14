const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "{{ url_for('static', filename='/img/air.png') }}",
      },
      {
        code: "darkblue",
        img: "{{ url_for('static', filename='/img/air2.png') }}",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

const productButton2 = document.querySelector(".productButton2");
const reviews = document.querySelector(".reviews");
const reviewclose = document.querySelector(".reviewclose");

productButton2.addEventListener("click", () => {
  reviews.style.display="flex";
});

reviewclose.addEventListener("click", ()=>{
  reviews.style.display="none";
});

// Function to display existing reviews
function displayExistingReviews() {
  var dropdown = document.getElementById("reviewsDropdown");
  dropdown.innerHTML = ""; // Clear existing content

  var reviews = [
    { text: "Great product! Highly recommended.", sentiment: "positive" },
    { text: "Average product, nothing special.", sentiment: "neutral" },
    { text: "Disappointed with the quality.", sentiment: "negative" }
  ];

  reviews.forEach(function(review) {
    var reviewElement = document.createElement("div");
    reviewElement.textContent = review.text + " - Sentiment: " + review.sentiment;
    dropdown.appendChild(reviewElement);
  });
}



// Function to submit user review
function submitReview() {
  var userInput = document.getElementById('user-review-input').value;
  if (userInput.trim() === '') {
      alert('Please enter a review.');
      return;
  }

  // AJAX code to send user's review data to the backend
  fetch('/api/analyze-sentiment', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: userInput })
  })
  .then(response => response.json())
  .then(data => {
      // Update UI with sentiment analysis result received from the backend
      var reviewItem = document.createElement('div');
      reviewItem.innerHTML = '<p class="reviewText">' + userInput + '</p><p class="reviewSentiment">Sentiment: ' + data.sentiment + '</p>';
      var reviewList = document.querySelector('.reviewList');
      reviewList.appendChild(reviewItem);
      // Clear the input field
      document.getElementById('user-review-input').value = '';
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error: Unable to submit review.');
  });
}
