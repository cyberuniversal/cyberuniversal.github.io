import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { Honour } from "@/components/Honour";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { work } from "@/data/portfolio";

/**
 * One continuous scroll, paced like the reference: a claim, six numbered blocks,
 * a bright inversion panel to break the dark run, then the close.
 *
 * There is no "Selected work" heading — the reference drops straight from the
 * hero into #1, and the numbering carries it.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div id="work">
          {work.map((item, i) => (
            <WorkSection key={item.id} item={item} index={i} />
          ))}
        </div>
        <Honour />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  );
}
