"use client"
import { createNewFeedbackAction } from '@/actions/feedbacks'
import React, { useEffect } from 'react'

const Admin = () => {



    const getDepartments = async () => {
        const data = await createNewFeedbackAction();
        console.log(data)
    }
    useEffect(() => {
        getDepartments();
    }, [])

    return (
        <div>implement Admin for create feedback at admin side  </div>
    )
}

export default Admin