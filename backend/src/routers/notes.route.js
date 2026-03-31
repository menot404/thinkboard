import express from 'express';
const router = express.Router();
import {
    getAllNotes, 
    getNoteById, 
    createNote, 
    deleteNoteById, 
    updateNoteById
} from '../controllers/notes.controller.js';

router.get('', getAllNotes);

router.get('/:id', getNoteById);

router.post('', createNote);

router.delete('/:id', deleteNoteById);

router.put('/:id', updateNoteById);

export default router;