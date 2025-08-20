import User from "../models/userModel.js";
import Interview from "../models/interviewModel.js";
import QuestionAnswer from "../models/questionAnswerModel.js";

export const createInterview = async (req, res) => {

    const { userId, interviewCategory, interviewLevel } = req.body;

    try {
        const newInterview = new Interview({
            user_id: userId,
            interview_category: interviewCategory,
            interview_level: interviewLevel,
            interview_data: [],
            interview_status: 'inProgress'
        })

        await newInterview.save();

        return res.status(201).json({
            success: true,
            message: "Interview created successfully",
            interview: newInterview
        })
    } catch (error) {
        console.error(error.message); // debugging
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const updateInterview = async (req, res) => {
    const { interviewId, interview_status } = req.body

    if (!interviewId) {
        return res.status(400).json({
            success: false,
            message: "interviewId is required to update the interview session"
        })
    }

    try {
        const interview = await Interview.findByIdAndUpdate(interviewId, { interview_status }, { new: true, runValidators: true })

        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.status(200).json({
            status: true,
            message: "Interview updated successfully",
            interview
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error updating interview"
        });
    }
}

export const addQuestionAnswer = async (req, res) => {
    const { interviewId, questionId, question, questionKeypoints, userAnswer, detectedKeypoints, missingKeypoints, feedback, rating, rating_average } = req.body;

    if (!interviewId || !questionId || !question || !questionKeypoints || !userAnswer) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        const newQuestionAnswer = new QuestionAnswer({
            interview_id: interviewId,
            questionId,
            question,
            questionKeypoints,
            userAnswer,
            detectedKeypoints: detectedKeypoints || [],
            missingKeypoints: missingKeypoints || [],
            feedback: feedback || '',
            rating: rating || null,
            rating_average: rating_average || null
        });

        // check for duplicates

        interview.interview_data.push(newQuestionAnswer);
        await interview.save();

        // await newQuestionAnswer.save(); getting error of having _id 

        return res.status(201).json({
            success: true,
            message: "Question answer added successfully",
            questionAnswer: newQuestionAnswer
        });
    } catch (error) {
        console.error(error.message); // debugging
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}