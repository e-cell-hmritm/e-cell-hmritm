import { Hero } from "../../components/sections/hero.jsx";
import { Impact } from "../../components/sections/impact.jsx";
import { UpcomingEvents } from "../../components/sections/upcoming-events.jsx";
import { Journey } from "../../components/sections/journey.jsx";
import { Team } from "../../components/sections/team.jsx";
import { EventsArchive } from "../../components/sections/events-archive.jsx";
import { EventsGallery } from "../../components/sections/events-gallery.jsx";
// import { Registration } from "../../components/sections/registration.jsx";
// import { Winners } from "../../components/sections/winners.jsx";
import { Testimonials } from "../../components/sections/testimonials.jsx";
import { Partners } from "../../components/sections/partners.jsx";
import { Builders } from "../../components/sections/builders.jsx";
import { Thought } from "./thought.jsx"

// import Contact from '../../pages/contact/contact.jsx';

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Hero />
        {/* <About /> */}
        <UpcomingEvents />
        <Journey />
        {/* <Team /> */}
        <EventsArchive />
        <EventsGallery />
        {/* <Registration /> */}
        {/* <Winners /> */}
        <Thought />
        <Testimonials />
        <Partners />
        <Builders />
        {/* <Contact /> */}
        {/* <Contact/> */}

      </main>
    </div>
  );
}

export default Home;
