import Map from "./components";
import Navbar from "./components/Navbar";

export default function Home({ data }) {
  return (
    <main>
      <Navbar />
      <Map data={data} />
    </main>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/api/notes");
    const { data } = await res.json();
    console.log(data);
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
    };
  }
}
