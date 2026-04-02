import Note from '../models/Note.js';

const getAllNotes = async (_, res)=>{
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Notes retrieved successfully",
            notes: notes
        });

    } catch (error) {
        console.error(`Error in getAllNotes controller: ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

const getNoteById =  async (req, res)=>{
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json({
            message: "Note retrieved successfully",
            note: note
        });
    } catch (error) {
        console.error(`Error in getNoteById controller: ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

const createNote = async (req, res)=>{
    try {
        const noteBody = req.body;
        const newNote = await Note.create(noteBody);
        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });
    } catch (error) {
        console.error(`Error in createNote controller: ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
};

const updateNoteById =  async (req, res)=>{
    try {
        const id = req.params.id;
        const updateBody = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, updateBody, {new: true});

        if (!updateBody || Object.keys(updateBody).length === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        console.error(`Error in updateNoteById controller: ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

const deleteNoteById = async (req, res)=>{
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    } catch (error) {
        console.error(`Error in deleteNoteById controller: ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export {
    getAllNotes,
    getNoteById,
    createNote,
    updateNoteById,
    deleteNoteById
}