import { AddMoneyModal } from "@/components/layout/add-money-modal";
import { ACTIONS } from "./Actions";

const reducers = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.REQUEST_LOAN_MODAL:
      return {
        ...state,
        requestLoanModal: payload,
      };
    case ACTIONS.REPAY_LOAN_MODAL:
      return {
        ...state,
        repayLoanModal: payload,
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
    case ACTIONS.ADD_MONEY_MODAL:
      return {
        ...state,
        addMoneyModal: payload,
      };
    case ACTIONS.USER:
      return {
        ...state,
        user: payload,
      };
    case ACTIONS.TOKEN:
      return {
        ...state,
        token: payload,
      };
    default:
      return state;
  }
};

export default reducers;
