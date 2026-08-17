import { useEffect, useState } from "react";

type Props = {
  className?: string;
  url?: string;
  title?: string;
};

const INSTAGRAM_PROFILE = "https://www.instagram.com/plantopiafarms/";
const LINKEDIN_COMPANY =
  "https://www.linkedin.com/company/plantopiafarms/?originalSubdomain=in";

export default function SocialShare({ className = "", url, title }: Props) {
  const [shareUrl, setShareUrl] = useState(url ?? "");
  const [shareTitle, setShareTitle] = useState(title ?? "Plantopia Farms");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!url) setShareUrl(window.location.href);
    if (!title) setShareTitle(document.title || "Plantopia Farms");
    setCanNativeShare(typeof navigator.share === "function");
  }, [url, title]);

  const open = (target: string) =>
    window.open(target, "_blank", "noopener,noreferrer");

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: shareTitle, url: shareUrl });
    } catch {
      // user cancelled the native share sheet — nothing to do
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", shareUrl);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  return (
    <div className={`social-share ${className}`.trim()}>
      <span className="share-label">Share this</span>

      {canNativeShare && (
        <button
          type="button"
          className="social-icon share-native"
          aria-label="Share"
          onClick={handleNativeShare}
        >
          ⤴
        </button>
      )}

      <button
        type="button"
        className="social-icon facebook"
        aria-label="Share on Facebook"
        onClick={() =>
          open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
        }
      >
        f
      </button>

      <button
        type="button"
        className="social-icon twitter"
        aria-label="Share on X"
        onClick={() =>
          open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
          )
        }
      >
        𝕏
      </button>

      <button
        type="button"
        className="social-icon whatsapp"
        aria-label="Share on WhatsApp"
        onClick={() =>
          open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`)
        }
      >
        ✆
      </button>

      <button
        type="button"
        className="social-icon linkedin"
        aria-label="Share on LinkedIn"
        onClick={() =>
          open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)
        }
      >
        in
      </button>

      <a
        className="social-icon instagram"
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Plantopia Farms on Instagram"
      >
        IG
      </a>

      <a
        className="social-icon follow"
        href={LINKEDIN_COMPANY}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Plantopia Farms on LinkedIn"
      >
        ⧉
      </a>

      <button
        type="button"
        className="social-icon copy-link"
        aria-label="Copy link"
        onClick={handleCopyLink}
      >
        {copied ? "✓" : "⎘"}
      </button>
    </div>
  );
}
