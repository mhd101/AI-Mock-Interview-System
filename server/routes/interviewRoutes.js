import express from 'express';
import { createInterview, addQuestionAnswer, updateInterview, getInterviewById, getAllInterviewsById } from '../controllers/interviewController.js';

export const interviewRouter = express.Router();

interviewRouter.post('/create', createInterview);
interviewRouter.post('/add-question-answer', addQuestionAnswer);
interviewRouter.patch('/update', updateInterview)
interviewRouter.get('/:interviewId', getInterviewById)
interviewRouter.get('/sessions/:userId', getAllInterviewsById)

export default interviewRouter;