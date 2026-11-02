import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required.");
      setTitle("");
      setContent("");
      return
    }
    setLoading(true);
    try {
      await api.post("/notes", {title, content});
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
      navigate("/")
    } catch (error) {
      console.error(`Failed to create note: ${error.message}`);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too quickly. Please wait a moment and try again.",
          {
            duration: 5000,
            style: {
              background: '#ff4d4f',
              color: '#fff',
            },
            icon: '⚠️',
          }
        );
      } else {
        toast.error("Failed to create note. Please try again later.");
      }
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link
              to={"/"}
              className="btn btn-ghost mb-6"
            >
              <ArrowLeftIcon /> <span>Back to Note</span>
            </Link>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Create New Notes</h2>
                <form 
                  action=""
                  onSubmit={handleSubmit}
                  >
                    <div className="form-control mb-6 flex flex-col gap-2">
                      <label htmlFor="" className="label">
                        <span className="label-text">Note Title: </span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Note Title"
                        className="input input-primary input-bordered focus:outline-0 focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-control mb-6 flex flex-col gap-2">
                      <label htmlFor="" className="label">
                        <span className="label-text">Content: </span>
                      </label>
                      <textarea 
                        placeholder="Write your note content here..."
                        className="textarea textarea-bordered h-32 input-primary pl-4 pt-4 focus:outline-0 focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                      />
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Note"}
                      </button>
                    </div>
                  </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePage