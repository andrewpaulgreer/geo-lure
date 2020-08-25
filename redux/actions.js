export const loadJobs = (jobs) => ({
  type: "LOAD_JOBS",
  payload: jobs,
});

export const toggleIsLoading = (bool) => ({
  type: "TOGGLE_IS_LOADING",
  payload: bool,
});

export const deleteJob = (job) => ({
  type: "DELETE_JOB",
  payload: job,
});

export const updateJobImage = (job) => ({
  type: "UPDATE_IMAGE",
  payload: job,
});

export const markJobAsDone = (job) => ({
  type: "MARK_AS_DONE",
  payload: job,
});

export const addJob = (job) => ({
  type: "ADD_JOB",
  payload: job,
});

export const signOut = () => ({
  type: "SIGN_OUT",
});

export const chosenType = (job) => ({
  type: "ADD_TYPE",
  payload: job,
});
