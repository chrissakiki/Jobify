import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text, email }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className={email ? "text non-cap" : "text"}>{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
