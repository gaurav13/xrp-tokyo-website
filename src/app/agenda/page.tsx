import { AGENDA_ITEMS, AGENDA_SPEAKERS } from "@/config/agenda";

const speakerMap = new Map(
  AGENDA_SPEAKERS.map((speaker) => [speaker.name, speaker]),
);

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-[#efefef] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-center text-xs text-[#5b6471] sm:mb-8 sm:text-sm">
          Changes may occur to the agenda content. Please refer to this website
          for the latest information.
        </p>

        <div className="space-y-4 sm:space-y-6 lg:space-y-7">
          {AGENDA_ITEMS.map((item, itemIndex) => (
            <section
              key={`${item.time}-${item.title}-${itemIndex}`}
              className="grid items-start gap-3 sm:gap-4 lg:grid-cols-[210px_1fr] lg:gap-6"
            >
              <div className="pt-1 text-lg leading-none font-semibold tracking-tight text-[#021024] sm:text-xl lg:text-2xl">
                <span className="inline-block whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              <article className="border-l-4 border-[#202733] bg-white px-4 py-4 shadow-[0_2px_10px_rgba(2,16,36,0.08)] sm:px-5 sm:py-5 lg:px-6">
                {item.track ? (
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-[#5b6471] uppercase sm:text-xs">
                    {item.track}
                  </p>
                ) : null}

                <h2 className="text-2xl leading-tight font-semibold tracking-tight text-[#021024] sm:text-3xl lg:text-[30px]">
                  {item.title}
                </h2>

                {/* {item.watchUrl ? (
                  <Link
                    href={item.watchUrl}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#f11111] py-2 text-center font-bold text-white transition hover:bg-[#ca0e0e]"
                  >
                    ▶ Watch Session
                  </Link>
                ) : null} */}

                {item.speakerNames.length > 0 ? (
                  <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                    {item.speakerNames.map((speakerName) => {
                      const speaker = speakerMap.get(speakerName);

                      if (!speaker) {
                        return (
                          <div
                            key={`${item.title}-${speakerName}`}
                            className="rounded-lg border border-[#dce0e6] px-3 py-2"
                          >
                            <p className="text-sm font-semibold text-[#021024]">
                              {speakerName}
                            </p>
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
                          key={`${item.title}-${speaker.name}`}
                          className="flex items-start gap-3"
                        >
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200 sm:h-14 sm:w-14">
                            {speaker.image ? (
                              // biome-ignore lint/performance/noImgElement: static agenda avatar with graceful 404 fallback
                              <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-700">
                                {initials}
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-lg leading-5 font-semibold tracking-tight text-[#021024]">
                              {speaker.name}
                            </p>
                            <p className="text-sm leading-4 text-[#111827]">
                              {speaker.role}
                            </p>
                            <p className="text-sm leading-4 text-[#5f6672]">
                              {speaker.company}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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