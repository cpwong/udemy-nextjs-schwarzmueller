import ErrorAlert from "@/components/error-alert/error-alert/error-alert";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getFeaturedEvents, getEventById } from "@/helpers/api-utils";
import Head from "next/head";
// import { getEventById } from "@/dummy-data";
// import { useRouter } from "next/router"

export default function EventDetailPage({ selectedEvent }) {

  // const router = useRouter();
  // const eventId = router.query.eventId;

  const event = selectedEvent;

  if (!event) {
    return <div className="center"><p>Loading...</p></div>
  }

  return (
    <>
      <Head>
      <title>{event.title}</title>
        <meta 
          name='description'
          content='Find a lot of great events that allow you to evolve.'
        />
      </Head>
      <EventSummary title={event.title}/>
      <EventLogistics 
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event =  await getEventById(eventId);
  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30 // seconds
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id }}));
  return {
    paths: paths,
    fallback: true
  };
}