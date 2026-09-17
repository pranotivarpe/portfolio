"use client";

import {
  Briefcase,
  Copy,
  Download,
  FileBadge,
  GraduationCap,
  Mail,
  MapPin,
  MoonStar,
  Route,
  Search,
  TrainFront,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile, projects } from "@/data/resume";
import { OPEN_TRAIL_MAP, toggleTheme } from "@/lib/theme";

type Item = {
  id: string;
  group: "Sections" | "Projects" | "Actions";
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void | Promise<void>;
  keepOpen?: boolean;
};

export default function TrailMap() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    setNotice("");
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_TRAIL_MAP, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_TRAIL_MAP, open);
    };
  }, [open, close]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      const id = href.startsWith("/#") ? href.slice(2) : null;
      const el = id && pathname === "/" ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(href);
      }
    };
    const external = (url: string) => () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return [
      { id: "about", group: "Sections", label: "About", icon: User, run: go("/#about") },
      { id: "skills", group: "Sections", label: "Skills", hint: "Line map", icon: Route, run: go("/#skills") },
      { id: "experience", group: "Sections", label: "Experience", hint: "Service history", icon: Briefcase, run: go("/#experience") },
      { id: "projects", group: "Sections", label: "Projects", hint: "Notable stops", icon: MapPin, run: go("/#projects") },
      { id: "education", group: "Sections", label: "Education", icon: GraduationCap, run: go("/#education") },
      { id: "certifications", group: "Sections", label: "Certifications", icon: FileBadge, run: go("/#certifications") },
      { id: "contact", group: "Sections", label: "Contact", hint: "All aboard", icon: TrainFront, run: go("/#contact") },
      ...projects.map<Item>((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.name,
        hint: p.tagline,
        icon: MapPin,
        run: go(`/projects/${p.slug}`),
      })),
      { id: "theme", group: "Actions", label: "Switch between day and night", icon: MoonStar, run: toggleTheme },
      {
        id: "resume",
        group: "Actions",
        label: "Download resume",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumeFile;
          a.download = "";
          a.click();
        },
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: Copy,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setNotice("Email address copied.");
          } catch {
            setNotice(`Copy failed. The address is ${profile.email}.`);
          }
        },
      },
      { id: "email", group: "Actions", label: "Write an email", icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "github", group: "Actions", label: "Open GitHub", icon: FaGithub, run: external(profile.github) },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", icon: FaLinkedin, run: external(profile.linkedin) },
    ];
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const choose = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      void item.run();
      if (!item.keepOpen) dialogRef.current?.close();
    },
    []
  );

  const onOptionClick = (e: React.MouseEvent<HTMLElement>) => {
    choose(filtered[Number(e.currentTarget.dataset.index)]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[active]);
    }
  };

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Line map"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="trail-map fixed inset-x-0 top-[12vh] m-0 mx-auto w-[min(34rem,calc(100vw-2rem))] rounded-3xl border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-border px-5">
        <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={filtered.length ? `${listId}-${active}` : undefined}
          aria-label="Jump to a section, project or action"
          placeholder="Jump to a section, project or action"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
        />
        <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 text-xs text-muted sm:inline">Esc</kbd>
      </div>

      <ul id={listId} role="listbox" className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <li className="px-3 py-8 text-center text-sm text-muted">
            Nothing matches “{query}”. Try a section name like “projects”.
          </li>
        ) : (
          filtered.map((item, i) => {
            const header = i === 0 || filtered[i - 1].group !== item.group ? item.group : null;
            const Icon = item.icon;
            return (
              <li key={item.id} role="presentation">
                {header ? (
                  <p role="presentation" className="font-display px-3 pt-3 pb-1 text-sm text-accent italic">
                    {header}
                  </p>
                ) : null}
                <div
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={onOptionClick}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${
                    i === active ? "bg-accent-soft" : ""
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${i === active ? "text-accent" : "text-muted"}`} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hint ? <span className="hidden truncate text-sm text-muted sm:block">{item.hint}</span> : null}
                </div>
              </li>
            );
          })
        )}
      </ul>

      <p aria-live="polite" className="border-t border-border px-5 py-2.5 text-xs text-muted">
        {notice || "Use ↑ ↓ to move and Enter to open."}
      </p>
    </dialog>
  );
}
