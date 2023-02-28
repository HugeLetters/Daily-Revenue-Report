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
        <p>Data submit status: {submit.status}</p>
        {submit.isIdle && <p>Press the submit button to send your input</p>}
        {submit.isLoading && <Loading text="Uploading to the server" />}
        {submit.isError && <p>Error message: {submit.error}</p>}
        {submit.isSuccess && <p>Server response: {submit.data}</p>}
      </section>
    </form>
  );
}
