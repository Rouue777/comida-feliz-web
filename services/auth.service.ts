import { api } from "@/lib/api";

export type LoginDto = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
};

export async function login(
    data: LoginDto,
): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>(
        "/auth/login",
        data,
    );

    return response.data;

}