interface SportIconProps {
  className?: string;
}

export function FutsalIcon({ className = "" }: SportIconProps) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M48 91C71.7482 91 91 71.7482 91 48C91 24.2518 71.7482 5 48 5C24.2518 5 5 24.2518 5 48C5 71.7482 24.2518 91 48 91Z"
        stroke="var(--green)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.5699 25.21C47.5699 25.21 34.67 30.8 26.07 40.69C26.07 40.69 26.07 56.17 34.24 66.06C34.24 66.06 47.5699 69.07 60.8999 66.06C60.8999 66.06 69.0699 56.17 69.0699 40.69C69.0699 41.12 60.4699 30.8 47.5699 25.21ZM47.5699 25.21V5M69.0699 41.12C69.0699 41.12 81.9699 35.1 88.4199 34.24M60.8999 66.49C60.8999 66.49 69.0699 78.1 73.3699 82.4M34.24 66.49C34.24 66.49 26.07 78.1 22.2 82.4"
        stroke="var(--green)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.57983 33.8098C13.5998 35.0998 26.4998 41.1198 26.4998 41.1198"
        stroke="var(--green)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
