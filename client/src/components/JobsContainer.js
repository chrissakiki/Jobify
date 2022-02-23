import { useEffect } from "react";
import { useAppContext } from "../context/AppProvider";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2> No Jobs have been found.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
        {/* {numOfPages > 1 && <PageBtnContainer /> } */}
      </div>
      <PageBtnContainer />
    </Wrapper>
  );
};

export default JobsContainer;
