import { fireEvent, render, waitFor } from '../test-utils';

import CreateElementForm from './CreateElement.form';

describe('CreateElementForm', () => {
    it('should render the component correctly (loading=false)', () => {
      const { getByPlaceholderText, getByText } = render(
        <CreateElementForm
          placeholder="Test placeholder"
          onSubmit={() => {}}
          name="test"
          title="title"
          loading={false}
        />
      );
  
      expect(getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  
      const button = getByText('title');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  
    it('should renter the component correctly (loading=true)', () => {
      const { getByText } = render(
          <CreateElementForm
            placeholder="Test placeholder"
            onSubmit={() => {}}
            name="test"
            title="title"
            loading={true}
          />
        );
      expect(getByText('title')).toBeDisabled();
    });
  
    it("should display error", async () => {
      const buttonTitle = "submit";
  
      const { getByText } = render(
        <CreateElementForm
          placeholder="Test placeholder"
          onSubmit={() => {}}
          name="name"
          title={buttonTitle}
          loading={false}
        />
      );
  
      fireEvent.submit(getByText(buttonTitle));
  
      await waitFor(() => {
        const error = getByText("This field is required");
        expect(error).toBeInTheDocument();
      });
    });
  });