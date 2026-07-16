import { Reveal } from "./Reveal";
import { PROJECT_ART } from "./art/ProjectArt";
import type { Project } from "@/data/portfolio";

/**
 * One project as a full editorial composition.
 *
 * Layout varies by index rather than alternating left/right: the flagship gets
 * a full viewport with the art bled behind the type; even-indexed projects lead
 * with art, odd lead with type. Fields that the data marks `null` (status, role,
 * href) simply don't render — no placeholders, no invented links.
 */
export function ProjectSection({ project, index }: { project: Project; index: number }) {
  const Art = PROJECT_ART[project.id];
  const flagship = Boolean(project.flagship);
  const artFirst = index % 2 === 0;

  return (
    <Reveal
      as="article"
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={`relative border-t border-[var(--line)] px-[var(--edge)] ${
        flagship ? "min-h-[96svh] py-[calc(var(--section-y)*1.15)]" : "py-[var(--section-y)]"
      }`}
    >
      {/* Flagship: art is the ground the type sits on.
          z-0 rather than a negative z-index — html/body have an opaque
          background, and negative z-index would paint the art behind it. */}
      {flagship && Art && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
          <Art className="h-full w-full" />
        </div>
      )}

      {/* Oversized archive number, bled into the margin */}
      <span
        aria-hidden="true"
        className="u-display pointer-events-none absolute top-[calc(var(--section-y)*0.42)] right-[var(--edge)] z-0 select-none text-[var(--paper)] opacity-[0.07]"
        style={{ fontSize: "clamp(7rem, 20vw, 20rem)", lineHeight: 0.8 }}
      >
        {project.number}
      </span>

      <div
        className={
          flagship
            ? "relative z-10 flex min-h-[76svh] flex-col justify-end"
            : `relative z-10 grid items-center gap-[calc(var(--vsq)*5)] lg:grid-cols-2`
        }
      >
        {/* ---- Art ---- */}
        {!flagship && Art && (
          <div className={`relative ${artFirst ? "lg:order-1" : "lg:order-2"}`}>
            <div className="group relative aspect-[4/3] overflow-hidden">
              <Art className="h-full w-full transition-[filter,transform] duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.03] group-hover:contrast-125" />
            </div>
            <p className="u-meta mt-[calc(var(--vsq)*1.6)] max-w-[46ch] normal-case tracking-normal text-[var(--muted-teal)]">
              {project.lineage}
            </p>
          </div>
        )}

        {/* ---- Type ---- */}
        <div className={flagship ? "" : artFirst ? "lg:order-2" : "lg:order-1"}>
          <div className="mb-[calc(var(--vsq)*2.5)] flex items-baseline gap-4">
            <span className="u-meta !text-[var(--paper)]">#{project.number}</span>
            <div className="u-draw u-rule flex-1" />
            {project.arabic && (
              <span className="u-arabic text-[1.35rem] text-[var(--muted-teal)]">
                {project.arabic}
              </span>
            )}
          </div>

          <h3 id={`${project.id}-title`} className="u-title u-mask">
            <span className="u-rise block">{project.name}</span>
          </h3>

          <p
            className={`u-fade u-measure mt-[calc(var(--vsq)*3)] text-[var(--paper)] ${
              flagship ? "text-[clamp(1.1rem,1.9vw,1.6rem)] leading-[1.4]" : ""
            }`}
          >
            {project.purpose}
          </p>

          {flagship && (
            <p className="u-fade u-measure mt-[calc(var(--vsq)*2)] text-[var(--paper-muted)]">
              {project.lineage}
            </p>
          )}

          {/* Metadata ledger — only what's real */}
          <dl className="u-fade mt-[calc(var(--vsq)*4)] flex flex-wrap gap-x-[calc(var(--vsq)*5)] gap-y-[calc(var(--vsq)*1.5)]">
            {project.role && (
              <div>
                <dt className="u-meta">Role</dt>
                <dd className="u-meta !text-[var(--paper)]">{project.role}</dd>
              </div>
            )}
            {project.status && (
              <div>
                <dt className="u-meta">Status</dt>
                <dd className="u-meta !text-[var(--paper)]">{project.status}</dd>
              </div>
            )}
          </dl>

          {/* Rendered only when a real link exists. */}
          {project.href && (
            <a
              href={project.href}
              className="group mt-[calc(var(--vsq)*4)] flex max-w-[22rem] items-center justify-between border-t border-[var(--line-strong)] py-[calc(var(--vsq)*1.6)]"
            >
              <span className="u-meta !text-[var(--paper)]">Open project</span>
              <span aria-hidden="true" className="transition-transform duration-700 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}
