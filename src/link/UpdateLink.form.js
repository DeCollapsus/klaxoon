import { useParams } from 'react-router-dom';

const UpdateLinkForm = () => {
    const { index } = useParams();
    return 'UpdateLinkForm ' + index;
};

export default UpdateLinkForm;