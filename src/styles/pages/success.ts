import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    height: 656,


    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },
    p: {
        fontSize: '$lg',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
    },

    a: {
        marginTop: '3rem',
        display: 'block',
        color: '$green500',
        textDecoration: 'none',
        fontSize: '$lg',

        '&:hover': {
            color: '$green300',
        }
    }
});

export const ImageContainer = styled('div', {

    width: '100%',
    maxWidth: 130,
    height: 145,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    marginTop: '4rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    img: {
        objectFit: 'cover',
    }
});

export const ImageCarousel = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
});

