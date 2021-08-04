import { bool, func, string } from 'prop-types';

import { useForm } from 'react-hook-form';

const CreateElementForm = ({ loading, name, onSubmit, placeholder, title }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder={placeholder} {...register(name, { required: true })} className="form__field" />
            {errors[name] && <span>This field is required</span>}
            <button type="submit" className="primary" disabled={loading}>{ title }</button>
        </form>
    );
}

CreateElementForm.propTypes = {
    loading: bool,
    name: string,
    onSubmit: func,
    placeholder: string,
    title: string
};

export default CreateElementForm;