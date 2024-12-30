import { api } from "./axios";


export const findUser = async (firebase_id: string) => {
    try {
        const response = await api.get(`/users/${firebase_id}`);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ findUser ~ error:", error)
        throw error;
    }
}


export const firebaseErrorToMessage = (errorCode: string) => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email address format.';
        case 'auth/user-not-found':
            return 'User not found.';
        case 'auth/invalid-credential':
            return 'Invalid credential.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/email-already-in-use':
            return 'Email already in use.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/too-many-requests':
            return 'Too many requests. Try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Try again later.';
        default:
            console.log('errorCode', errorCode);
            return 'An error occurred. Try again later.';
    }
}