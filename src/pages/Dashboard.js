import React from "react";
import { useState, useEffect } from "react";
import { getSession, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

function Dashboard({ data }) {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [notesData, setData] = useState(data); // State for notes data

  const username = session?.user?.name;
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);

      const res = await fetch("http://localhost:3000/api/notes");
      const { data: updatedData } = await res.json();
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, [session]); // Add 'session' to the dependency array

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="bg-[#f3f3f3]">
      <Navbar />
      <div className="flexProfile w-[80%] m-auto items-center gap-[10px] p-[20px]">
        {session && (
          <div className="flex gap-[19px] items-center">
            <Image
              className="rounded-[50px]"
              src={session.user.image}
              alt="User Avatar"
              width={50}
              height={50}
            />
            <div>Hello {session ? `${session.user.name}` : " "}</div>
          </div>
        )}

        <div className="flex gap-[20px] mt-[50px]">
          {data.map((item) => {
            return (
              <div key={item.id} className=" flex   mb-[20px]   ">
                {item.text === username && (
                  <div className="boxSh border-[1px] bg-[white] s border-[#d8d8d8] p-[30px] ">
                    <div className="insied">
                      <div className="name mb-[20px] text-[#1591e3] font-bold text-[25px]">
                        {item.text}
                      </div>
                      <div className="flex gap-[50px] mb-[90px]">
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                      </div>
                      <Link
                        onClick={() => handleDelete(item._id)}
                        className=" w-[150px] h-[80px]  rounded-[5px] cursor-pointer  bg-[#1591e3] text-[white]  p-[15px]"
                        href="/"
                      >
                        Delete Your Location
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

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
