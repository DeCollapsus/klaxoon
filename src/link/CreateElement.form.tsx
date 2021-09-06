import { FunctionComponent } from 'react';

import { useForm } from 'react-hook-form';

interface ICreateElementFormProps {
    loading: boolean,
    name: string,
    onSubmit: (element: any) => {},
    placeholder: string,
    title: string
};

const CreateElementForm: FunctionComponent<ICreateElementFormProps> = ({ loading, name, onSubmit, placeholder, title }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder={placeholder} {...register(name, { required: true })} className="form__field" />
            {errors[name] && <span>This field is required</span>}
            <button type="submit" className="primary" disabled={loading}>{ title }</button>
        </form>
    );
}


export default CreateElementForm;