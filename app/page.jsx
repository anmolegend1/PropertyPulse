import '@/assets/styles/globals.css'
import Hero from '@/components/Hero';
import Infoboxes from '@/components/Infoboxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {

    return ( <>
    <Hero/>
    <Infoboxes/>
    <FeaturedProperties/>
    <HomeProperties/>
    </> );
}
 
export default HomePage;