export type FeedbackForm = {
    id: string;
    department_id: string;
    faculty_id: string;
    subject_id: string;
    due_date: string;
    feedback_count: number;
    title: string;
    feedback_creator: string;
    feedback_codes: string[]
}

type response = {
    questNo: number;
    rating: string;
}

export type FeedbackSubmission = {
    id: string;
    faculty_id: string;
    subject_id: string;
    responses: response[]
    feedback_code: string;
}

