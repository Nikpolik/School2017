export interface FormValidation {
    sucess: boolean;
    field?: [string];
    reason?: string;
};

export interface UserForm {
    username: string,
    password: string,
    confirmPassword: string,
    age?: number
}