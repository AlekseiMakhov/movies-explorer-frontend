import { promoText } from '../../configs/texts';
import './Promo.css';

const Promo = () => {
    return (
        <section className='promo'>
            <div className='promo__content'>
                <h1 className='promo__heading'>{promoText}</h1>
                <div className='promo__figure'></div>
            </div>
        </section>
    )
}

export default Promo;