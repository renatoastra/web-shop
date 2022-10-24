/* eslint-disable react/jsx-key */
import { GetStaticProps } from "next"
import Image from "next/future/image"
import { useKeenSlider } from 'keen-slider/react'
import Head from 'next/head';
import { HomeContainer, Product } from "../styles/pages/home"
import Link from "next/link";
import 'keen-slider/keen-slider.min.css';
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { ShoppingBag } from 'phosphor-react'


interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    formatedPrice: string,
  }[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (

    <>
      <Head>
        <title>
          Home | Ignite Shop
        </title>
      </Head>


      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map(product => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}>

              <Product
                className="keen-slider__slide"
                key={product.id}>

                <Image src={product.imageUrl} alt="camiseta" width={520} height={480} />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.formatedPrice}</span>
                  </div>
                  <button>
                    <ShoppingBag size={32} />
                  </button>
                </footer>

              </Product>
            </Link>
          )
        })}
      </HomeContainer>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      formatedPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),

    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }

}
