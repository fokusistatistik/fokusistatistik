'use client';

import DOMPurify from 'isomorphic-dompurify';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Güvenlik: XSS saldırılarını önlemek için HTML içeriği temizlenir
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span',
      'b', 'i', 's', 'del', 'ins', 'sup', 'sub', 'hr'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    KEEP_CONTENT: true,
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div className="blog-content-wrapper">
      <style jsx>{`
        .blog-content-wrapper {
          /* Isolate the blog content from the rest of the page */
          all: initial;
          display: block;
          font-family: inherit;
          line-height: 1.6;
          color: #374151;
        }

        /* Reset all elements inside blog content */
        .blog-content-wrapper :global(*) {
          margin: revert;
          padding: revert;
          border: revert;
        }

        /* Prevent layout-breaking styles */
        .blog-content-wrapper :global(html),
        .blog-content-wrapper :global(body),
        .blog-content-wrapper :global(main),
        .blog-content-wrapper :global(header),
        .blog-content-wrapper :global(footer),
        .blog-content-wrapper :global(nav) {
          all: unset !important;
          display: block !important;
        }

        /* Safe typography */
        .blog-content-wrapper :global(h1) { font-size: 2.25rem; font-weight: 700; margin: 2rem 0 1rem; }
        .blog-content-wrapper :global(h2) { font-size: 1.875rem; font-weight: 700; margin: 1.75rem 0 1rem; }
        .blog-content-wrapper :global(h3) { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem; }
        .blog-content-wrapper :global(p) { margin: 1rem 0; line-height: 1.75; }
        .blog-content-wrapper :global(ul), .blog-content-wrapper :global(ol) { margin: 1rem 0; padding-left: 1.5rem; }
        .blog-content-wrapper :global(li) { margin: 0.5rem 0; }
        .blog-content-wrapper :global(a) { color: #860000; text-decoration: underline; }
        .blog-content-wrapper :global(strong) { font-weight: 700; }
        .blog-content-wrapper :global(em) { font-style: italic; }
        .blog-content-wrapper :global(code) { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; }
        .blog-content-wrapper :global(pre) { background: #1f2937; color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
        .blog-content-wrapper :global(blockquote) { border-left: 4px solid #860000; padding-left: 1rem; font-style: italic; margin: 1.5rem 0; }
        .blog-content-wrapper :global(img) { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5rem 0; }
        .blog-content-wrapper :global(table) { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .blog-content-wrapper :global(th), .blog-content-wrapper :global(td) { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
        .blog-content-wrapper :global(th) { background: #f9fafb; font-weight: 600; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
}
