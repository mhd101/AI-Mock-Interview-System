import express from 'express';
import { createInterview, addQuestionAnswer, updateInterview } from '../controllers/interviewController.js';

export const interviewRouter = express.Router();

interviewRouter.post('/create', createInterview);
interviewRouter.post('/add-question-answer', addQuestionAnswer);
interviewRouter.patch('/update', updateInterview)

export default interviewRouter;