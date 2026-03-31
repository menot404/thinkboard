import { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

import RateLimitedUI from '../components/RateLimitedUI';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);


  useEffect(()=>{
    const fetchNotes = async()=>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
        console.log(res.data);
        setLoading(false);
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
            notes.length > 0 && !isRateLimited && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {notes.map((note)=>{
                    return (
                      <div>
                        
                      </div>
                    )
                  })}
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default HomePage