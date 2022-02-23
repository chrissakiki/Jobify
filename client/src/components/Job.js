import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppProvider";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  createdBy,
  createdAt,
}) => {
  const { setEditJob, deleteJob, user } = useAppContext();
  let date = moment(createdAt).format("MMM Do YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo icon={<AiOutlineMail />} text={createdBy.email} email />
          <JobInfo icon={<FaUserCircle />} text={createdBy.name} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          {user._id === createdBy._id ? (
            <div className="actions">
              <Link
                to="/add-job"
                className="btn edit-btn"
                onClick={() => setEditJob(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteJob(_id)}
              >
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
