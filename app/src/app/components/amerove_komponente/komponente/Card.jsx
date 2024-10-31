"use client";
import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import image1 from '../imgs/golf.jpg';
import image2 from '../imgs/tenis.jpg';
import image3 from '../imgs/rm.jpg';
import image4 from '../imgs/bball.jpg';
import { LanguageContext } from '../../../context/LanguageContext';

const content = {
    en: {
        cardsData: [
            {
                image: image1,
                icon: "⛳",
                title: "GOLF",
                description: "Enjoy playing on our beautiful golf course surrounded by lush greenery and breathtaking landscapes."
            },
            {
                image: image2,
                icon: "🎾",
                title: "TENNIS",
                description: "Get a racket and reserve your tennis court! Whether you're a beginner or an experienced player, our courts are perfect for every tennis enthusiast."
            },
            {
                image: image3,
                icon: "⚽",
                title: "FOOTBALL",
                description: "Feel like a pro on our high-quality football field. Organize a match with friends or train with your team, enjoying the excellent facilities we provide."
            },
            {
                image: image4,
                icon: "🏀",
                title: "BASKETBALL",
                description: "Have fun with friends on our basketball court! Whether playing recreationally or training seriously, our courts are perfect for all levels of play."
            }
        ]
    },
    bs: {
        cardsData: [
            {
                title: "GOLF",
                description: "Uživajte u igri na našem prelijepom golf terenu, okruženi zelenilom i pejzažem koji oduzima dah.",
                image: image1,
                icon: "⛳",
            },
            {
                title: "TENIS",
                description: "Nabavite reket i rezervišite svoj teniski teren! Bez obzira da li ste početnik ili iskusni igrač, naši tereni su idealni za svakog ljubitelja tenisa.",
                image: image2,
                icon: "🎾",
            },
            {
                title: "FUDBAL",
                description: "Osećajte se kao profesionalac na našem kvalitetnom fudbalskom terenu. Organizujte utakmicu sa prijateljima ili trenirajte sa svojim timom, uz izvrsne uslove koje pružamo.",
                image: image3,
                icon: "⚽",
            },
            {
                title: "KOŠARKA",
                description: "Zabavite se sa prijateljima na našem košarkaškom terenu! Bez obzira da li igrate rekreativno ili ste u treningu, naši tereni su idealni za sve nivoe igre.",
                image: image4,
                icon: "🏀",
            }
        ]
    }
};

const CustomCard = ({ title, description, image, icon }) => (
    <Card sx={{
        maxWidth: 600,
        margin: 2,
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    }}>
        <CardMedia component="img" height="380" image={image} alt={title} />
        <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '10px' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {icon} {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ color: 'white', textAlign: 'center' }}>
                {description}
            </Typography>
        </CardContent>
    </Card>
);



const CardGrid = () => {
    const { language } = useContext(LanguageContext);

    return (

            <div
                style={{
                    minHeight: '100vh',
                    padding: '20px',
                    backgroundColor: '#f44336',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid container justifyContent="center">
                    {content[language].cardsData.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={6} display="flex" justifyContent="center">
                            <CustomCard
                                title={card.title}
                                description={card.description}
                                image={card.image.src}
                                icon={card.icon}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>

    );
};

export default CardGrid;
