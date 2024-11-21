import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type ISearchLocationHistory = {
  id: number;
  location: string|undefined;
}[];

const SearchLocationHistoryContext = createContext<{
  searchLocationHistory: ISearchLocationHistory;
  setSearchLocationHistory: Dispatch<SetStateAction<ISearchLocationHistory>>;
}>({
  searchLocationHistory:[],
  setSearchLocationHistory: () => {},
});

export const SearchLocationHistoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchLocationHistory, setSearchLocationHistory] =
    useState<ISearchLocationHistory>([]);
  return (
    <SearchLocationHistoryContext.Provider
      value={{
        searchLocationHistory,
        setSearchLocationHistory,
      }}
    >
      {children}
    </SearchLocationHistoryContext.Provider>
  );
};

export function useSearchLocationHistoryContext() {
  return useContext(SearchLocationHistoryContext);
}
