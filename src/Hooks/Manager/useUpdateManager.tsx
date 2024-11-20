import { useEffect } from "react";

import { useAppDispatch } from "@/src/Redux/Hooks/Config";
import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";

const useUpdateManager = (manager: IManagerAccount | null) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (manager) {
      dispatch(addManagerAccount(manager));
    }
  }, [manager]);
};

export default useUpdateManager;
