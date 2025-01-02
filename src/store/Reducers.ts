import { ACTIONS } from "./Actions";

const reducers = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.REQUEST_LOAN_MODAL:
      return {
        ...state,
        requestLoanModal: payload,
      };
    case ACTIONS.CALLBACK:
      return {
        ...state,
        callback: payload,
      };
    case ACTIONS.OPEN_SIDEBAR:
      return {
        ...state,
        openSidebar: payload,
      };
    default:
      return state;
  }
};

export default reducers;
