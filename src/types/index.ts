export type FeedbackForm = {
    id: string;
    created_at: string;
    academic_year: string;
    department: string;
    class: string;
    semester: string;
    term: string;
    faculty_with_subject: string[]; // ["sam:DBMS", "Harry:DotNet"]
    unique_codes: string[]
}

// export type FeedbackSubmission = {
//     id: string;
//     faculty_id: string;
//     subject_id: string;
//     responses: response[]
//     feedback_code: string;
// }



export type Response = {
    id: string;

}

