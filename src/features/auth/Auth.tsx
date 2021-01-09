import React,{ FC,useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/user.interface';
import * as Yup from 'yup';
import http from '../../services/API';
import { saveToken, setAuthState } from './authSlice';
import { setUser } from './userSlice';
import { AuthResponse } from '../../services/mirage/routes/user';
import { useAppDispatch } from '../../store/store';

const schema = Yup.object().shape({
    username: Yup.string().required('What?no username').max(16, "username can't longer than 16 characters "),
    password: Yup.string().required('Enter a password'),
    email: Yup.string().email('Please provide a valid email address'),     
});

const Auth: FC =()=> {
    const { handleSubmit,register,errors } = useForm<User>({
        validationSchema: schema,
    }as any);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const submitForm = (data: User) => {
        const path = isLogin ? '/auth/login' : '/auth/signup';
        
        http.post<User, AuthResponse>(path, data).then(res => {
           if(res) {
               const { user,token } = res;
               dispatch(saveToken(token));
               dispatch(setUser(user));
               dispatch(setAuthState(true));
           }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    };
    return(
        <div className="auth">
            <div className="card">
               <form onSubmit={handleSubmit(submitForm)}>
                    <div className="inputWrapper">
                          <input ref={register} name="username" placeholder="username" />
                          {errors && errors.username && (
                              <p className="error">{errors.username.message}</p>
                          )}
                    </div>
                    <div className="inputWrapper">
                        <input 
                          ref={register}
                          name= "password"
                          type= "password"
                          placeholder="password"
                        />
                        {errors && errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>
                    {!isLogin && (
                        <div className="inputWrapper">
                            <input 
                             ref={register}
                             name= 'email'
                             placeholder="Email (optional)"
                            />
                            {errors && errors.email && (
                                <p className="error">{errors.email.message}</p>
                            )}
                        </div>
                    )}
                    <div className="inputWrapper">
                       <button type= "submit" disabled={loading}>
                           {isLogin ? 'Login' : 'Create account'}
                       </button>
                    </div>
                    <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', opacity: 0.7 }}>
                        {isLogin ? 'No account? Create one' : 'Already have an account?'}
                    </p>
                   </form> 
            </div>
        </div>
    )
}
export default Auth;