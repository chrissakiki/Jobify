import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  console.log(requestUser);
  if (requestUser._id === resourceUserId.toString()) return;

  throw new UnAuthenticatedError("Not Authorized");
};

export default checkPermissions;
