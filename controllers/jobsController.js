import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { position, company, jobLocation, jobType, status } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.create({
    position,
    company,
    jobLocation,
    jobType,
    status,
    createdBy: req.user._id,
  });
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    // createdBy: req.user._id,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObject).populate("createdBy", "_id email name");

  //sorting

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const updateJob = async (req, res) => {
  const { id: _id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id });

  if (!job) {
    throw new NotFoundError(`No job with this id: ${_id} `);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};
const deleteJob = async (req, res) => {
  const { id: _id } = req.params;

  const job = await Job.findOne({ _id });

  if (!job) {
    throw new NotFoundError(`No job with this id: ${_id} `);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();

  res.status(StatusCodes.OK).json({ message: "Job Removed" });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    // {
    //   $match: { createdBy: mongoose.Types.ObjectId(req.user._id) },
    // },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id, count } = curr;
    acc[_id] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    // { $match: { createdBy: mongoose.Types.ObjectId(req.user._id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
