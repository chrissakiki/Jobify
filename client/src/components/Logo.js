import logo from "../assets/images/logo.png";
import Wrapper from "../assets/wrappers/Logo";

const Logo = () => {
  return (
    <Wrapper className="logo">
      <img src={logo} alt="jobify" />
      <h2>Jobify</h2>
    </Wrapper>
  );
};

export default Logo;
