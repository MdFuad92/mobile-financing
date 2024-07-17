
import ReactCodeInput from 'react-code-input';
import { Controller, useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';

import bcrypt from 'bcryptjs'
import useAxiospublic from '../../hook/useAxiospublic';



const Register = () => {
     
    const [value, setValue] = useState("")

  

    const { register, handleSubmit, control } = useForm();
    const axiosPublic = useAxiospublic()
    const onSubmit = async (data) => {

        const hashedPin = await bcrypt.hash(data.pin, 10);



      const userInfo = {
           name: data.name,
           pin: hashedPin,
           phone:data.phone,
           email: data.email
         
      }  
      console.log(userInfo) 
     const userRes = await axiosPublic.post('/users',userInfo)
     console.log(userRes.data)
    
    };




    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PIN</span>
                            </label>
                            <Controller
                                name="pin"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <ReactCodeInput {...field} type='number' fields={5} />
                                )}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile Number</span>
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        placeholder="Enter phone number"
                                  
                                        value={value}
                                        onChange={value => {
                                            setValue(value);
                                            field.onChange(value);
                                          }}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input  {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;