import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { slugify } from "@/lib/mdx";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";

function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        id={slugify(getTextContent(props.children))}
        className="text-2xl md:text-3xl font-bold text-text-heading mt-16 mb-6"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        id={slugify(getTextContent(props.children))}
        className="text-xl md:text-2xl font-bold text-text-heading mt-14 mb-5 border-b border-border pb-3"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        id={slugify(getTextContent(props.children))}
        className="text-lg font-bold text-text-heading mt-10 mb-4"
        {...props}
      />
    ),
    p: (props) => (
      <p className="text-text leading-[1.85] mb-6" {...props} />
    ),
    ul: (props) => (
      <ul
        className="list-disc pl-6 mb-6 space-y-2.5 text-text leading-[1.85]"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal pl-6 mb-6 space-y-2.5 text-text leading-[1.85]"
        {...props}
      />
    ),
    li: (props) => <li className="text-text pl-1" {...props} />,
    a: (props) => (
      <a
        className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          props.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-accent pl-5 my-8 text-text-secondary italic leading-[1.85]"
        {...props}
      />
    ),
    table: (props) => (
      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border-collapse" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border border-border px-4 py-2.5 text-left text-text-heading bg-surface"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border border-border px-4 py-2.5 text-text" {...props} />
    ),
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        src={
          props.src?.startsWith("/")
            ? `/ai-engineering-blog${props.src}`
            : props.src
        }
        alt={props.alt || ""}
      />
    ),
    pre: (props) => <CodeBlock {...props} />,
    hr: () => <hr className="border-border my-12" />,
    Callout,
    ...components,
  };
}
