export default function AuthButton() {
  return (
    <a
      type="button"
      className="bg-blue-400 rounded-3xl border-sky-50 border-4 p-6 text-2xl uppercase font-mono hover:bg-blue-300"
      href="/api/auth"
    >
      Authorise
    </a>
  );
}
