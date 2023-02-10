export default function Loading() {
  return (
    <>
      <p>LOADING...</p>
      <img
        src={new URL("../assets/images/logo-min-gold.png", import.meta.url)}
      />
    </>
  );
}
