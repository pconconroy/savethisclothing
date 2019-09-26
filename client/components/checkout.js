import React, {Component} from 'react'
import {Stripe} from 'Stripe'

class Checkout extends Component {
  componentDidMount() {
    let stripe = Stripe('pk_test_encEGqKgHye7sc32P17N1Bic00eNH4Yx4U')
    let checkoutButton = document.getElementById(
      'checkout-button-sku_F1j0G2fQ0cLx3Z'
    )
    checkoutButton.addEventListener('click', function() {
      // When the customer clicks on the button, redirect
      // them to Checkout.
      stripe
        .redirectToCheckout({
          items: [{sku: 'sku_F1j0G2fQ0cLx3Z', quantity: 1}],

          // Note that it is not guaranteed your customers will be redirected to this
          // URL *100%* of the time, it's possible that they could e.g. close the
          // tab between form submission and the redirect.
          successUrl: 'https://your-website.com/success',
          cancelUrl: 'https://your-website.com/canceled'
        })
        .then(function(result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            var displayError = document.getElementById('error-message')
            displayError.textContent = result.error.message
          }
        })
    })
  }
  render() {
    return (
      <div>
        {/* <!-- Load Stripe.js on your website. --> */}
        <script src="https://js.stripe.com/v3" />
        {/* <!-- Create a button that your customers click to complete their purchase. Customize the styling to suit your branding. --> */}
        <button
          style={{
            backgroundColor: '#6772E5',
            color: '#FFF',
            padding: '8px 12px',
            border: 0,
            borderRadius: '4px',
            fontSize: '1em'
          }}
          id="checkout-button-sku_F1j0G2fQ0cLx3Z"
          role="link"
        >
          Checkout
        </button>
        <div id="error-message" />
      </div>
    )
  }
}

export default Checkout
