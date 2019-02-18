import { generateURL } from './fileUtilities.js';

export default function addError(message) {
  const error = {
    message,
    id: generateURL(),
  };
  this.props.addError(error);
  const timer = setTimeout(() => {
    this.props.removeError(error);
    clearTimeout(timer);
  }, 5000);
}
