// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { lineItems } = req.body
  const itemsToGo = lineItems.map((item) => {
    return {
      price: item.price_id,
      quantity: item.quantity
    }
  })
  console.log("🚀 ~ lineItems", lineItems)

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Invalid method." });
  }

  if (!lineItems) {
    return res.status(400).json({ error: "Invalid price." })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`

  const cancelUrl = `${process.env.NEXT_URL}/`


  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    line_items: itemsToGo,
    mode: 'payment',
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}

