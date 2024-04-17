import React from 'react';
import { Button, Typography, Box, Grid, Card, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    // Sample recipe data with names and images
    const recipes = [
        { name: 'Pasta Carbonara', image: 'https://cdn.pixabay.com/photo/2022/10/10/11/46/fish-7511640_640.jpg' },
        { name: 'Chicken Tikka Masala', image: 'https://cdn.pixabay.com/photo/2014/04/05/11/19/turkey-315079_640.jpg' },
        { name: 'Chocolate Cake', image: 'https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_640.jpg' },
        { name: 'Caprese Salad', image: 'https://cdn.pixabay.com/photo/2017/06/29/19/57/sushi-2455981_640.jpg' },
        { name: 'Vegetable Stir-Fry', image: 'https://cdn.pixabay.com/photo/2022/05/23/18/59/salmon-7216960_640.jpg' },
    ];

    return (
        <Box mt={8} style={{ backgroundColor: '#FF5733', padding: '3rem 0' }}>
            {/* Hero Section */}
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" mb={4}>
                {/* Left Section - Description */}
                <Box flex={1} pr={{ xs: 0, md: 4 }} textAlign="center" mb={{ xs: 4, md: 0 }}>
                    <Typography variant="h4" gutterBottom style={{ fontSize: '3rem', color: '#FFF' }}>
                        Welcome to Nom!
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ fontSize: '1.8rem', color: '#FFF' }}>
                        Nom is a vibrant social media platform tailored specifically for passionate cooking aficionados.
                    </Typography>
                    <Button variant="contained" color="primary" component={Link} to="/register" style={{ marginTop: '2rem' }}>
                        Join Now
                    </Button>
                </Box>

                {/* Right Section - Image */}
                <Box flex={1} pl={{ xs: 0, md: 4 }} display="flex" justifyContent="center">
                    <Box overflow="hidden" maxHeight="50vh" maxWidth="100%">
                        <Card style={{ height: '100%' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    width="100%"
                                    image="https://cdn.pixabay.com/photo/2022/10/10/11/46/fish-7511640_640.jpg"
                                    alt="Big Image"
                                />
                            </CardActionArea>
                        </Card>
                    </Box>
                </Box>
            </Box>

            {/* Content Section */}
            <Box display="flex" flexDirection={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                {/* Left Section - Image */}
                <Box flex={1} pr={{ xs: 0, md: 4 }} display="flex" justifyContent="center">
                    <Box overflow="hidden" maxHeight="50vh" maxWidth="100%">
                        <Card style={{ height: '100%' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    width="100%"
                                    image="https://cdn.pixabay.com/photo/2014/01/14/22/14/tacos-245241_640.jpg"
                                    alt="Image"
                                />
                            </CardActionArea>
                        </Card>
                    </Box>
                </Box>

                {/* Right Section - About */}
                <Box flex={1} pl={{ xs: 0, md: 4 }}>
                    <Typography variant="h5" gutterBottom style={{ fontSize: '2rem', color: '#FFF', marginBottom: '1rem' }}>
                        About Nom
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ fontSize: '1.6rem', color: '#FFF' }}>
                        It serves as a digital haven where food lovers from all walks of life gather to share their
                        culinary adventures, recipes, and kitchen triumphs. Whether you're a seasoned chef or an
                        enthusiastic home cook, Nom provides a welcoming space to connect, inspire, and explore the world
                        of gastronomy.
                    </Typography>
                </Box>
            </Box>

            {/* Other Images (Optional) */}
            <Box mt={4}>
                <Grid container spacing={2}>
                    {recipes.map((recipe, index) => (
                        <Grid item key={index}>
                            <Card style={{ maxWidth: 300 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={recipe.image}
                                        alt={recipe.name}
                                    />
                                </CardActionArea>
                            </Card>
                            <Typography variant="subtitle2" align="center" mt={1} style={{ color: '#FFF' }}>
                                {recipe.name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Home;







/* 
    const recipeImages = [
        'https://cdn.pixabay.com/photo/2022/10/10/11/46/fish-7511640_640.jpg',
        'https://cdn.pixabay.com/photo/2014/04/05/11/19/turkey-315079_640.jpg',
        'https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_640.jpg',
        'https://cdn.pixabay.com/photo/2017/06/29/19/57/sushi-2455981_640.jpg',
        'https://cdn.pixabay.com/photo/2014/05/26/14/53/sushi-354628_640.jpg',
        'https://cdn.pixabay.com/photo/2022/05/23/18/59/salmon-7216960_640.jpg',
        'https://cdn.pixabay.com/photo/2014/01/14/22/14/tacos-245241_640.jpg',
        'https://cdn.pixabay.com/photo/2014/01/14/22/14/tacos-245241_640.jpg',
    ];

    const recipes = [
        { name: 'Pasta Carbonara', image: 'https://cdn.pixabay.com/photo/2022/10/10/11/46/fish-7511640_640.jpg' },
        { name: 'Chicken Tikka Masala', image: 'https://cdn.pixabay.com/photo/2014/04/05/11/19/turkey-315079_640.jpg' },
        { name: 'Chocolate Cake', image: 'https://cdn.pixabay.com/photo/2016/10/23/09/37/fried-rice-1762493_640.jpg' },
        { name: 'Caprese Salad', image: 'https://cdn.pixabay.com/photo/2017/06/29/19/57/sushi-2455981_640.jpg' },
        { name: 'Vegetable Stir-Fry', image: 'https://cdn.pixabay.com/photo/2022/05/23/18/59/salmon-7216960_640.jpg' },
    ];
*/