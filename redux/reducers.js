import { SET_SEARCH_CLICKED,SET_SIZE_CHOOSE,SET_COLOR_CHOOSE,SET_USER_OBJECT, SET_CATEGORY_CLICKED,SET_ALL_PRODUCTS,SET_FILTER_VISIBLE,SET_TAB,SET_PRODUCT_NAME,SET_ARROW_ROTATE,SET_IMAGE_CLICKED,SET_SIGN_UP_VISIBLE,SET_NUMBER_CART_ITEMS,SET_ADD_ITEM,SET_AUTHENTICATED_USER, SET_INDEX_EDIT, SET_PRICE_EDIT, SET_DUPLICATED_INDEX,SET_UPDATED_ADDRESS,SET_SELECTED_ADDRESS,SET_REVIEW_ADDED } from "./actions";

const initialState = {
    click:false,
    cat:'',
    c:false,
    filter:false,
    tab:false,
    product:'',
    arrow:false,
    images:[],
    user:'',
    modal:false,
    cart:0,
    a:-1,
    yes:false,
    edit:-1,
    price:0,
    duplicate:-1,
    change:false,
    select:0,
    reviewAdded:false,
    colorChoose:'black',
    sizeChoose:'XS'
}

export default function userReducer(state=initialState,action){
    switch(action.type){
        case SET_USER_OBJECT:
            return{...state, user:action.payload}
            case SET_SIGN_UP_VISIBLE:
                return{...state, modal:action.payload}
        case SET_SEARCH_CLICKED:
            return{...state, click:action.payload}
        case SET_CATEGORY_CLICKED:
            return{...state, cat:action.payload}
            case SET_ALL_PRODUCTS:
                return{...state, c:action.payload}
                case SET_FILTER_VISIBLE:
                    return{...state, filter:action.payload}
                    case SET_TAB:
                    return{...state, tab:action.payload}
            case SET_PRODUCT_NAME:
                return{...state,product:action.payload}
            case SET_ARROW_ROTATE:
                return{...state, arrow:action.payload}
            case SET_IMAGE_CLICKED:
                return{...state, images: [action.payload, ...state.images]}
                case SET_NUMBER_CART_ITEMS:
                    return{...state, cart:action.payload}
                    case SET_ADD_ITEM:
                        return{...state, a:action.payload}     
                        case SET_AUTHENTICATED_USER:
                            return{...state, yes:action.payload}    
                        case SET_INDEX_EDIT:
                            return{...state, edit:action.payload}  
                            case SET_PRICE_EDIT:
                                return{...state, price:action.payload}  
                              case SET_DUPLICATED_INDEX:
                                  return{...state, duplicate: action.payload}
                                  case SET_UPDATED_ADDRESS:
                                    return{...state, change: action.payload}
                                    case SET_SELECTED_ADDRESS:
                                        return{...state, select: action.payload}
                                        case SET_REVIEW_ADDED:
                                            return{...state, reviewAdded: action.payload}
                                            case SET_COLOR_CHOOSE:
                                                return{...state, colorChoose: action.payload}
                                                case SET_SIZE_CHOOSE:
                                                return{...state, sizeChoose: action.payload}
            default:
                return state
    }
}