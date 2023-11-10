import { useEffect, useState } from 'react';
import useSWR from 'swr';

const API_URL =
  'https://nextjs-course-d2d54-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json';

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(API_URL, (url) =>
    fetch(url).then((res) => res.json())
  );
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume
  //         })
  //       }
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     })
  // }, []);

  if (error) {
    return <p>Failed to load!</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!sales) {
  //   return <p>No data...</p>;
  // }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformedSales }, revalidate: 10 };
}
