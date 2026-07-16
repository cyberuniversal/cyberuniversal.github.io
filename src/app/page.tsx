import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { ProjectSection } from "@/components/ProjectSection";
import { ArchiveBreak } from "@/components/ArchiveBreak";
import { Research } from "@/components/Research";
import { Ledger } from "@/components/Ledger";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { projects, archives } from "@/data/portfolio";

/**
 * One continuous editorial scroll. Archive interstitials are placed *between*
 * runs of projects rather than before each one, so they pace the sequence
 * without turning it into a history lesson — the brief keeps them secondary.
 */
const BREAK_AFTER: Record<number, (typeof archives)[number]> = {
  0: archives[1], // Baghdad, after Shepherd-AI — the round city: routes and command
  2: archives[0], // Córdoba, after Youth Ink — the arcade: the written tradition
  3: archives[2], // Damascus, after BiQiyas — plan, measure, geometry
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />

        {/* ---- Selected work ---- */}
        <Reveal
          as="section"
          id="work"
          aria-labelledby="work-heading"
          className="border-t border-[var(--line)] px-[var(--edge)] pt-[var(--section-y)] pb-[calc(var(--vsq)*4)]"
        >
          <div className="flex items-baseline justify-between gap-6">
            <h2 id="work-heading" className="u-title u-mask">
              <span className="u-rise block">Selected work</span>
            </h2>
            <p className="u-meta shrink-0">
              {String(projects.length).padStart(2, "0")} projects
            </p>
          </div>
        </Reveal>

        {projects.map((project, i) => {
          const brk = BREAK_AFTER[i];
          return (
            <div key={project.id}>
              <ProjectSection project={project} index={i} />
              {brk && <ArchiveBreak code={brk.code} title={brk.title} arabic={brk.arabic} />}
            </div>
          );
        })}

        <Research />
        <Ledger />
        <About />
      </main>
      <Contact />
    </>
  );
}
