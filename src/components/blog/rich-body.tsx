/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { safeUrl, type RichNode } from "@/lib/cms/model";
function render(n: RichNode, key: number): ReactNode {
  const children = n.content?.map(render);
  if (n.type === "text") {
    let text: ReactNode = n.text;
    for (const m of n.marks || []) {
      if (m.type === "bold") text = <strong>{text}</strong>;
      if (m.type === "italic") text = <em>{text}</em>;
      if (m.type === "strike") text = <s>{text}</s>;
      if (m.type === "underline") text = <u>{text}</u>;
      if (m.type === "code") text = <code>{text}</code>;
      if (
        m.type === "link" &&
        typeof m.attrs?.href === "string" &&
        safeUrl(m.attrs.href)
      )
        text = (
          <a href={m.attrs.href} rel="noopener noreferrer">
            {text}
          </a>
        );
    }
    return <span key={key}>{text}</span>;
  }
  switch (n.type) {
    case "doc":
      return <div key={key}>{children}</div>;
    case "paragraph":
      return <p key={key}>{children}</p>;
    case "heading":
      return n.attrs?.level === 3 ? (
        <h3 key={key}>{children}</h3>
      ) : (
        <h2 key={key}>{children}</h2>
      );
    case "bulletList":
      return <ul key={key}>{children}</ul>;
    case "orderedList":
      return <ol key={key}>{children}</ol>;
    case "listItem":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;
    case "codeBlock":
      return (
        <pre key={key}>
          <code>{children}</code>
        </pre>
      );
    case "horizontalRule":
      return <hr key={key} />;
    case "hardBreak":
      return <br key={key} />;
    case "image":
      return typeof n.attrs?.src === "string" && safeUrl(n.attrs.src) ? (
        <img
          key={key}
          src={n.attrs.src}
          alt={String(n.attrs.alt || "")}
          loading="lazy"
        />
      ) : null;
    default:
      return null;
  }
}
export function RichBody({ content }: { content: RichNode }) {
  return <div className="cms-article">{render(content, 0)}</div>;
}
