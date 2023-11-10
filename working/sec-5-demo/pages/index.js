import path from 'path';
import fs from 'fs';
import Link from 'next/link';

export default function HomePage(props) {
  const { products } = props;
  return (
    <>
      <ul>
        {
        /* <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li> */
        }
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
};

export async function getStaticProps() {
  
  // console.log('Regenerating in getStaticProps...')

  /* Read dummy data from local file */
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  
  return { 
    props: {
      // products: [{ id: 'p1', title: 'Product 1' }],
      products: data.products
    },
    revalidate: 10
  };
} 