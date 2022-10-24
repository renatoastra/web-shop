import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',

})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    img: {
        cursor: 'pointer',
    },

    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',

    button: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '$gray800',
        border: 'none',
        color: '$grayIcon',
        cursor: ' pointer',
        position: 'relative',

        div: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            position: 'absolute',
            width: 24,
            height: 24,
            right: -7,
            top: -7,

            borderRadius: 9999,
            backgroundColor: '$green500',
            border: '3px solid $gray900',

            strong: {
                width: '100%',
                color: '$white',
                fontWeight: 700,
                fontStyle: 'normal',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }
        }
    }
})