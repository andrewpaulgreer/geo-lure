import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const initialState = {
  jobs: [],
  jobsDone: [],
  isloadingJobs: true,
  image: null,
  location: {}
};

const jobs = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_JOBS":
      return {
        ...state,
        jobs: action.payload.filter(job => !job.completed),
        jobsDone: action.payload.filter(job => job.completed),
      };
      case 'ADD_JOB':
          return{
              ...state,
              jobs: [action.payload, ...state.jobs],
          };
    case 'MARK_AS_DONE': {
        return {
            ...state,
            jobs: state.jobs.map(job=> {
                if(job.name == action.payload.name){
                    return {...job, completed: true}
                }
                return job
            })
        }
    }
    case 'TOGGLE_IS_LOADING':
        return {
            ...state,
            isLoadingJobs: action.payload
        }
    case 'MARK_JOB_AS_NOT_DONE': {
        return {
            ...state,
            jobs: state.jobs.map(job=> {
                if(job.name == action.payload.name){
                    return {...job, completed: false}
                }
                return job
            }),
            jobsDone: state.jobsDone.filter(
                job => job.name != action.payload.name
            ),
            jobsDone: [...state.jobs, action.payload]
        }
    }
    case 'DELETE_JOB':
        return{
            jobs: state.jobs.filter(job => job.name !== action.payload.name),
            jobsDone: state.jobsDone.filter(job => job.name !== action.payload.name)
        }

    case 'UPDATE_IMAGE':
        return{
            ...state,
            jobs: state.jobs.map(job => {
                if(job.name == action.payload.name){
                    return {...job, image: action.payload.uri}
                }
                return job
            }),
            jobsDone: state.jobsDone.map(job => {
                if(job.name == action.payload.name){
                    return {...job, image: action.payload.uri}
                }
                return job
            }),
        }

    default:
      return state;
  }
};

export default jobs;
