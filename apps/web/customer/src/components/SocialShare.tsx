type Props = {
  className?: string;
};

const LINKEDIN_COMPANY =
  "https://www.linkedin.com/company/plantopiafarms/?originalSubdomain=in";

export default function SocialShare({ className = "" }: Props) {
  const shareOnLinkedIn = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`social-share ${className}`.trim()}>
      <span className="share-label">Share this</span>

      <button
        type="button"
        aria-label="Share on LinkedIn"
        className="social-icon linkedin"
        onClick={shareOnLinkedIn}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4.98 3.5C4.98 4.604 4.09 5.5 2.986 5.5C1.88 5.5 1 4.604 1 3.5C1 2.396 1.88 1.5 2.986 1.5C4.09 1.5 4.98 2.396 4.98 3.5Z"
            fill="currentColor"
          />
          <path d="M1 8.5H5V23H1V8.5Z" fill="currentColor" />
          <path
            d="M8.5 8.5H12.2V10.6H12.3C12.98 9.44 14.76 8.2 17.12 8.2C21.02 8.2 22 10.74 22 14.3V23H18V15.2C18 13.68 17.98 11.76 15.4 11.76C12.8 11.76 12.4 13.6 12.4 15.04V23H8.5V8.5Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <a
        className="social-icon follow"
        href={LINKEDIN_COMPANY}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Plantopia Farms on LinkedIn"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4.98 3.5C4.98 4.604 4.09 5.5 2.986 5.5C1.88 5.5 1 4.604 1 3.5C1 2.396 1.88 1.5 2.986 1.5C4.09 1.5 4.98 2.396 4.98 3.5Z"
            fill="currentColor"
          />
          <path d="M1 8.5H5V23H1V8.5Z" fill="currentColor" />
          <path
            d="M8.5 8.5H12.2V10.6H12.3C12.98 9.44 14.76 8.2 17.12 8.2C21.02 8.2 22 10.74 22 14.3V23H18V15.2C18 13.68 17.98 11.76 15.4 11.76C12.8 11.76 12.4 13.6 12.4 15.04V23H8.5V8.5Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
