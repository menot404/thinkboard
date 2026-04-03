import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(()=>{
    const fetchNotes = async()=>{
      try {
        const res = await api.get("/notes");
        setNotes(res.data.notes);
        console.log(res.data.notes);
        setIsRateLimited(false);
      } catch (error) {
        console.error(`Failed to fetch notes: ${error.message}`);
        setLoading(false);
        console.error(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }else{
          toast.error("Failed to fetch notes. Please try again later.");
        }
      }finally{
          setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <div className='min-h-screen'>
        {isRateLimited && <RateLimitedUI />}
        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <div className='text-center font-medium text-primary py-10'>Loading notes...</div>}
          {
            notes.length === 0 && !loading && !isRateLimited && (
              <NotesNotFound />
            )
            ||
            notes.length > 0 && !isRateLimited && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {notes.map((note)=>
                    (
                        <NoteCard  key={note._id} note={note} setNotes={setNotes} />
                    )
                  )}
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default HomePage