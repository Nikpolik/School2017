export interface FormValidation {
    success: boolean;
    errorFields?: {[name: string] : string};
    reason?: string;
};

export interface UserForm {
    username: string,
    password: string,
    confirmPassword: string,
    age?: number
}