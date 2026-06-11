import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Users,
  BedDouble,
  Baby,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  Star,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: (search.room as string) || "",
  }),
  component: BookPage,
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: "https://sahanacottagesyercaud.com/book",
      },
    ],
  }),
});

const AXIS_BASE =
  "https://app.axisrooms.com/beV2/searchHotel.html?allHotels=true&newBe=true&productId=213507&bookingEngineId=4985&searchId=-1&searchNumber=1";

const ROOM_PRICES: Record<string, string> = {
  "Deluxe Bedroom": "₹2,000",
  "Group Stay": "₹1,600",
  "Family Room": "₹3,000",
  "Family Suite Room": "₹4,500",
  "Triple Bedded Room": "₹2,500",
  "One Bedroom Cottage": "₹3,000",
  "Two Bedrooms Cottage": "₹5,000",
};

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function getTomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildAxisUrl(
  checkin: string,
  checkout: string,
  rooms: string,
  adults: string,
  children: string
) {
  const paxInfo = `${adults}|${children}||`;
  const params = new URLSearchParams({ checkin, checkout, rooms, paxInfo });
  return `${AXIS_BASE}&${params.toString()}`;
}

declare const gtag: (...args: unknown[]) => void;

function BookPage() {
  const { room } = useSearch({ from: "/book" });

  const [form, setForm] = useState({
    roomType: room || "Family Room",
    checkin: getTodayStr(),
    checkout: getTomorrowStr(),
    numRooms: "1",
    adults: "2",
    children: "0",
  });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [bookingFailed, setBookingFailed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("booking_initiated") === "true") {
      sessionStorage.removeItem("booking_initiated");
      setBookingFailed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const nights = Math.max(
    1,
    Math.round(
      (new Date(form.checkout).getTime() - new Date(form.checkin).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const handleProceed = () => {
    if (isRedirecting) return;
    if (form.checkout <= form.checkin) {
      toast.error("Check-out date must be after check-in date.");
      return;
    }
    if (typeof gtag !== "undefined") {
      gtag("event", "book_now_click", { room: form.roomType });
    }
    setIsRedirecting(true);
    setBookingFailed(false);
    sessionStorage.setItem("booking_initiated", "true");
    const url = buildAxisUrl(
      form.checkin,
      form.checkout,
      form.numRooms,
      form.adults,
      form.children
    );
    setTimeout(() => {
      if (typeof gtag !== "undefined") {
        gtag("event", "redirect_to_axisrooms", { room: form.roomType });
      }
      window.location.href = url;
    }, 1000);
  };

  const handleRetry = () => {
    if (typeof gtag !== "undefined") {
      gtag("event", "booking_retry", { room: form.roomType });
    }
    setBookingFailed(false);
    handleProceed();
  };

  const whatsappFailureUrl = () => {
    const msg = `Hi, I tried booking on your website but faced an issue.

Room: ${form.roomType}
Check-in: ${formatDateDisplay(form.checkin)}
Check-out: ${formatDateDisplay(form.checkout)}

Please assist.`;
    return `https://wa.me/919150507580?text=${encodeURIComponent(msg)}`;
  };

  const whatsappFloatingUrl = () => {
    const msg = `Hi, I'd like to inquire about booking a cottage at Sahana Cottages Yercaud.

Room: ${form.roomType}
Check-in: ${formatDateDisplay(form.checkin)}
Check-out: ${formatDateDisplay(form.checkout)}`;
    return `https://wa.me/919150507580?text=${encodeURIComponent(msg)}`;
  };

  const estimatedTotal =
    form.roomType && ROOM_PRICES[form.roomType]
      ? parseInt(ROOM_PRICES[form.roomType].replace(/[^0-9]/g, "")) *
        nights *
        parseInt(form.numRooms)
      : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 lg:px-10 shadow-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo1.png"
              alt="Sahana Cottages Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <Link to="/">
<Button
              variant="ghost"
              className="text-primary-foreground hover:text-gold hover:bg-primary-foreground/10 rounded-full px-6 py-4 text-lg font-semibold"
              size="lg"
            >
              <ArrowLeft className="mr-2 size-5" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Booking Failure Banner */}
      {bookingFailed && (
        <div className="bg-destructive/10 border-b border-destructive/30 px-6 py-5">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-destructive">
                It looks like your booking didn't complete.
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Don't worry — no payment was taken. Please retry or contact us directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="size-3" /> Retry Booking
              </button>
              <a
                href={whatsappFailureUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+919150507580"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                <Phone className="size-3" /> Call for instant booking
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="bg-primary/5 border-b border-border py-10 px-6 text-center">
<span className="text-sm uppercase tracking-[0.3em] text-gold">Reservations</span>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl">Book Your Stay</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Choose your dates and guests — then proceed to our secure booking portal for instant
          confirmation and direct payment.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-gold" /> Secure Payment
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard className="size-4 text-gold" /> Instant Confirmation
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-4 text-gold" /> 4.8 ★ Rated
          </span>
        </div>
      </div>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — Search Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card space-y-6">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="size-5 text-gold" /> Stay Details
              </h2>

              {/* Room Type */}
              <div>
                <label className="text-sm font-medium mb-1.5 block" htmlFor="book-room">
                  Room / Cottage Type
                </label>
                <select
                  id="book-room"
                  value={form.roomType}
                  onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  {Object.entries(ROOM_PRICES).map(([name, price]) => (
                    <option key={name} value={name}>
                      {name} — {price}/night
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in / Check-out */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="book-checkin">
                    Check-in
                  </label>
                  <Input
                    id="book-checkin"
                    type="date"
                    value={form.checkin}
                    min={getTodayStr()}
                    onChange={(e) => setForm({ ...form, checkin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="book-checkout">
                    Check-out
                  </label>
                  <Input
                    id="book-checkout"
                    type="date"
                    value={form.checkout}
                    min={form.checkin}
                    onChange={(e) => setForm({ ...form, checkout: e.target.value })}
                  />
                </div>
              </div>

              {/* No. of Rooms */}
              <div>
                <label className="text-sm font-medium mb-1.5 block" htmlFor="book-num-rooms">
                  <BedDouble className="inline size-4 mr-1 text-gold" /> No. of Rooms
                </label>
                <select
                  id="book-num-rooms"
                  value={form.numRooms}
                  onChange={(e) => setForm({ ...form, numRooms: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} Room{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Adults & Children */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="book-adults">
                    <Users className="inline size-4 mr-1 text-gold" /> Adults
                  </label>
                  <select
                    id="book-adults"
                    value={form.adults}
                    onChange={(e) => setForm({ ...form, adults: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="book-children">
                    <Baby className="inline size-4 mr-1 text-gold" /> Children
                  </label>
                  <select
                    id="book-children"
                    value={form.children}
                    onChange={(e) => setForm({ ...form, children: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <Button
              onClick={handleProceed}
              disabled={isRedirecting}
              size="lg"
              className="w-full rounded-full py-6 text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-60 transition-opacity"
            >
              {isRedirecting ? (
                <><Loader2 className="mr-2 size-5 animate-spin" /> Redirecting…</>
              ) : (
                <>Check Availability & Book <ArrowRight className="ml-2 size-5" /></>
              )}
            </Button>

            {isRedirecting ? (
              <p className="text-center text-xs text-amber-600 font-medium">
                Please do not refresh or press back during booking.
              </p>
            ) : (
              <p className="text-center text-xs text-muted-foreground">
                You'll be taken to our secure booking portal (AxisRooms) to complete your reservation
                with instant confirmation and direct payment.
              </p>
            )}

            <p className="text-center text-[11px] text-muted-foreground/70">
              🔒 Secure booking powered by AxisRooms &amp; Razorpay
            </p>
          </div>

          {/* Right — Summary + Info */}
          <div className="lg:col-span-2 space-y-6 sticky top-8">
            {/* Booking Summary */}
            <div className="rounded-2xl border border-gold/30 bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold mb-5">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room</span>
                  <span className="font-medium text-right max-w-[55%]">{form.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium">{formatDateDisplay(form.checkin)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium">{formatDateDisplay(form.checkout)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {nights} Night{nights > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rooms</span>
                  <span className="font-medium">{form.numRooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests</span>
                  <span className="font-medium">
                    {form.adults} Adults, {form.children} Children
                  </span>
                </div>
                <hr className="border-border my-1" />
                <div className="flex justify-between text-base font-semibold">
                  <span>Estimated Total</span>
                  <span className="text-primary">
                    {estimatedTotal ? `₹${estimatedTotal.toLocaleString("en-IN")}` : "—"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1">
                  * Starting prices shown. Actual price & availability confirmed on the booking portal. Taxes may apply.
                </p>
                <p className="text-[11px] text-amber-600 font-medium pt-0.5">
                  Limited rooms available during weekends.
                </p>
              </div>
            </div>

            {/* Why Book Direct */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-3">
              <h3 className="font-display text-base font-semibold">Why Book Direct?</h3>
              {[
                "Best rate guaranteed",
                "Instant booking confirmation",
                "Secure online payment",
                "Direct support from our team",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4 text-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-semibold mb-3">Need Help?</h3>
              <a
                href="tel:+919150507580"
                className="flex items-center gap-3 text-sm hover:text-gold transition-colors"
              >
                <Phone className="size-4 text-gold shrink-0" />
                +91 91505 07580
              </a>
              <a
                href="mailto:sahanacottages@gmail.com"
                className="flex items-center gap-3 text-sm mt-3 hover:text-gold transition-colors"
              >
                <Mail className="size-4 text-gold shrink-0" />
                sahanacottages@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappFloatingUrl()}
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
