import { FunctionComponent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import CreateElementForm from './CreateElement.form';

import { Link as LinkType } from './service';

interface IUpdateLinkFormProps {
  addTag: (id: string) => (tag: string) => {},
  getLink: (id: string) => {},
  link: LinkType,
  loading: boolean,
  removeTag: (payload: {index: string, tag: string}) => {}
};

const UpdateLinkForm: FunctionComponent<IUpdateLinkFormProps> = ({ addTag, getLink, link, loading, removeTag }) => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        (async () => {
          try {
            await getLink(id);
          } catch (err) {
            history.push("/");
          }
        })();
      }, [getLink, id, history]);

    if (!link) return (<Link to="/"><button className="primary">Go back</button></Link>);

    const tagList = link.tags.map((el) => (<div className="tag" key={el} onClick={() => removeTag({index: id, tag: el})}>{ el }</div>));

    return (
        <>
            <Link to="/"><button>Go back</button></Link>
            <h1 data-testid={`title-${id}`}>{ link.title }</h1>
            <h3>{ link.url }</h3>
            { tagList }
            <CreateElementForm
                onSubmit={(payload) => addTag(id)(payload)}
                name="tag"
                placeholder="music, tutorial..."
                title="Create tag"
                loading={loading}
            />
        </>
    );
};


const mapState = ({ link, loading }: any) => ({
    link: link.current,
    loading: loading.effects.link.addTag
});

const mapDispatch = ({ link }: any) => ({
    addTag: link.addTagToLink,
    getLink: link.getSingleLink,
    removeTag: link.removeTagFromLink
});

export default connect(mapState, mapDispatch)(UpdateLinkForm);