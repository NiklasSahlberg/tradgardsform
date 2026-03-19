const steps = [
  {
    number: "01",
    title: "Kostnadsfritt hembesök",
    description:
      "Vi träffas i din trädgård och går igenom dina önskemål, behov och drömmar. Med hjälp av vår Stilguide och Checklista skapar vi en tydlig bild av hur vi ska gå vidare.",
  },
  {
    number: "02",
    title: "Trädgårdsritning tas fram",
    description:
      "Utifrån vårt möte tar Susanne fram din personliga trädgårdsritning. Du får en förhandsskiss för revidering innan det slutliga materialet levereras.",
  },
  {
    number: "03",
    title: "Din nya trädgård",
    description:
      "Med en tydlig plan i hand kan du påbörja förverkligandet av din drömträdgård — på egen hand eller med hjälp av en anläggare.",
  },
];

export default function Process() {
  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Så här går det till
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
            Så fungerar vår <em>trädgårdsdesign</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-sand-dark z-0" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center gap-5 z-10">
              <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center shadow-md">
                <span className="font-heading text-white text-xl font-bold">{step.number}</span>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-forest mb-3">{step.title}</h3>
                <p className="font-sans text-zinc-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
