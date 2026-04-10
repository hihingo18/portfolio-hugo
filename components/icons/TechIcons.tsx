export const TechBadge = ({
  label,
  color,
  textColor = "white",
}: {
  label: string;
  color: string;
  textColor?: string;
}) => (
  <div
    className="flex items-center justify-center rounded-md px-3 py-2 text-[12px] font-semibold whitespace-nowrap"
    style={{ backgroundColor: color, color: textColor, minWidth: "50px", height: "50px" }}
    title={label}
  >
    {label}
  </div>
);

export const DotnetIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#512BD4" />
    <text x="5" y="30" fontSize="11" fill="white" fontWeight="700" fontFamily="Arial">.NET</text>
  </svg>
);

export const CsharpIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#239120" />
    <text x="12" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">C#</text>
  </svg>
);

export const SqlIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#CC2927" />
    <text x="5" y="32" fontSize="12" fill="white" fontWeight="700" fontFamily="Arial">SQL</text>
  </svg>
);

export const KafkaIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#231F20" />
    <text x="4" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">Kafka</text>
  </svg>
);

export const RedisIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#DC382D" />
    <text x="5" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">Redis</text>
  </svg>
);

export const DockerIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#2496ED" />
    <text x="3" y="32" fontSize="10" fill="white" fontWeight="600" fontFamily="Arial">Docker</text>
  </svg>
);

export const AzureIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#0089D6" />
    <text x="5" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">Azure</text>
  </svg>
);

export const ReactIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#20232a" />
    <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" />
    <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 25 25)" />
    <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 25 25)" />
    <circle cx="25" cy="25" r="2.5" fill="#61DAFB" />
  </svg>
);

export const NextIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#000" />
    <text x="3" y="31" fontSize="10" fill="white" fontWeight="700" fontFamily="Arial">Next.js</text>
  </svg>
);

export const VueIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#42B883" />
    <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">V</text>
  </svg>
);

export const AngularIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#DD0031" />
    <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">A</text>
  </svg>
);

export const SvelteIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#FF3E00" />
    <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">S</text>
  </svg>
);
