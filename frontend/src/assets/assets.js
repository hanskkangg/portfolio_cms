// Import General Assets
import logo from './logo.png';
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
import about_img from './about_img.png';
import contact_img from './contact_img.png';
import razorpay_logo from './razorpay_logo.png';
import stripe_logo from './stripe_logo.png';
import cross_icon from './cross_icon.png';
import p_img_pizza from './p_img_pizza.png';
import hans_logo1 from './hans_logo1.png';
import hans_logo2 from './hans_logo2.png';


// Dynamically Import Product Images (Instead of manually listing each one)
const productImages = Object.values(
    import.meta.glob("/src/assets/p_img*.png", { eager: true, import: "default" })
  );
  
// Exporting Assets
export const assets = {
  logo,
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
  about_img,
  contact_img,
  razorpay_logo,
  stripe_logo,
  cross_icon,
  p_img_pizza,
  hans_logo1,
  hans_logo2,
};

// Exporting Product Data

export const products = [
    {
      _id: 'aaaaa',
      name: 'Women Round Neck Cotton Top',
      description: 'A lightweight, knitted, pullover shirt, close-fitting with a round neckline and short sleeves.',
      price: 100,
      image: [productImages[0]],
      category: 'Women',
      subCategory: 'Topwear',
      sizes: ['S', 'M', 'L'],
      date: 1716634345448,
      bestseller: true,
    },
    {
      _id: 'aaaab',
      name: 'Men Round Neck Pure Cotton T-shirt',
      description: 'A lightweight, knitted, pullover shirt, close-fitting with a round neckline and short sleeves.',
      price: 200,
      image: [productImages[1], productImages[2], productImages[3], productImages[4]],
      category: 'Men',
      subCategory: 'Topwear',
      sizes: ['M', 'L', 'XL'],
      date: 1716621345448,
      bestseller: true,
    },
    {
      _id: 'aaaac',
      name: 'Girls Round Neck Cotton Top',
      description: 'A lightweight, knitted, pullover shirt, close-fitting with a round neckline and short sleeves.',
      price: 220,
      image: [productImages[5]],
      category: 'Kids',
      subCategory: 'Topwear',
      sizes: ['S', 'L', 'XL'],
      date: 1716234545448,
      bestseller: true,
    },
    {
      _id: 'aaaad',
      name: 'Men Round Neck Pure Cotton T-shirt',
      description: 'A lightweight, knitted, pullover shirt, close-fitting with a round neckline and short sleeves.',
      price: 110,
      image: [productImages[6]],
      category: 'Men',
      subCategory: 'Topwear',
      sizes: ['S', 'M', 'XXL'],
      date: 1716621345448,
      bestseller: true,
    },
    {
      _id: 'aaaae',
      name: 'Women Winter Jacket',
      description: 'Warm and stylish winter jacket, perfect for cold weather.',
      price: 250,
      image: [productImages[7]],
      category: 'Women',
      subCategory: 'Winterwear',
      sizes: ['S', 'M', 'L', 'XL'],
      date: 1716643545448,
      bestseller: false,
    },
    {
      _id: 'aaaaf',
      name: 'Men Slim Fit Jeans',
      description: 'Slim fit jeans with comfortable stretch fabric.',
      price: 180,
      image: [productImages[8]],
      category: 'Men',
      subCategory: 'Bottomwear',
      sizes: ['S', 'M', 'L', 'XL'],
      date: 1716644545448,
      bestseller: false,
    },
    {
      _id: 'aaaag',
      name: 'Kids Hoodie',
      description: 'Soft and cozy hoodie for kids with fun graphics.',
      price: 130,
      image: [productImages[9]],
      category: 'Kids',
      subCategory: 'Winterwear',
      sizes: ['S', 'M', 'L'],
      date: 1716645545448,
      bestseller: true,
    },
    {
      _id: 'aaaah',
      name: 'Unisex Sneakers',
      description: 'Casual sneakers for everyday wear.',
      price: 220,
      image: [productImages[10]],
      category: 'Shoes',
      subCategory: 'Footwear',
      sizes: ['7', '8', '9', '10', '11'],
      date: 1716646545448,
      bestseller: true,
    },
    {
      _id: 'aaaai',
      name: 'Formal Office Shirt',
      description: 'Perfect for business and office wear.',
      price: 190,
      image: [productImages[11]],
      category: 'Men',
      subCategory: 'Topwear',
      sizes: ['S', 'M', 'L', 'XL'],
      date: 1716647545448,
      bestseller: false,
    },
    {
      _id: 'aaaaj',
      name: 'Casual Summer Dress',
      description: 'Light and airy dress, great for summer outings.',
      price: 300,
      image: [productImages[12]],
      category: 'Women',
      subCategory: 'Dresses',
      sizes: ['S', 'M', 'L', 'XL'],
      date: 1716648545448,
      bestseller: false,
    },
  ];

  
// Example: You can add more products dynamically using productImages[index]
