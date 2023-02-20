import useSubmitData from "../hooks/useSubmitData";
import Loading from "./Loading";

export default function Form({ children, endpoint, method = "PUT", onReset }) {
  const submit = useSubmitData({ endpoint, method });
  function handleSubmit(e) {
    e.preventDefault();
    submit.mutate(new FormData(e.target));
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      id="currentForm"
      onReset={onReset}
    >
      {children}
      <button>SUBMIT</button>
      <button type="reset">RESET</button>
      <section>
        <div>Data submit status: {submit.status}</div>
        {submit.isIdle && <div>Press the submit button to send your input</div>}
        {submit.isLoading && <Loading text="Uploading to the server" />}
        {submit.isError && <div>Error message: {submit.error}</div>}
        {submit.isSuccess && <div>Server response: {submit.data}</div>}
      </section>
    </form>
  );
}
