import { auth } from "@/lib/auth/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <p>serverSession Result</p>
      {session?.user ? (
        <p className="break-all">{JSON.stringify(session.user)}</p>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  );
}
