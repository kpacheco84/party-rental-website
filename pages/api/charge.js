import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { id, amount, items } = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Bounce House Test',
      payment_method: id,
      confirm: true,
    })
    console.log(payment)

    // return acutal confirmation number or trans number then add it
    //to your orders table then do your api to the order detail table

    return res.status(200).json({
      confirm: 'abc123',
    })
  } catch (error) {}
}
