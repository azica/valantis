import { Pagination as FlowbitePagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalPages = 100 }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const defaultNumber = (page ? parseInt(page) : null) || 1;
  const [currentPage, setCurrentPage] = useState<number>(defaultNumber);

  useEffect(() => {
    if (page !== null) {
      setCurrentPage(Number(page));
    }
  }, [searchParams, page]);

  const togglePage = (newPage: number) => {
    setCurrentPage(newPage);
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: `${newPage}` });
    setCurrentPage(newPage);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex overflow-x-auto sm:justify-center my-5">
      <FlowbitePagination
        showIcons={isMobile}
        currentPage={Number(currentPage)}
        totalPages={totalPages}
        onPageChange={togglePage}
        previousLabel={isMobile ? "" : "Предыдущая"}
        nextLabel={isMobile ? "" : "Следующая"}
      />
    </div>
  );
};

export default Pagination;
