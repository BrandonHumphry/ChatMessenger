import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ChatMessenger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        <Sidebar />
      </h1>
    </div>
  );
}
