import { createNewFeedbackAction } from '@/actions/feedbacks'
import React from 'react'

const page = async () => {
    const data = await createNewFeedbackAction({
        id: '',
        department_id: '230091a3-8fa9-4bf0-aa69-a774e515dba7',
        faculty_id: '8c446923-f0b2-4ae8-81c6-f2dae2fbe05f',
        subject_id: 'dac6f38d-fd2a-4b2a-948e-45ecfeb4ffb0',
        due_date: '2025-02-15 06:24:51.629+00',
        feedback_count: 20,
        feedback_codes: [],
        title: 'my first feedback form',
        feedback_creator: 'df3077fb-0d04-4c35-a730-430da85c7ee1'
    })

    if (!data.success) {
        console.log("got error : ", data.message)
    }
    console.log(data)
    return (
        <div>feedback form goes here</div>
    )
}

export default page