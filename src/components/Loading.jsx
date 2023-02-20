import styles from "../assets/css/loading.module.css";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className={styles.loading}>
      <img src="/logo/gold-min.png" />
      {text}
      <img src="/logo/gold-min.png" />
    </div>
  );
}
