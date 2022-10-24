import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react'
import Image from 'next/future/image';
import { useShoppingCart } from 'use-shopping-cart';
import { useState } from 'react';
import axios from 'axios';

const Overlay = styled(Dialog.Overlay, {
    background: 'rgba(0 0 0 / 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    overflowY: 'auto',

});

const Content = styled(Dialog.Content, {
    width: '100%',
    maxWidth: 480,
    height: '100vh',
    background: 'black',
    padding: 30,
    borderRadius: 4,
    backgroundColor: '$gray800',
    position: 'fixed',
    right: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'column',

    '.mainContainer': {
        minWidth: 320,
        minHeight: 937,

    },

});

const Close = styled(Dialog.Close, {
    border: 0,
    background: 'none',
    color: '$grayIcon',
    position: 'fixed',
    top: 24,
    right: 24,
    cursor: "pointer",
})

const Items = styled('div', {

    minHeight: '700px',

})

const CardContainer = styled('div', {

    display: 'flex',
    gap: 20,
    alignItems: 'center',

    '.imageContainer': {
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
        borderRadius: 8,

        width: 100,
        height: 93,

        marginBottom: 24,
    },

    '.cardContainer': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,

        marginBottom: 24,

        span: {
            fontSize: 18,
            color: '$gray300',
        },

        strong: {
            display: 'block',
            color: '$gray100',
            fontWeight: 700,
        },

        button: {
            border: 0,
            background: 'none',
            color: '$green500',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: ' pointer',


        },
    }
})

const Title = styled(Dialog.Title, {

    fontWeight: 700,
    marginBottom: 32,
})

const TotalContainer = styled('div', {

    display: 'flex',
    alignItems: 'right',
    flexDirection: 'column',
    justifyContent: 'end',

    ".amountItens": {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        span: {
            fontSize: 16,
            color: '$grey1000',
        },

        strong: {
            fontSize: 18,
            fontWeight: 700,
            color: '$grey1000',

            '&:last-child': {
                fontSize: 32,
            }
        }
    },


})

const FinishPurchaseButton = styled('button', {

    marginTop: 57,
    backgroundColor: '$green500',
    borderRadius: 8,
    border: 0,
    color: '$white',
    padding: '1.25rem',
    cursor: 'pointer',
    fontSize: '$md',
    fontWeight: 'bold',
    width: '100%',

    '&:hover': {
        backgroundColor: '$green300',
    },

    '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.6
    },

    '&:not(disabled)hover': {
        backgroundColor: '$green300',
    },

})

export default function CartDialog() {

    const { cartDetails, removeItem, totalPrice, cartCount, redirectToCheckout } = useShoppingCart();
    const cartEntries = Object.values(cartDetails ?? {})
    console.log("🚀 ~ cartDetails", cartDetails)
    const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

    function handleRemoveItem(itemId: string) {
        const alert = confirm("Deseja remover esse item do carrinho?")

        if (alert) {
            removeItem(itemId)
        }
    }

    const formatedTotalValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(totalPrice / 100)

    const hasItems = cartEntries.length;

    async function handleClick(event) {

        try {
            setIsCreatingCheckout(true);
            const response = await axios.post('/api/checkout', {
                lineItems: cartEntries,
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch (err) {
            alert('Falha ao redirecionar ao checkout!')
            setIsCreatingCheckout(false);
        }
    }

    return (
        <>
            <Dialog.Portal container={document.body} >
                <Overlay>
                    <Content>

                        <Close>
                            <X size={24} weight="bold" />
                        </Close>
                        <div className='mainContainer'>
                            <Title >
                                Sacola de Compras
                            </Title>
                            <Items>
                                {hasItems ? cartEntries.map(item => {
                                    return (
                                        <>
                                            <CardContainer key={item.id}>
                                                <div className='imageContainer'>

                                                    <Image src={item.image} alt="" width={100} height={93} />
                                                </div>

                                                <div className="cardContainer">
                                                    <span>{item.name}</span>
                                                    <strong>{item.formattedValue}</strong>
                                                    <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
                                                </div>
                                            </CardContainer>
                                        </>
                                    )
                                }) :

                                    <CardContainer>

                                    </CardContainer>
                                }
                            </Items>

                            <TotalContainer>
                                <div className="amountItens">
                                    <span>Quantidade</span>
                                    <span>{`${cartCount} itens`}</span>
                                </div>

                                <div className="amountItens">

                                    <strong>Valor Total</strong>
                                    <strong>{formatedTotalValue}</strong>
                                </div>
                                <FinishPurchaseButton onClick={handleClick} disabled={hasItems < 1}>Finalizar Compra</FinishPurchaseButton>
                            </TotalContainer>
                        </div>
                    </Content>
                </Overlay>
            </Dialog.Portal>
        </>
    )

}