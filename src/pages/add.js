import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react"; // Combine the import statements
import { getSession } from "next-auth/react";
import Navbar from "./components/Navbar";

const New = () => {
  const { data: session, status } = useSession();
  const userName = session?.user?.name; // Use optional chaining to handle possible null/undefined values

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    text: userName || "", // Provide a default value for userName to avoid potential errors
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

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
  }, []);

  async function createNote() {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.text) {
      err.text = "Title is required";
    }

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <>
      <Navbar />
      {session && (
        <div className="form-container bg-[#384ebd] w-full py-[150px] px-[25px]">
          <h1 className="text-white w-[80%] text-[50px] mb-[25px] font-bold m-auto">
            Share your Location
          </h1>
          <div className="w-[80%] m-auto">
            {isSubmitting ? (
              <div>Loading</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  className="p-[20px] border-[1px] border-[#6379e4] mt-[20px] bg-[#384ebd] text-[white]"
                  error={
                    errors.title
                      ? { content: "Please enter a title", pointing: "below" }
                      : null
                  }
                  label="Title"
                  placeholder="longitude "
                  name="title"
                  onChange={handleChange}
                />
                <input
                  className="p-[20px] border-[1px] border-[#6379e4] bg-[#384ebd] text-[white]"
                  label="Descriprtion"
                  placeholder="latitude"
                  name="description"
                  error={
                    errors.description
                      ? {
                          content: "Please enter a description",
                          pointing: "below",
                        }
                      : null
                  }
                  onChange={handleChange}
                />

                <button
                  className="p-[20px]  border-[none] mt-[20px] bg-[#22274b] text-[white] text-[20px]"
                  type="submit"
                >
                  Create
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default New;
