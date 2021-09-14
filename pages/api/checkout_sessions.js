const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1JZgIQGpKrHEssRsUwWij7FP',
            quantity: 1,
          },
          {
            price: 'price_1JZgIQGpKrHEssRsUwWij7FP',
            quantity: 2,
          },
          {
            price: 'price_1JZgIQGpKrHEssRsUwWij7FP',
            quantity: 3,
          },
        ],
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart/?canceled=true`,
      })

      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}