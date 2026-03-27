import { AGENDA_ITEMS, AGENDA_SPEAKERS } from "@/config/agenda";

const speakerMap = new Map(
  AGENDA_SPEAKERS.map((speaker) => [speaker.name, speaker]),
);

export default function AgendaPage() {
  const renderPersonCard = (
    itemTitle: string,
    personName: string,
    tag?: string,
  ) => {
    const speaker = speakerMap.get(personName);

    if (!speaker) {
      return (
        <div
          key={`${itemTitle}-${personName}-${tag ?? "speaker"}`}
          className="rounded-xl border border-[#D4AF37]/50 bg-[#0A0A0A] p-3"
        >
          {tag ? (
            <p className="mb-2 inline-flex rounded-full border border-[#D4AF37] bg-black px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-white uppercase">
              {tag}
            </p>
          ) : null}
          <p className="text-sm font-semibold text-white">{personName}</p>
        </div>
      );
    }

    const initials = speaker.name
      .split(" ")
      .map((value) => value[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        key={`${itemTitle}-${speaker.name}-${tag ?? "speaker"}`}
        className="flex items-start gap-3 rounded-xl border border-[#D4AF37]/50 bg-[#0A0A0A] p-3"
      >
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#D4AF37]/50 bg-black sm:h-14 sm:w-14">
          {speaker.image ? (
            // biome-ignore lint/performance/noImgElement: static agenda avatar with graceful 404 fallback
            <img
              src={speaker.image}
              alt={speaker.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-[#A0A0A0]">
              {initials}
            </div>
          )}
        </div>

        <div>
          {tag ? (
            <p className="mb-1 inline-flex rounded-full border border-[#D4AF37] bg-black px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-white uppercase">
              {tag}
            </p>
          ) : null}
          <p className="text-base leading-5 font-semibold tracking-tight text-white sm:text-lg">
            {speaker.name}
          </p>
          <p className="text-xs leading-4 text-[#A0A0A0] sm:text-sm">
            {speaker.role}
          </p>
          <p className="text-xs leading-4 text-[#A0A0A0] sm:text-sm">
            {speaker.company}
          </p>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#000000] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-[#D4AF37] bg-[#0A0A0A] px-5 py-6 text-center shadow-[0_10px_28px_rgba(212,175,55,0.24)] sm:px-8">
          <h1 className="text-3xl font-semibold tracking-[0.08em] text-white sm:text-4xl">
            XRP TOKYO
          </h1>
          <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase sm:text-sm">
            Agenda & Session Lineup
          </p>
          <p className="mt-3 text-xs text-[#A0A0A0] sm:text-sm">
            Changes may occur to the agenda content. Please refer to this
            website for the latest information.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {AGENDA_ITEMS.map((item, itemIndex) => (
            <section
              key={`${item.time}-${item.title}-${itemIndex}`}
              className="relative grid items-start gap-3 sm:gap-4 lg:grid-cols-[220px_1fr] lg:gap-6"
            >
              <div className="pointer-events-none absolute top-0 bottom-0 left-[220px] hidden w-px bg-gradient-to-b from-[#D4AF37] via-[#f1d17a] to-transparent lg:block" />

              <div className="rounded-xl border border-[#D4AF37]/60 bg-[#0A0A0A] px-3 py-3 text-base leading-none font-semibold tracking-tight text-[#D4AF37] sm:text-lg lg:text-xl">
                <span className="inline-block whitespace-nowrap">
                  {item.time}
                </span>
                <span className="mt-2 block h-[2px] w-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
              </div>

              <article className="rounded-xl border border-[#D4AF37]/60 bg-[#0A0A0A] px-4 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(212,175,55,0.32)] sm:px-5 sm:py-5 lg:px-6">
                {item.track ? (
                  <p className="mb-2 inline-flex rounded-full border border-[#D4AF37] bg-black px-2 py-0.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase sm:text-xs">
                    {item.track}
                  </p>
                ) : null}

                <h2 className="text-xl leading-tight font-semibold tracking-tight text-white sm:text-2xl lg:text-[26px]">
                  {item.title}
                </h2>

                {item.speakerNames.length > 0 ||
                (item.moderatorNames?.length ?? 0) > 0 ? (
                  <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 xl:grid-cols-3">
                    {item.speakerNames.map((speakerName) =>
                      renderPersonCard(item.title, speakerName),
                    )}
                    {item.moderatorNames?.map((moderatorName) =>
                      renderPersonCard(item.title, moderatorName, "Moderator"),
                    )}
                  </div>
                ) : null}
              </article>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}