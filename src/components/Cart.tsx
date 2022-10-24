import { ShoppingBag } from 'phosphor-react'
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import * as Dialog from '@radix-ui/react-dialog';
import CartDialog from './CartDialog';

export default function Cart() {

    const { loadCart, cartDetails, cartCount } = useShoppingCart();
    const [open, setOpen] = useState(false);

    function handleLoadCart() {

        setOpen(!open)
    }

    return (
        <Dialog.Root open={open} onOpenChange={() => { setOpen(!open) }}>
            <Dialog.Trigger asChild>
                <button onClick={handleLoadCart} >

                    {cartCount < 1
                        ? <></>
                        : <div>
                            <strong>{cartCount}</strong>
                        </div>}
                    <ShoppingBag size={24} />

                </button>
            </Dialog.Trigger>
            <CartDialog />
        </Dialog.Root>
    )
}