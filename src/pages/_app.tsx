import { AppProps } from "next/app"
import { globalStyle } from "../styles/global"
import Image from 'next/future/image'
import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { CartProvider } from 'use-shopping-cart'


globalStyle();

export default function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  function handleRouter() {
    router.push('/')
  }
  return (
    <CartProvider mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_SECRET_KEY}
      successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={process.env.NEXT_URL}
      currency="BRL"
    >

      <Container>
        <Header>
          <Image onClick={handleRouter} src={logoImg} alt="" />

          <Cart />
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}

