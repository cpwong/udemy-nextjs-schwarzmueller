import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-utils";
// import { getFeaturedEvents } from "@/dummy-data"


export default function HomePage({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    }, 
    revalidate: 1800 // seconds
  }
}