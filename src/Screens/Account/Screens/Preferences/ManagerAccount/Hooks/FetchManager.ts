import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import { getManagerById } from "@/src/HttpServices/Queries/Manager/ManagerHttpFuncs";

export const fetchManagerData = async (
  manager: IManagerAccount,
  accessToken: string,
  setManagerData: (managerResponse: any) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>,
  setUpdateError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await getManagerById({
      accessToken,
      managerId: manager.id,
    });
    setManagerData(response.data.response);
    setOpenSuccessModal(true);
  } catch (error: any) {
    if (error.response?.data?.error !== "") {
      setUpdateError(error.response?.data?.error);
    } else setUpdateError("Something went wrong");
  } finally {
    () => setIsLoading(false);
  }
};
