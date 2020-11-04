import axios from 'axios';
import { getCookie } from '../utils/cookie'

axios.defaults.headers.common = {
  'X-CSRFToken': getCookie('_csrf'),
};

export default axios;
