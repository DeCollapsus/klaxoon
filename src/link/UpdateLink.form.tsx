import { FunctionComponent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState, Dispatch } from './model';
import { Link } from 'react-router-dom';

import CreateElementForm from './CreateElement.form';

import { Link as LinkType } from './service';

interface IUpdateLinkFormProps {
  link: LinkType | null,
  loading: boolean
};

const UpdateLinkForm: FunctionComponent<IUpdateLinkFormProps & Props> = ({ addTag, getLink, link, loading, removeTag }) => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        (async () => {
          try {
            await getLink(Number.parseInt(id));
          } catch (err) {
            history.push("/");
          }
        })();
      }, [getLink, id, history]);

    if (!link) return (<Link to="/"><button className="primary">Go back</button></Link>);

    const tagList = link.tags.map((el) => (<div className="tag" key={el} onClick={() => removeTag({index: Number.parseInt(id), tag: el})}>{ el }</div>));

    return (
        <>
            <Link to="/"><button>Go back</button></Link>
            <h1 data-testid={`title-${id}`}>{ link.title }</h1>
            <h3>{ link.url }</h3>
            { tagList }
            <CreateElementForm
                onSubmit={(payload) => addTag(Number.parseInt(id))(payload)}
                name="tag"
                placeholder="music, tutorial..."
                title="Create tag"
                loading={loading}
            />
        </>
    );
};


const mapState = ({ link, loading }: RootState) => ({
    link: link.current,
    loading: loading.effects.link.addTag
});

const mapDispatch = ({ link }: Dispatch) => ({
    addTag: link.addTagToLink,
    getLink: link.getSingleLink,
    removeTag: link.removeTagFromLink
});

type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps

export default connect(mapState, mapDispatch)(UpdateLinkForm);