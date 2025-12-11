import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosClient from "../axiosClient/axiosClient"

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/register", userData);
      console.log("register success:", response.data);
      return response.data;
    } catch (error) {
      console.log("register error:", error);
      // Extract backend message - backend sends { error: "..." } or { message: "..." }
      const backendMessage =
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message;

      return rejectWithValue(backendMessage);
    }
  }
);

export const otpVerification= createAsyncThunk(
    'auth/otpVerification',
    async (userData,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post("/user/otpverification",userData);
            return  response.data;
        }
        catch(error){
            console.log("error occur ",error)
            // Backend sends { "Error: ": err } or { message: "..." } or { error: "..." }
            const errorData = error.response?.data || {};
            const backendMessage = 
                errorData["Error: "]?.message ||
                (typeof errorData["Error: "] === 'string' ? errorData["Error: "] : null) ||
                errorData.error ||
                errorData.message || 
                error.message;
            return rejectWithValue(backendMessage)
        }
    }
)
export const loginUser= createAsyncThunk(
    'auth/login',
    async (credentials,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post('/user/login',credentials);
            return response.data;
        }
        catch(error){
            // Backend sends { error: "..." } or { message: "..." }
            console.log("error in login :" ,error)
            const backendMessage = 
                error.response?.data?.error ||
                error.response?.data?.message || 
                error.message;
            return rejectWithValue(backendMessage)
        }    
    }
)


export const googleLoginUser= createAsyncThunk(
    'auth/googleLogin',
    async (code,{rejectWithValue})=>{
        try{
            const response = await axiosClient.get(`/user/googleLogin?code=${code}`,);
            console.log("google login response :",response)
            return response.data;
        }
        catch(error){
            // Backend sends { message: "..." } or { error: "..." }
            const backendMessage = 
                error.response?.data?.error ||
                error.response?.data?.message || 
                error.message;
            return rejectWithValue(backendMessage)
        }    
    }
)


export const googleRegisterUser= createAsyncThunk(
    'auth/googleRegister',
    async (code,{rejectWithValue})=>{
        try{
            const response = await axiosClient.get(`/user/googleRegister?code=${code}`,);
            return response.data;
        }
        catch(error){
            // Backend sends { message: "..." } or { error: "..." }
            const backendMessage = 
                error.response?.data?.error ||
                error.response?.data?.message || 
                error.message;
            return rejectWithValue(backendMessage)
        }    
    }
)



export const checkAuth= createAsyncThunk(
    'auth/check',
    async (_,{rejectWithValue})=>{
        try{
            const {data}=await axiosClient.get('user/check');
            return data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
export const verifyOtp= createAsyncThunk(
    'auth/verifyOtp',
    async (_,{rejectWithValue})=>{
        try{
            const {data}=await axiosClient.get('user/verifyOtp');
            return data.user;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post("/user/logout");
            return response.data; // Contains { success: true, message: "..." }
        }
        catch(err){
            // Backend sends { success: false, message: "..." } or { error: "..." }
            const backendMessage = 
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message;
            return rejectWithValue(backendMessage)
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated:false,
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            //register user cases
            .addCase(registerUser.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.error= null;
                // Toast is handled in component level
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading= false;
                // Extract error message - payload is already the message string
                const errorMessage = typeof action.payload === 'string' 
                    ? action.payload 
                    : action.payload?.message || action.payload?.error || "Something went wrong";
                state.error= errorMessage;
                state.isAuthenticated= false;
                state.user= null
                // Toast is handled in component level
            })
            //otpverification user cases
            .addCase(otpVerification.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(otpVerification.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload?.user || action.payload;
                // Toast is handled in component level
            })
            .addCase(otpVerification.rejected,(state,action)=>{
                state.loading= false;
                // Extract error message
                const errorMessage = typeof action.payload === 'string' 
                    ? action.payload 
                    : action.payload?.message || action.payload?.error || "Something went wrong";
                state.error= errorMessage;
                state.isAuthenticated= false;
                state.user= null
                // Toast is handled in component level
            })
            //login user cases;
            .addCase(loginUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload?.user || action.payload;
                // Toast is handled in component level
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading= false;
                // Extract error message
                const errorMessage = typeof action.payload === 'string' 
                    ? action.payload 
                    : action.payload?.message || action.payload?.error || "Something went wrong";
                state.error= errorMessage;
                state.isAuthenticated= false;
                state.user= null
                // Toast is handled in component level
            })
            //google login user cases;
            .addCase(googleLoginUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(googleLoginUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload?.user || action.payload;
                // Toast is handled in component level
            })
            .addCase(googleLoginUser.rejected,(state,action)=>{
                state.loading= false;
                // Extract error message
                const errorMessage = typeof action.payload === 'string' 
                    ? action.payload 
                    : action.payload?.message || action.payload?.error || "Something went wrong";
                state.error= errorMessage;
                state.isAuthenticated= false;
                state.user= null
                // Toast is handled in component level
            })
            //google register user cases;
            .addCase(googleRegisterUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(googleRegisterUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload?.user || action.payload;
                // Toast is handled in component level
            })
            .addCase(googleRegisterUser.rejected,(state,action)=>{
                state.loading= false;
                // Extract error message
                const errorMessage = typeof action.payload === 'string' 
                    ? action.payload 
                    : action.payload?.message || action.payload?.error || "Something went wrong";
                state.error= errorMessage;
                state.isAuthenticated= false;
                state.user= null
                // Toast is handled in component level
            })
            


            //check user cases;
            .addCase(checkAuth.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(checkAuth.fulfilled,(state,action)=>{
            state.loading= false;
            if(action.payload && action.payload.user && action.payload.user._id){  // Check for nested user object
            state.isAuthenticated = true;
            state.user = action.payload;  // Access the nested user object
            } else {
            state.isAuthenticated = false;
            state.user = null;
                }
            })

            .addCase(checkAuth.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message|| "something went worng";
                state.isAuthenticated= false;
                state.user= null

            })
            //logout user cases
            .addCase(logoutUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(logoutUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= false
                state.user= null;
                state.error= null;
                // Toast is handled in component level
            })
            .addCase(logoutUser.rejected,(state,action)=>{
                state.loading= false;
                // Extract error message
                const errorMessage = typeof action.payload === 'string' 
                    ? action.payload 
                    : action.payload?.message || action.payload?.error || "Something went wrong";
                state.error= errorMessage;
                state.isAuthenticated= false;
                state.user= null
                // Toast is handled in component level
            })
    }
    
})
export default authSlice.reducer