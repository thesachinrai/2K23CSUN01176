interface UserData {
  name: string;
  email: string;
}

export const createUserService = async (userData: UserData) => {
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData,
  };
};