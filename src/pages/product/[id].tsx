import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: number,
        description: string,
        defaultPriceId: string,
        formatedPrice: string,
    }
}


export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter();
    const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

    const { addItem, cartDetails, clearCart } = useShoppingCart()

    if (isFallback) {
        return <h1>Loading...</h1>
    }

    async function handleBuyProduct() {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: 'BRL',
            image: product.imageUrl,
            price_id: product.defaultPriceId,

        })

        // clearCart();
        console.log('cartDetails', cartDetails)

        // try {
        //     setIsCreatingCheckout(true);
        //     const response = await axios.post('/api/checkout', {
        //         priceId: product.defaultPriceId,
        //     })

        //     const { checkoutUrl } = response.data;

        //     window.location.href = checkoutUrl;
        // } catch (err) {
        //     alert('Falha ao redirecionar ao checkout!')
        //     setIsCreatingCheckout(false);
        // }
    }

    return (

        <>

            <Head>
                <title>
                    {product.name} | Ignite Shop
                </title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{
                        product.formatedPrice
                    }

                    </span>
                    <p>{product.description}</p>
                    <button onClick={(handleBuyProduct)} disabled={isCreatingCheckout}>Adicionar ao Carrinho</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_MeHo6KI594ojm0 ' } },
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });


    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount,
                formatedPrice: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}