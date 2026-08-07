interface SportIconProps {
  className?: string;
}

export function TennisIcon({ className = "" }: SportIconProps) {
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
        d="M42.41 16.5689C55.31 3.66892 74.23 1.08892 84.55 11.4089C94.87 21.7289 92.29 40.6489 79.39 53.5489C74.2908 58.7108 67.9087 62.4213 60.9 64.2989C51.87 66.4489 43.27 64.7289 37.25 58.7089C31.23 52.6889 29.51 44.0889 31.66 35.0589C33.5377 28.0502 37.2482 21.6682 42.41 16.5689Z"
        stroke="var(--red)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.66 35.0588L22.2 73.7588M22.2 73.7588L60.9 64.2988M22.2 73.7588L5 90.9588"
        stroke="var(--red)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82.4 90.9588C87.1497 90.9588 91 87.1084 91 82.3588C91 77.6091 87.1497 73.7588 82.4 73.7588C77.6504 73.7588 73.8 77.6091 73.8 82.3588C73.8 87.1084 77.6504 90.9588 82.4 90.9588Z"
        stroke="var(--red)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
