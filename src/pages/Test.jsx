export default function Test() {
  return Array(10)
    .fill(0)
    .map((_, e) => (
      <div
        key={e}
        className="listed"
      >
        {e}
      </div>
    ));
}
