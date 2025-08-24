import express from 'express';
import { createInterview, addQuestionAnswer, updateInterview, getInterviewById, getAllInterviewsById, deleteInterviewById } from '../controllers/interviewController.js';

export const interviewRouter = express.Router();

interviewRouter.post('/create', createInterview);
interviewRouter.post('/add-question-answer', addQuestionAnswer);
interviewRouter.patch('/update', updateInterview)
interviewRouter.get('/:interviewId', getInterviewById)
interviewRouter.delete('/:interviewId', deleteInterviewById)
interviewRouter.get('/sessions/:userId', getAllInterviewsById)

export default interviewRouter;