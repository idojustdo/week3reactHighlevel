
import { db} from "../../shared/firebase";
import { collection,
    doc,
    getDoc,
    getDocs,
    addDoc,  
    deleteDoc } 
    from "firebase/firestore";


// Actions
const LOAD= 'Post/LOAD';
const CREATE = 'Post/CREATE';
const DELETE = 'Post/DELETE';
const UPDATE = 'Post/UPDATE';

const initialState = {
    list: [],
};


// Action Creators
export function loadPost(post_list){
    return { type: LOAD, post_list};
}
export function createPost (Post) {
return { type: CREATE , Post };
}

export function deletePost(Post_index) {
    return { type: DELETE, Post_index };
  }

export function updatePost(Post_index){
    return { type: UPDATE, Post_index };
}


  //middlewares

  export const loadPostFB = () => {
    return async function (dispatch) {
        const post_data = await getDocs(collection(db,"images"));
    
     let post_list= [];

     post_data.forEach((p) => {
        post_list.push({id:p.id, ...p.data()});
     });

     dispatch(loadPost(post_list));
    }
}

export const createPostFB= (Post) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db,"images"),Post);
        const _post = await getDoc(docRef);
        const post_data = { id: _post.id, ..._post.data() };
        dispatch(createPost(post_data));
    }
}

export const updatePostFB= () => {
    return function(dispatch) {

    }
}

export const deletePostFB = (post_id) => {
    return async function (dispatch, getState) {
     if(!post_id){
         window.alert("아이디가 없네요");
         return;
     }
      const docRef = doc(db, "images", post_id);
      await deleteDoc(docRef);
      const _Post_list = getState().Post.list;
      const Post_index = _Post_list.findIndex((b) => {
        return b.id === post_id;
      });
      dispatch(deletePost(Post_index));
    };
  };

  // Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "Post/LOAD" : {
            return{ list: action.post_list };
        }

        case "Post/CREATE": {
            const new_post_list = [...state.list, action.Post];
            return {list : new_post_list};
            
        }

        case "Post/DELETE": {
            const new_post_list= state.list.filter((l,idx) => {
              return parseInt(action.Post_index) !== idx;
            });
            return { list: new_post_list };
          }
    // do reducer stuff
    default: return state;
    }
    }