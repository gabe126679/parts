export const createProject = (project) => {
    return (dispatch, getState) => {
      dispatch({ type: 'CREAT_PROJECT', project });  
    }
};