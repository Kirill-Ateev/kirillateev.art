import styles from '../collections/styles.module.css';

type arrowProps = {
  href: string;
};

export default function ArrowRight({ href }: arrowProps) {
  return (
    <a className={styles.arrow} target="_blank" rel="noreferrer" href={href}>
      <svg
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <g id="icomoon-ignore"> </g>
          <path
            d="M2.639 15.992c0 7.366 5.97 13.337 13.337 13.337s13.337-5.97 13.337-13.337-5.97-13.337-13.337-13.337-13.337 5.97-13.337 13.337zM28.245 15.992c0 6.765-5.504 12.27-12.27 12.27s-12.27-5.505-12.27-12.27 5.505-12.27 12.27-12.27c6.765 0 12.27 5.505 12.27 12.27z"
            fill="#000000"
          ></path>
          <path
            d="M19.159 16.754l0.754-0.754-6.035-6.035-0.754 0.754 5.281 5.281-5.256 5.256 0.754 0.754 3.013-3.013z"
            fill="#000000"
          ></path>
        </g>
      </svg>
    </a>
  );
}
