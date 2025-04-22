import hero_img from './hero_img.png';
import cart_icon from './cart_icon.png';
import bin_icon from './bin_icon.png';
import dropdown_icon from './dropdown_icon.png';
import exchange_icon from './exchange_icon.png';
import profile_icon from './profile_icon.png';
import quality_icon from './quality_icon.png';
import search_icon from './search_icon.png';
import star_dull_icon from './star_dull_icon.png';
import star_icon from './star_icon.png';
import support_img from './support_img.png';
import menu_icon from './menu_icon.png';
import razorpay_logo from './razorpay_logo.png';
import stripe_logo from './stripe_logo.png';
import cross_icon from './cross_icon.png';
import p_img_pizza from './p_img_pizza.png';
import hans_logo1 from './hans_logo1.png';
import hans_logo2 from './hans_logo2.png';
import master_logo from './master_logo.png';
import visa_logo from './visa_logo.png'
import paypal_logo from './paypal_logo.png'
import paypal_logo1 from './paypal_logo1.png'
import about_us from './about_us.png'
import callme from './callme.png'
import banana_sale from './banana_sale.png'
import moon_icon from './moon_icon.png'
import sun_icon from './sun_icon.png'
import baeyondnails1 from './baeyondnails1.jpg'
import baeyondnail from './baeyondnail.png'


import n1 from './n1.jpg'
import n2 from './n2.jpg'
import n3 from './n3.jpg'
import n4 from './n4.jpg'
import n5 from './n5.jpg'
import n6 from './n6.jpg'
import n7 from './n7.jpg'
import n8 from './n8.jpg'
import n9 from './n9.jpg'
import n10 from './n10.jpg'
import n11 from './n11.jpg'
import n12 from './n12.jpg'
import n13 from './n13.jpg'
import n14 from './n14.jpg'
import n15 from './n15.jpg'
import n16 from './n16.jpg'
import n17 from './n17.jpg'
import n18 from './n18.jpg'
import n19 from './n19.jpg'
import n20 from './n20.jpg'
import n21 from './n21.png'
import bg_ from './bg_.png'
import bg_1 from './bg_1.jpg'




export const assets = {
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    p_img_pizza,
    hans_logo1,
    hans_logo2,
    master_logo,
    visa_logo,
    paypal_logo,
    paypal_logo1,
    about_us,
    callme,
    banana_sale,
    moon_icon,
    sun_icon,
    baeyondnails1,
    baeyondnail,
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    n11,
    n12,
    n13,
    n14,
    n15,
    n16,
    n17,
    n18,
    n19,
    n20,
    n21,
    bg_,
    bg_1
}


// Dynamically Import Product Images (Instead of manually listing each one)
const productImages = Object.values(
    import.meta.glob("/src/assets/p_img*.png", { eager: true, import: "default" })
  );
  