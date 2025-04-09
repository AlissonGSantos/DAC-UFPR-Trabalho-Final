import { useEffect, useState } from "react";

interface UseDataTableProps {
  data: any[];
}

const useDataTable = ({ data: usedData }: UseDataTableProps) => {
  const [data, setData] = useState(usedData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filterData = () => {
    if(!searchTerm) 
        return usedData;
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  useEffect(() => {
    const filteredData = filterData();
    setData(filteredData);
  }, [searchTerm]);

  return {
    currentData: data,
    handleSearch,
    filterData,
  };
};

export default useDataTable;
