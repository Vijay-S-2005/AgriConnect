import Image from 'next/image';
import { Assets } from '../../public/assets/Assets';
import Link from 'next/link'
const DisplayCategoryCard = () => {
    const categories = [
        { title: "vegies", items: [
            { name: 'carrot', image: Assets.slider_img1 },
            { name: 'carrot', image: Assets.slider_img1 },
            { name: 'carrot', image: Assets.slider_img1 },
            { name: 'carrot', image: Assets.slider_img1 }
          ]
        },
        { title: "Fresh Vegetables", items: [
            { name: 'Tomato', image: Assets.slider_img2 },
            { name: 'Tomato', image: Assets.slider_img2 },
            { name: 'Tomato', image: Assets.slider_img2 },
            { name: 'Tomato', image: Assets.slider_img2 }
          ]
        },
        { title: "Onion Delight", items: [
            { name: 'Onion', image: Assets.Onions },
            { name: 'Onion', image: Assets.Onions },
            { name: 'Onion', image: Assets.Onions },
            { name: 'Onion', image: Assets.Onions }
          ]
        },
        { title: "Healthy Beans", items: [
            { name: 'Beans', image: Assets.slider_img1 },
            { name: 'Beans', image: Assets.slider_img1 },
            { name: 'Beans', image: Assets.slider_img1 },
            { name: 'Beans', image: Assets.slider_img1 }
          ]
        }
      ];
  return (
    <>
      {categories.map((category, index) => (
        <div key={index} style={styles.card}>
          <h2 style={styles.title}>{category.title}</h2>
          <div style={styles.grid}>
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} style={styles.item}>
                <Image src={item.image} alt={item.name} width={100} height={100} />
                <p style={styles.text}>{item.name}</p>
              </div>
            ))}
          </div>
          <Link href="/displayProduct" style={styles.link}>See more</Link>
        </div>
      ))}
    </>
  );
};

const styles = {
  card: {
    border: '1px solid #e1e1e1',
    padding: '40px', // Increase padding for a bigger box
    borderRadius: '8px',
    backgroundColor: '#fff',
    maxWidth: '400px', // Increased width for bigger cards
    margin: '20px auto', // Add more margin to create space between cards
  },
  title: {
    fontSize: '20px', // Increase title font size
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px', // Increase gap between grid items
  },
  item: {
    textAlign: 'center',
  },
  text: {
    marginTop: '10px',
    fontSize: '16px', // Increase font size for item text
  },
  link: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
    color: '#0070f3',
    textDecoration: 'none',
  },
};


export default DisplayCategoryCard;
