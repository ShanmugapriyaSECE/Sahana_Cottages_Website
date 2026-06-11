import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Car,
  Users,
  Mountain,
  Clock,
  Sparkles,
  Wifi,
  Coffee,
  Trees,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Bus,
  Camera,
  Compass,
  CalendarCheck,
  Play,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import sahanaHero from "@/assets/sahana/hero.jpg";
import roomDeluxe from "@/assets/sahana/deluxe-room.jpg";
import roomFamily from "@/assets/sahana/family-room.jpg";
import roomOneBed from "@/assets/sahana/one-bedroom.jpg";
import roomTwoBed from "@/assets/sahana/two-bedroom.jpg";
import roomTriple from "@/assets/sahana/triple-room.jpg";
import cottageExterior from "@/assets/sahana/exterior.jpg";
import destYercaud from "@/assets/dest-yercaud.jpg";
import galleryData from "@/data/gallery.json";

const GALLERY_ALTS = [
  "Cottages in Yercaud",
  "Yercaud hill view stay",
  "Best cottage rooms in Yercaud"
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: "https://sahanacottagesyercaud.com/",
      },
    ],
  }),
});

const BOOKING_URL = "https://www.booking.com/";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Tourism Places", href: "#destinations" },
  { label: "Our Network", href: "#travel" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:py-3 lg:px-10 lg:py-4">
        <a href="#top" className="flex items-center">
          <img
            src="/logo1.png"
            alt="Sahana Cottages"
            className="h-8 w-auto object-contain md:h-10 lg:h-12"
            style={{ maxHeight: "48px" }}
          />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`text-base font-semibold transition-colors hover:text-gold ${
                  scrolled ? "text-foreground/80" : "text-background/90"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/book" className="hidden lg:block">
          <Button className="rounded-full bg-primary px-8 py-2.5 text-base font-semibold text-primary-foreground hover:bg-primary/90">
            Book Now
          </Button>
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-background"}`}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="bg-background/95 px-6 pb-6 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-medium text-foreground/80"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/book">
                <Button className="w-full rounded-full bg-primary">Book Now</Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden h-[55vh] sm:h-[70vh] lg:h-screen"
    >
      <img
        src="/photos/yercaud_hero/yercaud_hero.jpg"
        alt="Best Cottages in Yercaud"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 max-w-4xl mx-auto">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          <Sparkles className="size-3 sm:size-3.5 text-gold" />
          Hill Station Retreat · Yercaud
        </span>

        <h2 className="mb-1.5 text-[11px] sm:text-lg lg:text-xl font-semibold tracking-[0.12em] text-gold uppercase">
          Welcome to Sahana Cottages
        </h2>

        <h1 className="max-w-3xl text-[1.2rem] leading-snug sm:text-5xl lg:text-6xl font-bold text-white px-2">
          Best Cottages in Yercaud for Family Stay & Budget Accommodation
        </h1>

        {/* Hidden on mobile — visible on sm+ */}
        <p className="hidden sm:block mt-4 max-w-xl text-base text-white/85 sm:text-lg">
          Enjoy a peaceful and affordable stay in Yercaud with beautiful hill
          views, clean cottages, and family-friendly comfort.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="/book">
            <Button
              size="lg"
              className="rounded-full px-6 py-2 sm:py-4 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90"
              style={{ backgroundColor: "var(--gold)" }}
            >
              Book Now <ArrowRight className="ml-1 size-4" />
            </Button>
          </a>

          <a href="#rooms">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 px-6 py-2 sm:py-4 text-sm text-white backdrop-blur-sm hover:bg-white/20"
            >
              View Rooms
            </Button>
          </a>
        </div>

        <div className="mt-3 text-xs font-semibold text-white sm:text-base">
          ⭐ Rated 4.8 by Guests · Trusted by 900+ Guests
        </div>
      </div>
    </section>
  );
}
 
function About() {
  return (
    <section id="about" className="relative pt-6 pb-12 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:gap-16 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">About Sahana</span>
          <h2 className="mt-2 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            A serene escape in the <span className="italic text-primary">heart of Yercaud</span>
          </h2>
          <p className="mt-3 sm:mt-6 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Sahana Cottages Yercaud offers the best budget stay in Yercaud for families, couples, and groups. Our family-friendly accommodation in Yercaud is set amidst the scenic Shevaroy Hills, close to Yercaud Lake, Pagoda Point, and Lady's Seat. Experience peaceful Yercaud cottages with modern comfort at affordable prices.
          </p>
          <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { n: "15+", l: "Cozy Cottages" },
              { n: "4.8", l: "Guest Rating" },
              { n: "10y", l: "Hospitality" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-gold/60 pl-3 sm:pl-4">
                <div className="font-display text-xl sm:text-3xl font-semibold text-primary">{s.n}</div>
                <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={cottageExterior}
            alt="Exterior of Sahana Cottages in Yercaud"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="rounded-lg shadow-soft"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-lg bg-card p-6 shadow-soft sm:block">
            <div className="flex items-center gap-3">
              <Mountain className="size-8 text-gold" />
              <div>
                <div className="font-display text-lg font-semibold">1,600 m</div>
                <div className="text-xs text-muted-foreground">Altitude · Eastern Ghats</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ROOM_GROUPS = [
  {
    label: "🛏️ Room Types",
    rooms: [
      { img: "/photos/Deluxe Bedroom/1.jpeg", name: "Deluxe Room", desc: "Affordable Deluxe Room in Yercaud near major tourist spots. Perfect for couples and small families looking for a budget-friendly stay in Yercaud with modern amenities.", price: "Starting from ₹1,500", categoryKey: "deluxe-bedroom" },
      { img: "/photos/Triple Bedded room/1.jpeg", name: "Triple Bedded Room", desc: "Spacious Triple Bedded Room in Yercaud ideal for families and group travelers. Enjoy a comfortable and budget stay near Yercaud attractions with all essential facilities.", price: "Starting from ₹2,000", categoryKey: "triple-bedded-room" },
      { img: "/photos/Family Room/1.jpeg", name: "Family Room", desc: "Family Room in Yercaud designed for large families seeking comfort and space. Best choice for a peaceful stay in Yercaud with easy access to tourist places.", price: "Starting from ₹2,500", categoryKey: "family-room" },
    ],
  },
  {
    label: "🏡 Cottages",
    rooms: [
      { img: "/photos/One Bedroom Cottage/1.jpeg", name: "One Bedroom Cottage", desc: "1 Bedroom Cottage in Yercaud with private living space, perfect for couples and small families. Enjoy a peaceful cottage stay in Yercaud with scenic surroundings.", price: "Starting from ₹2,500", categoryKey: "one-bedroom-cottage" },
      { img: "/photos/Two Bedrooms with Living room Individual Cottage/1.jpeg", name: "Two Bedroom Cottage", desc: "2 Bedroom Cottage in Yercaud ideal for families and groups. Spacious accommodation with modern amenities for a comfortable stay in Yercaud.", price: "Starting from ₹4,000", categoryKey: "two-bedrooms-with-living-room-individual-cottage" },
      { img: "/photos/Family Suite Room/1.jpeg", name: "Family Suite Room", desc: "Premium Family Suite Room in Yercaud with luxury interiors and modern amenities. Perfect for families looking for a high-quality stay in Yercaud.", price: "Starting from ₹3,000", categoryKey: "family-suite-room" },
    ],
  },
  {
    label: "🏕️ Group Stay",
    rooms: [
      { img: "/photos/Common Photos/WhatsApp Image 2026-05-30 at 08.46.45.jpeg", name: "Group Stay in Yercaud", desc: "Group Stay in Yercaud for college trips, corporate outings, and family gatherings. Spacious accommodation with campfire facilities and budget-friendly pricing.", price: "₹1,600", categoryKey: "common-photos" },
    ],
  },
];

const ROOMS = ROOM_GROUPS.flatMap((g) => g.rooms);

function Rooms() {
  const navigate = useNavigate();
  const [activeRoomCategory, setActiveRoomCategory] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const roomPhotos = activeRoomCategory
    ? galleryData.find((c) => c.key === activeRoomCategory)?.items || []
    : [];

  const handleNext = () => {
    if (activePhotoIndex === null || roomPhotos.length === 0) return;
    setActivePhotoIndex((activePhotoIndex + 1) % roomPhotos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null || roomPhotos.length === 0) return;
    setActivePhotoIndex((activePhotoIndex - 1 + roomPhotos.length) % roomPhotos.length);
  };

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") {
        setActiveRoomCategory(null);
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, roomPhotos]);

  return (
    <section id="rooms" className="gradient-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Stay With Us</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Rooms &amp; Cottages</h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Thoughtfully designed retreats — each opens to the hills, each tells a quieter story. Click "View Photos" or the image to explore the interiors.
          </p>
        </div>
        <div className="mt-16 space-y-14">
          {ROOM_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="mb-6 text-2xl font-semibold text-foreground border-l-4 border-gold pl-4">{group.label}</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {group.rooms.map((r) => (
            <article
              key={r.name}
              className="group overflow-hidden rounded-lg bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => {
                    setActiveRoomCategory(r.categoryKey);
                    setActivePhotoIndex(0);
                  }}
                  className="relative h-64 overflow-hidden cursor-pointer"
                >
                  <img
                    src={r.img}
                    alt={`${r.name} - Best cottage room in Yercaud`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35 flex items-center justify-center">
                    <span className="opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 border border-white/10">
                      <Eye className="size-4" /> View Photos
                    </span>
                  </div>
                </div>
                <div className="p-7 pb-0">
                  <h3 className="font-display text-2xl font-semibold text-foreground">{r.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {r.desc}
                  </p>
                </div>
              </div>
              <div className="p-7 pt-0">
                <div className="mt-6 flex items-end justify-between border-t border-border/60 pt-5">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
                    <div className="font-display text-2xl font-semibold text-primary">
                      {r.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        {r.name === "Group Stay in Yercaud" ? " / head" : " / night"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveRoomCategory(r.categoryKey);
                        setActivePhotoIndex(0);
                      }}
                      className="border-primary/20 text-primary hover:border-gold hover:text-gold cursor-pointer"
                    >
                      View Photos
                    </Button>
                    <Button
                      onClick={() => navigate({ to: "/book", search: { room: r.name } })}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Lightbox Modal */}
      {activeRoomCategory !== null && activePhotoIndex !== null && roomPhotos.length > 0 && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 py-6 px-4 md:px-10 text-white animate-fade-in backdrop-blur-md">
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full z-10">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                {ROOMS.find((r) => r.categoryKey === activeRoomCategory)?.name || "Room Gallery"}
              </span>
              <span className="text-sm font-medium text-white/80 max-w-xs md:max-w-md truncate mt-0.5">
                {roomPhotos[activePhotoIndex].type === "video" ? "Room Video Walkthrough" : "Room Image Preview"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/60">
                {activePhotoIndex + 1} / {roomPhotos.length}
              </span>
              <button
                onClick={() => {
                  setActiveRoomCategory(null);
                  setActivePhotoIndex(null);
                }}
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-primary-foreground cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Main Media Container */}
          <div className="relative flex-1 w-full flex items-center justify-center my-4">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 hidden sm:inline-flex size-12 items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-primary-foreground text-white transition-all duration-300 cursor-pointer"
              aria-label="Previous media"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Content (Image or Video) */}
            <div className="max-h-[75vh] max-w-[90vw] flex items-center justify-center">
              {roomPhotos[activePhotoIndex].type === "video" ? (
                <video
                  src={roomPhotos[activePhotoIndex].src}
                  controls
                  autoPlay
                  className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <img
                  src={roomPhotos[activePhotoIndex].src}
                  alt={GALLERY_ALTS[activePhotoIndex % GALLERY_ALTS.length]}
                  className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-scale-in"
                />
              )}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 hidden sm:inline-flex size-12 items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-primary-foreground text-white transition-all duration-300 cursor-pointer"
              aria-label="Next media"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Bottom Bar (Mobile Navigation Help) */}
          <div className="flex justify-center gap-4 sm:hidden pb-2">
            <button
              onClick={handlePrev}
              className="inline-flex px-5 py-2.5 items-center gap-1.5 rounded-full bg-white/10 text-white active:bg-gold active:text-primary-foreground cursor-pointer"
            >
              <ChevronLeft className="size-4" /> Prev
            </button>
            <button
              onClick={handleNext}
              className="inline-flex px-5 py-2.5 items-center gap-1.5 rounded-full bg-white/10 text-white active:bg-gold active:text-primary-foreground cursor-pointer"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const TOURISM_GROUPS = [
  {
    folder: "Tourist Places",
    photos: [
      { img: "/Tourism Photos/Tourist Places/Yercaud lake.jpg", name: "Yercaud Lake" },
      { img: "/Tourism Photos/Tourist Places/Pagoda Point.JPG", name: "Pagoda Point" },
      { img: "/Tourism Photos/Tourist Places/Lady's Seat.jpg", name: "Lady's Seat" },
      { img: "/Tourism Photos/Tourist Places/Kiliyur Waterfalls.jpg", name: "Kiliyur Waterfalls" },
      { img: "/Tourism Photos/Tourist Places/Karadiyur view point.jpg", name: "Karadiyur Viewpoint" },
      { img: "/Tourism Photos/Tourist Places/Gents Seat.jpg", name: "Gent's Seat" },
      { img: "/Tourism Photos/Tourist Places/Yercaud Boat house.webp", name: "Boat House" },
    ],
  },
  {
    folder: "Parks & Nature",
    photos: [
      { img: "/Tourism Photos/Parks & Nature/Yercaud Lake.jpg", name: "Yercaud Lake" },
      { img: "/Tourism Photos/Parks & Nature/Anna Park.jpg", name: "Anna Park" },
      { img: "/Tourism Photos/Parks & Nature/Botanical Garden.jpg", name: "Botanical Garden" },
      { img: "/Tourism Photos/Parks & Nature/Deer park.jpg", name: "Deer Park" },
      { img: "/Tourism Photos/Parks & Nature/Lake Park.jpeg", name: "Lake Park" },
      { img: "/Tourism Photos/Parks & Nature/rose-garden.jpg", name: "Rose Garden" },
    ],
  },
  {
    folder: "Temples",
    photos: [
      { img: "/Tourism Photos/Temples/Shevarayan Temple.jpg", name: "Shevarayan Temple" },
      { img: "/Tourism Photos/Temples/Annamalaiyar Temple.jpg", name: "Annamalaiyar Temple" },
      { img: "/Tourism Photos/Temples/Chakra Maha Meru Temple.jpg", name: "Chakra Maha Meru Temple" },
      { img: "/Tourism Photos/Temples/Hanuman Temple.jpg", name: "Hanuman Temple" },
      { img: "/Tourism Photos/Temples/Raja Rajeshwari Amman Temple.jpg", name: "Raja Rajeshwari Amman Temple" },
    ],
  },
  {
    folder: "Theme Places",
    photos: [
      { img: "/Tourism Photos/Theme places/Sky Park.jpg", name: "Sky Park" },
      { img: "/Tourism Photos/Theme places/Peeku Park.jpg", name: "Peeku Park" },
      { img: "/Tourism Photos/Theme places/Poppy Hills.jpg", name: "Poppy Hills" },
    ],
  },
];

const TOURISM_PLACES = TOURISM_GROUPS.flatMap((g) => g.photos.map((p) => ({ ...p, desc: "" })));

const DESTINATIONS = [
  {
    img: destYercaud,
    name: "Yercaud",
    desc: "Yercaud is a top hill station in Tamil Nadu known for its peaceful atmosphere, making it ideal for booking cottages in Yercaud.",
    distance: "0 km",
  },
];

function Destinations() {
  return (
    <section id="destinations" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Tourism Places in Yercaud</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Tourism Places in <span className="italic text-primary">Yercaud</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Explore Popular Tourist Attractions in Yercaud — from the serene Yercaud Lake and Pagoda Point to Lady's Seat, Shevaroy Temple and lush coffee plantations.
          </p>
        </div>
        <div className="mt-14 space-y-14">
          {TOURISM_GROUPS.map((group) => (
            <div key={group.folder}>
              <h3 className="mb-6 text-2xl font-semibold text-foreground border-l-4 border-gold pl-4">{group.folder}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.photos.map((place) => (
                  <div key={place.name} className="group relative overflow-hidden rounded-lg shadow-card aspect-[4/3]">
                    <img
                      src={place.img}
                      alt={`${place.name} - Tourist place in Yercaud`}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-background">
                      <h4 className="font-semibold text-base">{place.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRAVEL_PACKAGES = [
  {
    icon: Bus,
    title: "Pickup & Drop",
    desc: "Comfortable cab transfers from Salem, Bangalore or Chennai directly to Sahana Cottages — we handle the ride so you enjoy the journey.",
    tag: "Transport",
  },
  {
    icon: Compass,
    title: "Yercaud Sightseeing",
    desc: "Guided day tours covering Yercaud Lake, Pagoda Point, Lady's Seat, Shevaroy Temple and the Botanical Garden at your own pace.",
    tag: "Local Tour",
  },
  {
    icon: Mountain,
    title: "Yercaud Exploration Packages",
    desc: "Multi-day packages across Yercaud's scenic spots — curated itineraries with stays, meals and guided experiences included.",
    tag: "Multi-Day",
  },
  {
    icon: Camera,
    title: "Honeymoon & Couple Packages",
    desc: "Romantic getaways with decorated rooms, candlelight dinners, scenic viewpoint visits and personalised surprises for couples.",
    tag: "Special",
  },
  {
    icon: Users,
    title: "Group & Corporate Tours",
    desc: "Team outings, family reunions and school trips — we arrange transport, accommodation, activities and catering for large groups.",
    tag: "Groups",
  },
  {
    icon: CalendarCheck,
    title: "Custom Itinerary Planning",
    desc: "Tell us your dates, budget and interests — we'll craft a personalised travel plan covering the best of South India's hill stations.",
    tag: "Custom",
  },
];

function TravelServices() {
  return (
    <section id="travel" className="gradient-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Booking Partners</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            We plan your <span className="italic text-primary">perfect journey</span>
          </h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Beyond a stay — we are your travel partners. Whether you want to explore Yercaud or plan a custom group outing, we arrange everything for you.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVEL_PACKAGES.map((pkg) => (
            <div
              key={pkg.title}
              className="group rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                  <pkg.icon className="size-5" />
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  {pkg.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{pkg.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 rounded-lg bg-primary p-10 text-center text-primary-foreground">
          <h3 className="font-display text-3xl font-semibold">
            Ready to explore? <span className="text-gold">Let us plan it.</span>
          </h3>
          <p className="mt-3 text-primary-foreground/75">
            Call or message us with your travel dates and we'll put together a custom package just
            for you — no hassle, no hidden costs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+919150507580">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base"
                style={{ backgroundColor: "var(--gold)", color: "#1a1a1a" }}
              >
                <Phone className="mr-2 size-4" /> Call Us Now
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent px-8 py-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Send Inquiry <ArrowRight className="ml-1 size-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sightseeing() {
  const vehicles = [
    { name: "Indica / Swift Dzire / Etios", price: "₹2,000" },
    { name: "Tavera / Tata Sumo", price: "₹2,300" },
    { name: "Innova / Xylo", price: "₹2,500" },
    { name: "Tempo (12 Seater)", price: "₹3,500" },
    { name: "Tourister (17 Seater)", price: "₹3,500" },
    { name: "Coach Van (22 Seater)", price: "₹3,500" },
  ];
  const places = [
    "Shevarayan Temple",
    "Raja Rajeshwari Amman Temple",
    "Botanical Garden",

    "Lalitha Thirupura Sundari Amman Temple",
    "Karadiyur View Point",
    "Anna Park",
    "Lake Park",
    "Boat House",
    "Deer Park",
    "Lady's Seat",
    "Gent's Seat",
    "Rose Garden",
    "Kiliyur Water Falls",
    "Pagoda Point",
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Sahana Hospitality Services</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Yercaud Full Day Sightseeing</h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">Explore the best of Yercaud in a single day with our comfortable car rental service.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — Vehicle Pricing */}
          <div className="rounded-lg border border-border bg-card shadow-card p-8">
            <h3 className="text-2xl font-bold text-foreground mb-1">Yercaud Sightseeing Car Rental</h3>
            <a href="tel:+919150507580" className="inline-flex items-center gap-2 text-gold font-semibold text-base mb-6 hover:underline">
              <Phone className="size-4" /> +91 9150507580
            </a>
            <div className="space-y-3 mt-4">
              {vehicles.map((v) => (
                <div key={v.name} className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-3">
                    <Car className="size-4 text-gold shrink-0" />
                    <span className="text-base font-medium text-foreground">{v.name}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{v.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-gold/10 border border-gold/30 px-5 py-4">
              <p className="text-sm font-semibold text-foreground">
                📍 Note: Pickup &amp; Drop Available in Yercaud
              </p>
            </div>
          </div>
          {/* Right — Places List */}
          <div className="rounded-lg border border-border bg-card shadow-card p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Full Day Sightseeing Places Visit</h3>
            <ol className="space-y-3">
              {places.map((place, i) => (
                <li key={place} className="flex items-center gap-4 border-b border-border/50 pb-3">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-base font-medium text-foreground">{place}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Flatten all items for the "All" category
  const allItems = galleryData.flatMap((c) =>
    c.items.map((item) => ({
      ...item,
      categoryDisplayName: c.displayName,
      categoryKey: c.key,
    }))
  );

  // Determine active items to show in grid
  const filteredItems =
    activeCategory === "all"
      ? allItems
      : galleryData
          .find((c) => c.key === activeCategory)
          ?.items.map((item) => ({
            ...item,
            categoryDisplayName: galleryData.find((c) => c.key === activeCategory)?.displayName || "",
            categoryKey: activeCategory,
          })) || [];

  const handleNext = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex(
      (activeItemIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeItemIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setActiveItemIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, filteredItems]);

  return (
    <section id="gallery" className="gradient-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Moments</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Gallery</h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Explore our beautiful rooms, cottages, garden mornings, and the quiet beauty of Sahana.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex justify-start lg:justify-center overflow-x-auto pb-4 scrollbar-none gap-2 sm:gap-3">
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveItemIndex(null);
            }}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === "all"
                ? "bg-gold text-primary-foreground shadow-soft"
                : "bg-card border border-border text-foreground/80 hover:border-gold/40 hover:text-gold"
            }`}
          >
            All
          </button>
          {galleryData.map((category) => (
            <button
              key={category.key}
              onClick={() => {
                setActiveCategory(category.key);
                setActiveItemIndex(null);
              }}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category.key
                  ? "bg-gold text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-foreground/80 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {category.displayName}
            </button>
          ))}
        </div>

        {/* Grid of Items */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveItemIndex(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-card cursor-pointer bg-black/5"
            >
              {item.type === "video" ? (
                <div className="h-full w-full relative">
                  {/* Thumbnail / Video frame preview */}
                  <video
                    src={item.src}
                    muted
                    preload="metadata"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Play Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
                    <div className="inline-flex size-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-primary-foreground">
                      <Play className="size-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={item.src}
                    alt={GALLERY_ALTS[index % GALLERY_ALTS.length]}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35 flex items-center justify-center">
                    <div className="opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 bg-white/20 backdrop-blur-md text-white p-3 rounded-full">
                      <Eye className="size-6" />
                    </div>
                  </div>
                </>
              )}
              {/* Category label overlay */}
              {activeCategory === "all" && (
                <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                  {item.categoryDisplayName}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 py-6 px-4 md:px-10 text-white animate-fade-in backdrop-blur-md">
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full z-10">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                {filteredItems[activeItemIndex].categoryDisplayName}
              </span>
              <span className="text-sm font-medium text-white/80 max-w-xs md:max-w-md truncate mt-0.5">
                {filteredItems[activeItemIndex].type === "video" ? "Cottage Video Preview" : "Cottage View"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/60">
                {activeItemIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-primary-foreground cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Main Media Container */}
          <div className="relative flex-1 w-full flex items-center justify-center my-4">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 hidden sm:inline-flex size-12 items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-primary-foreground text-white transition-all duration-300 cursor-pointer"
              aria-label="Previous media"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Content (Image or Video) */}
            <div className="max-h-[75vh] max-w-[90vw] flex items-center justify-center">
              {filteredItems[activeItemIndex].type === "video" ? (
                <video
                  src={filteredItems[activeItemIndex].src}
                  controls
                  autoPlay
                  className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <img
                  src={filteredItems[activeItemIndex].src}
                  alt={GALLERY_ALTS[activeItemIndex % GALLERY_ALTS.length]}
                  className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-scale-in"
                />
              )}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 hidden sm:inline-flex size-12 items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-primary-foreground text-white transition-all duration-300 cursor-pointer"
              aria-label="Next media"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Bottom Bar (Mobile Navigation Help) */}
          <div className="flex justify-center gap-4 sm:hidden pb-2">
            <button
              onClick={handlePrev}
              className="inline-flex px-5 py-2.5 items-center gap-1.5 rounded-full bg-white/10 text-white active:bg-gold active:text-primary-foreground cursor-pointer"
            >
              <ChevronLeft className="size-4" /> Prev
            </button>
            <button
              onClick={handleNext}
              className="inline-flex px-5 py-2.5 items-center gap-1.5 rounded-full bg-white/10 text-white active:bg-gold active:text-primary-foreground cursor-pointer"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const AMENITIES = [
  { icon: Car, title: "Free Parking", desc: "Secure on-site parking for all guests." },
  { icon: Users, title: "Family Rooms", desc: "Spacious cottages perfect for families." },
  { icon: Mountain, title: "Scenic View", desc: "Wake up to misty valleys and forests." },
  { icon: Clock, title: "24/7 Support", desc: "Always-on hospitality from our team." },
  { icon: Sparkles, title: "Clean & Hygienic", desc: "Sanitised rooms and fresh linens daily." },
  { icon: Wifi, title: "Wi-Fi & Comfort", desc: "Stay connected at your own pace." },
  { icon: Coffee, title: "Hot Beverage", desc: "Morning and evening tea & coffee with snacks available." },
  { icon: UtensilsCrossed, title: "Restaurant", desc: "Enjoy freshly prepared South Indian meals served right at our in-house restaurant." },
];

function Amenities() {
  return (
    <section id="amenities" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Amenities</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Thoughtful touches, <span className="italic text-primary">always included</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((a) => (
            <div
              key={a.title}
              className="group rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                <a.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="gradient-section py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Find Us</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Location</h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Tucked into the Shevaroy hills, just minutes from Yercaud Lake.
          </p>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <MapPin className="size-5 shrink-0 text-gold" />
              <div>
                <div className="font-medium">Sahana Cottages</div>
                <div className="text-sm text-muted-foreground">
                  Near Yercaud Lake, Yercaud, Salem District, Tamil Nadu 636601, India
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="size-5 shrink-0 text-gold" />
              <div>
                <div className="font-medium">+91 91505 07580</div>
                <div className="text-sm text-muted-foreground">Reservations · 24/7</div>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="size-5 shrink-0 text-gold" />
              <div>
                <div className="font-medium">sahanacottages@gmail.com</div>
                <div className="text-sm text-muted-foreground">We reply within a few hours</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg shadow-soft lg:col-span-3">
          <iframe
            title="Sahana Cottages Yercaud location map"
            src="https://www.google.com/maps?q=11.778843,78.209121+(Sahana+Cottages+Yercaud)&z=16&output=embed"
            loading="lazy"
            className="h-full min-h-[420px] w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Thank you! We'll get back to you shortly.");
    setForm({ name: "", phone: "", message: "" });
  };
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Say Hello</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Plan your <span className="italic text-primary">Yercaud escape</span>
          </h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Tell us when you'd like to visit and we'll craft a stay that fits your pace.
          </p>
          <div className="mt-10 space-y-4">
            <a
              href="tel:+919150507580"
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-gold/40"
            >
              <Phone className="size-5 text-gold" />
              <span className="font-medium">+91 91505 07580</span>
            </a>
            <a
              href="mailto:sahanacottages@gmail.com"
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-gold/40"
            >
              <Mail className="size-5 text-gold" />
              <span className="font-medium">sahanacottages@gmail.com</span>
            </a>
          </div>
          <div className="mt-8 space-y-6 border-t border-border/60 pt-8">
            <p className="text-base font-semibold text-primary">
              Call now to book the best cottages in Yercaud at affordable prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919150507580"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Phone className="size-4" /> Call Now
              </a>
              <a
                href="https://wa.me/919150507580?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20booking%20a%20cottage%20at%20Sahana%20Cottages%20Yercaud."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-lg border border-border bg-card p-8 shadow-card"
        >
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                maxLength={100}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="phone">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 ..."
                maxLength={20}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="message">
                Message
              </label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your visit..."
                rows={5}
                maxLength={1000}
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full rounded-full bg-primary py-6 text-base">
              Send Inquiry <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <div className="flex items-center">
            <img
              src="/logo1.png"
              alt="Sahana Cottages"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            A peaceful hill-station retreat in Yercaud, Tamil Nadu. Nature, comfort and quiet —
            since 2014.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/20 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>Yercaud, Tamil Nadu 636601</li>
            <li>+91 91505 07580</li>
            <li>sahanacottages@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-primary-foreground/60 lg:px-10">
          <span>© {new Date().getFullYear()} Sahana Cottages Yercaud. All rights reserved.</span>
          <span>Made with care in the Shevaroy Hills.</span>
        </div>
      </div>
    </footer>
  );
}

function WhyChooseUs() {
  const points = [
    { title: "Best budget cottages in Yercaud", desc: "Enjoy premium hill stay comfort at competitive and affordable pricing, without compromising on quality." },
    { title: "Family-friendly environment", desc: "A safe, peaceful space with campfire setups, children's space, and custom packages tailored for families." },
    { title: "Clean and hygienic rooms", desc: "Strict sanitization, fresh daily linens, and spotless bathrooms maintained by our professional staff." },
    { title: "Scenic Yercaud hill views", desc: "Wake up to misty Shevaroy hills, coffee plantation views, and fresh mountain air right outside your window." },
    { title: "Easy booking with instant confirmation", desc: "Direct integration with AxisRooms for secure payments, instant availability checks, and zero booking fees." }
  ];

  return (
    <section className="gradient-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Why Sahana</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Why Choose Our Cottages in Yercaud
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-muted-foreground italic font-medium leading-relaxed">
            "Top-rated cottages in Yercaud with excellent guest reviews"
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {points.map((p, i) => (
            <div
              key={i}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-gold/20 group-hover:text-gold mb-6">
                  <span className="text-lg font-bold text-gold font-display">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Priya Sharma",
      date: "October 2025",
      text: "We stayed here for a family reunion. The cottages are extremely clean and the view of the Shevaroy Hills in the morning is breathtaking. Best family cottages in Yercaud!",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      date: "December 2025",
      text: "Excellent budget stay in Yercaud. Highly recommended for couples looking for peace and privacy. The campfire setup and garden trails were fantastic.",
      rating: 5,
    },
    {
      name: "Ananya Iyer",
      date: "April 2026",
      text: "Instant AxisRooms booking was seamless. Very hygienic room setup, helpful staff, and close to Yercaud Lake. We will definitely book again!",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-gold font-bold">Reviews</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            Read verified reviews from families and couples who experienced the peace of Sahana.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border bg-card p-8 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="size-5" style={{ fill: "#d4a017", color: "#d4a017" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground italic mb-6">
                  "{r.text}"
                </p>
              </div>
              <div className="border-t border-border/60 pt-4 flex items-center justify-between">
                <span className="font-semibold text-foreground text-sm">{r.name}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Destinations />
        <TravelServices />
        <Sightseeing />
        <Gallery />
        <Amenities />
        <WhyChooseUs />
        <Testimonials />
        <Location />
        <Contact />
      </main>
      <Footer />

      {/* Hidden SEO booster */}
      <h2 style={{ display: "none" }}>
        Yercaud cottages, best cottages in Yercaud, budget stay in Yercaud, family cottages Yercaud
      </h2>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919150507580?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20booking%20a%20cottage%20at%20Sahana%20Cottages%20Yercaud."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 hover:bg-[#20ba5a]"
        aria-label="WhatsApp Us"
      >
        <svg className="size-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
