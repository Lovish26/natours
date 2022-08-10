/* eslint-disable */
const stripe = Stripe(
  'pk_test_51LV7eeSGU1tQVvOaoS6Va4uk9zTVUYPkj855ZSvSlISaOTDtKPVV0K1kUXOURTMTscIzZRmLVxelzNEmXsNoSKXH00IkjiP8wI'
);

const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

const bookBtn = document.getElementById('book-tour');
if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
