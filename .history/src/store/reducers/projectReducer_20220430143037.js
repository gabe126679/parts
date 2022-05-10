const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_PROJECT_SUCCESS': 
        console.log('created project');
        return state;
      case 'CREATE_PROJECT_ERROR': 
        console.log('created project error');
        return state;
      case 'UPDATE_PROJECT_SUCCESS': 
        console.log('created project');
        return state;
      case 'UPDATE_PROJECT_ERROR': 
        console.log('created project error');
        return state;
      case 'EDIT_PROJECT_SUCCESS': 
        console.log('edited project success');
        return state;
      case 'EDIT_PROJECT_ERROR': 
        console.log('edited project error');
        return state;
      case 'UPDATE_VOTE_SUCCESS': 
        console.log('updated vote success');
        return state;
      case 'UPDATE_VOTE_ERROR': 
        console.log('updated vote error');
        return state;
      case 'UPDATE_NOTIFICATION_SUCCESS': 
        console.log('updated notification success');
        return state;
      case 'UPDATE_NOTIFICATION_ERROR': 
        console.log('updated notification error');
        return state;
      case 'ADD_NOTIFICATION_SUCCESS': 
        console.log('add notification success');
        return state;
      case 'ADD_NOTIFICATION_ERROR': 
        console.log('add notification error');
        return state;
      case 'DELETE_PROJECT_SUCCESS': 
        console.log('deleted project');
        return state;
      case 'DELETE_PROJECT_ERROR': 
        console.log('deleted project error');
        return state;
      default:
          return state;
    }
}

export default projectReducer;