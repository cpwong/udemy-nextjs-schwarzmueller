import ErrorAlert from '@/components/error-alert/error-alert/error-alert';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import Button from '@/components/ui/button';
import { API_URL } from './../../constants.js';
// import { getFilteredEvents } from '@/dummy-data';
import Head from 'next/head.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function FilteredEventsPage({ hasError, events, date }) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(API_URL, (url) =>
    fetch(url).then((res) => res.json())
  );
  // console.log(data, error, API_URL);
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);
  
  let numYear, numMonth = 0;
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear}.`}      
        />
    </Head>
  );

  if (!loadedEvents) {
    return <p className='center'>Loading...!</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  numYear = +filteredYear;
  numMonth = +filteredMonth;
    

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>Invalid Filter!!</ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>No event found!!</ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredDate = new Date(numYear, numMonth - 1);
  // const filteredDate = new Date(date.year, date.month - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={filteredDate} />
      <EventList items={filteredEvents} />
    </div>
  );
}

// export async function getServerSideProps({ params }) {
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
