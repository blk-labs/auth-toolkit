import axios from 'axios';

export function ThrowError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    let message = "";
    const ErrRes = error.response;
    

    const data = ErrRes?.data as { message?: string } | undefined;
    if(data?.message){
        message = data.message;
    }

    throw new Error(message);
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error(typeof error === 'string' ? error : 'An unknown error occurred');
}
