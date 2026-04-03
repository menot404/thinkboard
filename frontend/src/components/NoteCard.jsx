import { Link } from "react-router-dom"
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { formatDate } from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({note, setNotes}) => {

    const handleDelete = async(e, id)=>{
        e.preventDefault(); // get rid of the navigation when clicking delete button
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully!");
            setNotes(prevNotes => prevNotes.filter(n => n._id !== id)); // Update the notes state to remove the deleted note
        } catch (error) {
            console.error(`Failed to delete note: ${error.message}`);
            toast.error("Failed to delete note.");
        }
    }
return (
    <>
        <div>
            <Link
                to={`/note/${note._id}`}
                className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#4ADE80] group-hover:border-transparent'
            >
                <div className='card-body'>
                    <h3 className='card-title text-base-content'> {note.title} </h3>
                    <p className='text-base-content/70 line-clamp-3'> {note.content} </p>
                    <div className=' card-actions justify-between items-center mt-4'>
                        <span className="text-sm text-base-content/60">
                            {formatDate(new Date(note.createdAt))}
                        </span>
                        <div className="flex items-center gap-1">
                            <PenSquareIcon className="size-4"/>
                            <button 
                                className="btn btn-ghost btn-xs text-error "
                                onClick={(e) => handleDelete(e, note._id)}
                            >
                                <Trash2Icon className="size-4"/>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>
)
}

export default NoteCard