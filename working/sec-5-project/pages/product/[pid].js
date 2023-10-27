import path from 'path';
import fs from 'fs';

export default function ProductDetailPage({ loadedProduct }) {
  // const { loadedProduct } = props;
  
  if (!loadedProduct ) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
};

/* Read dummy data from local file */

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps({ params }) {
  
  const productId = params.pid;
  const data = await getData();  
  const product = data.products.find( product => product.id === productId);  
  
  if (!product) {
    return { notFound: true }
  }

  return {
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  
  const data = await getData();
  const ids = data.products.map( product => product.id );
  const pathsWithParams = ids.map( id => ({params: {pid: id}}) );
  
  return {
    paths: pathsWithParams,
    fallback: true
  }
}

