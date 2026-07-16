
export const validateSupportForm = (data) => {
    if (!data.name || data.name.trim().length < 3) {
        return { isValid: false, message: "Name must be at least 3 characters long." };
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
        return { isValid: false, message: "Please enter a valid email address." };
    }
    if (data.phoneNumber && !/^[0-9+]{10,15}$/.test(data.phoneNumber)) {
        return { isValid: false, message: "Please enter a valid phone number (10-15 digits)." };
    }
    if (!data.subject || data.subject.trim().length < 5) {
        return { isValid: false, message: "Subject must be at least 5 characters long." };
    }
    if (!data.message || data.message.trim().length < 10) {
        return { isValid: false, message: "Message must be at least 10 characters long." };
    }
    return { isValid: true };
};

export const validateReviewForm = (data) => {
    if (data.rating < 1 || data.rating > 5) {
        return { isValid: false, message: "Rating must be between 1 and 5." };
    }
    if (!data.comment || data.comment.trim().length < 10) {
        return { isValid: false, message: "Review comment must be at least 10 characters long." };
    }
    return { isValid: true };
};