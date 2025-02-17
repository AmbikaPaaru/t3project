import Head from "next/head";
import MainContent  from '../components/maincontent/index'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-[#F4F4F4]">
        <MainContent/>
      </main>
    </>
  );
}
