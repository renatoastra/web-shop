import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer, ImageCarousel } from "../styles/pages/success";
import { useShoppingCart } from "use-shopping-cart"
import { useEffect } from "react";

interface SuccessProps {
    products: any;
    customerName: string;
}

export default function Success({ products, customerName }: SuccessProps) {
    const { clearCart } = useShoppingCart();
    useEffect(() => {
        clearCart();
    }, [])

    return (
        <>

            <Head>
                <title>
                    Compra efetuada | Ignite Shop

                    <meta name="robots" content="noindex" />
                </title>

            </Head>

            <SuccessContainer>

                <h1>Compra efetuada!</h1>
                <ImageCarousel>
                    {products.map((product) => {
                        return (

                            <ImageContainer key={product.id}>
                                <Image src={product.price.product.images[0]} width={120} height={110} alt={product.description} />
                            </ImageContainer>
                        )
                    })}
                </ImageCarousel>
                <p>
                    Uhul <strong>{customerName}</strong>, seus <strong>Produtos</strong> já está a caminho da sua casa.
                </p>

                <Link href={'/'}>
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name
    const product = session.line_items.data[0].price.product as Stripe.Product
    console.log("🚀 ~ product", product)
    const products = session.line_items.data;
    console.log("🚀 ~ products", products)

    return {
        props: {
            customerName,
            products,
        }
    }
}